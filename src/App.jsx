import { useEffect, useMemo, useState } from 'react';
import { questions, sources } from './data/questions';

const Icon = ({ name, size = 21 }) => {
  const paths = {
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z"/></>,
    alert: <><path d="M10.3 3.7 2.2 18a2 2 0 0 0 1.8 3h16a2 2 0 0 0 1.8-3L13.7 3.7a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></>,
    chart: <><path d="M4 20V10h4v10"/><path d="M10 20V4h4v16"/><path d="M16 20v-7h4v7"/></>,
    file: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5"/><path d="M9 12h6M9 16h6"/></>,
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
  { id: 'sources', label: 'Fontes', icon: 'file' }
];

function loadProgress() {
  try { return JSON.parse(localStorage.getItem('poo-em-foco-progress')) || {}; }
  catch { return {}; }
}

function Sidebar({ view, setView }) {
  return <aside className="sidebar">
    <div className="brand"><span>POO</span> em Foco</div>
    <nav>{NAV.map(item => <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => setView(item.id)}><Icon name={item.icon}/><span>{item.label}</span></button>)}</nav>
    <div className="sidebar-foot"><span>30</span> questões validadas<br/>a partir de 7 PDFs</div>
  </aside>;
}

function MobileNav({ view, setView }) {
  return <nav className="mobile-nav">{NAV.map(item => <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => setView(item.id)}><Icon name={item.icon} size={19}/><span>{item.label}</span></button>)}</nav>;
}

function Header({ title, subtitle, progress }) {
  return <header className="topbar">
    <div className="mobile-brand"><span>POO</span> em Foco</div>
    <div><h1>{title}</h1><p>{subtitle}</p></div>
    {progress && <div className="header-progress"><div><span>Questão {progress.current} de {progress.total}</span><strong>{progress.percent}%</strong></div><div className="bar"><i style={{width: `${progress.percent}%`}}/></div></div>}
  </header>;
}

