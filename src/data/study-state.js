import { isCorrectAnswer } from './answer.js';

export const DEFAULT_SET_ID = 'sessao-de-estudos';
export const LOCAL_SET_ID = '__local_questions__';
const record = value => value && typeof value === 'object' && !Array.isArray(value);
export const own = (value, key) => record(value) && Object.hasOwn(value, key) ? value[key] : undefined;

export function readStored(key, fallback, storage) {
  try { return JSON.parse((storage ?? globalThis.localStorage).getItem(key)) ?? fallback; }
  catch { return fallback; }
}

export function writeStored(key, value, storage) {
  try { (storage ?? globalThis.localStorage).setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}

export function sanitizeProgress(saved) {
  return Object.fromEntries(Object.entries(record(saved) ? saved : {}).filter(([, entry]) =>
    record(entry) && Number.isInteger(entry.choice) && entry.choice >= 0 && entry.choice < 5
  ).map(([id, entry]) => [id, { choice: entry.choice, correct: entry.correct === true,
    ...(Number.isFinite(entry.answeredAt) ? { answeredAt: entry.answeredAt } : {}) }]));
}

export function reconcileProgress(saved, questions) {
  const result = Object.create(null);
  for (const question of questions) {
    const entry = own(saved, question.id);
    if (entry && Number.isInteger(entry.choice) && entry.choice >= 0 && entry.choice < question.options.length) {
      result[question.id] = { ...entry, correct: isCorrectAnswer(question, entry.choice) };
    }
  }
  return result;
}

export function loadStudyState(storage) {
  const saved = readStored('cactous-study-state-v2', null, storage);
  const sessions = {};
  if (record(saved) && record(saved.sessions)) {
    for (const [id, session] of Object.entries(saved.sessions)) {
      if (record(session) && typeof session.questionId === 'string') {
        Object.defineProperty(sessions, id, {value:{questionId:session.questionId}, enumerable:true, configurable:true, writable:true});
      }
    }
    return { activeSetId: typeof saved.activeSetId === 'string' ? saved.activeSetId : DEFAULT_SET_ID, sessions };
  }
  const legacy = readStored('poo-em-foco-study-session', null, storage);
  return { activeSetId: DEFAULT_SET_ID, sessions: typeof legacy?.questionId === 'string'
    ? { [DEFAULT_SET_ID]: { questionId: legacy.questionId } } : {} };
}

export function quizPosition(pool, session, progress, reviewing = false) {
  const found = pool.findIndex(q => q.id === session?.questionId);
  const index = found >= 0 ? found : 0;
  const question = pool[index];
  const choice = reviewing ? own(session?.answers, question?.id) : own(progress, question?.id)?.choice;
  const selected = Number.isInteger(choice) && choice >= 0 && choice < (question?.options.length ?? 0) ? choice : null;
  const answered = pool.filter(q => reviewing ? Number.isInteger(own(session?.answers, q.id)) : !!own(progress, q.id)).length;
  return { index, question, selected, percent: pool.length ? Math.round(answered / pool.length * 100) : 0 };
}
