import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const directory = path.resolve('public/question-sets');
const files = (await readdir(directory, { withFileTypes: true }))
  .filter(entry => entry.isFile() && entry.name.endsWith('.json') && entry.name !== 'index.json' && !entry.name.startsWith('_'))
  .map(entry => entry.name)
  .sort((a, b) => a.localeCompare(b, 'pt-BR'));

if (!files.length) throw new Error('A pasta public/question-sets precisa conter pelo menos um arquivo JSON.');

const index = files.map(file => ({
  id: file.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\.json$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  title: file.replace(/\.json$/i, ''),
  file,
}));

const ids = new Set(index.map(item => item.id));
if (ids.size !== index.length) throw new Error('Dois arquivos geraram o mesmo identificador. Renomeie um dos cadernos.');

const questionIds = new Set();
for (const file of files) {
  const questions = JSON.parse(await readFile(path.join(directory, file), 'utf8'));
  if (!Array.isArray(questions) || !questions.length) throw new Error(`${file} precisa conter pelo menos uma questão.`);
  questions.forEach((question, position) => {
    if (!question?.id || !question?.prompt || !Array.isArray(question.options) || question.options.length < 2) {
      throw new Error(`${file}: questão inválida na posição ${position + 1}.`);
    }
    if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) {
      throw new Error(`${file}: gabarito inválido na questão ${question.id}.`);
    }
    if (questionIds.has(question.id)) throw new Error(`ID repetido entre os cadernos: ${question.id}.`);
    questionIds.add(question.id);
  });
}

await writeFile(path.join(directory, 'index.json'), `${JSON.stringify(index, null, 2)}\n`);
console.log(`Índice atualizado com ${index.length} caderno(s) e ${questionIds.size} questão(ões).`);
