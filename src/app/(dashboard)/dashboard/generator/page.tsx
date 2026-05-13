"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  Sparkles, 
  Copy, 
  Download, 
  RefreshCw, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Twitter, 
  Mail, 
  FileText,
  CheckCircle2,
  Loader2,
  Zap
} from "lucide-react"
import { generatePromptedContent, GeneratePromptedContentOutput } from "@/ai/flows/generate-prompted-content"
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  topic: z.string().min(5, "Topic must be at least 5 characters"),
  platform: z.enum(['Instagram', 'LinkedIn', 'YouTube', 'Twitter/X', 'Blog', 'Email Newsletter']),
  tone: z.enum(['Motivational', 'Funny', 'Romantic', 'Inspirational', 'Luxury', 'Gen Z', 'Professional', 'Informative', 'Persuasive', 'Casual']),
  contentLength: z.enum(['brief', 'short', 'medium', 'long', 'detailed']),
})

export default function ContentLabPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GeneratePromptedContentOutput | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      platform: "Instagram",
      tone: "Professional",
      contentLength: "medium",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const output = await generatePromptedContent(values)
      setResult(output)
      toast({
        title: "Content Generated!",
        description: "Your viral content is ready to be used.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate content. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      description: "Copied to clipboard!",
    })
  }

  const PlatformIcon = ({ platform }: { platform: string }) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="w-5 h-5 text-pink-500" />
      case 'LinkedIn': return <Linkedin className="w-5 h-5 text-blue-600" />
      case 'YouTube': return <Youtube className="w-5 h-5 text-red-600" />
      case 'Twitter/X': return <Twitter className="w-5 h-5" />
      case 'Email Newsletter': return <Mail className="w-5 h-5 text-yellow-500" />
      case 'Blog': return <FileText className="w-5 h-5 text-emerald-500" />
      default: return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold">Content Lab</h1>
        <p className="text-muted-foreground">Generate viral-ready content tailored for any platform.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-5 h-fit border-border/50 bg-card/40 backdrop-blur-sm sticky top-8">
          <CardHeader>
            <CardTitle className="text-xl">Parameters</CardTitle>
            <CardDescription>Configure your AI engine settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What's the topic?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="e.g. Why AI will change content creation forever" 
                          className="min-h-[100px] resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>Describe what you want to write about.</FormDescription>
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
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Instagram">Instagram</SelectItem>
                            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                            <SelectItem value="YouTube">YouTube</SelectItem>
                            <SelectItem value="Twitter/X">Twitter/X</SelectItem>
                            <SelectItem value="Blog">Blog</SelectItem>
                            <SelectItem value="Email Newsletter">Email</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Motivational">Motivational</SelectItem>
                            <SelectItem value="Funny">Funny</SelectItem>
                            <SelectItem value="Professional">Professional</SelectItem>
                            <SelectItem value="Informative">Informative</SelectItem>
                            <SelectItem value="Gen Z">Gen Z</SelectItem>
                            <SelectItem value="Luxury">Luxury</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="contentLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select length" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="brief">Brief</SelectItem>
                          <SelectItem value="short">Short</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="long">Long</SelectItem>
                          <SelectItem value="detailed">Detailed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full premium-gradient h-11" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Synthesizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in">
              <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border/50 bg-background/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <PlatformIcon platform={form.getValues().platform} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{form.getValues().platform} Post</CardTitle>
                      <CardDescription>{form.getValues().tone} • {form.getValues().contentLength}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.mainContent)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed font-body">
                      {result.mainContent}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {result.hooks && result.hooks.length > 0 && (
                <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-md font-headline flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-primary" />
                      Magnetic Hooks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {result.hooks.map((hook, i) => (
                      <div key={i} className="group relative p-3 rounded-lg border border-border/50 bg-background/20 hover:border-primary/50 transition-all">
                        <p className="text-sm pr-10">{hook}</p>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard(hook)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.hashtags && result.hashtags.length > 0 && (
                  <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Hashtags</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      {result.hashtags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 cursor-pointer">
                          {tag}
                        </Badge>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {result.ctas && result.ctas.length > 0 && (
                  <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Call to Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {result.ctas.map((cta, i) => (
                        <div key={i} className="text-sm p-2 rounded bg-background/40 border border-border/50">
                          {cta}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-2 border-dashed border-border/50 rounded-xl flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 opacity-20" />
              </div>
              <h3 className="text-xl font-headline font-medium text-foreground">Awaiting Input</h3>
              <p className="max-w-xs mx-auto mt-2">Configure the parameters on the left and click "Generate" to start creating magic.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
