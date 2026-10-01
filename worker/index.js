const REPO = 'SalesMath-085/Cactous';
const ROOT = 'public/question-sets/';
const MAX_BYTES = 2 * 1024 * 1024;

export function validateImport(data) {
  if (!Array.isArray(data) || !data.length || data.length > 1000) throw new Error('Envie uma lista com 1 a 1000 questões.');
  const ids = new Set();
  return data.map((q, i) => {
    const label = `Questão ${i + 1}`;
    if (!q || typeof q.id !== 'string' || !/^[\w-]{1,120}$/.test(q.id)) throw new Error(`${label}: id inválido; use letras, números, hífen ou sublinhado.`);
    if (ids.has(q.id)) throw new Error(`${label}: id repetido (${q.id}).`);
    ids.add(q.id);
    if (typeof q.prompt !== 'string' || !q.prompt.trim()) throw new Error(`${label}: enunciado vazio.`);
    if (!Array.isArray(q.options) || q.options.length !== 5 || q.options.some(x => typeof x !== 'string' || !x.trim())) throw new Error(`${label}: preencha cinco alternativas.`);
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 4) throw new Error(`${label}: answer deve ser um número de 0 a 4 (A a E).`);
    if (typeof q.explanation !== 'string' || !q.explanation.trim()) throw new Error(`${label}: explicação vazia.`);
    for (const key of ['source', 'topic', 'difficulty', 'code', 'wrong', 'context', 'note', 'block']) if (q[key] !== undefined && typeof q[key] !== 'string') throw new Error(`${label}: ${key} deve ser texto.`);
    if (q.references !== undefined && (!Array.isArray(q.references) || q.references.some(ref => {
      if (!ref || typeof ref.file !== 'string' || !['string','number'].includes(typeof ref.question) || typeof ref.url !== 'string') return true;
      try { return !['https:','http:'].includes(new URL(ref.url).protocol); } catch { return true; }
    }))) throw new Error(`${label}: referências inválidas.`);
    const extras = Object.fromEntries(['code','wrong','context','note','block','references'].filter(key => q[key] !== undefined).map(key => [key,q[key]]));
    return { id: q.id, prompt: q.prompt.trim(), options: q.options.map(x => x.trim()), answer: q.answer, explanation: q.explanation.trim(), source: q.source?.trim() || 'Questões importadas', topic: q.topic?.trim() || 'Fundamentos', difficulty: q.difficulty?.trim() || 'Médio', ...extras };
  });
}

