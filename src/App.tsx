/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import {
  Terminal,
  Menu,
  X,
  ArrowRight,
  Code2,
  Mail,
  Link as LinkIcon,
  Layers,
  Rocket,
  Globe,
  ExternalLink,
  Github,
  Layout,
  MapPin,
  Send,
  Server,
  Zap,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

// ─── Scroll Progress Bar ───────────────────────────────────────
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      className="scroll-line"
      style={{ scaleX, width: '100%' }}
    />
  );
};

// ─── Lightweight CSS Particles (no JS animation) ───────────────
const ParticleField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[
      { x: '15%', y: '20%', size: 4, delay: '0s',   dur: '7s',  color: '#7200f5' },
      { x: '75%', y: '15%', size: 3, delay: '1.5s', dur: '9s',  color: '#a855f7' },
      { x: '50%', y: '60%', size: 5, delay: '3s',   dur: '8s',  color: '#7200f5' },
      { x: '85%', y: '55%', size: 3, delay: '0.8s', dur: '6s',  color: '#c084fc' },
      { x: '25%', y: '75%', size: 4, delay: '2s',   dur: '10s', color: '#a855f7' },
      { x: '60%', y: '85%', size: 3, delay: '4s',   dur: '7s',  color: '#7200f5' },
    ].map((p, i) => (
      <div
        key={i}
        className="absolute rounded-full float"
        style={{
          width: p.size, height: p.size,
          left: p.x, top: p.y,
          background: p.color,
          boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          opacity: 0.5,
          animationDelay: p.delay,
          animationDuration: p.dur,
        }}
      />
    ))}
  </div>
);

// ─── Typewriter Hook ───────────────────────────────────────────
const useTypewriter = (words: string[], speed = 80, pause = 1800) => {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((w) => w + 1);
          setCharIndex(0);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
};

// ─── Animated Counter ──────────────────────────────────────────
const AnimatedCounter = ({ to, suffix = '' }: { to: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(to / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 40);
    return () => clearInterval(timer);
  }, [visible, to]);

  return <div ref={ref}>{count}{suffix}</div>;
};

// ─── Section Reveal Wrapper ────────────────────────────────────
const Reveal = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  className?: string;
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : 0,
      x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Navbar ────────────────────────────────────────────────────
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-background-dark/85 backdrop-blur-xl border-white/10 h-16 shadow-[0_4px_30px_rgba(114,0,245,0.1)]' : 'bg-transparent border-transparent h-20'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center pulse-glow">
            <Terminal className="text-white size-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">DEV<span className="text-primary">PRECIOUS</span></span>
        </motion.div>

        {/* Desktop Nav */}
        <motion.div
          className="hidden md:flex items-center gap-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors relative group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:shadow-[0_0_25px_rgba(114,0,245,0.5)] hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Hire Me
          </motion.a>
        </motion.div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-background-dark/95 backdrop-blur-xl border-b border-white/10 px-6 flex flex-col gap-4 overflow-hidden md:hidden"
          >
            <div className="py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 bg-primary text-white rounded-lg text-center font-bold"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ─── Skill Card ────────────────────────────────────────────────
const SkillCard = ({ icon: Icon, name, delay = 0 }: { icon: any; name: string; delay?: number }) => (
  <Reveal delay={delay}>
    <motion.div
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="glass-card shimmer p-5 rounded-xl flex flex-col items-center gap-3 border-white/5 hover:border-primary/50 transition-all duration-300 cursor-default group"
    >
      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="size-6 text-primary group-hover:scale-110 transition-transform duration-200" />
      </div>
      <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{name}</span>
    </motion.div>
  </Reveal>
);

// ─── Project Card ──────────────────────────────────────────────
const ProjectCard = ({ project, delay = 0 }: { project: any; delay?: number }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.85, y: 30 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.85, y: 30 }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    whileHover={{ y: -8 }}
    className="glass-card rounded-2xl overflow-hidden group border-white/5 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(114,0,245,0.15)]"
  >
    <div className="relative h-56 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      {/* Gradient overlay always visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-60" />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            className="p-3 bg-white/15 backdrop-blur-md rounded-full hover:bg-primary transition-colors"
          >
            <ExternalLink className="size-5" />
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            className="p-3 bg-white/15 backdrop-blur-md rounded-full hover:bg-primary transition-colors"
          >
            <Github className="size-5" />
          </motion.a>
        </div>
      </div>
    </div>
    <div className="p-6 space-y-3">
      <div className="flex gap-2">
        <span className="tech-pill">{project.type}</span>
        <span className="tech-pill" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#94a3b8' }}>{project.category}</span>
      </div>
      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
      <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{project.description}</p>
      <div className="flex items-center gap-4 pt-1">
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-wider">
          <ExternalLink className="size-3" /> Live Demo
        </a>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-wider">
          <Github className="size-3" /> Github
        </a>
      </div>
    </div>
  </motion.div>
);

