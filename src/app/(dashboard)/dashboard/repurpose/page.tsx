"use client"

import { useState } from "react"
import { repurposeLongFormContent, RepurposeLongFormContentOutput } from "@/ai/flows/repurpose-long-form-content"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Layers, 
  Loader2, 
  CheckCircle2, 
  Copy, 
  Share2, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Mail,
  Video,
  FileText
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

const formats = [
  { id: 'reels-caption', label: 'Reels Caption', icon: Video },
  { id: 'carousel-text', label: 'Carousel Text', icon: Layers },
  { id: 'linkedin-post', label: 'LinkedIn Post', icon: Linkedin },
  { id: 'twitter-thread', label: 'Twitter Thread', icon: Twitter },
  { id: 'email-newsletter', label: 'Email Newsletter', icon: Mail },
  { id: 'shorts-caption', label: 'Shorts Caption', icon: Video },
] as const

type FormatId = typeof formats[number]['id']

export default function RepurposePage() {
  const { toast } = useToast()
  const [content, setContent] = useState("")
  const [selectedFormats, setSelectedFormats] = useState<FormatId[]>([])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<RepurposeLongFormContentOutput | null>(null)

  const toggleFormat = (id: FormatId) => {
    setSelectedFormats(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const handleRepurpose = async () => {
    if (!content.trim() || selectedFormats.length === 0) return
    setLoading(true)
    try {
      const output = await repurposeLongFormContent({
        content,
        targetFormats: selectedFormats as any[],
        tone: "Engaging and professional"
      })
      setResults(output)
      toast({ title: "Repurposing Successful", description: "Your short-form content is ready." })
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to repurpose content." })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ description: "Copied to clipboard!" })
  }

  const getIconForFormat = (formatId: string) => {
    const f = formats.find(fmt => fmt.id === formatId)
    return f ? <f.icon className="w-4 h-4" /> : null
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold">Repurpose Studio</h1>
        <p className="text-muted-foreground">Turn one blog or transcript into a month's worth of social media content.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Long-form Input</CardTitle>
              <CardDescription>Paste your article, script or blog post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Paste the source material here..." 
                className="min-h-[300px] bg-background/50"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              
              <div className="space-y-4">
                <Label className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Target Formats</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {formats.map((format) => (
                    <div 
                      key={format.id} 
                      onClick={() => toggleFormat(format.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedFormats.includes(format.id) 
                          ? 'border-primary bg-primary/10 ring-1 ring-primary' 
                          : 'border-border/50 bg-background/50 hover:border-primary/30'
                      }`}
                    >
                      <format.icon className={`w-4 h-4 ${selectedFormats.includes(format.id) ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="text-sm font-medium">{format.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleRepurpose} 
                className="w-full premium-gradient h-11" 
                disabled={loading || !content || selectedFormats.length === 0}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Intelligently Splitting Content...
                  </>
                ) : (
                  <>
                    <Layers className="w-4 h-4 mr-2" />
                    Generate Multi-Format Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {results ? (
            <div className="space-y-6 animate-in">
              {Object.entries(results).map(([formatId, outputContent]) => (
                <Card key={formatId} className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/50 bg-background/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {getIconForFormat(formatId)}
                      </div>
                      <CardTitle className="text-sm font-headline uppercase tracking-wide">
                        {formats.find(f => f.id === formatId)?.label}
                      </CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(outputContent)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
                      {outputContent}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-2 border-dashed border-border/50 rounded-2xl flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
              <div className="w-20 h-20 rounded-full bg-muted/10 flex items-center justify-center mb-8">
                <Layers className="w-10 h-10 opacity-20" />
              </div>
              <h3 className="text-xl font-headline font-semibold text-foreground">Awaiting Source Material</h3>
              <p className="max-w-xs mx-auto mt-2">Paste your long-form content on the left to transform it into viral micro-content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}