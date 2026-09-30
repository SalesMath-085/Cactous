import { useEffect, useMemo, useState } from 'react';
import { questions as baseQuestions } from './data/questions';
import { enrichQuestion } from './data/audit';
import { isCorrectAnswer, correctLetters } from './data/answer';
import ImportQuestions from './components/ImportQuestions';

const QUESTIONS_ROOT_URL = 'https://raw.githubusercontent.com/SalesMath-085/Cactous/main/public/question-sets';
const QUESTIONS_INDEX_URL = `${QUESTIONS_ROOT_URL}/index.json`;
const LOCAL_SET_ID = '__local_questions__';

function validateQuestions(data) {
  if (!Array.isArray(data) || !data.length) throw new Error('O JSON não contém questões.');
  const ids = new Set();
  data.forEach((question, index) => {
    if (!question?.id || !question?.prompt || !Array.isArray(question.options) || question.options.length < 2) {
      throw new Error(`Questão inválida na posição ${index + 1}.`);
    }
    if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) {
      throw new Error(`Gabarito inválido na questão ${question.id}.`);
    }
    if (ids.has(question.id)) throw new Error(`ID repetido: ${question.id}.`);
    ids.add(question.id);
  });
  return data;
}

async function fetchQuestionSets(signal) {
  const stamp = Date.now();
  const indexResponse = await fetch(`${QUESTIONS_INDEX_URL}?updated=${stamp}`, { cache: 'no-store', signal });
  if (!indexResponse.ok) throw new Error(`Índice de cadernos respondeu ${indexResponse.status}.`);
  const index = await indexResponse.json();
  if (!Array.isArray(index) || !index.length) throw new Error('Nenhum caderno foi encontrado.');

  const sets = await Promise.all(index.map(async entry => {
    if (!entry?.id || !entry?.title || !entry?.file) throw new Error('Entrada inválida no índice de cadernos.');
    const encodedFile = entry.file.split('/').map(encodeURIComponent).join('/');
    const response = await fetch(`${QUESTIONS_ROOT_URL}/${encodedFile}?updated=${stamp}`, { cache: 'no-store', signal });
    if (!response.ok) throw new Error(`O caderno ${entry.title} respondeu ${response.status}.`);
    return { ...entry, questions: validateQuestions(await response.json()).map(enrichQuestion) };
  }));

  const questionIds = new Set();
  sets.forEach(set => set.questions.forEach(question => {
    if (questionIds.has(question.id)) throw new Error(`ID repetido entre cadernos: ${question.id}.`);
    questionIds.add(question.id);
  }));
  return sets;
}

const Icon = ({ name, size = 21 }) => {
  const paths = {
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z"/></>,
    alert: <><path d="M10.3 3.7 2.2 18a2 2 0 0 0 1.8 3h16a2 2 0 0 0 1.8-3L13.7 3.7a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></>,
    chart: <><path d="M4 20V10h4v10"/><path d="M10 20V4h4v16"/><path d="M16 20v-7h4v7"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5"/>,
    rotate: <><path d="M20 6v5h-5"/><path d="M19 11a8 8 0 1 0-2 7"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    spark: <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2z"/><path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7z"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

const NAV = [
  { id: 'study', label: 'Estudar', icon: 'book' },
  { id: 'review', label: 'Revisar erros', icon: 'alert' },
  { id: 'stats', label: 'Desempenho', icon: 'chart' },
  { id: 'add', label: 'Adicionar questões', icon: 'plus' }
];

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem('poo-em-foco-progress')) || {};
    const question = baseQuestions.find(q => q.id === 'pdf-maria-10');
    if (saved[question.id]) saved[question.id].correct = isCorrectAnswer(question, saved[question.id].choice);
    return saved;
  }
  catch { return {}; }
}
function loadCustomQuestions() {
  try {
    const saved = JSON.parse(localStorage.getItem('poo-em-foco-questions'));
    return Array.isArray(saved) ? saved.filter(q => q && typeof q.id === 'string' && Array.isArray(q.options) && q.options.length === 5) : [];
  } catch { return []; }
}
function loadStudySession() {
  try {
    const saved = JSON.parse(localStorage.getItem('poo-em-foco-study-session'));
    if (saved && typeof saved.questionId === 'string' && (saved.selected === null || Number.isInteger(saved.selected) && saved.selected >= 0 && saved.selected < 5)) return saved;
  } catch { /* Start at the first question if saved data is unavailable. */ }
  return { questionId: baseQuestions[0].id, selected: null };
}