// ─── Service Card ──────────────────────────────────────────────
const ServiceCard = ({ icon: Icon, title, description, delay = 0 }: { icon: any; title: string; description: string; delay?: number }) => (
  <Reveal delay={delay} className="h-full">
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full glass-card p-10 rounded-2xl space-y-6 group transition-all duration-300 hover:shadow-[0_20px_60px_rgba(114,0,245,0.2)] border-white/5 hover:border-primary/30 flex flex-col"
    >
      <div className="size-16 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:shadow-[0_0_30px_rgba(114,0,245,0.4)] transition-all duration-300">
        <Icon className="size-8 text-primary group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed flex-1">{description}</p>
      <div className="flex items-center gap-2 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
        Learn More <ArrowRight className="size-4" />
      </div>
    </motion.div>
  </Reveal>
);

// ─── Timeline Item ─────────────────────────────────────────────
const TimelineItem = ({ year, title, description, active = false, delay = 0 }: { year: string; title: string; description: string; active?: boolean; delay?: number }) => (
  <Reveal delay={delay}>
    <div className="relative group">
      <motion.div
        className={`absolute -left-[41px] top-1 size-5 rounded-full border-2 transition-all duration-300 ${active ? 'bg-primary border-primary shadow-[0_0_20px_#7200f5]' : 'bg-background-dark border-white/20 group-hover:border-primary/50'}`}
        whileHover={{ scale: 1.3 }}
      />
      <div className="space-y-2">
        <span className={`${active ? 'text-primary' : 'text-slate-500 group-hover:text-slate-400'} font-bold text-sm tracking-widest uppercase transition-colors`}>{year}</span>
        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  </Reveal>
);

// ─── Stat Card ─────────────────────────────────────────────────
const StatCard = ({ icon: Icon, value, suffix, label, delay = 0 }: { icon: any; value: number; suffix: string; label: string; delay?: number }) => (
  <Reveal delay={delay}>
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      className="glass-card p-6 rounded-xl text-center neon-glow group transition-all duration-300"
    >
      <Icon className="size-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
      <div className="text-3xl font-bold text-primary">
        <AnimatedCounter to={value} suffix={suffix} />
      </div>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{label}</p>
    </motion.div>
  </Reveal>
);

// ─── Main App ──────────────────────────────────────────────────

