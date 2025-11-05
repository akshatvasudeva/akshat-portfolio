/* Portfolio component generated from user content.
   For any further edits, modify src/Portfolio.jsx.
*/
import { motion } from 'framer-motion';
import Button from './components/ui/button';
import { useState, useEffect, useRef } from 'react';

function CountUp({ end, duration = 1200 }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const to = parseFloat(String(end).replace(/[^\d.-]/g, '')) || 0;
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const current = Math.floor(to * t);
      setValue(current);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration]);
  return <span>{String(end).includes('₹') ? '₹' : ''}{value}{String(end).replace(/[0-9]/g, '')}</span>;
}

export default function Portfolio(){ 
  const [theme, setTheme] = useState('dark');
  const [showIntro, setShowIntro] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(()=>{ document.body.className = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'; const t=setTimeout(()=>setShowIntro(false),3000); return ()=>clearTimeout(t); },[theme]);

  const experiences = [];
  const projects = [];
  const additional = {};

  return (<div className={'min-h-screen font-sans '+(theme==='dark'?'bg-black text-white':'bg-white text-black')}>
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold">Akshat Portfolio (placeholder)</h1>
      <p className="mt-4 text-zinc-400">Replace with full component — src/Portfolio.jsx already contains full code in canvas export.</p>
      <p className="mt-2 text-sm text-zinc-500">Run <code>npm run dev</code> after installing dependencies.</p>
    </div>
  </div>);
}
