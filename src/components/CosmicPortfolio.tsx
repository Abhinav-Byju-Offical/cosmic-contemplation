import { useEffect, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, BookOpen, Menu, Trophy, X } from "lucide-react";
import { CinematicCore } from "@/components/CinematicCore";
import { PortfolioPlayground, TechJourney } from "@/components/PortfolioPlayground";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/cosmic-astronaut.jpg.asset.json";

const inquiries = [
["01","Quantum Physics","Where measurement quietly breaks intuition."],
["02","Micro Plastics","Tracing invisible polymers through water, soil and bloodstreams."],
["03","Non-verbal Psychology","The sentences bodies say out loud."],
["04","Systems & Agendas","How structures shape incentive, narrative and policy."],
["05","Global Institutions","Funding flows and the mechanics of influence."],
["06","Human Consciousness","Energy, awareness and the medical frame around them."],
] as const;
const projects = [
["01","WEB DESIGN","Brilliant Driving Institute","A conversion-focused digital home for a local driving school.","https://brillaintdrivinginstitute.netlify.app/"],
["02","WEB DESIGN","Thaslim Kabeer","An author's website shaped by quiet typography and a book-first layout.","https://thaslimkabeer.netlify.app/"],
["03","HARDWARE PROTOTYPE","PREL-48","Plastic Redemption: Earth's Liberation - a working response to plastic waste.","https://www.youtube.com/watch?v=qmoXq_uKwno"],
] as const;
const quotes=[
["Friedrich Nietzsche","Whoever fights monsters should see to it that in the process he does not become a monster. And if you gaze long enough into an abyss, the abyss will gaze back into you."],
["Marcus Aurelius","Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth."],
["Rumi - my deepest favourite","I searched for God and found only myself. I searched for myself and found only God."]
] as const;
const books=["Ahlam","Animal Farm","1984","Meditations","Mastery","48 Laws of Power","Wings of Fire","Read People Like a Book","What Every Body Is Saying","Ikigai","Psychology of Money","Thajasiyaya Vhami","New World Order"];
const interests=["Random research","Existentialism x Nihilism","Light Triad / Dark Triad","Frequencies and energy","Cyberdecks from scrap","Stories and poems"];

function ChapterTitle({number,label,title}:{number:string;label:string;title:string}){
 return <header className="chapter-title"><span>{number} / {label}</span><h2>{title}</h2></header>;
}

