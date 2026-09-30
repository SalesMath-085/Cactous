import { useMemo, useState } from 'react';
import { validateImport } from '../../worker/index.js';

const example = [{id:'heranca-001',source:'Meu caderno',topic:'Herança',difficulty:'Fácil',prompt:'Qual palavra indica herança entre classes em Java?',options:['extends','implements','new','static','final'],answer:0,explanation:'extends indica que uma classe herda de outra.'}];
const exampleText = JSON.stringify(example,null,2);

export default function ImportQuestions({ onPublished }) {
  const [title,setTitle]=useState('');
  const [text,setText]=useState('');
  const [token,setToken]=useState('');
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState('');
  const [commitUrl,setCommitUrl]=useState('');
  const parsed = useMemo(() => {
    if (!text.trim()) return {questions:[],error:''};
    if (new TextEncoder().encode(text).length > 2 * 1024 * 1024) return {questions:[],error:'O JSON pode ter até 2 MB.'};
    try { return {questions:validateImport(JSON.parse(text)),error:''}; }
    catch(error) { return {questions:[],error:error instanceof SyntaxError ? 'JSON inválido: confira vírgulas, aspas e colchetes.' : error.message}; }
  },[text]);
  const upload=async event=>{
    const file=event.target.files?.[0]; if(!file)return;
    setMessage('');setCommitUrl('');
    if(file.size>2*1024*1024){setMessage('O arquivo pode ter até 2 MB.');event.target.value='';return;}
    try {setText(await file.text());if(!title)setTitle(file.name.replace(/\.json$/i,''));}
    catch {setMessage('Não foi possível ler o arquivo.');}
    event.target.value='';
  };
  const download=()=>{
    const url=URL.createObjectURL(new Blob([exampleText+'\n'],{type:'application/json'}));
    const link=document.createElement('a');link.href=url;link.download='modelo-questoes.json';link.click();URL.revokeObjectURL(url);
  };
  const submit=async event=>{
    event.preventDefault();setMessage('');setCommitUrl('');setBusy(true);
    try {
      const response=await fetch('/api/question-sets',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token.trim()}`},body:JSON.stringify({title,questions:parsed.questions})});
      const result=await response.json();
      if(!response.ok)throw new Error(result.error||'Não foi possível enviar o caderno.');
      onPublished(result.set);setCommitUrl(result.commitUrl);setMessage(`${result.set.questions.length} questões publicadas! O caderno já está disponível em Estudar.`);setText('');setTitle('');
    }catch(error){setMessage(error.message||'Falha de conexão. Tente novamente.');}
    finally {setToken('');setBusy(false);}
  };
  return <section className="json-import">
    <h2>Importar um caderno JSON</h2>
    <p>Envie um arquivo ou cole a lista de questões. A publicação cria um novo caderno no repositório <a href="https://github.com/SalesMath-085/Cactous" target="_blank" rel="noreferrer">Cactous</a>.</p>
    <form className="question-form" onSubmit={submit}>
      <label>Nome do caderno<input required maxLength={100} value={title} onChange={e=>setTitle(e.target.value)} disabled={busy} placeholder="Ex.: Revisão de herança"/></label>
      <div className="import-tools"><label className="secondary upload-json">Escolher arquivo .json<input type="file" accept=".json,application/json" disabled={busy} onChange={upload}/></label><button type="button" className="secondary" onClick={download}>Baixar modelo</button></div>
      <label>JSON das questões<textarea rows={10} className="code-input" value={text} onChange={e=>{setText(e.target.value);setMessage('');setCommitUrl('');}} disabled={busy} placeholder={exampleText} required/></label>
      <p className={parsed.error ? 'import-error' : 'import-validation'} role="status">{parsed.error || (parsed.questions.length ? `${parsed.questions.length} questões válidas. answer: 0 = A, 1 = B, 2 = C, 3 = D, 4 = E.` : 'Use uma lista [ ... ] com cinco alternativas por questão e IDs únicos.')}</p>
      <label>Token do GitHub<input type="password" autoComplete="off" value={token} onChange={e=>setToken(e.target.value)} disabled={busy} required placeholder="Token da conta SalesMath-085"/></label>
      <p className="import-help">Crie um <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noreferrer">token com acesso apenas ao Cactous</a> e permissão <strong>Contents: Read and write</strong>. O token é usado neste envio e não fica salvo no navegador.</p>
      <button className="primary" disabled={busy || !!parsed.error || !parsed.questions.length || !title.trim() || !token.trim()}>{busy?'Publicando…':'Publicar JSON no GitHub'}</button>
      {message && <p role="status" className="import-result">{message} {commitUrl && <a href={commitUrl} target="_blank" rel="noreferrer">Ver commit</a>}</p>}
    </form>
    <details><summary>Ver formato esperado</summary><pre>{exampleText}</pre></details>
  </section>;
}