function Sidebar({ view, setView, total }) {
  return <aside className="sidebar">
    <div className="brand" aria-label="Cactous"><span className="brand-full" aria-hidden="true">Cactous</span><span className="brand-short" aria-hidden="true">Ct</span></div>
    <nav>{NAV.map(item => <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => setView(item.id)}><Icon name={item.icon}/><span>{item.label}</span></button>)}</nav>
    <div className="sidebar-foot"><span>{total}</span> questões para estudar</div>
  </aside>;
}

function MobileNav({ view, setView }) {
  return <nav className="mobile-nav">{NAV.map(item => <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => setView(item.id)}><Icon name={item.icon} size={19}/><span>{item.label}</span></button>)}</nav>;
}

function Header({ title, subtitle, progress }) {
  return <header className="topbar">
    <div className="mobile-brand"><span>Cactous</span></div>
    <div><h1>{title}</h1><p>{subtitle}</p></div>
    {progress && <div className="header-progress"><div><span>Questão {progress.current} de {progress.total}</span><strong>{progress.percent}%</strong></div><div className="bar"><i style={{width: `${progress.percent}%`}}/></div></div>}
  </header>;
}

function QuestionSetTabs({ sets, activeId, onSelect }) {
  return <nav className="question-set-tabs" aria-label="Cadernos de questões" role="tablist">
    {sets.map(set => <button key={set.id} type="button" role="tab" aria-selected={set.id === activeId} className={set.id === activeId ? 'active' : ''} onClick={() => onSelect(set.id)}>
      <strong>{set.title}</strong><span>{set.questions.length} questões</span>
    </button>)}
  </nav>;
}

function Quiz({ questions, progress, setProgress, setView, filterIds, session, setSession, questionSets, activeSetId, onSelectSet, title }) {
  const pool = filterIds ? questions.filter(q => filterIds.includes(q.id)) : questions;
  const foundIndex = pool.findIndex(q => q.id === session.questionId);
  const index = foundIndex >= 0 ? foundIndex : 0;
  const question = pool[index];
  const selected = foundIndex >= 0 ? session.selected : null;
  const revealed = selected !== null;

  const answer = (choice) => {
    if (revealed) return;
    const correct = isCorrectAnswer(question, choice);
    setSession({ questionId: question.id, selected: choice });
    setProgress(prev => ({ ...prev, [question.id]: { choice, correct, answeredAt: Date.now() } }));
  };

  const next = () => {
    if (index < pool.length - 1) {
      const nextQuestion = pool[index + 1];
      setSession({ questionId: nextQuestion.id, selected: progress[nextQuestion.id]?.choice ?? null });
    }
    else setView('stats');
  };

  const previous = () => {
    if (index === 0) return;
    const previousQuestion = pool[index - 1];
    setSession({ questionId: previousQuestion.id, selected: progress[previousQuestion.id]?.choice ?? null });
  };

  if (!pool.length) return <EmptyReview setView={setView}/>;
  const answeredEntries = questions.filter(q => progress[q.id]).map(q => progress[q.id]);
  const answered = answeredEntries.length;
  const correct = answeredEntries.filter(v => v.correct).length;
  const percent = Math.round(((index + (revealed ? 1 : 0)) / pool.length) * 100);

  return <>
    <Header title={filterIds ? 'Revisão de erros' : title} subtitle={question.topic} progress={{current:index + 1,total:pool.length,percent}}/>
    {!filterIds && <QuestionSetTabs sets={questionSets} activeId={activeSetId} onSelect={onSelectSet}/>}
    <div className="quiz-layout">
      <main className="quiz-main">
        <section className="question-block">
          <div className="question-number">{String(index + 1).padStart(2, '0')}</div>
          <div className="question-content">
            <div className="question-meta"><span>{question.difficulty}</span><span>{question.block || question.source}</span></div>
            <h2>{question.prompt}</h2>
            {question.context && <p>{question.context}</p>}
            {question.note && <p className="source-note">{question.note}</p>}
            {question.references?.length > 0 && <p className="source-note">No PDF: {question.references.map((ref, index) => <span key={ref.url}>{index > 0 && " · "}<a href={ref.url} target="_blank" rel="noreferrer">{ref.file} · questão {ref.question}</a></span>)}</p>}
            {question.code && <pre><code>{question.code}</code></pre>}
            <div className="options" role="radiogroup" aria-label="Alternativas">
              {question.options.map((option, i) => {
                const state = revealed ? (isCorrectAnswer(question, i) ? 'correct' : i === selected ? 'wrong' : '') : selected === i ? 'selected' : '';
                return <button key={option + i} className={state} onClick={() => answer(i)} aria-checked={selected === i} role="radio" disabled={revealed}>
                  <span className="letter">{String.fromCharCode(65 + i)}</span><span>{option}</span>
                  {state === 'correct' && <Icon name="check"/>}{state === 'wrong' && <Icon name="close"/>}
                </button>;
              })}
            </div>
          </div>
        </section>
        {revealed && <section className={`explanation ${isCorrectAnswer(question, selected) ? 'success' : 'error'}`} aria-live="polite">
          <div className="explanation-title"><Icon name={isCorrectAnswer(question, selected) ? 'check' : 'book'}/><h3>{isCorrectAnswer(question, selected) ? 'Resposta certa!' : 'Entenda a resposta'}</h3></div>
          <p><strong>{correctLetters(question).includes(" e ") ? "As alternativas corretas são " : "A alternativa correta é "}{correctLetters(question)}.</strong> {question.explanation}</p>
          {!isCorrectAnswer(question, selected) && question.wrong && <p><strong>Por que sua escolha não funciona?</strong> {question.wrong}</p>}
        </section>}
        <div className="quiz-actions">
          {!revealed && <span>Escolha uma alternativa para conferir.</span>}
          <div className="quiz-action-buttons">
            <button className="secondary" disabled={index === 0} onClick={previous}>Questão anterior</button>
            <button className="primary" disabled={!revealed} onClick={next}>{index === pool.length - 1 ? 'Ver desempenho' : 'Próxima questão'}<Icon name="arrow"/></button>
          </div>
        </div>
      </main>
      <aside className="session-summary">
        <h3>Resumo da sessão</h3>
        <div className="ring" style={{'--score': `${answered ? Math.round((correct / answered) * 100) : 0}%`}}><span>{answered ? Math.round((correct / answered) * 100) : 0}%<small>aproveitamento</small></span></div>
        <div className="summary-row"><i className="dot green"/><span>Acertos</span><strong>{correct}</strong></div>
        <div className="summary-row"><i className="dot red"/><span>Erros</span><strong>{answered - correct}</strong></div>
        <div className="summary-row"><i className="dot gray"/><span>A fazer</span><strong>{questions.length - answered}</strong></div>
        <hr/><p>Tópico atual<strong>{question.topic}</strong></p>
      </aside>
    </div>
  </>;
}

