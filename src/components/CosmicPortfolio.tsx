import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, Atom, BookOpen, Brain, CircuitBoard, Globe2, Network } from "lucide-react";
import heroAsset from "@/assets/cosmic-astronaut.jpg.asset.json";
import helmetAsset from "@/assets/helmet-smoke.png.asset.json";
import libraryImage from "@/assets/cosmic-library.jpg";
import orbitImage from "@/assets/orbit-sphere.jpg";

const inquiries = [
  [Atom, "Quantum Physics", "Superposition, entanglement, and where measurement quietly breaks intuition."],
  [Globe2, "Micro Plastics", "Tracing invisible polymers through water, soil and bloodstreams."],
  [Brain, "Non-verbal Psychology", "Micro-expressions, posture, and the sentences bodies say out loud."],
  [Network, "Systems & Agendas", "How governmental structures shape incentive, narrative and policy."],
  [Globe2, "WHO & World Banks", "Global institutions, funding flows, and the mechanics of influence."],
  [CircuitBoard, "Human Consciousness", "Energy points, awareness models, and the medical frame around them."],
] as const;

const projects = [
  ["WEB DESIGN", "Brilliant Driving Institute", "A clear, conversion-focused digital home for a local driving school.", "https://brillaintdrivinginstitute.netlify.app/"],
  ["WEB DESIGN", "Thaslim Kabeer", "An author's website shaped by quiet typography and a book-first layout.", "https://thaslimkabeer.netlify.app/"],
  ["HARDWARE PROTOTYPE", "PREL–48", "Plastic Redemption: Earth's Liberation — a working response to plastic waste.", "https://www.youtube.com/watch?v=qmoXq_uKwno"],
] as const;

const books = ["Ahlam", "Animal Farm", "1984", "Meditations", "Mastery", "48 Laws of Power", "Wings of Fire", "Read People Like a Book", "What Every Body Is Saying", "Ikigai", "Psychology of Money", "Thajasiyaya Vhami", "New World Order"];
const interests = ["Researching random topics", "Existentialism × Nihilism", "Light Triad / Dark Triad", "Frequencies and energy", "Cyberdecks from scrap", "Writing stories & poems"];

function SectionHead({ number, kanji, title }: { number: string; kanji: string; title: string }) {
  return <header className="section-head"><span>{number}</span><div><p>{kanji}</p><h2>{title}</h2></div></header>;
}

