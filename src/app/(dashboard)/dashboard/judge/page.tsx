
"use client"

import { useState } from "react"
import { critiqueAndImproveContent, CritiqueAndImproveContentOutput } from "@/ai/flows/critique-and-improve-content"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Scale, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ClipboardCheck,
  Zap,
  Star,
  Search,
  BookOpen,
  TrendingUp,
  Sparkles
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export default function AIJudgePage() {
  const { toast } = useToast()
  const [content, setContent] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [report, setReport] = useState<CritiqueAndImproveContentOutput | null>(null)

  const handleAnalyze = async () => {
    if (!content.trim()) return
    setAnalyzing(true)
    try {
      const output = await critiqueAndImproveContent({ content })
      setReport(output)
      toast({
        title: "Analysis Complete",
        description: "Your content has been reviewed by the AI Judge.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze content.",
      })
    } finally {
      setAnalyzing(false)
    }
  }

  const copyImproved = () => {
    if (report) {
      navigator.clipboard.writeText(report.improvedContent)
      toast({ description: "Improved version copied!" })
    }
  }

  const ScoreItem = ({ label, value, icon: Icon }: any) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <span className="font-medium">{label}</span>
        </div>
        <span className="font-bold">{value}%</span>
      </div>
      <Progress value={value} className="h-1.5" />
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in">
      <div className="flex flex-col gap-2 text-center md:text-left">
        <h1 className="text-3xl font-headline font-bold">AI Judge My Content</h1>
        <p className="text-muted-foreground">Brutally honest critique and AI-powered improvements.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-4 space-y-6 xl:sticky xl:top-8">
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Original Content</CardTitle>
              <CardDescription>Paste what you've written below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="The AI Judge is ready for your draft..." 
                className="min-h-[400px] bg-background/50 border-border/30 focus:border-primary/50"
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
                    Judging your work...
                  </>
                ) : (
                  <>
                    <Scale className="w-4 h-4 mr-2" />
                    Critique & Improve
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-8 space-y-8">
          {report ? (
            <div className="space-y-8 animate-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1 border-border/50 bg-card/40 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Overall Grade</h3>
                  <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center mb-4">
                    <span className="text-3xl font-headline font-bold">{report.overallScore}%</span>
                  </div>
                  <Badge variant={report.overallScore > 80 ? "default" : "secondary"}>
                    {report.overallScore > 90 ? "Excellent" : report.overallScore > 70 ? "Good" : "Needs Work"}
                  </Badge>
                </Card>

                <Card className="md:col-span-2 border-border/50 bg-card/40 backdrop-blur-sm p-6">
                  <h3 className="text-sm font-semibold mb-6">Score Breakdown</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    <ScoreItem label="Grammar" value={report.scoreBreakdown.grammar} icon={CheckCircle2} />
                    <ScoreItem label="Clarity" value={report.scoreBreakdown.clarity} icon={Search} />
                    <ScoreItem label="SEO" value={report.scoreBreakdown.seo} icon={TrendingUp} />
                    <ScoreItem label="Emotional" value={report.scoreBreakdown.emotionalTone} icon={Zap} />
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="bg-primary/5 border-b border-border/50">
                    <CardTitle className="text-lg flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2 text-primary" />
                      Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border/50">
                      {report.suggestions.map((suggestion, i) => (
                        <div key={i} className="p-4 flex gap-3 text-sm hover:bg-background/40 transition-colors">
                          <span className="text-muted-foreground font-mono">0{i+1}</span>
                          <p>{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="bg-secondary/5 border-b border-border/50">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-secondary" />
                        Improved Version
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={copyImproved}>
                        <ClipboardCheck className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                      {report.improvedContent}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-primary" />
                    Before & After Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-background/50 border border-border/50 text-sm leading-relaxed italic text-muted-foreground">
                    {report.beforeAfterComparison}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[600px] flex flex-col items-center justify-center p-12 text-center text-muted-foreground border-2 border-dashed border-border/50 rounded-2xl">
              <div className="w-20 h-20 rounded-full bg-muted/10 flex items-center justify-center mb-8">
                <Scale className="w-10 h-10 opacity-20" />
              </div>
              <h3 className="text-2xl font-headline font-semibold text-foreground">Awaiting Your Work</h3>
              <p className="max-w-md mt-2">Paste your draft in the sidebar and click "Critique" to receive a professional grade and improved version.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
