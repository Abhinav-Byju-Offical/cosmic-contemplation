import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CircuitBoard, Code2, Crosshair, Lightbulb, Pause, Play, Plus, RotateCcw, Shuffle, Trash2, Wrench, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const quotations = [
  { text: "What I cannot create, I do not understand.", author: "Richard Feynman" },
  { text: "Stay hungry. Stay foolish.", author: "Steve Jobs" },
  { text: "The important thing is not to stop questioning.", author: "Albert Einstein" },
  { text: "Well done is better than well said.", author: "Benjamin Franklin" },
  { text: "We are what we repeatedly do.", author: "Will Durant" },
];

function SignalGame() {
  const [phase, setPhase] = useState<"ready" | "playing" | "paused" | "finished">("ready");
  const [seconds, setSeconds] = useState(20);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [target, setTarget] = useState(4);
  const deadline = useRef(0);
  const remaining = useRef(20000);
  useEffect(() => {
    if (phase !== "playing") return;
    const timer = window.setInterval(() => {
      remaining.current = Math.max(0, deadline.current - Date.now());
      setSeconds(Math.ceil(remaining.current / 1000));
      if (remaining.current === 0) setPhase("finished");
    }, 100);
    return () => window.clearInterval(timer);
  }, [phase]);
  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden && phase === "playing") {
        remaining.current = Math.max(0, deadline.current - Date.now());
        setPhase("paused");
      }
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => document.removeEventListener("visibilitychange", pauseWhenHidden);
  }, [phase]);
  const start = () => {
    setScore(0); setSeconds(20); setTarget(4);
    remaining.current = 20000; deadline.current = Date.now() + 20000; setPhase("playing");
  };
  const togglePause = () => {
    if (phase === "playing") {
      remaining.current = Math.max(0, deadline.current - Date.now()); setPhase("paused");
    } else { deadline.current = Date.now() + remaining.current; setPhase("playing"); }
  };
  const hit = (index: number) => {
    if (phase !== "playing" || Date.now() >= deadline.current || index !== target) return;
    const nextScore = score + 1;
    setScore(nextScore); setBest(value => Math.max(value, nextScore));
    setTarget((index + 1 + Math.floor(Math.random() * 8)) % 9);
  };
  return <article className="lab-widget signal-game">
    <div className="widget-heading"><span><Crosshair /> SIGNAL HUNT</span><small>01 / ARCADE</small></div>
    <div className="game-stats"><div><small>HITS</small><strong>{String(score).padStart(2, "0")}</strong></div><div><small>TIME</small><strong>{String(seconds).padStart(2, "0")}<em>s</em></strong></div><div><small>SESSION BEST</small><strong>{String(best).padStart(2, "0")}</strong></div></div>
    <div className="signal-board" aria-label="Signal hunt game board">
      {Array.from({ length: 9 }, (_, index) => <Button key={index} variant="ghost" className={`signal-cell ${target === index && phase === "playing" ? "is-target" : ""}`} aria-label={target === index && phase === "playing" ? "Hit signal" : `Empty sector ${index + 1}`} disabled={phase !== "playing"} onClick={() => hit(index)}>{target === index && phase === "playing" ? <Crosshair /> : <span aria-hidden="true">+</span>}</Button>)}
    </div>
    <p className="game-state" role="status">{phase === "ready" ? "20 SECONDS. CHASE THE RED SIGNAL." : phase === "paused" ? "SIGNAL PAUSED" : phase === "finished" ? `TRANSMISSION COMPLETE / ${score} HITS` : "TRANSMISSION ACTIVE"}</p>
    <div className="game-actions">{phase === "ready" || phase === "finished" ? <Button className="lab-command" onClick={start}><Play />{phase === "finished" ? "Play again" : "Start game"}</Button> : <Button className="lab-command" onClick={togglePause}>{phase === "paused" ? <Play /> : <Pause />}{phase === "paused" ? "Resume" : "Pause"}</Button>}<Button variant="ghost" size="icon" className="lab-icon" title="Restart game" aria-label="Restart game" onClick={start}><RotateCcw /></Button></div>
  </article>;
}

