"use client"

import { useState, useEffect } from "react"
import { 
  Search, 
  TrendingUp, 
  Flame, 
  Globe, 
  ArrowUpRight, 
  Zap, 
  Loader2,
  RefreshCw,
  Instagram,
  Twitter,
  Linkedin,
  Youtube
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

const mockTrends = [
  { id: 1, topic: "#GenerativeVideo", reach: "12.4M", velocity: "+450%", platform: "Twitter/X", category: "Tech" },
  { id: 2, topic: "Quiet Luxury Aesthetic", reach: "8.2M", velocity: "+120%", platform: "Instagram", category: "Lifestyle" },
  { id: 3, topic: "Post-SaaS Era", reach: "2.1M", velocity: "+300%", platform: "LinkedIn", category: "Business" },
  { id: 4, topic: "Hydration Hacks", reach: "45M", velocity: "+80%", platform: "YouTube", category: "Health" },
  { id: 5, topic: "Solopreneur Burnout", reach: "1.5M", velocity: "+210%", platform: "LinkedIn", category: "Business" },
  { id: 6, topic: "VR Meditation", reach: "3.2M", velocity: "+150%", platform: "Instagram", category: "Tech" },
]

export default function TrendFinderPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [trends, setTrends] = useState(mockTrends)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Trends Updated",
        description: "Real-time viral topics have been refreshed.",
      })
    }, 1500)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="w-4 h-4 text-pink-500" />
      case 'Twitter/X': return <Twitter className="w-4 h-4" />
      case 'LinkedIn': return <Linkedin className="w-4 h-4 text-blue-600" />
      case 'YouTube': return <Youtube className="w-4 h-4 text-red-600" />
      default: return <Globe className="w-4 h-4" />
    }
  }

  if (!mounted) return null

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Trend Finder</h1>
          <p className="text-muted-foreground">AI-curated insights into what's capturing attention right now.</p>
        </div>
        <Button onClick={handleRefresh} variant="outline" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
          Refresh Trends
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search for a niche or topic (e.g. 'Sustainable Fashion')..." 
          className="pl-10 h-12 bg-card/40 border-border/50 backdrop-blur-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="bg-muted/20 border border-border/50">
              <TabsTrigger value="all">All Trends</TabsTrigger>
              <TabsTrigger value="tech">Technology</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {trends.map((trend) => (
                <Card key={trend.id} className="border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/50 transition-all group overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <Flame className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-headline font-bold">{trend.topic}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-[10px] py-0">
                              {trend.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              {getPlatformIcon(trend.platform)}
                              {trend.platform}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                          <TrendingUp className="w-4 h-4" />
                          {trend.velocity}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Reach: {trend.reach}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Zap className="w-4 h-4 mr-2 text-primary" />
                AI Content Angle
              </CardTitle>
              <CardDescription>How to capitalize on current trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="text-sm font-bold mb-1">The "Generative Video" Hook</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Post a side-by-side comparison of AI video vs. real footage. High debate potential on Twitter/X.
                </p>
                <Button variant="link" className="p-0 h-auto text-xs text-primary mt-2">
                  Generate Script <ArrowUpRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
              <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                <h4 className="text-sm font-bold mb-1">LinkedIn Business Strategy</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  "Solopreneur Burnout" is peaking. Share a vulnerable post about your 10pm routine. 
                </p>
                <Button variant="link" className="p-0 h-auto text-xs text-secondary mt-2">
                  Generate Post <ArrowUpRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-primary/5 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="w-16 h-16" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Pro Insight</h3>
            <p className="text-sm text-foreground/80 leading-relaxed italic">
              "We're seeing a massive shift towards 'Educational Entertainment' on short-form platforms. Trends are lasting 30% longer if they include a 'How-to' component."
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
