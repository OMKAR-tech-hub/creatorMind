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
  Info
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
        engagementPrediction: "High",
        audienceRetention: 65,
        breakdown: [
          { name: "Hooks", value: 92 },
          { name: "Relevance", value: 85 },
          { name: "Format", value: 72 },
          { name: "Vibe", value: 88 },
        ]
      })
      setAnalyzing(false)
    }, 1500)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold">Viral Predictor</h1>
        <p className="text-muted-foreground">AI-driven score predicting how your content will perform in the wild.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Content to Analyze</CardTitle>
              <CardDescription>Paste your draft below for engagement prediction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Paste your post caption, thread or article here..." 
                className="min-h-[300px] bg-background/50"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button 
                onClick={handleAnalyze} 
                className="w-full premium-gradient h-11" 
                disabled={analyzing || !content}
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing Engagement Patterns...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Predict Virality
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {report && (
            <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">AI Improvement Rationale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 flex gap-4">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Strong Opening Hook</h4>
                    <p className="text-sm text-muted-foreground">Your first 10 words trigger high curiosity. This pattern historically correlates with a 40% higher click-through rate in your niche.</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20 flex gap-4">
                  <Info className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-secondary mb-1">Optimal Complexity</h4>
                    <p className="text-sm text-muted-foreground">The readability score is perfect for LinkedIn's professional audience. Not too simple to be ignored, not too dense to be scrolled past.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-5 space-y-6">
          {report ? (
            <div className="space-y-6 animate-in">
              <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden text-center p-8">
                <div className="absolute top-0 right-0 p-4">
                  <Sparkles className="w-5 h-5 text-primary opacity-50" />
                </div>
                <h3 className="text-muted-foreground font-medium uppercase tracking-widest text-xs mb-4">Viral Score</h3>
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      className="text-muted/10"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="text-primary"
                      strokeWidth="10"
                      strokeDasharray={364}
                      strokeDashoffset={364 - (364 * report.viralScore) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                  </svg>
                  <span className="absolute text-4xl font-headline font-bold">{report.viralScore}</span>
                </div>
                <div className="mt-6">
                  <p className="text-xl font-headline font-semibold text-primary">Viral Potential: {report.engagementPrediction}</p>
                  <p className="text-sm text-muted-foreground mt-2">This content outperforms 84% of your recent history.</p>
                </div>
              </Card>

              <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold uppercase text-muted-foreground">Attribute Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={report.breakdown} layout="vertical" margin={{ left: -20, right: 20 }}>
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        stroke="hsl(var(--foreground))" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <Tooltip 
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: 'none', borderRadius: '8px' }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                        {report.breakdown.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="border-border/50 bg-card/40 backdrop-blur-sm p-4">
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Impact</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-2xl font-bold">{report.emotionalImpact}%</span>
                    <Heart className="w-5 h-5 text-pink-500" />
                  </div>
                  <Progress value={report.emotionalImpact} className="h-1 mt-3" />
                </Card>
                <Card className="border-border/50 bg-card/40 backdrop-blur-sm p-4">
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Retention</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-2xl font-bold">{report.audienceRetention}%</span>
                    <BarChart3 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <Progress value={report.audienceRetention} className="h-1 mt-3" />
                </Card>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-border/50 rounded-xl flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 opacity-20" />
              </div>
              <h3 className="text-lg font-headline font-medium text-foreground">Awaiting Content</h3>
              <p className="text-sm mt-2">Paste your copy on the left to see the AI magic.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}