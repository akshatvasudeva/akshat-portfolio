// src/pages/Portfolio.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // adjust import if your component path differs

// Simple CountUp (no external dependency)
function CountUp({ end, duration = 1200, prefix = "", suffix = "" }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const from = 0;
    const to = parseFloat(String(end).replace(/[^\d.-]/g, "")) || 0;
    const isPercent = String(end).includes("%");
    const isCurrency = String(end).includes("₹");

    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const current = Math.floor(from + (to - from) * t);
      setValue(current);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {value}
      {String(end).replace(/[0-9]/g, "") /* show original symbols */}{suffix}
    </span>
  );
}

export default function Portfolio() {
  const [theme, setTheme] = useState("dark");
  const [showIntro, setShowIntro] = useState(true);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    document.body.className = theme === "dark" ? "bg-black text-white" : "bg-white text-black";
    const t = setTimeout(() => setShowIntro(false), 2800);
    return () => clearTimeout(t);
  }, [theme]);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const skillCategories = {
    "Marketing Strategy": [
      "Creative Ideation",
      "Brand Communication",
      "Campaign Planning & Management",
      "B2B, B2C, B2G Marketing",
      "ATL-BTL Marketing",
      "Experiential Marketing",
      "Media Strategy",
      "Lead Generation",
      "Customer Segmentation",
      "Product Marketing",
      "Competitive Analysis",
      "Strategy Consulting",
    ],
    "Digital Execution": [
      "Performance Marketing",
      "SEM & Paid Social",
      "Digital Advertising",
      "Influencer & Content Marketing",
      "SEO Optimization",
      "E-commerce Marketing",
      "Shopify",
      "Go-To-Market (GTM)",
      "Generative AI for Insights",
    ],
    "Analytics & Tools": [
      "Power BI",
      "Tableau",
      "KNIME",
      "Microsoft Excel (AI-Integrated)",
      "Google Analytics",
      "CRM Tools",
      "AI-powered Language Models",
      "Basic SQL & Python",
      "Canva",
      "Trello",
      "Statusbrew",
    ],
    "Core & Soft Skills": [
      "Prompt Engineering",
      "AI & Trend Analysis",
      "ROI / CPL / KPI Tracking",
      "Marketing Analytics",
      "Market Research",
      "Stakeholder Management",
      "Workflow Optimization",
      "Collaboration & Communication",
      "Leadership & Prioritization",
    ],
  };

  // EXPERIENCE / PROJECT DATA sourced from your resume (see file). :contentReference[oaicite:1]{index=1}
  const experiences = [
    {
      role: "Assistant Manager — Response",
      company: "Bennett Coleman & Co. Ltd. (The Times of India)",
      duration: "July 2024 – Present",
      bullets: [
        "Drove business growth with a client database of 100+ enterprise accounts across Tech & AI sectors.",
        "Structured and pitched sponsorships and integrated marketing solutions valued between ₹50–₹200L (ET World Leadership Forum, ET Future of AI, Times Techies, NASSCOM events).",
        "Led ABM, thought-leadership campaigns and bespoke GTM executions — contributing ~45% to the BCCL vertical.",
        "Managed end-to-end media plans for marquee events (e.g., Shiprocket SHIVIR 2025) and negotiated cross-platform packages.",
        "Consistently achieved revenue targets via up-sell and cross-sell; increased client portfolio by ₹250L+.",
      ],
      stats: [
        { label: "Client Database", value: "100+" },
        { label: "FY24-25 Achievement", value: "142%" },
        { label: "FY25-26 YTD", value: "156%" },
        { label: "Portfolio Increase", value: "₹250L+" },
      ],
      accounts:
        "HP, AMD, Micron, Shiprocket, Canon, Concentrix, Publicis Sapient, Thales, and other enterprise clients.",
    },
    {
      role: "Management Trainee",
      company: "Bennett Coleman & Co. Ltd.",
      duration: "April 2024 – July 2024",
      bullets: [
        "Built and enriched a client database of 150+ prospects for the sales vertical.",
        "Supported pitch decks and proposal development for enterprise sponsorships and thought-leadership programs.",
        "Worked cross-functionally with product, analytics, and operations to streamline campaign fulfilment.",
      ],
      stats: [{ label: "Client Database Built", value: "150+" }],
    },
    {
      role: "Brand Marketing Intern (Product Marketing)",
      company: "Swiggy",
      duration: "Oct 2023 – Mar 2024",
      bullets: [
        "Led national launch of Swiggy Pocket Hero across 21 cities after achieving P&L-positive pilot results.",
        "Managed influencer & festive campaigns for Swiggy Occasions — 100% on-time deliverables and +20% engagement.",
        "Delivered 50+ creative assets on schedule; secured TASCON HR presence (10+ CHRO leads).",
        "Improved push notification segmentation, boosting CTR by ~15%.",
      ],
      stats: [
        { label: "Cities", value: "21" },
        { label: "Deliverables", value: "100%" },
        { label: "Engagement", value: "+20%" },
        { label: "Leads", value: "10+" },
      ],
    },
    {
      role: "Digital Marketing & Analytics Intern (PPO Offered)",
      company: "KAI India",
      duration: "May 2023 – Jul 2023",
      bullets: [
        "Improved organic reach by 22% through competitor and website analysis with SEO enhancements.",
        "Increased engagement by 18% in six weeks via Instagram, LinkedIn and Facebook campaigns.",
        "Launched a Shopify e-commerce store and improved payment flows to increase conversion.",
        "Built campaign dashboards in Tableau and Power BI to track KPIs and measure ROI.",
        "Collaborated with influencers and restaurant brands — +30% rise in user interaction and brand recall.",
      ],
      stats: [
        { label: "Organic Reach", value: "22%" },
        { label: "Engagement", value: "18%" },
        { label: "User Interaction", value: "30%" },
      ],
    },
  ];

  const projects = [
    {
      title: "Swiggy Pocket Hero NSO Launch",
      desc: "Led national launch across 21 cities after achieving P&L-positive pilot; scaled operations and on-ground partnerships.",
      impact: "Achieved P&L-positive results and successfully scaled across 21 cities.",
      metrics: ["21 Cities", "P&L Positive"],
    },
    {
      title: "Swiggy Occasions Go-to-Market",
      desc: "Managed influencer and festive campaigns, securing brand recall and lead generation.",
      impact: "100% on-time deliverables and a 20% increase in user engagement.",
      metrics: ["+20% Engagement", "100% Deliverables", "10+ Leads"],
    },
    {
      title: "Tech Company Analysis – Delhi NCR",
      desc: "Analyzed tech companies and advertising expenditure trends to inform regional media planning.",
      impact: "Provided research-driven insights to optimize client targeting and media buys.",
      metrics: ["NCR Region", "Research-Driven Insights"],
    },
    {
      title: "Multi-Client Campaign Strategy",
      desc: "Implemented unified cross-client strategy to improve visibility and ROI.",
      impact: "Boosted cross-client engagement and improved campaign KPIs.",
      metrics: ["5+ Clients", "ROI Growth"],
    },
  ];

  // Additional Achievements & Roles (from resume)
  const additional = {
    volunteering:
      "Associated with NGOs for education and welfare; active in blood donation drives & animal healthcare; formal/informal anchor at public events; UNV volunteer; participant in national summits and cultural festivals.",
    leadership:
      "Lead for Projects - Times of India; President - Swayam Cultural Club (NDIM); Vice President - Student Union (Echelon Institute); Head Boy - Scholars Pride School; House Captain - Gita Convent School; Class Representative - NDIM.",
    performing:
      "Winner of 13+ trophies in music competitions; singer, songwriter, composer, guitarist, pianist and ukulele player.",
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Intro overlay */}
      {showIntro && (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 2.2, duration: 1 }} className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
          <motion.h1 initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.9 }} className="text-5xl md:text-6xl font-extrabold text-red-600 tracking-widest">
            AKSHAT VASUDEVA
          </motion.h1>
        </motion.div>
      )}

      {/* NAV */}
      <nav className="fixed w-full top-0 left-0 z-50 backdrop-blur bg-black/60 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-bold text-lg">AV<span className="text-red-500">.</span></div>
          </div>

          <ul className="hidden md:flex gap-8 uppercase tracking-wider text-sm">
            <li><a href="#experience" onClick={(e)=>{e.preventDefault(); scrollTo(experienceRef);}} className="hover:text-red-500">Experience</a></li>
            <li><a href="#key-projects" onClick={(e)=>{e.preventDefault(); scrollTo(projectsRef);}} className="hover:text-red-500">Key Projects</a></li>
            <li><a href="#skills" className="hover:text-red-500">Skills</a></li>
            <li><a href="#education" className="hover:text-red-500">Education</a></li>
            <li><a href="#achievements" className="hover:text-red-500">Achievements</a></li>
            <li><a href="#contact" className="hover:text-red-500">Contact</a></li>
          </ul>

          <div className="flex items-center gap-3">
            <Button onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")} className="px-3 py-1 rounded-full text-xs bg-zinc-800 hover:bg-zinc-700">
              {theme === "dark" ? "☀️" : "🌙"}
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
          <source src="/VIDEO-2025-09-20-15-37-23.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="relative z-10 max-w-4xl px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-extrabold">
            AKSHAT VASUDEVA
          </motion.h2>
          <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-red-500 font-semibold mt-3 tracking-widest">
            MARKETING PROFESSIONAL
          </motion.h3>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="text-zinc-300 mt-6">
            Tech brain. Marketing heart. Strategy built-in. Currently driving strategic corporate sales at Bennett Coleman &amp; Co. Ltd. (The Times of India).
          </motion.p>

          {/* METRICS */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-800">
              <div className="text-3xl font-bold text-red-500 mb-1"><CountUp end={"142%"} duration={900} /></div>
              <div className="text-zinc-400 text-sm uppercase tracking-widest">FY24-25 Target Achievement</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-800">
              <div className="text-3xl font-bold text-red-500 mb-1"><CountUp end={"156%"} duration={900} /></div>
              <div className="text-zinc-400 text-sm uppercase tracking-widest">FY25-26 YTD</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-800">
              <div className="text-3xl font-bold text-red-500 mb-1"><CountUp end={"₹250L+"} duration={900} /></div>
              <div className="text-zinc-400 text-sm uppercase tracking-widest">Portfolio Growth</div>
            </motion.div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Button onClick={() => scrollTo(experienceRef)} className="bg-red-600 px-6 py-2 rounded-full">View Experience</Button>
            <Button onClick={() => scrollTo(projectsRef)} variant="outline" className="border-white px-6 py-2 rounded-full">View Projects</Button>
            <a href="https://www.linkedin.com/in/akshatvasudeva/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-white px-6 py-2 rounded-full">Connect on LinkedIn</Button>
            </a>
            <a href="/Akshat Vasudeva MarkTech.pdf" download>
              <Button className="bg-zinc-800 px-6 py-2 rounded-full">Download Resume</Button>
            </a>
          </div>
        </div>
      </header>

      {/* PROFESSIONAL EXPERIENCE */}
      <main>
        <section id="experience" ref={experienceRef} className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-10 flex items-center gap-4">
            <div className="text-red-500 text-2xl">💼</div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Professional Experience</h2>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <motion.article key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
                <div className="md:flex md:justify-between md:items-start gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold">{exp.role}</h3>
                    <p className="text-zinc-400">{exp.company}</p>
                    <p className="text-sm text-zinc-500 mb-4">{exp.duration}</p>

                    <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                      {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>

                    {exp.accounts && (
                      <p className="mt-4 text-zinc-400"><strong>Key accounts:</strong> {exp.accounts}</p>
                    )}
                  </div>

                  <div className="mt-6 md:mt-0 md:w-64">
                    <div className="grid grid-cols-2 gap-3">
                      {exp.stats.map((s, i) => (
                        <div key={i} className="bg-zinc-800 p-4 rounded-lg text-center">
                          <div className="text-red-500 text-xl font-bold">{s.value}</div>
                          <div className="text-zinc-400 text-sm">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    <button className="mt-4 text-red-500 text-sm flex items-center hover:underline">Show More <span className="ml-2">→</span></button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* KEY PROJECTS */}
        <section id="key-projects" ref={projectsRef} className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-10 flex items-center gap-4">
            <div className="text-red-500 text-2xl">🚀</div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Key Projects</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((p, idx) => (
              <motion.article key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }} className="bg-zinc-900 p-8 rounded-2xl shadow-md">
                <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
                <p className="text-zinc-400 mb-4">{p.desc}</p>
                <p className="text-red-500 text-sm font-semibold mb-2">IMPACT:</p>
                <p className="text-zinc-300 mb-4">{p.impact}</p>

                <div className="grid grid-cols-2 gap-3">
                  {p.metrics.map((m, j) => (
                    <div key={j} className="bg-zinc-800 p-4 rounded-lg text-center">
                      <div className="text-red-500 font-bold">{m}</div>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="mb-8 flex items-center gap-4">
            <div className="text-red-500 text-2xl">⚙️</div>
            <h2 className="text-3xl font-extrabold">Skills & Tools</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skillCategories).map(([cat, list], i) => (
              <div key={i} className="bg-zinc-900 p-6 rounded-xl shadow">
                <h4 className="text-xl text-red-500 font-semibold mb-4">{cat}</h4>
                <div className="flex flex-wrap gap-3">
                  {list.map((s, j) => (
                    <span key={j} className="bg-zinc-800 px-3 py-2 rounded-md text-sm text-zinc-300">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="py-16 px-6 md:px-12 max-w-4xl mx-auto">
          <div className="mb-6 flex items-center gap-4">
            <div className="text-red-500 text-2xl">🎓</div>
            <h2 className="text-3xl font-extrabold">Education</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 p-6 rounded-xl">
              <h4 className="text-xl font-semibold">PGDM — Marketing & Business Analytics</h4>
              <p className="text-zinc-400">New Delhi Institute of Management</p>
              <p className="text-sm text-zinc-500">June 2022 - May 2024 · CGPA: 8.5</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-xl">
              <h4 className="text-xl font-semibold">B.Tech — Computer Science</h4>
              <p className="text-zinc-400">J.C. Bose University of Science & Technology</p>
              <p className="text-sm text-zinc-500">July 2017 - May 2021 · CGPA: 7.9</p>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS / ADDITIONAL EXPERIENCE */}
        <section id="achievements" className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="mb-8 flex items-center gap-4">
            <div className="text-red-500 text-2xl">🏆</div>
            <h2 className="text-3xl font-extrabold">Additional Experience & Achievements</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 p-6 rounded-xl text-zinc-300">
              <h4 className="text-red-500 font-semibold mb-2">Volunteering & Extracurricular</h4>
              <p className="text-sm leading-relaxed">{additional.volunteering}</p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl text-zinc-300">
              <h4 className="text-red-500 font-semibold mb-2">Positions of Responsibility</h4>
              <p className="text-sm leading-relaxed">{additional.leadership}</p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl text-zinc-300">
              <h4 className="text-red-500 font-semibold mb-2">Performing Arts</h4>
              <p className="text-sm leading-relaxed">{additional.performing}</p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-16 px-6 md:px-12 max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold">Let’s Build Campaigns That Click</h2>
            <p className="text-zinc-400 mt-2">Reach out to collaborate or just say hi!</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a className="text-red-500 font-medium" href="mailto:akshatvasudeva99@gmail.com">akshatvasudeva99@gmail.com</a>
            <span className="hidden md:inline">|</span>
            <a className="text-zinc-300 hover:text-red-500" href="https://www.linkedin.com/in/akshatvasudeva/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="hidden md:inline">|</span>
            <a className="text-zinc-300 hover:text-red-500" href="https://wa.me/919599021025" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="/Akshat Vasudeva MarkTech.pdf" download>
              <Button className="bg-zinc-800 px-6 py-2 rounded-full">Download PDF Resume</Button>
            </a>
            <a href="tel:+919599021025" className="text-zinc-400">+91 95990 21025</a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center text-zinc-500">
        © {new Date().getFullYear()} Akshat Vasudeva. All rights reserved.
      </footer>
    </div>
  );
}