function EmptyReview({ setView }) {
  return <div className="empty-state"><div><Icon name="spark" size={34}/></div><h2>Nenhum erro para revisar</h2><p>Quando você errar uma questão, ela aparece aqui com a explicação pronta para uma nova tentativa.</p><button className="primary" onClick={() => setView('study')}>Começar a estudar<Icon name="arrow"/></button></div>;
}

function Stats({ questions, progress, reset }) {
  const entries = questions.filter(q => progress[q.id]).map(q => progress[q.id]), answered = entries.length, correct = entries.filter(x => x.correct).length;
  const rate = answered ? Math.round(correct / answered * 100) : 0;
  const byTopic = useMemo(() => {
    return [...new Set(questions.map(q => q.topic))].map(topic => {
      const qs = questions.filter(q => q.topic === topic), done = qs.filter(q => progress[q.id]);
      const hits = done.filter(q => progress[q.id]?.correct).length;
      return { topic, done: done.length, total: qs.length, rate: done.length ? Math.round(hits / done.length * 100) : 0 };
    }).sort((a,b) => b.done - a.done);
  }, [progress, questions]);
  return <><Header title="Seu desempenho" subtitle="Um retrato claro do que já está dominado"/>
    <main className="page-content">
      <section className="stats-hero"><div><span>APROVEITAMENTO GERAL</span><strong>{rate}%</strong><p>{answered} de {questions.length} questões respondidas</p></div><div className="big-ring" style={{'--score': `${rate}%`}}><Icon name="chart" size={36}/></div></section>
      <div className="stat-strip"><div><strong>{correct}</strong><span>acertos</span></div><div><strong>{answered - correct}</strong><span>erros</span></div><div><strong>{questions.length - answered}</strong><span>pendentes</span></div></div>
      <section className="topic-section"><div className="section-heading"><div><h2>Desempenho por tópico</h2><p>Priorize os assuntos com menor aproveitamento.</p></div><button className="secondary" onClick={reset}><Icon name="rotate"/>Recomeçar</button></div>
        <div className="topic-list">{byTopic.map(t => <div className="topic-row" key={t.topic}><div><strong>{t.topic}</strong><span>{t.done} de {t.total} respondidas</span></div><div className="topic-bar"><i style={{width:`${t.rate}%`}}/></div><b>{t.done ? `${t.rate}%` : '—'}</b></div>)}</div>
      </section>
    </main>
  </>;
}

