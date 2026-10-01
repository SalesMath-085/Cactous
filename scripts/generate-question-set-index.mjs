import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { validateImport } from '../worker/index.js';

export async function generateIndex(directory = path.resolve('public/question-sets')) {
  const files = (await readdir(directory, {withFileTypes:true}))
    .filter(entry => entry.isFile() && /\.json$/i.test(entry.name) && entry.name !== 'index.json' && !entry.name.startsWith('_'))
    .map(entry => entry.name).sort((a,b) => a.localeCompare(b,'pt-BR'));
  if (!files.length || files.length > 100) throw new Error('A pasta deve conter entre 1 e 100 cadernos.');
  let previous = [];
  try { previous = JSON.parse(await readFile(path.join(directory,'index.json'),'utf8')); }
  catch(error) { if(error.code !== 'ENOENT') throw error; }
  if(!Array.isArray(previous)) throw new Error('Índice de cadernos inválido.');
  const byFile = new Map();
  for(const entry of previous) {
    if(!entry || typeof entry.file !== 'string' || byFile.has(entry.file)) throw new Error('Entrada inválida ou repetida no índice.');
    byFile.set(entry.file,entry);
  }
  const index = files.map(file => {
    const existing = byFile.get(file);
    return {
      id: existing?.id ?? file.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\.json$/i,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),
      title: existing?.title ?? file.replace(/\.json$/i,''), file
    };
  });
  const ids = new Set();
  for(const entry of index) {
    if(typeof entry.id !== 'string' || !entry.id.trim() || entry.id === '__local_questions__' || ids.has(entry.id)
      || typeof entry.title !== 'string' || !entry.title.trim()) throw new Error('Identificador ou título inválido/repetido.');
    ids.add(entry.id);
  }
  const questionIds = new Set();
  for(const {file} of index) {
    const questions = validateImport(JSON.parse(await readFile(path.join(directory,file),'utf8')));
    for(const question of questions) {
      if(questionIds.has(question.id)) throw new Error(`ID repetido entre cadernos: ${question.id}.`);
      questionIds.add(question.id);
    }
  }
  await writeFile(path.join(directory,'index.json'),JSON.stringify(index,null,2)+'\n');
  return index;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const index = await generateIndex();
  console.log(`Índice atualizado com ${index.length} caderno(s).`);
}
