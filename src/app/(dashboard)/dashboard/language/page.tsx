"use client"

import { useState } from "react"
import { generateMultilingualContent, GenerateMultilingualContentOutput } from "@/ai/flows/generate-multilingual-content"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Languages, 
  Loader2, 
  Copy, 
  Globe, 
  Sparkles,
  Search,
  CheckCircle2,
  Info
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

const languages = [
  { name: 'English', code: 'en' },
  { name: 'Hindi', code: 'hi' },
  { name: 'Spanish', code: 'es' },
  { name: 'French', code: 'fr' },
  { name: 'Marathi', code: 'mr' },
  { name: 'Tamil', code: 'ta' },
  { name: 'Telugu', code: 'te' },
  { name: 'Kannada', code: 'kn' },
]

export default function LanguageCreatorPage() {
  const { toast } = useToast()
  const [content, setContent] = useState("")
  const [targetLang, setTargetLang] = useState("Hindi")
  const [platform, setPlatform] = useState("Instagram")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GenerateMultilingualContentOutput | null>(null)

  const handleTranslate = async () => {
    if (!content.trim()) return
    setLoading(true)
    try {
      const output = await generateMultilingualContent({
        originalContent: content,
        originalLanguage: "English",
        targetLanguage: targetLang,
        platform: platform,
        tone: "Engaging and culturally relevant"
      })
      setResult(output)
      toast({ title: "Translation Complete", description: `Content adapted for ${targetLang}.` })
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Translation failed." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold">Global Culture Mode</h1>
        <p className="text-muted-foreground">Go global with AI that understands cultural nuances and local slang.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm h-fit sticky top-8">
            <CardHeader>
              <CardTitle className="text-lg">Original Text</CardTitle>
              <CardDescription>Input in English (or any language)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Textarea 
                placeholder="Write your content here..." 
                className="min-h-[250px] bg-background/50"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Target Language</label>
                  <Select onValueChange={setTargetLang} defaultValue={targetLang}>
                    <SelectTrigger>
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.name}>{lang.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Platform</label>
                  <Select onValueChange={setPlatform} defaultValue={platform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Twitter">Twitter/X</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleTranslate} 
                className="w-full premium-gradient h-11" 
                disabled={loading || !content}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adapting Culture...
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4 mr-2" />
                    Localize Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in">
              <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-primary/5 border-b border-border/50">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center">
                      <Languages className="w-4 h-4 mr-2" />
                      Localized Content ({targetLang})
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(result.translatedContent)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-lg font-body leading-relaxed whitespace-pre-wrap">
                    {result.translatedContent}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Cultural Adaptation Rationale</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20 flex gap-4">
                    <Info className="w-5 h-5 text-secondary shrink-0" />
                    <p className="text-sm text-foreground/80">{result.culturalToneAdaptationDescription}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Local Hashtags</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {result.localHashtags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-2 border-dashed border-border/50 rounded-2xl flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
              <div className="w-20 h-20 rounded-full bg-muted/10 flex items-center justify-center mb-8">
                <Globe className="w-10 h-10 opacity-20" />
              </div>
              <h3 className="text-xl font-headline font-semibold text-foreground">Global Reach Starts Here</h3>
              <p className="max-w-xs mx-auto mt-2">Select a target language and see your message resonate across cultures.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}