function SessionChecklist() {
  const [tasks, setTasks] = useState([{ id: 1, text: "Sketch a new idea", done: false }, { id: 2, text: "Build a tiny experiment", done: false }, { id: 3, text: "Read something unexpected", done: false }]);
  const [draft, setDraft] = useState("");
  const nextId = useRef(4);
  const done = tasks.filter(task => task.done).length;
  return <article className="lab-widget checklist-widget">
    <div className="widget-heading"><span><Wrench /> WORKBENCH</span><small>02 / SESSION</small></div>
    <div className="checklist-summary"><strong>{done}<em> / {tasks.length}</em></strong><span>IDEAS IN MOTION</span></div>
    <progress className="lab-progress" value={done} max={Math.max(tasks.length, 1)} aria-label="Checklist completion" />
    <div className="lab-tasks">{tasks.length === 0 && <p className="lab-empty">A clear bench. A fresh start.</p>}{tasks.map(task => <div className={`lab-task ${task.done ? "is-done" : ""}`} key={task.id}><Checkbox id={`lab-task-${task.id}`} checked={task.done} onCheckedChange={checked => setTasks(items => items.map(item => item.id === task.id ? { ...item, done: checked === true } : item))} /><label htmlFor={`lab-task-${task.id}`}>{task.text}</label><Button variant="ghost" size="icon" className="lab-icon" aria-label={`Delete ${task.text}`} title="Delete task" onClick={() => setTasks(items => items.filter(item => item.id !== task.id))}><Trash2 /></Button></div>)}</div>
    <form className="lab-task-form" onSubmit={event => { event.preventDefault(); const text = draft.trim(); if (!text || tasks.length >= 12) return; setTasks(items => [...items, { id: nextId.current++, text, done: false }]); setDraft(""); }}><Input aria-label="New task" placeholder="Another small experiment…" maxLength={100} value={draft} onChange={event => setDraft(event.target.value)} disabled={tasks.length >= 12} /><Button type="submit" size="icon" className="lab-command" aria-label="Add task" title="Add task" disabled={!draft.trim() || tasks.length >= 12}><Plus /></Button></form>
    <small className="session-note">THIS VISIT ONLY{tasks.length >= 12 ? " / 12 TASK LIMIT" : ""}</small>
  </article>;
}

function QuoteWidget() {
  const [index, setIndex] = useState(0);
  useEffect(() => { setIndex(Math.floor(Date.now() / 86400000) % quotations.length); }, []);
  const quote = quotations[index];
  return <article className="lab-widget quote-widget"><div className="widget-heading"><span><Lightbulb /> DAILY SPARK</span><small>03 / WORDS</small></div><div className="spark-symbol" aria-hidden="true">✳</div><div className="spark-quote" aria-live="polite"><blockquote key={index}>{quote.text}</blockquote><cite>{quote.author}</cite></div><Button variant="ghost" className="lab-command" onClick={() => setIndex(value => (value + 1 + Math.floor(Math.random() * (quotations.length - 1))) % quotations.length)}><Shuffle />Another perspective</Button></article>;
}

export function PortfolioPlayground() {
  return <section id="playground" className="playground-scene"><header className="chapter-title" data-reveal><span>06 / 実験 / INTERACTIVE LAB</span><h2>LESS WATCHING.<br /><em>MORE PLAYING.</em></h2></header><div className="lab-strip"><span><Zap /> LIVE INPUT / REAL REACTION</span><span>EXPERIMENTS / 001—003</span></div><div className="lab-grid" data-reveal><SignalGame /><SessionChecklist /><QuoteWidget /></div></section>;
}

const journey = [
  { icon: Code2, label: "LEARNING / WEB", title: "From pixels to systems.", copy: "A next step: creative coding, accessible interfaces, and interactive 3D on the web.", tags: ["Creative coding", "WebGL", "Accessibility"], number: "01" },
  { icon: CircuitBoard, label: "NEXT BUILD / HARDWARE", title: "Small boards. Big possibilities.", copy: "A build idea: a programmable badge with a microcontroller, a tiny display, and a personality of its own.", tags: ["Microcontrollers", "LED badges", "DIY electronics"], number: "02" },
  { icon: Wrench, label: "CURRENT PROJECT / PREL-48", title: "Make waste worth something.", copy: "Plastic Redemption: Earth's Liberation — a hardware prototype responding to plastic waste.", tags: ["Prototyping", "Sustainability", "PREL-48"], number: "03" },
];

export function TechJourney() {
  return <section id="journey" className="tech-journey"><header className="chapter-title" data-reveal><span>07 / 進化 / TECH JOURNEY & GOALS</span><h2>STILL CURIOUS.<br />STILL BUILDING.</h2></header><div className="journey-ledger"><span>THE NEXT CHAPTER IS OPEN</span><span>LEARN → BUILD → REPEAT</span></div><div className="journey-cards">{journey.map(({ icon: Icon, label, title, copy, tags, number }) => <article className="journey-card" key={number} data-reveal><div className="journey-card-top"><Icon /><span>{number}</span></div><small>{label}</small><h3>{title}</h3><p>{copy}</p><ul>{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>{number === "03" && <Button asChild variant="ghost" className="journey-link"><a href="https://www.youtube.com/watch?v=qmoXq_uKwno" target="_blank" rel="noreferrer">See the prototype <ArrowUpRight /></a></Button>}</article>)}</div></section>;
}