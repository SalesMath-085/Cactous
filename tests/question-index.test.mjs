import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {generateIndex} from '../scripts/generate-question-set-index.mjs';

test('index automation preserves imported notebook names and rejects duplicate question IDs',async()=>{
  const dir=await mkdtemp(path.join(tmpdir(),'cactous-index-'));
  try {
    const entry={id:'stable-id',title:'Revisão de herança',file:'import-uuid.json'};
    const question={id:'unique',prompt:'Pergunta?',options:['A','B','C','D','E'],answer:0,explanation:'A.'};
    await writeFile(path.join(dir,entry.file),JSON.stringify([question]));
    await writeFile(path.join(dir,'index.json'),JSON.stringify([entry]));
    assert.deepEqual(await generateIndex(dir),[entry]);
    await writeFile(path.join(dir,'second.json'),JSON.stringify([question]));
    await assert.rejects(generateIndex(dir),/ID repetido/);
    assert.deepEqual(JSON.parse(await readFile(path.join(dir,'index.json'),'utf8')),[entry]);
  } finally {await rm(dir,{recursive:true,force:true});}
});
