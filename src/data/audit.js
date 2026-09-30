import { questions } from "./questions";

const audited = new Map(questions.map(question => [question.id, question]));
export function enrichQuestion(question) {
  const original = audited.get(question.id);
  if (!original) return question;
  const enriched = { ...original, ...question, references: original.references, context: original.context, note: original.note };
  if (question.id === "pdf-s2poo-06" && question.code === original.code?.replaceAll('"X"', '"x"').replaceAll('"Y"', '"y"').replaceAll('"Z"', '"z"')) enriched.code = original.code;
  if (question.id === "pdf-maria-10" && JSON.stringify(question.options) === JSON.stringify(original.options)) enriched.explanation = original.explanation;
  return enriched;
}
