
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  Heart, 
  Sparkles, 
  Loader2, 
  Zap, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Twitter,
  Copy,
  Info,
  Flame,
  Target,
  Smile,
  Frown,
  Zap as ExcitedIcon,
  Shield,
  Star,
  Brain,
  Coffee,
  Waves
} from "lucide-react"
import { generateMoodContent, GenerateMoodContentOutput } from "@/ai/flows/generate-mood-content"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

const moods = [
  { id: 'Motivated', icon: Coffee, label: 'Motivated', color: 'text-orange-400' },
  { id: 'Sad', icon: Frown, label: 'Vulnerable', color: 'text-blue-400' },
  { id: 'Happy', icon: Smile, label: 'Radiant', color: 'text-yellow-400' },
  { id: 'Lonely', icon: Waves, label: 'Reflective', color: 'text-indigo-400' },
  { id: 'Excited', icon: ExcitedIcon, label: 'Hyper', color: 'text-pink-400' },
  { id: 'Confident', icon: Shield, label: 'Unyielding', color: 'text-emerald-400' },
  { id: 'Emotional', icon: Heart, label: 'Raw', color: 'text-rose-400' },
  { id: 'Funny', icon: Sparkles, label: 'Chaotic', color: 'text-cyan-400' },
  { id: 'Inspirational', icon: Brain, label: 'Zenith', color: 'text-violet-400' },
]

const formSchema = z.object({
  mood: z.enum(['Motivated', 'Sad', 'Happy', 'Lonely', 'Excited', 'Confident', 'Emotional', 'Funny', 'Inspirational']),
  platform: z.enum(['Instagram', 'YouTube', 'LinkedIn', 'Twitter/X']),
  contentType: z.enum(['Reel Script', 'Caption', 'Carousel', 'Thread', 'Story Idea']),
  tone: z.enum(['Professional', 'Emotional', 'Viral', 'Funny', 'Inspirational']),
})

