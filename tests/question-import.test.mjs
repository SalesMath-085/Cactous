import assert from 'node:assert/strict';
import test from 'node:test';
import { validateImport, publishQuestions } from '../worker/index.js';
const question = {id:'test-new-01',prompt:'Pergunta?',options:['A','B','C','D','E'],answer:0,explanation:'Porque A.'};
const request = (questions=[question]) => new Request('https://site.test/api/question-sets',{method:'POST',headers:{Origin:'https://site.test','Content-Type':'application/json',Authorization:'Bearer test-token'},body:JSON.stringify({title:'Meu caderno',questions})});
const encoded = data => ({encoding:'base64',content:Buffer.from(JSON.stringify(data)).toString('base64')});
function githubMock({existing=[],conflict=false,user='SalesMath-085'}={}) {
 const calls=[];
 const fetcher=async (url,options) => {
  const path=new URL(url).pathname;
  const body=options.body && JSON.parse(options.body);calls.push({path,method:options.method,body});
  let data;
  if(path==='/user') data={login:user};
  else if(path.endsWith('/git/ref/heads/main'))data={object:{sha:'head-sha'}};
  else if(path.endsWith('/git/commits/head-sha'))data={tree:{sha:'old-tree'}};
  else if(path.endsWith('/contents/public/question-sets/index.json'))data=encoded([{id:'original',title:'Original',file:'original.json'}]);
  else if(path.endsWith('/contents/public/question-sets/original.json'))data=encoded(existing);
  else if(path.endsWith('/git/trees'))data={sha:'new-tree'};
  else if(path.endsWith('/git/commits'))data={sha:'new-commit'};
  else if(path.endsWith('/git/refs/heads/main')) {
   if(conflict)return Response.json({message:'conflict'},{status:422});
   data={object:{sha:'new-commit'}};
  } else throw new Error('Unexpected path: '+path);
  return Response.json(data);
 };
 return {fetcher,calls};
}
test('rejects malformed questions and duplicate IDs before publishing',()=>{
 for(const bad of [[],[question,question],[{...question,answer:5}],[{...question,answer:'A'}],[{...question,options:['A']}],[{...question,explanation:''}]]) assert.throws(()=>validateImport(bad));
 assert.equal(validateImport([question])[0].topic,'Fundamentos');
});
test('publishes file and index in one commit, preserving existing data',async()=>{
 const mock=githubMock();const result=await publishQuestions(request(),mock.fetcher);assert.equal(result.status,201);
 const data=await result.json();assert.equal(data.set.questions.length,1);assert.match(data.commitUrl,/new-commit$/);
 const tree=mock.calls.find(c=>c.path.endsWith('/git/trees')).body;
 assert.equal(tree.base_tree,'old-tree');assert.equal(tree.tree.length,2);
 const index=JSON.parse(tree.tree.find(f=>f.path.endsWith('/index.json')).content);
 assert.equal(index[0].id,'original');assert.equal(index[1].id,data.set.id);
 const commit=mock.calls.find(c=>c.path.endsWith('/git/commits')).body;assert.deepEqual(commit.parents,['head-sha']);
 assert.equal(mock.calls.at(-1).body.force,false);
 for(const call of mock.calls)assert.ok(!JSON.stringify(call.body||{}).includes('test-token'));
});
test('rejects existing IDs without writing and never forces a conflicting branch',async()=>{
 const duplicate=githubMock({existing:[question]});assert.equal((await publishQuestions(request(),duplicate.fetcher)).status,409);assert.ok(duplicate.calls.every(c=>c.method==='GET'));
 const conflict=githubMock({conflict:true});assert.equal((await publishQuestions(request(),conflict.fetcher)).status,409);assert.equal(conflict.calls.at(-1).body.force,false);
});
test('rejects other accounts, cross-origin requests and absent credentials',async()=>{
 const mock=githubMock({user:'another-user'});assert.equal((await publishQuestions(request(),mock.fetcher)).status,403);assert.equal(mock.calls.length,1);
 const req=request();req.headers.set('Origin','https://elsewhere.test');assert.equal((await publishQuestions(req)).status,403);
 const noAuth=request();noAuth.headers.delete('Authorization');assert.equal((await publishQuestions(noAuth)).status,401);
});
