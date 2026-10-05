import { useEffect, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, BookOpen, Menu, X } from "lucide-react";
import heroAsset from "@/assets/cosmic-astronaut.jpg.asset.json";
import libraryImage from "@/assets/cosmic-library.jpg";
import orbitImage from "@/assets/orbit-sphere.jpg";

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
 useEffect(()=>{const timer=window.setTimeout(()=>setEntered(true),150);return()=>window.clearTimeout(timer)},[]);
 return <main className={`portfolio ${entered?"is-ready":""}`}>
  <nav className="main-nav"><a href="#top" className="brand">AB/48</a><p>Independent researcher<br/>and digital maker</p><div className={menuOpen?"nav-links open":"nav-links"}><a href="#work" onClick={()=>setMenuOpen(false)}>Work</a><a href="#library" onClick={()=>setMenuOpen(false)}>Library</a><a href="#mind" onClick={()=>setMenuOpen(false)}>Mind</a></div><button className="menu-button" onClick={()=>setMenuOpen(v=>!v)} aria-label="Toggle menu">{menuOpen?<X/>:<Menu/>}</button></nav>

  <section id="top" className="red-hero">
   <div className="dot-grid"/><div className="hero-meta"><span>Kerala, India</span><span>Portfolio / 2026</span></div>
   <h1><span>ABHINAV</span><span>BYJU</span></h1>
   <p className="hero-copy">Researching the measurable.<br/><em>Building for the mysterious.</em></p>
   <a className="hero-cta" href="#prologue"><span>Enter the experience</span><ArrowDown/></a>
   <div className="scroll-mark"><i/><span>Scroll to begin</span><i/></div>
  </section>

  <section id="prologue" className="astronaut-scene" style={{backgroundImage:`url(${heroAsset.url})`}}>
   <div className="scene-shade"/><p className="vertical-note">RESEARCHER / DESIGNER / MAKER</p><div className="scene-number">序</div>
   <div className="scene-statement"><span>BETWEEN THE</span><strong>MEASURABLE</strong><span>AND THE</span><strong>MYSTERIOUS.</strong></div>
   <p className="coordinates">09.9312 N / 76.2673 E</p>
  </section>

  <section id="inquiry" className="inquiry-scene"><ChapterTitle number="01" label="INQUIRY" title="I KEEP LOOKING."/><div className="inquiry-list">{inquiries.map(([n,title,copy])=><article key={title}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

  <section id="work" className="work-scene"><ChapterTitle number="02" label="SELECTED WORK" title="MADE TO MOVE IDEAS."/>
   <div className="projects">{projects.map(([n,type,title,copy,href])=><a key={title} href={href} target="_blank" rel="noreferrer"><span className="project-no">{n}</span><div><small>{type}</small><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight/></a>)}</div>
   <div className="award"><span className="award-number">01</span><div><p>National finalist / ILLUM 24</p><h3>A raw idea became a working answer for a real community problem.</h3><small>TEAM POWEROFGALAXY48 / CRESCENT PUBLIC SCHOOL</small></div></div>
  </section>
