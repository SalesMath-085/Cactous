export function isCorrectAnswer(question, choice) {
  return question.options[choice] === question.options[question.answer];
}

export function correctLetters(question) {
  return question.options.flatMap((option, index) => option === question.options[question.answer] ? [String.fromCharCode(65 + index)] : []).join(" e ");
}
