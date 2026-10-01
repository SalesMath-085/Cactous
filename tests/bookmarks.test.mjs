import test from 'node:test';
import assert from 'node:assert/strict';
import {sanitizeBookmarks,toggleBookmark,markedQuestions,sessionAfterUnmark} from '../src/data/bookmarks.js';
import {readStored,writeStored,quizPosition} from '../src/data/study-state.js';

const questions=['a','b','c'].map(id=>({id,options:['A','B','C','D','E'],answer:0}));

test('marking and unmarking keep a unique selection without changing answers',()=>{
  const progress={a:{choice:1,correct:false}};
  const ids=toggleBookmark(toggleBookmark([], 'a'),'b');
  assert.deepEqual(ids,['a','b']);
  assert.deepEqual(markedQuestions(questions,ids).map(q=>q.id),['a','b']);
  assert.equal(quizPosition(markedQuestions(questions,ids),{questionId:'a'},progress).selected,1);
  assert.deepEqual(toggleBookmark(ids,'a'),['b']);
  assert.deepEqual(progress,{a:{choice:1,correct:false}});
});

test('marks survive reload and reject corrupted data',()=>{
  const data={};const storage={getItem:key=>data[key],setItem:(key,value)=>{data[key]=value;}};
  writeStored('cactous-bookmarks-v1',['a','b'],storage);
  assert.deepEqual(sanitizeBookmarks(readStored('cactous-bookmarks-v1',[],storage)),['a','b']);
  assert.deepEqual(sanitizeBookmarks(['a','a',null,{},4,'../bad']),['a']);
  assert.deepEqual(sanitizeBookmarks({a:true}),[]);
  // A temporarily unavailable notebook does not erase its marks.
  assert.deepEqual(markedQuestions(questions,['a','missing']).map(q=>q.id),['a']);
});

test('removing the opened mark advances, falls back at the end, and handles an empty selection',()=>{
  assert.deepEqual(sessionAfterUnmark(questions,{questionId:'b'},'b'),{questionId:'c'});
  assert.deepEqual(sessionAfterUnmark(questions,{questionId:'c'},'c'),{questionId:'b'});
  assert.deepEqual(sessionAfterUnmark([questions[0]],{questionId:'a'},'a'),{questionId:''});
  assert.deepEqual(sessionAfterUnmark(questions,{questionId:'a'},'b'),{questionId:'a'});
});
