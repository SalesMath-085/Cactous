export function sanitizeBookmarks(saved) {
  return Array.isArray(saved) ? [...new Set(saved.filter(id => typeof id === 'string' && /^[\w-]{1,120}$/.test(id)))] : [];
}

export function toggleBookmark(ids, id) {
  return ids.includes(id) ? ids.filter(value => value !== id) : [...ids, id];
}

export function markedQuestions(questions, ids) {
  const selected = new Set(ids);
  return questions.filter(question => selected.has(question.id));
}

export function sessionAfterUnmark(questions, session, removedId) {
  if (session.questionId !== removedId) return session;
  const index = questions.findIndex(question => question.id === removedId);
  const next = questions[index + 1] || questions[index - 1];
  return { questionId:next?.id || '' };
}
