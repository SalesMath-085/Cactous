import test from 'node:test';
import assert from 'node:assert/strict';
import { splitQuestionPrompt } from '../src/data/question-prompt.js';

test('numbered statements are separate from the introduction and final instruction', () => {
  const result=splitQuestionPrompt('Analise:\n1. Uma classe pode possuir atributos.\n2. Uma classe pode possuir métodos. Assinale a alternativa correta.');
  assert.equal(result.introduction,'Analise:');
  assert.deepEqual(result.statements,[
    {label:'1.',text:'Uma classe pode possuir atributos.'},
    {label:'2.',text:'Uma classe pode possuir métodos.'},
  ]);
  assert.equal(result.instruction,'Assinale a alternativa correta.');
});

test('Roman labels, hyphens and inline imports retain the complete statement text', () => {
  const prompt='Sobre Java: I - A classe define atributos. II - O objeto mantém seu estado. III - Há métodos. Com base nas afirmativas acima, marque a alternativa CORRETA.';
  const result=splitQuestionPrompt(prompt);
  assert.deepEqual(result.statements.map(s=>s.label),['I -','II -','III -']);
  const reconstructed=[result.introduction,...result.statements.map(s=>`${s.label} ${s.text}`),result.instruction].join(' ');
  assert.equal(reconstructed,prompt);
});

test('ordinary prose, decimals and incomplete sequences are not interpreted as lists', () => {
  for(const prompt of ['Na Fig. 1, observe o resultado.', 'A versão 1.2 retorna 2.5.', 'Considere o programa.\n\nQual é a saída?', 'Item 2. Texto. Item 4. Outro texto.']) {
    const result=splitQuestionPrompt(prompt);
    assert.deepEqual(result.statements,[]);
    assert.equal(result.text,prompt);
  }
});