const blankForm = () => ({ topic: '', difficulty: 'Médio', prompt: '', code: '', options: ['', '', '', '', ''], answer: 0, explanation: '', wrong: '' });

function AddQuestions({ customQuestions, onAdd, onDelete, setView, onPublished }) {
  const [form, setForm] = useState(blankForm);
  const [saved, setSaved] = useState(false);
  const update = (key, value) => { setForm(current => ({ ...current, [key]: value })); setSaved(false); };
  const submit = (event) => {
    event.preventDefault();
    onAdd({
      id: `user-${crypto.randomUUID()}`, source: 'Questão adicionada',
      topic: form.topic.trim(), difficulty: form.difficulty,
      prompt: form.prompt.trim(), code: form.code.trim(),
      options: form.options.map(option => option.trim()), answer: Number(form.answer),
      explanation: form.explanation.trim(), wrong: form.wrong.trim()
    });
    setForm(blankForm()); setSaved(true);
  };
  return <><Header title="Adicionar questões" subtitle="Monte suas próprias perguntas de POO"/>
    <main className="page-content add-page">
      <ImportQuestions onPublished={onPublished}/>
      <h2>Adicionar uma questão neste navegador</h2>
      <p className="local-note">As questões que você adicionar ficam salvas neste navegador.</p>
      <form className="question-form" onSubmit={submit}>
        <div className="form-grid">
          <label>Assunto<input required maxLength="80" value={form.topic} onChange={e => update('topic', e.target.value)} placeholder="Ex.: Herança"/></label>
          <label>Dificuldade<select value={form.difficulty} onChange={e => update('difficulty', e.target.value)}><option>Fácil</option><option>Médio</option><option>Difícil</option></select></label>
        </div>
        <label>Enunciado<textarea required rows="3" maxLength="3000" value={form.prompt} onChange={e => update('prompt', e.target.value)} placeholder="Escreva a pergunta aqui"/></label>
        <label>Código (opcional)<textarea rows="4" className="code-input" value={form.code} onChange={e => update('code', e.target.value)} placeholder="Cole um trecho de Java, se necessário"/></label>
        <fieldset className="alternative-fields"><legend>Alternativas</legend><p>Preencha as cinco opções e marque a resposta correta.</p>
          {form.options.map((option, i) => <div className="alternative-field" key={i}>
            <input type="radio" name="correct-answer" aria-label={`Marcar alternativa ${String.fromCharCode(65+i)} como correta`} checked={form.answer === i} onChange={() => update('answer', i)}/>
            <span>{String.fromCharCode(65+i)}</span>
            <input required maxLength="1000" aria-label={`Alternativa ${String.fromCharCode(65+i)}`} value={option} onChange={e => update('options', form.options.map((text, n) => n === i ? e.target.value : text))} placeholder={`Alternativa ${String.fromCharCode(65+i)}`}/>
          </div>)}
        </fieldset>
        <label>Explicação da resposta<textarea required rows="3" maxLength="3000" value={form.explanation} onChange={e => update('explanation', e.target.value)} placeholder="Explique por que a alternativa está correta"/></label>
        <label>Por que as outras respostas estão erradas? (opcional)<textarea rows="2" maxLength="2000" value={form.wrong} onChange={e => update('wrong', e.target.value)} placeholder="Ajude na revisão dos erros"/></label>
        <div className="form-actions"><button className="primary" type="submit"><Icon name="plus"/>Salvar questão</button>{saved && <span role="status">Questão salva! Ela já aparece na sessão de estudo.</span>}</div>
      </form>
      <section className="custom-list"><h2>Suas questões <span>({customQuestions.length})</span></h2>
        {customQuestions.length === 0 ? <p>Você ainda não adicionou nenhuma questão.</p> : customQuestions.map(q => <div className="custom-row" key={q.id}><div><small>{q.topic} · {q.difficulty}</small><strong>{q.prompt}</strong></div><button type="button" onClick={() => { if (window.confirm('Excluir esta questão?')) onDelete(q.id); }} aria-label={`Excluir questão: ${q.prompt}`}>Excluir</button></div>)}
        {customQuestions.length > 0 && <button className="secondary" onClick={() => setView('study')}>Estudar questões</button>}
      </section>
    </main>
  </>;
}