export function CosmicPortfolio() {
  const [activeBook, setActiveBook] = useState(0);
  const helmetRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const move = (event: MouseEvent) => {
      if (!helmetRef.current) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * -8;
      helmetRef.current.style.transform = `translate3d(${x}px,${y}px,0) rotateY(${x / 2}deg) rotateX(${y / 2}deg)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <main className="cosmos">
    <nav className="cosmic-nav"><a href="#top" className="sigil">悟真<span>48</span></a><div><a href="#work">Work</a><a href="#library">Library</a><a href="#interests">Mind</a></div></nav>
    <section id="top" className="hero" style={{ backgroundImage: `url(${heroAsset.url})` }}>
      <div className="hero-shade" /><p className="hero-kicker">序 · PROLOGUE</p>
      <p className="hero-thesis">Between the measurable and the mysterious,<br />I keep looking.</p>
      <h1><span>ABHINAV</span><span>BYJU</span></h1>
      <img ref={helmetRef} className="hero-helmet" src={helmetAsset.url} alt="Faceless astronaut helmet with violet smoke" />
      <div className="hero-role"><span>RESEARCHER</span><span>WEB DESIGNER</span><span>QUANTUM & DIY</span></div>
      <p className="coordinates">09.9312 N · 76.2673 E · KERALA</p>
      <a className="explore" href="#inquiry">Explore <ArrowDown size={16}/></a>
      <div className="marquee"><div>HELLO, I AM ABHINAV BYJU · HELLO, I AM ABHINAV BYJU · HELLO, I AM ABHINAV BYJU ·</div></div>
    </section>

    <section id="inquiry" className="chapter inquiry"><SectionHead number="01" kanji="探究" title="Six directions I keep walking down, mostly at night." />
      <div className="inquiry-grid">{inquiries.map(([Icon,title,copy],i)=><article className="inquiry-card" key={title}><span>0{i+1}</span><Icon/><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section id="work" className="chapter work"><SectionHead number="02" kanji="制作" title="Websites and one prototype for the planet." />
      <div className="project-grid">{projects.map(([type,title,copy,href],i)=><a href={href} target="_blank" rel="noreferrer" className="project" key={title}><span>{type}</span><div className="project-index">0{i+1}</div><h3>{title}</h3><p>{copy}</p><b>Visit <ArrowUpRight size={16}/></b></a>)}</div>
      <div className="achievement"><div><strong>1<span>st</span></strong><b>ILLUM 24</b></div><div><p>NATIONAL FINALIST · ALL INDIA</p><h3>Turning a raw idea into a working answer for a real community problem.</h3><small>Team POWEROFGALAXY48 · Crescent Public School · PREL–48</small><a href="https://leap21stcentury.org/contest" target="_blank" rel="noreferrer">About the contest <ArrowUpRight size={15}/></a></div></div>
    </section>

    <section className="chapter words"><SectionHead number="03" kanji="言葉" title="Words that keep rearranging me." />
      <div className="quotes">
        <blockquote><i>“</i><p>Whoever fights monsters should see to it that in the process he does not become a monster. And if you gaze long enough into an abyss, the abyss will gaze back into you.</p><cite>Friedrich Nietzsche</cite></blockquote>
        <blockquote><i>“</i><p>Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.</p><cite>Marcus Aurelius</cite></blockquote>
        <blockquote className="luminous"><i>“</i><p>I searched for God and found only myself. I searched for myself and found only God.</p><cite>Rumi · my deepest favourite</cite></blockquote>
      </div>
    </section>


    <section id="library" className="library" style={{backgroundImage:`url(${libraryImage})`}}><div className="library-shade"/><div className="library-content"><SectionHead number="04" kanji="書架" title="Books I've read, and books that are waiting." /><p className="library-note"><BookOpen size={16}/> Move your cursor along the shelves</p><div className="book-shelf">{books.map((book,i)=><button type="button" key={book} aria-label={`Reveal ${book}`} onMouseEnter={()=>setActiveBook(i)} onFocus={()=>setActiveBook(i)} className={activeBook===i?"active":""}><span>{book}</span></button>)}</div><div className="book-caption"><span>{String(activeBook+1).padStart(2,"0")} / 13</span><h3>{books[activeBook]}</h3><p>{activeBook===0?"Thaslim Kabeer · Must read":activeBook===1?"George Orwell · Favourite":"A volume in the constellation"}</p><a href="https://play.google.com/store/books/details/Thaslim_Kabeer_Ahlam?id=2mPHEQAAQBAJ" target="_blank" rel="noreferrer">Start with Ahlam <ArrowUpRight size={15}/></a></div></div></section>

    <section id="interests" className="chapter interests"><SectionHead number="05" kanji="興味" title="What the mind circles when it's free." /><div className="orbit-stage"><img src={orbitImage} loading="lazy" width={1536} height={864} alt="Dark sphere with golden and violet orbital paths"/><div className="orbit-center">ORBITING<br/>THE MIND</div>{interests.map((interest,i)=><span style={{"--i":i} as CSSProperties} key={interest}>{interest}</span>)}</div></section>

    <footer style={{backgroundImage:`url(${heroAsset.url})`}}><div><p>“I searched for myself<br/>and found only God.”</p><small>RUMI</small></div><div className="footer-strip">幽玄 · ABHINAV BYJU · KERALA, INDIA · 悟真</div></footer>
  </main>;
}