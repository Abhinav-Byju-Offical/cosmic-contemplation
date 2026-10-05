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
