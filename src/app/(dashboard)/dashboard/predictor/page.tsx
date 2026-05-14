
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Zap, 
  TrendingUp, 
  Heart, 
  MessageCircle, 
  Share2, 
  BarChart3,
  Loader2,
  Sparkles,
  Info,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  BrainCircuit
} from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"

export default function PredictorPage() {
  const [content, setContent] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [report, setReport] = useState<any>(null)

  const handleAnalyze = () => {
    if (!content.trim()) return
    setAnalyzing(true)
    // Mocking prediction analysis delay
    setTimeout(() => {
      setReport({
        viralScore: 84,
        emotionalImpact: 78,
        engagementPrediction: "High Potential",
        audienceRetention: 65,
        breakdown: [
          { name: "Hooks", value: 92 },
          { name: "Relevance", value: 85 },
          { name: "Format", value: 72 },
          { name: "Vibe", value: 88 },
        ]
      })
      setAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in py-6">
      <div className="flex flex-col gap-3">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="p-3 rounded-2xl premium-gradient shadow-[0_0_20px_rgba(139,92,246,0.4)]">
             <Zap className="w-8 h-8 text-white fill-white/20" />
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">
            Viral <span className="premium-gradient bg-clip-text text-transparent italic">Predictor</span>
          </h1>
        </motion.div>
        <p className="text-muted-foreground text-lg max-w-2xl">Neural engagement simulation. Know your impact before you hit post.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-8">
          <Card className="glass-card border-white/10 glow-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-headline flex items-center gap-3">
                <BrainCircuit className="w-6 h-6 text-primary" />
                Input Protocol
              </CardTitle>
              <CardDescription className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">Neural Sample Analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Textarea 
                placeholder="Feed the neural network your draft (caption, thread, or article)..." 
                className="min-h-[400px] bg-white/5 border-white/10 rounded-2xl text-lg font-body p-6 focus:ring-primary/40 focus:border-primary/40 transition-all shadow-inner"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button 
                onClick={handleAnalyze} 
                className="w-full premium-button h-16 text-xl rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.3)]" 
                disabled={analyzing || !content}
              >
                {analyzing ? (
                  <div className="flex items-center gap-4">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Simulating Engagement...
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Zap className="w-6 h-6" />
                    Simulate Viral Impact
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          <AnimatePresence>
            {report && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <Card className="glass-card bg-primary/5 border-primary/20 p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-primary uppercase text-[10px] tracking-widest">Growth Driver</h4>
                  </div>
                  <h5 className="font-headline font-bold text-lg text-white">Elite Hook Density</h5>
                  <p className="text-sm text-white/60 leading-relaxed">Your initial 20 characters trigger high curiosity indices. Historically linked to 40% CTR surge in your sector.</p>
                </Card>

                <Card className="glass-card bg-secondary/5 border-secondary/20 p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-secondary/10">
                      <ShieldCheck className="w-5 h-5 text-secondary" />
                    </div>
                    <h4 className="font-bold text-secondary uppercase text-[10px] tracking-widest">Network Fit</h4>
                  </div>
                  <h5 className="font-headline font-bold text-lg text-white">Optimal Complexity</h5>
                  <p className="text-sm text-white/60 leading-relaxed">Lexical density matches LinkedIn's elite professional tier. Balanced perfectly for scroll-stopping comprehension.</p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <AnimatePresence mode="wait">
            {report ? (
              <motion.div 
                key="report"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <Card className="glass-card border-white/10 overflow-hidden text-center p-12 relative">
                  <div className="absolute top-0 right-0 p-6 opacity-20">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-muted-foreground font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Viral Matrix Score</h3>
                  
                  <div className="relative inline-flex items-center justify-center">
                    <motion.svg 
                      initial={{ strokeDashoffset: 364 }}
                      animate={{ strokeDashoffset: 364 - (364 * report.viralScore) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="w-48 h-48 transform -rotate-90"
                    >
                      <circle
                        className="text-white/5"
                        strokeWidth="12"
                        stroke="currentColor"
                        fill="transparent"
                        r="80"
                        cx="96"
                        cy="96"
                      />
                      <circle
                        className="text-primary"
                        strokeWidth="12"
                        strokeDasharray={502}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="80"
                        cx="96"
                        cy="96"
                      />
                    </motion.svg>
                    <div className="absolute flex flex-col items-center">
                       <span className="text-6xl font-headline font-bold text-glow">{report.viralScore}</span>
                       <span className="text-[10px] font-bold text-primary tracking-widest uppercase mt-1">Percentile</span>
                    </div>
                  </div>

                  <div className="mt-12 space-y-2">
                    <p className="text-3xl font-headline font-bold premium-gradient bg-clip-text text-transparent italic">
                      {report.engagementPrediction}
                    </p>
                    <p className="text-base text-white/60">This content exceeds performance of 84% of network averages.</p>
                  </div>
                </Card>

                <Card className="glass-card border-white/10 p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[10px] font-bold uppercase text-muted-foreground tracking-[0.3em]">Attribute Breakdown</h3>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                       <Activity className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={report.breakdown} layout="vertical" margin={{ left: -30, right: 30 }}>
                        <XAxis type="number" hide />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          stroke="rgba(255,255,255,0.6)" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false} 
                          width={80}
                        />
                        <Tooltip 
                          cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                          contentStyle={{ 
                            backgroundColor: 'rgba(10, 10, 20, 0.95)', 
                            border: '1px solid rgba(255,255,255,0.1)', 
                            borderRadius: '16px',
                            backdropFilter: 'blur(10px)'
                          }}
                        />
                        <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                          {report.breakdown.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-6">
                  <Card className="glass-card border-white/10 p-6 group hover:border-pink-500/40 transition-all">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Emotional Impact</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-3xl font-headline font-bold text-white">{report.emotionalImpact}%</span>
                      <Heart className="w-6 h-6 text-pink-500 fill-pink-500/20 group-hover:scale-125 transition-transform" />
                    </div>
                    <Progress value={report.emotionalImpact} className="h-1.5 mt-6 bg-pink-500/10" />
                  </Card>
                  <Card className="glass-card border-white/10 p-6 group hover:border-emerald-500/40 transition-all">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Spatial Retention</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-3xl font-headline font-bold text-white">{report.audienceRetention}%</span>
                      <BarChart3 className="w-6 h-6 text-emerald-500 group-hover:scale-125 transition-transform" />
                    </div>
                    <Progress value={report.audienceRetention} className="h-1.5 mt-6 bg-emerald-500/10" />
                  </Card>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[500px] glass-card rounded-[3rem] flex flex-col items-center justify-center p-16 text-center text-muted-foreground border-2 border-dashed border-white/10">
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center mb-10"
                >
                  <TrendingUp className="w-12 h-12 opacity-20" />
                </motion.div>
                <h3 className="text-2xl font-headline font-bold text-white">Simulation Hub Offline</h3>
                <p className="text-base mt-4 max-w-xs mx-auto leading-relaxed">Initialize the neural engine by providing content samples for deep algorithmic processing.</p>
                <div className="mt-12 flex gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-ping" />
                   <div className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-ping [animation-delay:0.3s]" />
                   <div className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-ping [animation-delay:0.6s]" />
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