export default function MoodAiPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GenerateMoodContentOutput | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: "Motivated",
      platform: "Instagram",
      contentType: "Caption",
      tone: "Viral",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const output = await generateMoodContent(values)
      setResult(output)
      toast({
        title: "Emotional Matrix Synced",
        description: "Your human-centric viral code has been synthesized.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Neural Disconnection",
        description: "The AI failed to map your emotional spectrum.",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ description: "Copied to neural clipboard" })
  }

  const PlatformIcon = ({ platform }: { platform: string }) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="w-5 h-5 text-pink-500" />
      case 'LinkedIn': return <Linkedin className="w-5 h-5 text-blue-600" />
      case 'YouTube': return <Youtube className="w-5 h-5 text-red-600" />
      case 'Twitter/X': return <Twitter className="w-5 h-5" />
      default: return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in py-6">
      <div className="flex flex-col gap-3 text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4 justify-center md:justify-start"
        >
          <div className="p-4 rounded-2xl premium-gradient shadow-[0_0_20px_rgba(139,92,246,0.4)]">
            <Heart className="w-8 h-8 text-white fill-white/20" />
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">
            Neuro-Mood <span className="premium-gradient bg-clip-text text-transparent italic">Sync</span>
          </h1>
        </motion.div>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">Transmute your current energy into algorithm-piercing content that feels undeniably human.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-8">
          <Card className="glass-card border-white/10 glow-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-headline flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Emotional Input
              </CardTitle>
              <CardDescription className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">Calibration Parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="mood"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Select Current Frequency</FormLabel>
                        <div className="grid grid-cols-3 gap-3">
                          {moods.map((m) => (
                            <motion.div
                              key={m.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => field.onChange(m.id)}
                              className={cn(
                                "flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300",
                                field.value === m.id 
                                  ? "bg-primary/20 border-primary shadow-[0_0_15px_rgba(139,92,246,0.3)]" 
                                  : "bg-white/5 border-white/5 hover:border-white/20"
                              )}
                            >
                              <m.icon className={cn("w-6 h-6 mb-2", m.color)} />
                              <span className="text-[10px] font-bold uppercase tracking-tighter">{m.label}</span>
                            </motion.div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Network</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl">
                                <SelectValue placeholder="Platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="glass-card">
                              <SelectItem value="Instagram">Instagram</SelectItem>
                              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                              <SelectItem value="YouTube">YouTube</SelectItem>
                              <SelectItem value="Twitter/X">Twitter/X</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Aura</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl">
                                <SelectValue placeholder="Tone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="glass-card">
                              <SelectItem value="Viral">Viral</SelectItem>
                              <SelectItem value="Professional">Professional</SelectItem>
                              <SelectItem value="Emotional">Emotional</SelectItem>
                              <SelectItem value="Funny">Funny</SelectItem>
                              <SelectItem value="Inspirational">Inspirational</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="contentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Manifestation Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="glass-card">
                            <SelectItem value="Reel Script">Reel Script</SelectItem>
                            <SelectItem value="Caption">Caption</SelectItem>
                            <SelectItem value="Carousel">Carousel</SelectItem>
                            <SelectItem value="Thread">Thread</SelectItem>
                            <SelectItem value="Story Idea">Story Idea</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full premium-button h-14 text-xl rounded-2xl" disabled={loading}>
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Mapping Consciousness...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-6 h-6" />
                        Sync Neural Content
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
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
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8"
              >
                <Card className="glass-card border-white/10 overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between bg-primary/10 border-b border-white/5 p-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-white/10 border border-white/20">
                        <PlatformIcon platform={form.getValues().platform} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-headline">{form.getValues().contentType}</CardTitle>
                        <CardDescription className="font-bold text-primary uppercase text-[10px] tracking-widest">
                          {form.getValues().mood} Energy State
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Viral Index</span>
                      <Badge className="bg-primary text-white h-8 px-4 text-sm font-bold rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                        <Flame className="w-4 h-4 mr-2" />
                        {result.viralScore}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-10">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-3xl bg-white/5 border border-primary/30 relative group overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                         <ExcitedIcon className="w-20 h-20 text-primary" />
                      </div>
                      <div className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4 flex items-center">
                        <Zap className="w-3 h-3 mr-2" />
                        Neural Hook
                      </div>
                      <p className="text-2xl md:text-3xl font-headline font-bold leading-tight text-white relative z-10">{result.viralHook}</p>
                      <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/5 hover:bg-white/10 rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-all" onClick={() => copyToClipboard(result.viralHook)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </motion.div>

                    <div className="space-y-4">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] flex items-center">
                        <Target className="w-3 h-3 mr-2" />
                        Manifestation Body
                      </div>
                      <div className="p-8 rounded-3xl border border-white/5 bg-white/2 whitespace-pre-wrap leading-relaxed text-lg font-body shadow-inner">
                        {result.mainContent}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase text-primary tracking-[0.3em] flex items-center">
                          <ActivityIcon className="w-3 h-3 mr-2" />
                          Emotional Trigger
                        </h4>
                        <div className="text-sm font-bold p-4 rounded-2xl bg-primary/5 border border-primary/20 text-white/90">
                          {result.audienceTrigger}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase text-secondary tracking-[0.3em] flex items-center">
                          <ClockIcon className="w-3 h-3 mr-2" />
                          Spatial Strategy
                        </h4>
                        <div className="text-xs text-muted-foreground leading-relaxed italic p-4 rounded-2xl bg-secondary/5 border border-secondary/20">
                          {result.postingStrategy}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card bg-primary/5 border-primary/20 p-8 relative overflow-hidden">
                   <div className="absolute -right-8 -bottom-8 opacity-5">
                      <Sparkles className="w-48 h-48" />
                   </div>
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-lg font-bold uppercase text-primary tracking-[0.2em] flex items-center">
                      <Brain className="w-5 h-5 mr-3" />
                      Synthesis Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-base leading-relaxed text-white/80">
                      {result.explanation}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {result.hashtags.map((tag, i) => (
                        <Badge key={i} className="bg-white/5 hover:bg-white/10 text-muted-foreground border-white/10 h-8 px-3 rounded-xl cursor-pointer transition-colors">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
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
                  <Heart className="w-16 h-16 text-primary fill-primary/10" />
                </motion.div>
                <h3 className="text-3xl font-headline font-bold text-white mb-4">Neural Buffer Empty</h3>
                <p className="max-w-md text-lg mx-auto">Select your current emotional frequency and manifest content that resonates with the collective consciousness.</p>
                <div className="mt-10 flex gap-4">
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

function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
