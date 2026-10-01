import { own } from './study-state.js';
import { isCorrectAnswer } from './answer.js';

export function questionSubjects(question) {
  const tags = Array.isArray(question.tags) ? question.tags.filter(tag => typeof tag === 'string').map(tag => tag.trim()).filter(Boolean) : [];
  return [...new Set(tags.length ? tags : [question.topic?.trim() || 'Sem assunto'])];
}

export function subjectStats(questions, progress) {
  const subjects = new Map();
  for (const question of questions) {
    const saved = own(progress, question.id);
    const answered = Number.isInteger(saved?.choice) && saved.choice >= 0 && saved.choice < question.options.length;
    for (const tag of questionSubjects(question)) {
      if (!subjects.has(tag)) subjects.set(tag, { topic:tag, total:0, done:0, correct:0, errors:0 });
      const item = subjects.get(tag);
      item.total++;
      if (answered) { item.done++; isCorrectAnswer(question, saved.choice) ? item.correct++ : item.errors++; }
    }
  }
  return [...subjects.values()].map(item => ({...item, pending:item.total-item.done,
    rate:item.done ? Math.round(item.correct/item.done*100) : 0,
    errorRate:item.done ? Math.round(item.errors/item.done*100) : 0
  })).sort((a,b) => b.errors-a.errors || b.done-a.done || a.topic.localeCompare(b.topic,'pt-BR'));
}
