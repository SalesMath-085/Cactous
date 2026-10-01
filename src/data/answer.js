export function isCorrectAnswer(question, choice) {
  return Number.isInteger(choice) && choice >= 0 && choice < question.options.length
    && question.options[choice] === question.options[question.answer];
}

export function correctLetters(question) {
  return question.options.flatMap((option, index) => option === question.options[question.answer] ? [String.fromCharCode(65 + index)] : []).join(" e ");
}