function Quiz({ progress, setProgress, setView, filterIds }) {
  const pool = filterIds ? questions.filter(q => filterIds.includes(q.id)) : questions;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const question = pool[index] || questions[0];

  useEffect(() => { setIndex(0); setSelected(null); setRevealed(false); }, [filterIds?.join('|')]);

  const answer = (choice) => {
    if (revealed) return;
    const correct = choice === question.answer;
    setSelected(choice); setRevealed(true);
    setProgress(prev => ({ ...prev, [question.id]: { choice, correct, answeredAt: Date.now() } }));
  };

  const next = () => {
    if (index < pool.length - 1) { setIndex(index + 1); setSelected(null); setRevealed(false); }
    else setView('stats');
  };

  if (!pool.length) return <EmptyReview setView={setView}/>;
  const answered = Object.keys(progress).length;
  const correct = Object.values(progress).filter(v => v.correct).length;
  const percent = Math.round(((index + (revealed ? 1 : 0)) / pool.length) * 100);

  return <>
    <Header title={filterIds ? 'Revisão de erros' : 'Sessão de estudo'} subtitle={question.topic} progress={{current:index + 1,total:pool.length,percent}}/>
    <div className="quiz-layout">
      <main className="quiz-main">
        <section className="question-block">
          <div className="question-number">{String(index + 1).padStart(2, '0')}</div>
          <div className="question-content">
            <div className="question-meta"><span>{question.difficulty}</span><span>{question.source}</span></div>
            <h2>{question.prompt}</h2>
            {question.code && <pre><code>{question.code}</code></pre>}
            <div className="options" role="radiogroup" aria-label="Alternativas">
              {question.options.map((option, i) => {
                const state = revealed ? (i === question.answer ? 'correct' : i === selected ? 'wrong' : '') : selected === i ? 'selected' : '';
                return <button key={option + i} className={state} onClick={() => answer(i)} aria-checked={selected === i} role="radio" disabled={revealed}>
                  <span className="letter">{String.fromCharCode(65 + i)}</span><span>{option}</span>
                  {state === 'correct' && <Icon name="check"/>}{state === 'wrong' && <Icon name="close"/>}
                </button>;
              })}
            </div>
          </div>
        </section>
        {revealed && <section className={`explanation ${selected === question.answer ? 'success' : 'error'}`} aria-live="polite">
          <div className="explanation-title"><Icon name={selected === question.answer ? 'check' : 'book'}/><h3>{selected === question.answer ? 'Resposta certa!' : 'Entenda a resposta'}</h3></div>
          <p><strong>A alternativa correta é {String.fromCharCode(65 + question.answer)}.</strong> {question.explanation}</p>
          {selected !== question.answer && <p><strong>Por que sua escolha não funciona?</strong> {question.wrong}</p>}
        </section>}
        <div className="quiz-actions">
          {!revealed && <span>Escolha uma alternativa para conferir.</span>}
          <button className="primary" disabled={!revealed} onClick={next}>{index === pool.length - 1 ? 'Ver desempenho' : 'Próxima questão'}<Icon name="arrow"/></button>
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

function Stats({ progress, reset }) {
  const entries = Object.values(progress), answered = entries.length, correct = entries.filter(x => x.correct).length;
  const rate = answered ? Math.round(correct / answered * 100) : 0;
  const byTopic = useMemo(() => {
    return [...new Set(questions.map(q => q.topic))].map(topic => {
      const qs = questions.filter(q => q.topic === topic), done = qs.filter(q => progress[q.id]);
      const hits = done.filter(q => progress[q.id]?.correct).length;
      return { topic, done: done.length, total: qs.length, rate: done.length ? Math.round(hits / done.length * 100) : 0 };
    }).sort((a,b) => b.done - a.done);
  }, [progress]);
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

function Sources() {
  return <><Header title="Fontes e extração" subtitle="Rastreabilidade dos PDFs ao banco de questões"/>
    <main className="page-content sources-page">
      <section className="strategy"><div className="strategy-number">01</div><div><h2>Como os PDFs viraram um quiz confiável</h2><p>O processo combina extração textual, leitura visual das páginas, separação de enunciado e alternativas, identificação do gabarito, validação das explicações e remoção de duplicatas entre simulados.</p></div></section>
      <div className="pipeline"><div><span>1</span><strong>Extrair</strong><p>Texto, código e imagens</p></div><i/><div><span>2</span><strong>Estruturar</strong><p>Enunciado + A–E</p></div><i/><div><span>3</span><strong>Validar</strong><p>Gabarito e explicação</p></div><i/><div><span>4</span><strong>Deduplicar</strong><p>Uma versão por questão</p></div></div>
      <section className="source-list"><div className="section-heading"><div><h2>Arquivos processados</h2><p>7 PDFs encontrados na pasta do Google Drive.</p></div><span className="source-count">30 questões ativas</span></div>
        {sources.map((source, i) => <div className="source-row" key={source.name}><div className="file-index">{String(i+1).padStart(2,'0')}</div><div><strong>{source.name}</strong><span>PDF • Programação Orientada a Objetos</span></div><em className={source.tone}>{source.status}</em></div>)}
      </section>
    </main>
  </>;
}

export default function App() {
  const [view, setView] = useState('study');
  const [progress, setProgress] = useState(loadProgress);
  useEffect(() => { localStorage.setItem('poo-em-foco-progress', JSON.stringify(progress)); }, [progress]);
  const wrongIds = Object.entries(progress).filter(([,v]) => !v.correct).map(([id]) => id);
  const reset = () => { setProgress({}); setView('study'); };
  return <div className="app-shell">
    <Sidebar view={view} setView={setView}/>
    <section className="app-view">
      {view === 'study' && <Quiz progress={progress} setProgress={setProgress} setView={setView}/>} 
      {view === 'review' && <Quiz progress={progress} setProgress={setProgress} setView={setView} filterIds={wrongIds}/>} 
      {view === 'stats' && <Stats progress={progress} reset={reset}/>} 
      {view === 'sources' && <Sources/>}
    </section>
    <MobileNav view={view} setView={setView}/>
  </div>;
}
