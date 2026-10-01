import { validateImport } from '../../worker/index.js';
import { enrichQuestion } from './audit.js';
import { LOCAL_SET_ID } from './study-state.js';

const ROOT = 'https://raw.githubusercontent.com/SalesMath-085/Cactous/main/public/question-sets';
export function validateIndex(index) {
  if (!Array.isArray(index) || !index.length || index.length > 100) throw new Error('Índice de cadernos inválido.');
  const ids = new Set(), files = new Set();
  for (const entry of index) {
    if (!entry || typeof entry.id !== 'string' || !entry.id.trim() || entry.id === LOCAL_SET_ID || ids.has(entry.id)
      || typeof entry.title !== 'string' || !entry.title.trim() || typeof entry.file !== 'string'
      || !entry.file.endsWith('.json') || entry.file.includes('\\')
      || entry.file.split('/').some(part => !part || part === '.' || part === '..') || files.has(entry.file)) {
      throw new Error('Entrada inválida ou repetida no índice de cadernos.');
    }
    ids.add(entry.id); files.add(entry.file);
  }
  return index;
}

export async function fetchQuestionSets(signal, fetcher = fetch) {
  const stamp = Date.now();
  const get = async file => {
    const response = await fetcher(`${ROOT}/${file.split('/').map(encodeURIComponent).join('/')}?updated=${stamp}`, { cache:'no-store', signal });
    if (!response.ok) throw new Error(`Falha ao carregar ${file}.`);
    return response.json();
  };
  const index = validateIndex(await get('index.json'));
  const results = await Promise.allSettled(index.map(async entry => ({...entry, questions:validateImport(await get(entry.file)).map(enrichQuestion)})));
  if (signal?.aborted) throw new DOMException('Carregamento cancelado.', 'AbortError');
  const sets = [], failed = [], ids = new Set();
  results.forEach((result, i) => {
    if (result.status === 'rejected' || result.value.questions.some(q => ids.has(q.id))) { failed.push(index[i].title); return; }
    sets.push(result.value); result.value.questions.forEach(q => ids.add(q.id));
  });
  if (!sets.length) throw new Error('Nenhum caderno pôde ser carregado.');
  return { sets, failed };
}

export function mergePublishedSets(loaded, published) {
  const ids = new Set(published.map(set => set.id));
  return [...loaded.filter(set => !ids.has(set.id)), ...published];
}