export function CosmicPortfolio(){
 const [activeBook,setActiveBook]=useState(0);
 const [menuOpen,setMenuOpen]=useState(false);
 const [entered,setEntered]=useState(false);
 const [count,setCount]=useState(0);
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{
  let n=0;const tick=window.setInterval(()=>{n=Math.min(100,n+Math.ceil(Math.random()*9));setCount(n);if(n>=100){window.clearInterval(tick);window.setTimeout(()=>setLoaded(true),350)}},45);
  const cursor=document.querySelector<HTMLElement>(".cursor");const dot=document.querySelector<HTMLElement>(".cursor-dot");
  let cx=0,cy=0,tx=0,ty=0,raf=0,lastY=window.scrollY,skew=0,lastSkew="";
  const move=(e:PointerEvent)=>{tx=e.clientX;ty=e.clientY;if(dot)dot.style.transform=`translate(${tx}px,${ty}px)`;const t=e.target as HTMLElement;cursor?.classList.toggle("is-hover",!!t.closest("a,button"))};
  const loop=()=>{cx+=(tx-cx)*.14;cy+=(ty-cy)*.14;if(cursor)cursor.style.transform=`translate(${cx}px,${cy}px)`;const y=window.scrollY;skew+=(Math.max(-8,Math.min(8,(y-lastY)*.25))-skew)*.12;lastY=y;const sk=skew.toFixed(2);if(sk!==lastSkew){lastSkew=sk;document.documentElement.style.setProperty("--skew",`${sk}deg`)}if(Math.abs(tx-cx)<.1&&Math.abs(ty-cy)<.1&&sk==="0.00"&&y===lastY){}raf=requestAnimationFrame(loop)};
  window.addEventListener("pointermove",move,{passive:true});raf=requestAnimationFrame(loop);
  return()=>{window.clearInterval(tick);window.removeEventListener("pointermove",move);cancelAnimationFrame(raf)}
 },[]);
 useEffect(()=>{
  if(!loaded)return;
  const timer=window.setTimeout(()=>setEntered(true),150);
  const root=document.documentElement;
  const updateScroll=()=>{const max=root.scrollHeight-window.innerHeight;root.style.setProperty("--scroll-progress",String(max>0?window.scrollY/max:0));root.style.setProperty("--page-scroll",`${window.scrollY}px`)};
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("is-visible")}),{threshold:.14,rootMargin:"0px 0px -8%"});
  document.querySelectorAll("[data-reveal]").forEach(element=>observer.observe(element));
  updateScroll();window.addEventListener("scroll",updateScroll,{passive:true});
  return()=>{window.clearTimeout(timer);window.removeEventListener("scroll",updateScroll);observer.disconnect()}
 },[loaded]);
 const letters=(word:string,offset:number)=>word.split("").map((c,i)=><b key={i} style={{"--d":`${(offset+i)*55}ms`} as CSSProperties}>{c}</b>);
 const Marquee=({text,alt}:{text:string;alt?:boolean})=><div className={alt?"marquee alt":"marquee"} aria-hidden="true"><div>{Array.from({length:6},(_,i)=><span key={i}>{text} <em>✦</em> </span>)}</div></div>;
 return <main className={`portfolio ${entered?"is-ready":""}`}>
  <div className={loaded?"preloader done":"preloader"} aria-hidden="true"><span className="pre-label">悟真 / Loading the journey</span><strong>{String(count).padStart(3,"0")}</strong><i style={{transform:`scaleX(${count/100})`}}/></div>
  <div className="cursor" aria-hidden="true"/><div className="cursor-dot" aria-hidden="true"/>
  <div className="journey-progress" aria-hidden="true"><i/></div>
  <nav className="main-nav" aria-label="Portfolio chapters"><a href="#top" className="brand">AB/48</a><p>Independent researcher<br/>and digital maker</p><div id="chapter-navigation" className={menuOpen?"nav-links open":"nav-links"}><a href="#work" onClick={()=>setMenuOpen(false)}>Work</a><a href="#library" onClick={()=>setMenuOpen(false)}>Library</a><a href="#mind" onClick={()=>setMenuOpen(false)}>Mind</a><a href="#playground" onClick={()=>setMenuOpen(false)}>Play</a><a href="#journey" onClick={()=>setMenuOpen(false)}>Journey</a></div><Button variant="ghost" size="icon" className="menu-button" onClick={()=>setMenuOpen(v=>!v)} aria-label="Toggle menu" aria-expanded={menuOpen} aria-controls="chapter-navigation">{menuOpen?<X/>:<Menu/>}</Button></nav>

  <section id="top" className="red-hero">
   <div className="dot-grid"/><CinematicCore/><div className="hero-meta"><span>Kerala, India</span><span>Portfolio / 2026</span></div>
   <h1 aria-label="Abhinav Byju"><span>{letters("ABHINAV",0)}</span><span>{letters("BYJU",4)}</span></h1>
   <p className="hero-copy">Researching the measurable.<br/><em>Building for the mysterious.</em></p>
   <a className="hero-cta" href="#prologue"><span>Enter the experience</span><ArrowDown/></a>
   <div className="scroll-mark"><i/><span>Scroll to begin</span><i/></div>
  </section>
  <Marquee text="RESEARCHER — WEB DESIGNER — MAKER — READER"/>

  <section id="prologue" className="astronaut-scene" style={{backgroundImage:`url(${heroAsset.url})`}}>
   <div className="scene-shade"/><div className="scene-light"/><p className="vertical-note">RESEARCHER / DESIGNER / MAKER</p><div className="scene-number" data-reveal>序</div>
   <div className="scene-statement" data-reveal><span>BETWEEN THE</span><strong>MEASURABLE</strong><span>AND THE</span><strong>MYSTERIOUS.</strong></div>
   <p className="coordinates">09.9312 N / 76.2673 E</p>
  </section>

  <section id="inquiry" className="inquiry-scene"><div data-reveal><ChapterTitle number="01" label="INQUIRY" title="I KEEP LOOKING."/></div><div className="inquiry-list">{inquiries.map(([n,title,copy],i)=><article key={title} data-reveal style={{"--delay":`${i*55}ms`} as CSSProperties}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
  <Marquee text="SELECTED WORK — MADE TO MOVE IDEAS" alt/>

  <section id="work" className="work-scene"><div data-reveal><ChapterTitle number="02" label="SELECTED WORK" title="MADE TO MOVE IDEAS."/></div>
   <div className="projects">{projects.map(([n,type,title,copy,href],i)=><a key={title} href={href} target="_blank" rel="noreferrer" data-reveal style={{"--delay":`${i*80}ms`} as CSSProperties}><span className="project-no">{n}</span><div><small>{type}</small><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight/></a>)}</div>
   <div className="award" data-reveal><div className="award-medal" aria-hidden="true"><Trophy/><span>AWARD</span><b>2024</b></div><div><p className="award-tag">★ Award / Recognition</p><h3>National Finalist<br/>ILLUM 24</h3><p className="award-copy">Selected among the top teams nationwide for PREL-48 — a raw idea turned into a working answer for a real community problem.</p><small>TEAM POWEROFGALAXY48 / CRESCENT PUBLIC SCHOOL</small></div></div>
  </section>
  <section className="words-scene"><div data-reveal><ChapterTitle number="03" label="WORDS" title="THOUGHTS THAT STAY."/></div><div className="quote-track">{quotes.map(([author,quote],i)=><blockquote key={author} className={i===2?"active":""} data-reveal style={{"--delay":`${i*90}ms`} as CSSProperties}><span>0{i+1}</span><p>{quote}</p><cite>{author}</cite></blockquote>)}</div></section>

  <section id="library" className="library-scene"><div className="archive-lines" aria-hidden="true"><i/><i/><i/><i/></div><div data-reveal><ChapterTitle number="04" label="LIBRARY" title="THIRTEEN DOORS."/></div><div className="archive-index"><span>PRIVATE ARCHIVE</span><span>VOL. 01—13</span><span>KERALA / 2026</span></div><p className="book-instruction" data-reveal><BookOpen/> Choose a spine</p><div className="books" data-reveal>{books.map((book,i)=><button key={book} className={activeBook===i?"active":""} onMouseEnter={()=>setActiveBook(i)} onFocus={()=>setActiveBook(i)} aria-label={`Select ${book}`}><span>{String(i+1).padStart(2,"0")}</span><b>{book}</b><i/></button>)}</div><div className="book-readout" data-reveal><span>{String(activeBook+1).padStart(2,"0")} / 13</span><h3>{books[activeBook]}</h3><p>{activeBook===0?"Thaslim Kabeer / Must read":activeBook===1?"George Orwell / Favourite":"A volume in the constellation"}</p></div></section>
  <section id="mind" className="mind-scene"><div data-reveal><ChapterTitle number="05" label="MIND" title="SIX SIGNALS, ONE CORE."/></div><div className="thought-machine" data-reveal>
   <div className="machine-axis" aria-hidden="true"><i/><i/></div>
   <div className="machine-core" aria-hidden="true"><span>AB</span><small>SUBJECT / 48</small></div>
   <div className="machine-rings" aria-hidden="true"><i/><i/><i/></div>
   <div className="thought-signals">{interests.map((item,i)=><div key={item} style={{"--i":i} as CSSProperties}><span>{String(i+1).padStart(2,"0")}</span><p>{item}</p><i aria-hidden="true"/></div>)}</div>
   <p className="machine-caption">OBSERVATION → DOUBT → PATTERN → MAKING</p>
  </div></section>
  <PortfolioPlayground/>
  <TechJourney/>
  <footer className="finale"><p data-reveal>EVERY SEARCH<br/>CHANGES THE<br/><em>SEARCHER.</em></p><div><span>ABHINAV BYJU</span><span>KERALA / INDIA</span><a href="#top">BACK TO TOP <ArrowUpRight/></a></div></footer>
 </main>;
}