export default function App() {
  const [view, setView] = useState('study');
  const [progress, setProgress] = useState(loadProgress);
  const [remoteSets, setRemoteSets] = useState([{ id: 'sessao-de-estudos', title: 'Sessão de estudos', file: 'Sessão de estudos.json', questions: baseQuestions }]);
  const [activeSetId, setActiveSetId] = useState('sessao-de-estudos');
  const [customQuestions, setCustomQuestions] = useState(loadCustomQuestions);
  const [studySession, setStudySession] = useState(loadStudySession);
  const [reviewSession, setReviewSession] = useState({ questionId: '', selected: null });
  const [reviewIds, setReviewIds] = useState([]);
  const questionSets = useMemo(() => customQuestions.length
    ? [...remoteSets, { id: LOCAL_SET_ID, title: 'Minhas questões', file: null, questions: customQuestions }]
    : remoteSets, [remoteSets, customQuestions]);
  const activeSet = questionSets.find(set => set.id === activeSetId) || questionSets[0];
  const questions = useMemo(() => questionSets.flatMap(set => set.questions), [questionSets]);

  useEffect(() => {
    const controller = new AbortController();
    fetchQuestionSets(controller.signal)
      .then(sets => {
        setRemoteSets(sets);
        setActiveSetId(current => sets.some(set => set.id === current) ? current : sets[0].id);
      })
      .catch(error => {
        if (error.name !== 'AbortError') console.warn('Usando o caderno local de segurança.', error);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => { localStorage.setItem('poo-em-foco-progress', JSON.stringify(progress)); }, [progress]);
  useEffect(() => { localStorage.setItem('poo-em-foco-questions', JSON.stringify(customQuestions)); }, [customQuestions]);
  useEffect(() => { localStorage.setItem('poo-em-foco-study-session', JSON.stringify(studySession)); }, [studySession]);
  const wrongIds = Object.entries(progress).filter(([,v]) => !v.correct).map(([id]) => id);
  const navigate = target => {
    if (target === 'review' && view !== 'review') { setReviewIds(wrongIds); setReviewSession({ questionId: wrongIds[0] || '', selected: null }); }
    setView(target);
  };
  const selectQuestionSet = id => {
    const selectedSet = questionSets.find(set => set.id === id);
    if (!selectedSet?.questions.length) return;
    setActiveSetId(id);
    setStudySession({ questionId: selectedSet.questions[0].id, selected: progress[selectedSet.questions[0].id]?.choice ?? null });
    setView('study');
  };
  const reset = () => { setProgress({}); setStudySession({ questionId: activeSet.questions[0].id, selected: null }); navigate('study'); };
  const removeQuestion = id => { setCustomQuestions(prev => prev.filter(q => q.id !== id)); setProgress(prev => { const next = {...prev}; delete next[id]; return next; }); };
  return <div className="app-shell">
    <Sidebar view={view} setView={navigate} total={questions.length}/>
    <section className="app-view">
      {view === 'study' && <Quiz key={activeSet.id} title={activeSet.title} questions={activeSet.questions} questionSets={questionSets} activeSetId={activeSet.id} onSelectSet={selectQuestionSet} progress={progress} setProgress={setProgress} setView={navigate} session={studySession} setSession={setStudySession}/>}
      {view === 'review' && <Quiz questions={questions} progress={progress} setProgress={setProgress} setView={navigate} filterIds={reviewIds} session={reviewSession} setSession={setReviewSession}/>}
      {view === 'stats' && <Stats questions={questions} progress={progress} reset={reset}/>}
      {view === 'add' && <AddQuestions onPublished={set => setRemoteSets(prev => [...prev.filter(current => current.id !== set.id), set])} customQuestions={customQuestions} onAdd={q => setCustomQuestions(prev => [...prev, q])} onDelete={removeQuestion} setView={target => target === 'study' ? selectQuestionSet(LOCAL_SET_ID) : navigate(target)}/>}
    </section>
    <MobileNav view={view} setView={navigate}/>
  </div>;
}
