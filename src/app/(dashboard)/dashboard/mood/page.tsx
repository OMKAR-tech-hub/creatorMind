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
  Target
} from "lucide-react"
import { generateMoodContent, GenerateMoodContentOutput } from "@/ai/flows/generate-mood-content"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
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
import { Progress } from "@/components/ui/progress"

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
        title: "Mood Content Ready",
        description: "Your emotionally-aligned content has been synthesized.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Synthesis Error",
        description: "The AI could not capture your mood. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ description: "Copied to clipboard!" })
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
    <div className="max-w-7xl mx-auto space-y-8 animate-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/20">
            <Heart className="w-7 h-7 text-primary fill-primary/20" />
          </div>
          Mood-to-Content AI
        </h1>
        <p className="text-muted-foreground">Channel your current energy into high-performing micro-content.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm sticky top-8">
            <CardHeader>
              <CardTitle className="text-xl">Emotion Engine</CardTitle>
              <CardDescription>How are you feeling right now?</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="mood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Mood</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select your mood" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {['Motivated', 'Sad', 'Happy', 'Lonely', 'Excited', 'Confident', 'Emotional', 'Funny', 'Inspirational'].map(m => (
                              <SelectItem key={m} value={m}>{m}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Platform</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
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
                          <FormLabel>Target Tone</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Tone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
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
                        <FormLabel>Content Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
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

                  <Button type="submit" className="w-full premium-gradient h-12 text-lg font-bold" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing Emotions...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Sync Content to Mood
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in">
              <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between bg-primary/5 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <PlatformIcon platform={form.getValues().platform} />
                    <div>
                      <CardTitle className="text-lg">{form.getValues().contentType}</CardTitle>
                      <CardDescription>Based on your {form.getValues().mood} mood</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30 h-7">
                    <Flame className="w-3 h-3 mr-1" />
                    Viral Score: {result.viralScore}%
                  </Badge>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="p-4 rounded-xl bg-background/50 border border-primary/20 relative group">
                    <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center">
                      <Zap className="w-3 h-3 mr-1" />
                      The Hook
                    </div>
                    <p className="text-xl font-headline font-bold leading-tight">{result.viralHook}</p>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => copyToClipboard(result.viralHook)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center">
                      Content Body
                    </div>
                    <div className="p-4 rounded-xl border border-border/50 bg-background/20 whitespace-pre-wrap leading-relaxed text-sm">
                      {result.mainContent}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-widest flex items-center">
                        <Target className="w-3 h-3 mr-2" />
                        Audience Trigger
                      </h4>
                      <div className="text-sm font-medium p-3 rounded-lg bg-secondary/5 border border-secondary/20">
                        {result.audienceTrigger}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-widest flex items-center">
                        <Info className="w-3 h-3 mr-2" />
                        Posting Strategy
                      </h4>
                      <div className="text-xs text-muted-foreground leading-relaxed italic">
                        {result.postingStrategy}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase text-primary tracking-widest flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Why this works
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {result.explanation}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.hashtags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-background/40 hover:bg-background/60 cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-2 border-dashed border-border/50 rounded-2xl flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
              <div className="w-20 h-20 rounded-full bg-muted/10 flex items-center justify-center mb-8">
                <Heart className="w-10 h-10 opacity-20" />
              </div>
              <h3 className="text-2xl font-headline font-semibold text-foreground">Mood Hub Awaiting</h3>
              <p className="max-w-md mt-2 mx-auto">Select your current emotional state and platform targets to generate human-centric viral content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
