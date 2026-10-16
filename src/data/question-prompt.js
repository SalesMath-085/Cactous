const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const INSTRUCTION = /(?<=[.!?])\s+(?=(?:Assinale|Marque|Indique|Com base|A partir da análise|Está correto|Estão corretas|É correto|São corretas|A sequência|Qual alternativa|Qual é a alternativa)\b)/u;

// Recognize a complete sequence, so ordinary numbers inside prose remain text.
export function splitQuestionPrompt(prompt) {
  const text = prompt.replace(/\r\n?/g, '\n').trim();
  const markers = [...text.matchAll(/(?:^|\s)((\d{1,2}|[IVX]+)(?:[.)]|\s*[-–—]))\s+/g)];
  if (markers.length < 2 || markers.some((match, i) => {
    const number = /^\d+$/.test(match[2]) ? Number(match[2]) : ROMAN.indexOf(match[2]) + 1;
    return number !== i + 1 || /^\d+$/.test(match[2]) !== /^\d+$/.test(markers[0][2]);
  })) return { text, statements: [] };

  const statements = markers.map((match, i) => ({
    label: match[1].trim(),
    text: text.slice(match.index + match[0].length, markers[i + 1]?.index ?? text.length).trim(),
  }));
  const last = statements.at(-1);
  const ending = INSTRUCTION.exec(last.text);
  let instruction = '';
  if (ending) {
    instruction = last.text.slice(ending.index).trim();
    last.text = last.text.slice(0, ending.index).trim();
  }
  return { text, introduction: text.slice(0, markers[0].index).trim(), statements, instruction };
}
