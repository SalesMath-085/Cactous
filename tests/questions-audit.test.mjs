import assert from 'node:assert/strict';
import test from 'node:test';
import { questions } from '../src/data/questions.js';
import { isCorrectAnswer, correctLetters } from '../src/data/answer.js';

test('covers all 70 PDF occurrences in 53 distinct questions', () => {
  assert.equal(questions.length, 53);
  assert.equal(new Set(questions.map(q => q.id)).size, 53);
  const references = questions.flatMap(q => q.references);
  assert.equal(references.length, 70);
  assert.equal(new Set(references.map(ref => ref.url)).size, 7);
  for (const url of new Set(references.map(ref => ref.url))) {
    assert.deepEqual(references.filter(ref => ref.url === url).map(ref => ref.question).sort((a,b) => a-b), [1,2,3,4,5,6,7,8,9,10]);
  }
});

test('accepts both identical correct alternatives in Maria 10', () => {
  const question = questions.find(q => q.id === 'pdf-maria-10');
  assert.equal(correctLetters(question), 'A e C');
  for (let choice = 0; choice < 5; choice++) assert.equal(isCorrectAnswer(question, choice), choice === 0 || choice === 2);
});

test('keeps the two different constructor and reference variants', () => {
  const byId = id => questions.find(q => q.id === id);
  assert.match(byId('pdf-cw2-08').code, /valor \+= 2/);
  assert.match(byId('pdf-s02-05').code, /valor\+\+/);
  assert.equal(byId('pdf-cw2-08').options[byId('pdf-cw2-08').answer], '9 7 2');
  assert.equal(byId('pdf-s02-05').options[byId('pdf-s02-05').answer], '8 6 2');
  assert.match(byId('pdf-cw1-03').code, /p2 = p1/);
  assert.match(byId('pdf-maria-10').code, /p1 = p2/);
  assert.match(byId('pdf-cw2-02').context, /subclasses de Funcionario/);
});