export default function App() {
  const typewriterText = useTypewriter(
    ['Full Stack Developer', 'UI/UX Enthusiast', 'React Specialist', 'API Architect'],
    75,
    2000
  );

  // ── Contact form state ──────────────────────────────────────
  // Paste your Formspree endpoint below after signing up at formspree.io
  const FORMSPREE_URL = 'https://formspree.io/f/xqedrdnj';
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');
    const form = e.currentTarget;
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) {
        setFormState('success');
        form.reset();
        setTimeout(() => setFormState('idle'), 5000);
      } else {
        setFormState('error');
        setTimeout(() => setFormState('idle'), 5000);
      }
    } catch {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };


  const projects = [
    {
      id: 1,
      title: 'TrimBook',
      description: 'A barber booking platform connecting clients with top barbers. Features real-time scheduling, barber discovery, and seamless appointment management.',
      type: 'SaaS',
      category: 'Booking',
      image: '/trimbook.png',
      liveUrl: 'https://trimbook-nine.vercel.app/',
      githubUrl: 'https://github.com/preciousadepoju/Trimbook',
    },
    {
      id: 2,
      title: 'TaskFlow',
      description: 'An all-in-one task management SaaS that helps teams organize work, stay synchronized, and hit every deadline with confidence.',
      type: 'SaaS',
      category: 'Productivity',
      image: '/taskflow.png',
      liveUrl: 'https://taskflowarc.vercel.app/',
      githubUrl: 'https://github.com/preciousadepoju/Taskflow',
    },
    {
      id: 3,
      title: 'Escrowise',
      description: 'A secure escrow payment platform protecting business deals and ensuring safe transactions. Protects both buyers and sellers by minimizing counterparty risk.',
      type: 'FinTech',
      category: 'Payments',
      image: '/escrowise.png',
      liveUrl: 'https://escrowise-9gj3.vercel.app/',
      githubUrl: 'https://github.com/preciousadepoju/Escrowise',
    },
    {
      id: 4,
      title: 'SangaEats',
      description: 'A food & essentials delivery platform connecting customers, vendors, and riders. Delivering speed, reliability, and innovation to 50,000+ satisfied customers.',
      type: 'Web',
      category: 'Delivery',
      image: '/sangaeats.png',
      liveUrl: 'https://sangaeats.vercel.app/',
      githubUrl: 'https://github.com/preciousadepoju/sangapay',
    },
    {
      id: 5,
      title: 'Goldie Locs',
      description: 'A natural hair care booking platform for micro locs, traditional locs, and personalized hair treatments — 500+ happy clients served.',
      type: 'SaaS',
      category: 'Booking',
      image: '/microloc.png',
      liveUrl: 'https://microloc-v2.vercel.app/',
      githubUrl: 'https://github.com/preciousadepoju/microloc-v2',
    },
  ];


  return (
    <div className="relative min-h-screen">
      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg z-[-1]" />

      {/* Background Orb — single, cheap */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 size-[500px] bg-primary/8 rounded-full blur-[140px]" />
      </div>

      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 hero-glow overflow-hidden">
        <ParticleField />

        {/* Single static ring — no spin cost */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="size-[480px] rounded-full border border-primary/6" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl w-full text-center space-y-8 relative z-10"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-bold tracking-widest uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Available for new opportunities
          </motion.div>

          {/* Typewriter heading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight">
              <span className="text-gradient">Precious</span>
              <br />
              <span className="text-slate-100 text-3xl md:text-5xl font-semibold tracking-tight min-h-[1.5em] block">
                {typewriterText}
                <span className="cursor-blink text-primary ml-0.5">|</span>
              </span>
            </h1>
          </motion.div>

          {/* Wave bars decoration */}
          <motion.div
            className="flex justify-center items-end gap-1 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="wave-bar" />
            <div className="wave-bar" />
            <div className="wave-bar" />
            <div className="wave-bar" />
            <div className="wave-bar" />
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Building high-performance, scalable web applications from pixel-perfect frontends to rock-solid backend architectures.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.a
              href="#projects"
              className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold hover:shadow-[0_0_40px_rgba(114,0,245,0.5)] transition-all shadow-lg shadow-primary/20"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              View Projects <ArrowRight className="size-4" />
            </motion.a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="flex justify-center gap-6 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {[
              { Icon: Code2, href: '#' },
              { Icon: Mail,  href: 'mailto:iampreciousss01@gmail.com' },
              { Icon: Github, href: 'https://github.com/preciousadepoju' },
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group"
                whileHover={{ y: -4, scale: 1.1 }}
              >
                <div className="size-12 rounded-full glass-card flex items-center justify-center group-hover:text-primary group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(114,0,245,0.3)] transition-all duration-300">
                  <Icon className="size-5" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
            animate={{ borderColor: ['rgba(255,255,255,0.2)', 'rgba(114,0,245,0.6)', 'rgba(255,255,255,0.2)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <div className="relative group">
                <div className="absolute -inset-6 bg-primary/15 rounded-2xl blur-3xl group-hover:bg-primary/25 transition-all duration-700" />
                <div className="relative aspect-square rounded-2xl overflow-hidden glass-card border-white/10 group-hover:border-primary/30 transition-all duration-500">
                  <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover object-top transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  {/* Corner badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-background-dark/80 backdrop-blur-md rounded-full border border-white/10">
                    <CheckCircle2 className="size-3 text-green-400" />
                    <span className="text-xs font-bold text-green-400">Open to work</span>
                  </div>
                </div>
                <motion.div
                  className="absolute -bottom-6 -right-6 glass-card p-5 rounded-xl border-primary/20 hover:border-primary/50 transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-primary">
                    <AnimatedCounter to={3} suffix="+" />
                  </div>
                  <div className="text-xs font-bold tracking-widest uppercase text-slate-400">Years Exp.</div>
                </motion.div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest">
                    <Sparkles className="size-4" /> About Me
                  </div>
                  <h2 className="text-4xl font-bold">Engineering <span className="text-primary">Digital Excellence</span></h2>
                  <div className="text-slate-400 leading-relaxed text-[17px] space-y-4">
                    <p>
                      I am a results-driven Full Stack Developer with a passion for engineering high-performance web applications. On the frontend, I specialize in crafting pixel-perfect, highly responsive user interfaces that deliver exceptional experiences across all devices. On the backend, I architect scalable, secure RESTful APIs designed for speed and reliability.
                    </p>
                    <p>
                      Beyond just writing code, I thrive in collaborative environments, working closely with cross-functional teams to translate complex requirements into elegant technical solutions. With a proven track record of managing end-to-end development cycles, I take true pride in writing clean, maintainable code and consistently delivering robust products on time.
                    </p>
                  </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-4">
                  <StatCard icon={Layers} value={3} suffix="+" label="Years Exp." delay={0.1} />
                  <StatCard icon={Rocket} value={20} suffix="+" label="Projects" delay={0.2} />
                  <StatCard icon={Zap} value={15} suffix="+" label="Happy Clients" delay={0.3} />
                </div>

                {/* Tech pills */}
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3">Tech I love</p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'Figma'].map((t) => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.02] relative overflow-hidden" id="skills">
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-16 relative">
          <Reveal>
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-primary text-sm font-bold uppercase tracking-widest">
                <Sparkles className="size-4" /> Tech Arsenal
              </div>
              <h2 className="text-4xl font-bold">The <span className="text-primary">Stack</span></h2>
              <p className="text-slate-400">Tools I use to build exceptional products.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <SkillCard icon={Code2} name="React" delay={0} />
            <SkillCard icon={Code2} name="Next.js" delay={0.05} />
            <SkillCard icon={Layout} name="Tailwind CSS" delay={0.1} />
            <SkillCard icon={Zap} name="TypeScript" delay={0.15} />
            <SkillCard icon={Layout} name="Figma" delay={0.2} />
            <SkillCard icon={Terminal} name="Node.js" delay={0.25} />
            <SkillCard icon={LinkIcon} name="Redis" delay={0.3} />
            <SkillCard icon={Server} name="PostgreSQL" delay={0.35} />
          </div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────── */}
      <section className="py-24 px-6 relative" id="projects">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <Reveal>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest">
                  <Sparkles className="size-4" /> Portfolio
                </div>
                <h2 className="text-4xl font-bold">Featured <span className="text-primary">Works</span></h2>
                <p className="text-slate-400">Selected projects built with modern full-stack technologies.</p>
              </div>
            </Reveal>
          </div>
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} delay={i * 0.1} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.02] relative" id="services">
        <div className="max-w-7xl mx-auto space-y-16">
          <Reveal>
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-primary text-sm font-bold uppercase tracking-widest">
                <Sparkles className="size-4" /> What I Do
              </div>
              <h2 className="text-4xl font-bold">Services <span className="text-primary">Offered</span></h2>
              <p className="text-slate-400">Specialized solutions for tech-forward enterprises.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
            <ServiceCard
              icon={Code2}
              title="Full Stack Web Dev"
              description="High-performance enterprise web applications built with Next.js, Node.js, and secure REST APIs."
              delay={0.1}
            />
            <ServiceCard
              icon={Server}
              title="Backend & API Design"
              description="Scalable, production-ready backends with auth, real-time features, CI/CD pipelines, and cloud deployments."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-3xl mx-auto space-y-16">
          <Reveal>
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-primary text-sm font-bold uppercase tracking-widest">
                <Sparkles className="size-4" /> Experience
              </div>
              <h2 className="text-4xl font-bold">Career <span className="text-primary">Path</span></h2>
            </div>
          </Reveal>
          <div className="relative border-l-2 border-white/8 pl-8 ml-4 space-y-12">
            <TimelineItem
              year="2026 - Present"
              title="Senior Full Stack Developer @ POOLOT"
              description="Leading product engineering as CTO — architecting microservices, real-time features, and scalable APIs powering thousands of users daily."
              active
              delay={0.1}
            />
            <TimelineItem
              year="2024 - 2025"
              title="Intern @ POOLOT"
              description="Developed and worked on collaborative features for POOLOT, a Tech School."
              delay={0.2}
            />
            <TimelineItem
              year="2021 - 2023"
              title="Student @ SQI College of ICT"
              description="Developed responsive front-end interfaces and integrated RESTful APIs for diverse client projects."
              delay={0.3}
            />
          </div>
        </div>
      </section>


      {/* ── CONTACT ───────────────────────────────────────────── */}
      <section className="py-24 px-6 relative" id="contact">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <motion.div
              className="glass-card rounded-3xl p-8 md:p-16 border-white/10 overflow-hidden relative hover:border-primary/20 transition-all duration-500"
              whileHover={{ boxShadow: '0 30px 100px rgba(114,0,245,0.15)' }}
            >
              <div className="absolute -top-24 -right-24 size-72 bg-primary/20 blur-[120px] rounded-full" />
              <div className="absolute -bottom-24 -left-24 size-72 bg-primary/10 blur-[100px] rounded-full" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest mb-4">
                      <Sparkles className="size-4" /> Get in Touch
                    </div>
                    <h2 className="text-4xl font-bold leading-tight">Let's build something <span className="text-primary">amazing</span> together</h2>
                  </div>
                  <p className="text-slate-400 leading-relaxed">Have a product idea, a team that needs a senior developer, or a project that's been stuck? Drop me a message and let's make it happen.</p>
                  <div className="space-y-5">
                    {[
                      { Icon: Mail, label: 'Email', value: 'iampreciousss01@gmail.com' },
                      { Icon: MapPin, label: 'Location', value: 'Oyo State, NG (Remote Friendly)' },
                    ].map(({ Icon, label, value }) => (
                      <motion.div
                        key={label}
                        className="flex items-center gap-4 group"
                        whileHover={{ x: 4 }}
                      >
                        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:shadow-[0_0_20px_rgba(114,0,245,0.4)] transition-all duration-300">
                          <Icon className="size-5 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{label}</p>
                          <p className="font-medium">{value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    {[
                      { Icon: Mail,    href: 'mailto:iampreciousss01@gmail.com' },
                      { Icon: Github,  href: 'https://github.com/preciousadepoju' },
                    ].map(({ Icon, href }, i) => (
                      <motion.a
                        key={i}
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="size-10 glass-card rounded-lg flex items-center justify-center hover:bg-primary hover:shadow-[0_0_15px_rgba(114,0,245,0.4)] transition-all"
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="size-4" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Contact Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(114,0,245,0.15)] transition-all outline-none text-white placeholder:text-slate-600"
                      placeholder="John Wick"
                      type="text"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(114,0,245,0.15)] transition-all outline-none text-white placeholder:text-slate-600"
                      placeholder="john@wick.com"
                      type="email"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Message</label>
                    <textarea
                      name="message"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(114,0,245,0.15)] transition-all outline-none text-white resize-none placeholder:text-slate-600"
                      placeholder="Tell me about your project..."
                      rows={5}
                    />
                  </div>

                  {/* Status feedback */}
                  <AnimatePresence mode="wait">
                    {formState === 'success' && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2 text-green-400 text-sm font-bold bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3"
                      >
                        <CheckCircle2 className="size-4 shrink-0" /> Message sent! I'll get back to you soon.
                      </motion.div>
                    )}
                    {formState === 'error' && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2 text-red-400 text-sm font-bold bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
                      >
                        <X className="size-4 shrink-0" /> Something went wrong. Please email me directly.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={formState === 'sending' || formState === 'success'}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:shadow-[0_0_40px_rgba(114,0,245,0.5)] transition-all flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={{ scale: formState === 'idle' ? 1.02 : 1 }}
                    whileTap={{ scale: formState === 'idle' ? 0.97 : 1 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {formState === 'sending' ? (
                        <>
                          <motion.div
                            className="size-4 border-2 border-white/40 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          />
                          Sending...
                        </>
                      ) : formState === 'success' ? (
                        <><CheckCircle2 className="size-4" /> Sent!</>
                      ) : (
                        <>Send Message <Send className="size-4" /></>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="py-12 px-6 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
            <div className="size-7 bg-primary rounded-lg flex items-center justify-center pulse-glow">
              <Terminal className="text-white size-4" />
            </div>
            <span className="font-bold tracking-tight">DEV<span className="text-primary">PRECIOUS</span></span>
          </motion.div>
          <div className="text-slate-500 text-sm">
            © 2026 DevPrecious.</div>

        </div>
      </footer>
    </div>
  );
}
