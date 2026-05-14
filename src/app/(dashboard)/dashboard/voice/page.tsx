"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Mic, 
  MicOff, 
  Loader2, 
  Zap, 
  Sparkles, 
  Copy, 
  Flame, 
  Target, 
  Brain,
  Globe,
  Waves,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { voiceToContent, VoiceToContentOutput } from "@/ai/flows/voice-to-content"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function VoiceAiPage() {
  const { toast } = useToast()
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<VoiceToContentOutput | null>(null)
  const [platform, setPlatform] = useState<any>("Instagram")
  const [contentType, setContentType] = useState<any>("Caption")
  const [language, setLanguage] = useState("English")

  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true

        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = ""
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript
          }
          setTranscript(currentTranscript)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error)
          setIsRecording(false)
          toast({
            variant: "destructive",
            title: "Microphone Error",
            description: "Could not access microphone or recognition failed.",
          })
        }
      }
    }
  }, [toast])

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop()
      setIsRecording(false)
    } else {
      setTranscript("")
      recognitionRef.current?.start()
      setIsRecording(true)
    }
  }

  const handleGenerate = async () => {
    if (!transcript.trim()) return
    setLoading(true)
    try {
      const output = await voiceToContent({
        transcript,
        platform,
        contentType,
        language
      })
      setResult(output)
      toast({
        title: "Voice Manifested",
        description: "Your spoken ideas have been crystallized into viral content.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Synthesis Failed",
        description: "The AI could not process your neural vocal frequency.",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ description: "Copied to neural clipboard" })
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in py-6">
      <div className="flex flex-col gap-3">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4"
        >
          <div className="p-4 rounded-2xl premium-gradient shadow-[0_0_20px_rgba(139,92,246,0.4)]">
            <Mic className="w-8 h-8 text-white fill-white/20" />
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">
            Voice <span className="premium-gradient bg-clip-text text-transparent italic">Manifest</span>
          </h1>
        </motion.div>
        <p className="text-muted-foreground text-lg max-w-2xl">Speak your vision. Let AI translate your vocal energy into algorithm-piercing micro-content.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-8">
          <Card className="glass-card border-white/10 glow-border">
            <CardHeader>
              <CardTitle className="text-2xl font-headline flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Vocal Interface
              </CardTitle>
              <CardDescription className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">Vocal Input Protocol</CardDescription>
            </CardHeader>
            <CardContent className="space-y-10">
              <div className="flex flex-col items-center justify-center p-12 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
                <AnimatePresence>
                  {isRecording && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-48 h-48 bg-primary rounded-full blur-3xl"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative z-10 flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleRecording}
                    className={cn(
                      "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl",
                      isRecording 
                        ? "bg-destructive text-destructive-foreground shadow-[0_0_40px_rgba(239,68,68,0.4)]" 
                        : "bg-primary text-primary-foreground shadow-[0_0_40px_rgba(139,92,246,0.4)]"
                    )}
                  >
                    {isRecording ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
                  </motion.button>
                  <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-white">
                    {isRecording ? "Recording Neural Feed..." : "Initialize Mic"}
                  </p>
                </div>

                {isRecording && (
                  <div className="mt-8 flex items-center gap-1 h-8">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [4, Math.random() * 24 + 4, 4] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                        className="w-1 bg-primary rounded-full"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Neural Stream</div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 min-h-[150px] text-lg font-body leading-relaxed text-white/80 italic">
                  {transcript || "Speak into the void to begin transcription..."}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Platform</label>
                  <Select onValueChange={setPlatform} defaultValue={platform}>
                    <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                      <SelectItem value="Twitter/X">Twitter/X</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Type</label>
                  <Select onValueChange={setContentType} defaultValue={contentType}>
                    <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl">
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="Caption">Caption</SelectItem>
                      <SelectItem value="Reel Script">Reel Script</SelectItem>
                      <SelectItem value="Carousel">Carousel</SelectItem>
                      <SelectItem value="Thread">Thread</SelectItem>
                      <SelectItem value="Blog Intro">Blog Intro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Linguistic Mode</label>
                <Select onValueChange={setLanguage} defaultValue={language}>
                  <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGenerate} 
                className="w-full premium-button h-16 text-xl rounded-2xl" 
                disabled={loading || !transcript}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Crystallizing Thoughts...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    Transform Vocal Stream
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <Card className="glass-card border-white/10 overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between bg-primary/10 border-b border-white/5 p-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-white/10">
                        <Waves className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-headline">Vocal Crystallization</CardTitle>
                        <CardDescription className="font-bold text-primary uppercase text-[10px] tracking-widest">
                          {platform} • {contentType}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Viral Potential</span>
                      <Badge className="bg-primary text-white h-8 px-4 text-sm font-bold rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                        <Flame className="w-4 h-4 mr-2" />
                        {result.viralityScore}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-10">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-3xl bg-white/5 border border-primary/30 relative group"
                    >
                      <div className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4 flex items-center">
                        <Zap className="w-3 h-3 mr-2" />
                        Aural Hook
                      </div>
                      <p className="text-2xl font-headline font-bold text-white leading-tight">{result.viralHook}</p>
                      <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/5 hover:bg-white/10 rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-all" onClick={() => copyToClipboard(result.viralHook)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </motion.div>

                    <div className="space-y-4">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] flex items-center">
                        <Target className="w-3 h-3 mr-2" />
                        Optimized Manifestation
                      </div>
                      <div className="p-8 rounded-3xl border border-white/5 bg-white/2 whitespace-pre-wrap leading-relaxed text-lg font-body shadow-inner group relative">
                        {result.mainContent}
                        <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/5 hover:bg-white/10 rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-all" onClick={() => copyToClipboard(result.mainContent)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-bold uppercase text-primary tracking-[0.3em] flex items-center">
                          <Brain className="w-3 h-3 mr-2" />
                          Tone Analysis
                        </h4>
                        <div className="text-sm p-4 rounded-2xl bg-primary/5 border border-primary/20 text-white/80">
                          {result.toneAnalysis}
                        </div>
                      </div>
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-bold uppercase text-secondary tracking-[0.3em] flex items-center">
                          <CheckCircle2 className="w-3 h-3 mr-2" />
                          Growth Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {result.hashtags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="bg-white/5 border-white/10 hover:bg-white/10">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card bg-secondary/5 border-secondary/20 p-8">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary flex items-center mb-6">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Neural Recommendations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.recommendations.map((rec, i) => (
                      <div key={i} className="flex gap-3 text-sm text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                        <p>{rec}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ) : (
              <div className="h-full min-h-[600px] glass-card rounded-[3rem] flex flex-col items-center justify-center p-20 text-center text-muted-foreground border-2 border-dashed border-white/10 group">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-10"
                >
                  <Waves className="w-16 h-16 text-primary" />
                </motion.div>
                <h3 className="text-3xl font-headline font-bold text-white mb-4">Aural Buffer Empty</h3>
                <p className="max-w-md text-lg mx-auto">Initialize the vocal interface on the left and speak your ideas. The AI will crystallize your voice into viral gold.</p>
                <div className="mt-12 flex gap-4">
                   <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
                   <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse [animation-delay:0.5s]" />
                   <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse [animation-delay:1s]" />
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
