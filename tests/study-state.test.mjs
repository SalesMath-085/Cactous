import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeProgress, reconcileProgress, quizPosition, loadStudyState, readStored, writeStored } from '../src/data/study-state.js';
import { validateIndex, fetchQuestionSets, mergePublishedSets } from '../src/data/question-sets.js';
import { questions } from '../src/data/questions.js';
import { validateImport } from '../worker/index.js';

const q = id => ({id,prompt:'Pergunta?',options:['A','B','C','D','E'],answer:0,explanation:'A.'});
const pool = [q('a'),q('b'),q('c')];
const storage = values => ({getItem:key=>values[key] ?? null,setItem:(key,value)=>{values[key]=value;}});

test('bad saved data cannot masquerade as answers or crash the app', () => {
  for (const value of [null, 4, 'text', [], {a:null,b:{choice:99},c:{choice:'0'}}]) assert.deepEqual(sanitizeProgress(value),{});
  const progress = reconcileProgress({a:{choice:0,correct:false},b:{choice:1,correct:true}},pool);
  assert.equal(progress.a.correct,true); assert.equal(progress.b.correct,false);
  assert.equal(quizPosition([q('toString')],{},progress).selected,null);
  assert.equal(quizPosition([q('__proto__')],{},progress).percent,0);
});

test('skipping never counts as answering and returning restores the actual answer', () => {
  const progress = reconcileProgress({a:{choice:1}},pool);
  assert.equal(quizPosition(pool,{questionId:'c'},progress).percent,33);
  assert.equal(quizPosition(pool,{questionId:'c'},progress).selected,null);
  assert.equal(quizPosition(pool,{questionId:'a',selected:0},progress).selected,1);
  assert.equal(quizPosition(pool,{questionId:'removed'},progress).selected,1);
});

test('every error can be retried without revealing its old answer', () => {
  const progress = reconcileProgress({a:{choice:1},b:{choice:2}},pool);
  const review = {questionId:'b',answers:{a:0}};
  assert.equal(quizPosition(pool,review,progress,true).selected,null);
  assert.equal(quizPosition(pool,{...review,questionId:'a'},progress,true).selected,0);
  assert.equal(quizPosition(pool,review,progress,true).percent,33);
  assert.equal(progress.b.choice,2);
});

test('per-notebook positions survive reload and migrate legacy sessions', () => {
  const saved = {activeSetId:'second',sessions:{first:{questionId:'a'},second:{questionId:'b'}}};
  const data = {};
  assert.equal(writeStored('cactous-study-state-v2',saved,storage(data)),true);
  assert.deepEqual(loadStudyState(storage(data)),saved);
  assert.equal(loadStudyState(storage({'poo-em-foco-study-session':'{"questionId":"legacy","selected":2}'})).sessions['sessao-de-estudos'].questionId,'legacy');
});

test('blocked storage and malformed JSON fail safely', () => {
  const blocked = {getItem(){throw new Error('denied');},setItem(){throw new Error('quota');}};
  assert.deepEqual(readStored('x',{},blocked),{});
  assert.equal(writeStored('x',{},blocked),false);
  assert.equal(readStored('x','fallback',storage({x:'{'})),'fallback');
});

test('validates the full existing fallback and rejects unsafe metadata', () => {
  assert.equal(validateImport(questions).length,53);
  for (const bad of [{...q('a'),prompt:{}},{...q('a'),options:[{},'b','c','d','e']},{...q('a'),references:[{url:'javascript:alert(1)',file:'x',question:1}]}]) assert.throws(()=>validateImport([bad]));
  const enriched = {...q('a'),context:'Diagrama',note:'Nota',references:[{url:'https://example.com/pdf',file:'Prova',question:1}]};
  assert.equal(validateImport([enriched])[0].context,'Diagrama');
});

test('invalid notebooks do not erase healthy notebooks', async () => {
  const index = [{id:'first',title:'Primeiro',file:'first.json'},{id:'bad',title:'Inválido',file:'bad.json'}];
  const fetcher = async url => Response.json(url.includes('index.json') ? index : url.includes('first.json') ? [q('a')] : [{...q('b'),options:null}]);
  const result = await fetchQuestionSets(undefined,fetcher);
  assert.equal(result.sets.length,1);assert.deepEqual(result.failed,['Inválido']);
  const created = {id:'new',questions:[q('new')]};
  assert.deepEqual(mergePublishedSets(result.sets,[created]).map(s=>s.id),['first','new']);
});

test('duplicate notebook IDs and unsafe paths are rejected', () => {
  const entry={id:'one',title:'One',file:'one.json'};
  for(const index of [[entry,entry],[{...entry,file:'../private.json'}],[{...entry,id:'__local_questions__'}],[{...entry,title:{}}]])assert.throws(()=>validateIndex(index));
});
