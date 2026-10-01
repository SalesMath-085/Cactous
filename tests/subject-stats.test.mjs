import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { subjectStats, questionSubjects } from '../src/data/subject-stats.js';
import { questions } from '../src/data/questions.js';
import { validateImport } from '../worker/index.js';

const q = (id,tags) => ({id,tags,topic:'Fundamentos',prompt:'?',options:['A','B','C','D','E'],answer:0,explanation:'A.'});

test('a multi-subject error counts once in each subject, with pending questions excluded from error rates', () => {
  const bank=[q('a',['Herança','Polimorfismo','Herança']),q('b',['Herança']),q('c',['Polimorfismo']),q('d',['HashMap'])];
  const stats=subjectStats(bank,{a:{choice:1},b:{choice:0}});
  const inheritance=stats.find(s=>s.topic==='Herança');
  assert.deepEqual(inheritance,{topic:'Herança',total:2,done:2,correct:1,errors:1,pending:0,rate:50,errorRate:50});
  const polymorphism=stats.find(s=>s.topic==='Polimorfismo');
  assert.equal(polymorphism.errors,1);assert.equal(polymorphism.pending,1);assert.equal(polymorphism.errorRate,100);
  const maps=stats.find(s=>s.topic==='HashMap');assert.equal(maps.done,0);assert.equal(maps.pending,1);
});

test('all 53 questions have specific tags in the Git bank and offline copies', async () => {
  const remote=JSON.parse(await readFile(new URL('../public/question-sets/Sessão de estudos.json',import.meta.url),'utf8'));
  const publicCopy=JSON.parse(await readFile(new URL('../public/questions.json',import.meta.url),'utf8'));
  assert.equal(remote.length,53);
  for(const bank of [remote,publicCopy,questions]) {
    assert.equal(bank.length,53);
    for(const question of bank) {
      assert.ok(question.tags.length>0,question.id);
      assert.equal(new Set(question.tags).size,question.tags.length);
      assert.ok(!question.tags.includes('Fundamentos'));
      assert.equal(question.topic,question.tags[0]);
      assert.deepEqual(question.tags,remote.find(q=>q.id===question.id).tags);
    }
  }
});

test('JSON imports preserve tags and legacy questions still use their topic', () => {
  const tagged=validateImport([q('a',[' Herança ','Polimorfismo','Herança'])])[0];
  assert.deepEqual(tagged.tags,['Herança','Polimorfismo']);
  assert.deepEqual(questionSubjects({topic:'Construtores'}),['Construtores']);
  for(const tags of [[],[''],[4],Array(21).fill('Tag')])assert.throws(()=>validateImport([q('a',tags)]));
});
