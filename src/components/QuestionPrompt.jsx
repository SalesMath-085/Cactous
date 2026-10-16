import { splitQuestionPrompt } from '../data/question-prompt.js';

export default function QuestionPrompt({ text }) {
  const { introduction, statements, instruction } = splitQuestionPrompt(text);
  if (!statements.length) return <h2 className="question-prompt-plain">{text}</h2>;

  return <div className="question-prompt">
    {introduction && <h2>{introduction}</h2>}
    <ol className="question-statements" role="list" aria-label="Afirmações da questão">
      {statements.map(statement => <li key={statement.label}>
        <span className="statement-label">{statement.label}</span>
        <span className="statement-text">{statement.text}</span>
      </li>)}
    </ol>
    {instruction && <p className="question-instruction">{instruction}</p>}
  </div>;
}
