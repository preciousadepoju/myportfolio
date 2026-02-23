/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Menu,
  X,
  ArrowRight,
  Download,
  Code2,
  Mail,
  Link as LinkIcon,
  Layers,
  Rocket,
  Coins,
  Globe,
  Wallet,
  ExternalLink,
  Github,
  Bitcoin,
  Gavel,
  Layout,
  MapPin,
  Send,
  Quote
} from 'lucide-react';

// --- Components ---

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-background-dark/80 backdrop-blur-md border-white/10 h-16' : 'bg-transparent border-transparent h-20'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(114,0,245,0.5)]">
            <Terminal className="text-white size-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">DEV<span className="text-primary">PRECIOUS</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
              {link.name}
            </a>
          ))}
          <a href="#contact" className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:shadow-[0_0_20px_rgba(114,0,245,0.4)] transition-all">
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background-dark border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SkillCard = ({ icon: Icon, name }: { icon: any, name: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="glass-card p-4 rounded-lg flex flex-col items-center gap-3 border-white/5 hover:border-primary/50 transition-colors cursor-default"
  >
    <Icon className="size-8 text-slate-300" />
    <span className="text-sm font-medium">{name}</span>
  </motion.div>
);

const ProjectCard = ({ project }: { project: any, key?: any }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="glass-card rounded-xl overflow-hidden group border-white/5 hover:border-primary/30 transition-all duration-500"
  >
    <div className="relative h-64 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="flex gap-4">
          <a href="#" className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-primary transition-colors">
            <ExternalLink className="size-5" />
          </a>
          <a href="#" className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-primary transition-colors">
            <Github className="size-5" />
          </a>
        </div>
      </div>
    </div>
    <div className="p-6 space-y-4">
      <div className="flex gap-2">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${project.type === 'Web3' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
          {project.type}
        </span>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-white/5 text-slate-400 border border-white/10">
          {project.category}
        </span>
      </div>
      <h3 className="text-xl font-bold">{project.title}</h3>
      <p className="text-sm text-slate-400 line-clamp-2">{project.description}</p>
      <div className="flex items-center gap-4 pt-2">
        <a href="#" className="flex items-center gap-1 text-xs font-bold text-white hover:text-primary transition-colors uppercase tracking-wider">
          <ExternalLink className="size-3" /> Live Demo
        </a>
        <a href="#" className="flex items-center gap-1 text-xs font-bold text-white hover:text-primary transition-colors uppercase tracking-wider">
          <Terminal className="size-3" /> Github
        </a>
      </div>
    </div>
  </motion.div>
);

const ServiceCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="glass-card p-10 rounded-2xl space-y-6 neon-glow group transition-all">
    <div className="size-16 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary transition-colors">
      <Icon className="size-8 text-primary group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const TimelineItem = ({ year, title, description, active = false }: { year: string, title: string, description: string, active?: boolean }) => (
  <div className="relative">
    <div className={`absolute -left-[41px] top-1 size-5 rounded-full ${active ? 'bg-primary shadow-[0_0_15px_#7200f5]' : 'bg-white/10'}`}></div>
    <div className="space-y-2">
      <span className={`${active ? 'text-primary' : 'text-slate-500'} font-bold text-sm tracking-widest uppercase`}>{year}</span>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  </div>
);

const TestimonialCard = ({ quote, name, role, initials }: { quote: string, name: string, role: string, initials: string }) => (
  <div className="glass-card p-8 rounded-2xl relative">
    <Quote className="text-primary size-12 opacity-20 absolute top-4 right-4" />
    <p className="text-slate-300 italic mb-8">"{quote}"</p>
    <div className="flex items-center gap-4">
      <div className="size-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-primary">{initials}</div>
      <div>
        <div className="font-bold">{name}</div>
        <div className="text-xs text-slate-500">{role}</div>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [filter, setFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'Aura Finance Protocol',
      description: 'A high-performance liquidity aggregator featuring customized smart contract bonding curves.',
      type: 'Web3',
      category: 'DeFi',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAADnbnSgi6hZMvD9D-OyIp5wVuyMp6eXg-XaOcKJv696eP17GFRYBoNI8kLqcTyYFupxSnYjL-stMoID9VFy-MsdzJhrClgQewPZwSv_gqfPVvpJMsPRPNZ6Ng9Lqw3IWErQPYT9b4ZRRtvNddBZz9i_rbtNOL4ZS7Ys3fwTyl0z6Ge86bi0_ssOoaE1ndEF_DhT6bbjZ41HpXhw8mUFrmLzk9EKsnUXHp2sKrnYy_hd5gzUbK7KgiOzV4La68Y3arulR-SBdvRYW3'
    },
    {
      id: 2,
      title: 'Quantix Analytics Hub',
      description: 'Enterprise-grade SaaS dashboard with real-time data streaming and complex visualization.',
      type: 'Web2',
      category: 'SaaS',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWj2lu-p80waCeSZ8ILleiww9WNa4Eza2nUxarJqjV1PKlNIcG1KN9ytLQVVLCmn2w_MO3n_YtxAhH_adcU4H38Hj6a_ummvkeTmOiLclUsDxYxvn2It51u_IXG-571XCWMbQNmh2zVdVSGH7MUW1H1jPnC6RPSQg2HELmzjB6_wCjYPdSZfM9rW2c5_cfhdvNXTuR9YBLS1nvGYkXFF7GkEFcHt1MBNYqiOQWZLm8H2IGTmxQRDfv00uNm41ikYGI0u4XQLIu9pEy'
    },
    {
      id: 3,
      title: 'Ethereal NFT Mint',
      description: 'Generative art minting platform with Dutch auctions and royalty-tracking smart contracts.',
      type: 'Web3',
      category: 'NFT',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh_i13Yfs_P8cU3qYV84f3HcEsJbzz9qGh079Px_af_gWJytQ-z41Q2H2N5-BP3UGMsyrD31CSYYM5XnpmfD_hNkqITkygKCiD-x8xAGdjLZGEdQY2hYs-dilKGIMypMY10AMLUZ_nCoVZ4JwxxkWLOpPULcGvf6RZU1gcdXx3Wbn8aWWIbTw8vFsSJ-33g-8YhPtbWyZRyddZDzsMefNBMu5kxzx5SDiZdm3EZ8VBbJEQBu11YiodQ5D-0B0Nvvb6Ig_UEgb-2GD-'
    }
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.type === filter);

  return (
    <div className="relative min-h-screen">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 grid-bg z-[-1]"></div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 hero-glow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new opportunities
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight text-gradient">
            Full Stack Web2 + <br />Web3 Developer
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Architecting decentralized futures with high-performance Web2 stability. Bridging the gap between legacy systems and the blockchain.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="#projects" className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20">
              View Projects <ArrowRight className="size-4" />
            </a>
            <a href="#" className="flex items-center gap-2 px-8 py-4 glass-card text-white rounded-xl font-bold hover:bg-white/5 transition-all">
              Download CV <Download className="size-4" />
            </a>
          </div>
          <div className="flex justify-center gap-8 pt-12">
            <a href="#" className="group">
              <div className="size-12 rounded-full glass-card flex items-center justify-center group-hover:text-primary group-hover:border-primary transition-all">
                <Code2 className="size-5" />
              </div>
            </a>
            <a href="#" className="group">
              <div className="size-12 rounded-full glass-card flex items-center justify-center group-hover:text-primary group-hover:border-primary transition-all">
                <Mail className="size-5" />
              </div>
            </a>
            <a href="#" className="group">
              <div className="size-12 rounded-full glass-card flex items-center justify-center group-hover:text-primary group-hover:border-primary transition-all">
                <LinkIcon className="size-5" />
              </div>
            </a>
          </div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section className="py-24 px-6 relative" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-primary/20 rounded-xl blur-2xl group-hover:bg-primary/30 transition-all"></div>
              <div className="relative aspect-square rounded-xl overflow-hidden glass-card border-white/10">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5ns3flBcuc48TlwqwkPFNnoJxvk3pc4ZVIcAwX2b-d2W3rKolSG1701PlGMIXOPO56IK1nzIq9CZhUYEoNuPqCuOH49SFgtiC79I3XE_SMWcgtijM73a-xU5LN4SOc6Hracu8vUnnH5WWE2TmwQ7PWyRxn5vLskbvtaJcrsLkLNGEofR9qmFQZ9HrZgXvYq4v7G48Cd3gVKn-81BIlVMRXc4PE-z7eKY_RvfEHxo1c5y8vMl8cIRQJ_56w1ntUmJVza9Qge2VnyND"
                  alt="Profile"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-xl border-white/20">
                <div className="text-4xl font-bold text-primary">05+</div>
                <div className="text-xs font-bold tracking-widest uppercase text-slate-400">Years Exp.</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Engineering <span className="text-primary">Digital Excellence</span></h2>
                <p className="text-slate-400 leading-relaxed text-lg">
                  I'm a solution-oriented developer passionate about building high-quality software. From crafting intuitive UIs in React to architecting robust smart contracts on Ethereum, I focus on security, scalability, and user experience.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card p-5 rounded-xl neon-glow transition-all">
                  <Layers className="text-primary mb-3 size-6" />
                  <h4 className="font-bold">Experience</h4>
                  <p className="text-sm text-slate-500">Ex-Lead at Fintech</p>
                </div>
                <div className="glass-card p-5 rounded-xl neon-glow transition-all">
                  <Rocket className="text-primary mb-3 size-6" />
                  <h4 className="font-bold">Projects</h4>
                  <p className="text-sm text-slate-500">40+ Delivered</p>
                </div>
                <div className="glass-card p-5 rounded-xl neon-glow transition-all">
                  <Coins className="text-primary mb-3 size-6" />
                  <h4 className="font-bold">Tech</h4>
                  <p className="text-sm text-slate-500">Full Stack Mastery</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-6 bg-white/[0.02]" id="skills">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">The <span className="text-primary">Stack</span></h2>
            <p className="text-slate-400">Technical arsenal for building the next generation of web applications.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Web2 Column */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Globe className="text-primary size-5" /> Web2 (Core)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <SkillCard icon={Code2} name="Next.js" />
                <SkillCard icon={Terminal} name="Node.js" />
                <SkillCard icon={Layers} name="PostgreSQL" />
                <SkillCard icon={Layout} name="Tailwind CSS" />
                <SkillCard icon={Rocket} name="AWS / GCP" />
                <SkillCard icon={Terminal} name="GraphQL" />
              </div>
            </div>
            {/* Web3 Column */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Wallet className="text-primary size-5" /> Web3 (Decentralized)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <SkillCard icon={Bitcoin} name="Solidity" />
                <SkillCard icon={Layers} name="Hardhat" />
                <SkillCard icon={LinkIcon} name="Ethers.js" />
                <SkillCard icon={Coins} name="Foundry" />
                <SkillCard icon={Layout} name="IPFS" />
                <SkillCard icon={Gavel} name="OpenZeppelin" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-6" id="projects">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">Featured <span className="text-primary">Works</span></h2>
              <p className="text-slate-400">Selected projects spanning the Web2 and Web3 ecosystems.</p>
            </div>
            <div className="flex gap-2 p-1 glass-card rounded-lg border-white/10">
              {['All', 'Web2', 'Web3'].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${filter === item ? 'bg-primary text-white' : 'hover:bg-white/5'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-primary/[0.01]" id="services">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Services <span className="text-primary">Offered</span></h2>
            <p className="text-slate-400">Specialized solutions for tech-forward enterprises.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={Bitcoin}
              title="DApp Development"
              description="End-to-end decentralized application development on Ethereum, Polygon, and Solana."
            />
            <ServiceCard
              icon={Gavel}
              title="Smart Contract Audit"
              description="Security-first auditing and optimization of Solidity contracts for production deployment."
            />
            <ServiceCard
              icon={Layout}
              title="Full Stack Web Dev"
              description="High-performance enterprise web applications built with Next.js and secure APIs."
            />
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Career <span className="text-primary">Path</span></h2>
          </div>
          <div className="relative border-l border-white/10 pl-8 ml-4 space-y-12">
            <TimelineItem
              year="2022 - Present"
              title="Senior Web3 Engineer @ MetaChain"
              description="Leading the development of cross-chain bridges and decentralized governance modules using Solidity and Next.js."
              active
            />
            <TimelineItem
              year="2020 - 2022"
              title="Full Stack Developer @ FintechX"
              description="Architected scalable payment processing systems handling $10M+ monthly volume using Node.js and AWS."
            />
            <TimelineItem
              year="2018 - 2020"
              title="Junior Developer @ WebSolutions"
              description="Developed responsive front-end interfaces and integrated RESTful APIs for diverse client projects."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Client <span className="text-primary">Success</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="One of the best developers we've worked with. The transition from Web2 to Web3 was seamless thanks to their deep expertise."
              name="John Doe"
              role="CEO, CryptoFlow"
              initials="JD"
            />
            <TestimonialCard
              quote="Their attention to smart contract security saved us from a potential vulnerability. Highly recommend for any blockchain work."
              name="Sarah Adams"
              role="CTO, BlockLabs"
              initials="SA"
            />
            <TestimonialCard
              quote="Exceptional full-stack skills. They delivered a complex dashboard on a tight deadline without compromising code quality."
              name="Michael Klein"
              role="Lead, FinData Inc"
              initials="MK"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 relative" id="contact">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-16 border-white/10 overflow-hidden relative">
            <div className="absolute -top-24 -right-24 size-64 bg-primary/20 blur-[100px] rounded-full"></div>
            <div className="absolute -bottom-24 -left-24 size-64 bg-primary/10 blur-[100px] rounded-full"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h2 className="text-4xl font-bold leading-tight">Let's build the <span className="text-primary">future</span> together</h2>
                <p className="text-slate-400">Looking for a developer to help you navigate the Web3 landscape or build a rock-solid Web2 platform? Drop me a message.</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Mail className="size-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Email</p>
                      <p className="font-medium">hello@devprecious.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <MapPin className="size-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Location</p>
                      <p className="font-medium">San Francisco, CA (Remote Friendly)</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <a href="#" className="size-10 glass-card rounded-lg flex items-center justify-center hover:bg-primary transition-all"><Terminal className="size-4" /></a>
                  <a href="#" className="size-10 glass-card rounded-lg flex items-center justify-center hover:bg-primary transition-all"><Mail className="size-4" /></a>
                  <a href="#" className="size-10 glass-card rounded-lg flex items-center justify-center hover:bg-primary transition-all"><Github className="size-4" /></a>
                </div>
              </div>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none text-white" placeholder="John Wick" type="text" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none text-white" placeholder="john@wick.com" type="email" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Message</label>
                  <textarea className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none text-white resize-none" placeholder="Tell me about your project..." rows={4}></textarea>
                </div>
                <button className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:shadow-[0_0_30px_rgba(114,0,245,0.4)] transition-all flex items-center justify-center gap-2">
                  Send Message <Send className="size-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-primary rounded flex items-center justify-center">
              <Terminal className="text-white size-3" />
            </div>
            <span className="font-bold tracking-tight">DEV<span className="text-primary">PRECIOUS</span></span>
          </div>
          <div className="text-slate-500 text-sm">
            © 2024 DevPrecious. Built with React, Tailwind, and Blockchain logic.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