const json = (body, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function publishQuestions(request, fetcher = fetch) {
  if (request.method !== 'POST') return json({error:'Método não permitido.'},405);
  if (request.headers.get('Origin') !== new URL(request.url).origin) return json({error:'Origem não permitida.'},403);
  if (!request.headers.get('Content-Type')?.includes('application/json')) return json({error:'Envie um JSON.'},415);
  const token = request.headers.get('Authorization')?.match(/^Bearer ([^\s]+)$/i)?.[1] || '';
  if (!token || token.length > 500 || /\s/.test(token)) return json({error:'Informe um token válido do GitHub.'},401);
  const reader = request.body?.getReader();
  const chunks = []; let size = 0;
  if (reader) {
    while (true) {
      const {value, done} = await reader.read(); if (done) break;
      size += value.length;
      if (size > MAX_BYTES) { await reader.cancel(); return json({error:'O JSON pode ter até 2 MB.'},413); }
      chunks.push(value);
    }
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  const raw = new TextDecoder().decode(bytes);
  let body, questions;
  try { body = JSON.parse(raw); questions = validateImport(body?.questions); } catch (error) { return json({error:error instanceof SyntaxError ? 'JSON inválido.' : error.message},400); }
  if (typeof body.title !== 'string' || !body.title.trim() || body.title.length > 100) return json({error:'Informe um nome de caderno com até 100 caracteres.'},400);
  const title = body.title.trim();
  const api = async (path, method = 'GET', payload) => {
    const response = await fetcher(`https://api.github.com${path}`, { method, headers: { Authorization:`Bearer ${token}`, Accept:'application/vnd.github+json', 'X-GitHub-Api-Version':'2022-11-28', 'User-Agent':'Cactous', ...(payload ? {'Content-Type':'application/json'} : {}) }, ...(payload ? {body:JSON.stringify(payload)} : {}) });
    if (!response.ok) {
      const error = new Error(response.status === 401 ? 'Token inválido ou expirado.' : response.status === 403 || response.status === 404 ? 'O token precisa de acesso ao repositório Cactous e permissão Contents: Read and write.' : response.status === 422 || response.status === 409 ? 'O repositório mudou durante o envio ou a branch está protegida. Confira o GitHub e tente novamente.' : 'O GitHub não concluiu o envio. Tente novamente.');
      error.status = response.status === 422 || response.status === 409 ? 409 : response.status === 401 ? 401 : response.status === 403 || response.status === 404 ? 403 : 502;
      throw error;
    }
    return response.json();
  };
  const read = async (file, sha) => {
    if (typeof file !== 'string' || file.startsWith('/') || file.split('/').some(x => !x || x === '.' || x === '..')) throw new Error('O índice de cadernos possui um caminho inválido.');
    let data = await api(`/repos/${REPO}/contents/${ROOT}${file.split('/').map(encodeURIComponent).join('/')}?ref=${sha}`);
    // Contents omits base64 for files above 1 MB; the blob API still returns it.
    if (data.encoding === 'none' && /^[a-f0-9]{40,64}$/i.test(data.sha || '')) data = await api(`/repos/${REPO}/git/blobs/${data.sha}`);
    if (data.encoding !== 'base64' || !data.content) throw new Error('Não foi possível ler um caderno do repositório.');
    const bytes = Uint8Array.from(atob(data.content.replace(/\s/g,'')), x => x.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  };
  try {
    const user = await api('/user');
    if (user.login?.toLowerCase() !== 'salesmath-085') return json({error:'Somente a conta SalesMath-085 pode publicar questões neste site.'},403);
    const ref = await api(`/repos/${REPO}/git/ref/heads/main`);
    const head = ref.object.sha;
    const [commit, index] = await Promise.all([api(`/repos/${REPO}/git/commits/${head}`), read('index.json',head)]);
    if (!Array.isArray(index) || index.some(entry => !entry || typeof entry.file !== 'string')) throw new Error('Índice de cadernos inválido.');
    if (index.length >= 100) return json({error:'O limite de 100 cadernos foi atingido.'},400);
    const existingSets = await Promise.all(index.map(entry => read(entry.file,head)));
    const existingIds = new Set(existingSets.flatMap(set => { if (!Array.isArray(set)) throw new Error('Caderno existente inválido.'); return set.map(q=>q.id); }));
    const duplicate = questions.find(q=>existingIds.has(q.id));
    if (duplicate) return json({error:`O id ${duplicate.id} já existe no GitHub. Use IDs novos para este caderno.`},409);
    const id = `import-${crypto.randomUUID()}`;
    const file = `${id}.json`;
    const entry = {id,title,file};
    const tree = await api(`/repos/${REPO}/git/trees`,'POST',{base_tree:commit.tree.sha,tree:[{path:ROOT+file,mode:'100644',type:'blob',content:JSON.stringify(questions,null,2)+'\n'},{path:ROOT+'index.json',mode:'100644',type:'blob',content:JSON.stringify([...index,entry],null,2)+'\n'}]});
    const created = await api(`/repos/${REPO}/git/commits`,'POST',{message:`Adicionar caderno: ${title}`,tree:tree.sha,parents:[head]});
    await api(`/repos/${REPO}/git/refs/heads/main`,'PATCH',{sha:created.sha,force:false});
    return json({set:{...entry,questions},commitUrl:`https://github.com/${REPO}/commit/${created.sha}`},201);
  } catch (error) { return json({error:error.status ? error.message : 'Não foi possível publicar. Confira o índice de cadernos no GitHub e tente novamente.'},error.status || 502); }
}

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname === '/api/question-sets') return publishQuestions(request);
    if (new URL(request.url).pathname.startsWith('/api/')) return json({error:'Rota não encontrada.'},404);
    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get('accept')?.includes('text/html');
    if (response.status !== 404 || !acceptsHtml || !['GET','HEAD'].includes(request.method)) return response;
    const indexUrl = new URL(request.url); indexUrl.pathname='/index.html'; indexUrl.search='';
    return env.ASSETS.fetch(new Request(indexUrl,request));
  },
};
