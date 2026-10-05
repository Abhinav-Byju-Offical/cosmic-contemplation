import { useEffect, useRef, useState } from "react";
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