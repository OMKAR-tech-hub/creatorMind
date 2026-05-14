
"use client"

import Link from "next/link"
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Layers, 
  Globe, 
  Scale, 
  TrendingUp,
  Play,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  BrainCircuit,
  Activity
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-white/5 h-20">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            >
              <Sparkles className="text-white w-6 h-6" />
            </motion.div>
            <span className="font-headline font-bold text-2xl tracking-tighter text-white">CreatorMind</span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {['Features', 'Intelligence', 'Pricing'].map((item) => (
              <Link 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-all hover:tracking-[0.2em]"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hidden sm:block text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Login</Link>
            <Button className="premium-button rounded-full px-8 h-11" asChild>
              <Link href="/dashboard">Scribe Free</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden" id="home">
        {/* Background Mesh */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[160px] pointer-events-none animate-pulse-subtle" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[160px] pointer-events-none animate-pulse-subtle [animation-delay:2s]" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/5 border border-primary/20 mb-12"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Neural Engine v2.5 Online</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-headline font-bold mb-12 tracking-tighter leading-[0.9] text-white"
          >
            Manifest Content <br />
            <span className="premium-gradient bg-clip-text text-transparent italic">That Scales Itself.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-xl md:text-2xl text-white/60 mb-16 leading-relaxed font-medium"
          >
            The ultimate AI Operating System for elite creators. Predict virality, synchronize your emotional spectrum, and dominate neural algorithms.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button size="lg" className="premium-button rounded-2xl h-16 px-12 text-xl font-bold w-full sm:w-auto shadow-[0_0_40px_rgba(139,92,246,0.4)]" asChild>
              <Link href="/dashboard">
                Initialize Studio
                <ArrowRight className="w-6 h-6 ml-3" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl h-16 px-12 text-xl font-bold w-full sm:w-auto bg-white/5 border-white/10 hover:bg-white/10 text-white" asChild>
              <Link href="#features">
                <Play className="w-5 h-5 mr-3 fill-white" />
                Neural Demo
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-32 relative max-w-6xl mx-auto"
          >
            <div className="absolute inset-0 premium-gradient blur-[120px] opacity-10 pointer-events-none" />
            <div className="glass-card p-4 rounded-[3rem] border-white/10 relative z-10 overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/creatormind_hero/1600/1000" 
                alt="CreatorMind Dashboard OS" 
                className="rounded-[2.5rem] shadow-inner border border-white/5 opacity-90"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                 <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-3xl flex items-center justify-center animate-pulse cursor-pointer border border-primary/40">
                    <Play className="w-8 h-8 text-white fill-white" />
                 </div>
              </div>
            </div>
            
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -left-12 hidden xl:block"
            >
              <div className="glass-card p-6 rounded-[2rem] flex items-center gap-5 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <div className="w-14 h-14 rounded-2xl premium-gradient flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                  <Zap className="text-white w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Viral Index</p>
                  <p className="text-3xl font-headline font-bold text-white text-glow">98.4</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-12 -right-12 hidden xl:block"
            >
              <div className="glass-card p-6 rounded-[2rem] flex items-center gap-5 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shadow-[0_0_20px_rgba(30,64,175,0.4)]">
                  <Activity className="text-white w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Live Retention</p>
                  <p className="text-3xl font-headline font-bold text-white">+240%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intelligence Section */}
      <section id="features" className="py-40 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
             <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 px-4 py-1 rounded-full uppercase text-[10px] font-bold tracking-widest">Core Protocols</Badge>
            <h2 className="text-5xl md:text-7xl font-headline font-bold mb-8 text-white tracking-tighter">Engineered for Dominance.</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-xl leading-relaxed">
              A suite of neural tools designed to work in perfect synchronization, amplifying your signal across the digital void.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Neuro-Lab", desc: "Generate captions, scripts, and threads that bypass algorithmic filters and target deep psyche.", icon: BrainCircuit, color: "primary" },
              { title: "Viral Predictor", desc: "Simulate engagement patterns before deployment with 98% neural accuracy.", icon: Zap, color: "secondary" },
              { title: "AI Arbiter", desc: "Brutally honest neural critique that carves your drafts into high-performance weapons.", icon: Scale, color: "violet" },
              { title: "Spatial Studio", desc: "Fractalize a single blog post into 50+ micro-manifestations in milliseconds.", icon: Layers, color: "cyan" },
              { title: "Global Sync", desc: "Instant cultural resonance in 20+ languages with deep slang and tonal integration.", icon: Globe, color: "emerald" },
              { title: "Trend Nexus", desc: "Real-time AI insights into emerging cultural shifts before they achieve mass velocity.", icon: TrendingUp, color: "pink" },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="glass-card p-10 rounded-[3rem] border-white/5 hover:border-primary/40 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform relative z-10",
                  "bg-white/5 border border-white/10"
                )}>
                  <feature.icon className="w-8 h-8 text-primary group-hover:text-glow transition-all" />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-5 text-white relative z-10">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed text-lg relative z-10">{feature.desc}</p>
                <div className="mt-8 relative z-10">
                   <Link href="/dashboard" className="text-primary font-bold text-sm flex items-center group/link">
                      Initialize Protocol
                      <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-40 bg-white/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[150px] pointer-events-none opacity-50" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-headline font-bold mb-8 text-white tracking-tighter">Investment Strategy.</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-xl">
              Choose the level of intelligence required for your content expansion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { 
                name: "Nomad", 
                price: "$0", 
                desc: "For emergent creators", 
                features: ["5 Neural Generations/day", "Basic Simulations", "Discord Access"],
                buttonText: "Initialize Nomad",
                popular: false
              },
              { 
                name: "Infinity", 
                price: "$29", 
                desc: "For professional entities", 
                features: ["Unlimited Neural Ops", "Full Viral Predictor", "Global Cultural Sync", "Priority Matrix Support"],
                buttonText: "Go Infinity",
                popular: true
              },
              { 
                name: "Monolith", 
                price: "$149", 
                desc: "For agencies & empires", 
                features: ["Dedicated AI Instance", "Team Nexus Tools", "API Deep Access", "Neural Strategist"],
                buttonText: "Manifest Monolith",
                popular: false
              }
            ].map((plan, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "glass-card p-12 rounded-[3.5rem] border relative flex flex-col transition-all duration-500",
                  plan.popular ? "border-primary/60 shadow-[0_0_50px_rgba(139,92,246,0.2)] bg-primary/5 z-10" : "border-white/5"
                )}
              >
                {plan.popular && (
                  <Badge className="absolute top-8 right-8 premium-gradient border-none px-4 py-1 rounded-full uppercase text-[10px] font-bold tracking-widest shadow-lg">Optimal Selection</Badge>
                )}
                <h3 className="text-2xl font-headline font-bold mb-4 text-white">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-6xl font-bold text-white tracking-tighter">{plan.price}</span>
                  <span className="text-muted-foreground font-bold uppercase tracking-widest text-xs">/month</span>
                </div>
                <p className="text-base text-white/60 mb-10 font-medium leading-relaxed">{plan.desc}</p>
                <div className="space-y-6 mb-12 flex-1">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-4 text-sm font-bold text-white/80">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
                <Button className={cn("w-full rounded-2xl h-14 text-lg font-bold transition-all", plan.popular ? "premium-button" : "bg-white/5 hover:bg-white/10 text-white border-white/10")} asChild>
                  <Link href="/dashboard">{plan.buttonText}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-20">
            <div className="md:col-span-5">
              <Link href="/" className="flex items-center gap-3 mb-10 group">
                <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                  <Sparkles className="text-white w-6 h-6" />
                </div>
                <span className="font-headline font-bold text-3xl tracking-tighter text-white">CreatorMind</span>
              </Link>
              <p className="text-xl text-white/40 leading-relaxed font-medium max-w-sm">
                Empowering the next billion creative entities with neuro-optimized workflows and predictive temporal analytics.
              </p>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-8">Neural Ops</h4>
                <ul className="space-y-6 text-sm font-bold text-white/40">
                  <li><Link href="/dashboard/generator" className="hover:text-primary transition-colors">Content Lab</Link></li>
                  <li><Link href="/dashboard/predictor" className="hover:text-primary transition-colors">Viral Predictor</Link></li>
                  <li><Link href="/dashboard/judge" className="hover:text-primary transition-colors">Neural Arbiter</Link></li>
                  <li><Link href="/dashboard/trends" className="hover:text-primary transition-colors">Trend Nexus</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-8">Core</h4>
                <ul className="space-y-6 text-sm font-bold text-white/40">
                  <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Neural Blog</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">TOS</Link></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-8">Newsletter</h4>
                <div className="flex gap-3">
                  <input 
                    type="email" 
                    placeholder="Calibration Email" 
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:border-primary transition-all font-bold"
                  />
                  <Button variant="secondary" className="rounded-xl h-11 w-11 p-0 premium-button border-none">
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
              © 2026 CreatorMind Neuro-Systems. All rights reserved.
            </p>
            <div className="flex gap-10">
               {['Twitter', 'Instagram', 'Github'].map(social => (
                 <Link key={social} href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 hover:text-primary transition-colors">
                   {social}
                 </Link>
               ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
