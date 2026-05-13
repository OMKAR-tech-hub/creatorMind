"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Sparkles, 
  ArrowRight,
  Plus,
  BarChart3,
  Flame,
  Instagram,
  Linkedin,
  Twitter
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

const recommendations = [
  { platform: "Instagram", time: "18:00", day: "Tuesday", reason: "Peak engagement for Visual Tech niches" },
  { platform: "LinkedIn", time: "09:30", day: "Wednesday", reason: "Highest CTR for professional thought leadership" },
  { platform: "Twitter/X", time: "13:00", day: "Everyday", reason: "Consistency algorithm bonus" },
]

export default function PlannerPage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [heatmapData, setHeatmapData] = useState<number[][]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDate(new Date())
    // Generate data safely on client to avoid hydration mismatch
    const data = Array.from({ length: 24 }, () => 
      Array.from({ length: 7 }, () => Math.random())
    )
    setHeatmapData(data)
  }, [])

  const handleScheduleAction = (title: string) => {
    toast({
      title: "Action Initiated",
      description: `Scheduling workflow for "${title}" has been started.`,
    })
  }

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-48 h-10 bg-muted animate-pulse rounded" />
          <div className="w-32 h-10 bg-muted animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 h-[600px] bg-muted animate-pulse rounded-xl" />
          <div className="lg:col-span-4 h-[600px] bg-muted animate-pulse rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Content Planner</h1>
          <p className="text-muted-foreground">AI-optimized scheduling for maximum viral impact.</p>
        </div>
        <Button className="premium-gradient" onClick={() => handleScheduleAction("New Post")}>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Post
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Content Calendar</CardTitle>
                <CardDescription>Visual overview of your upcoming week</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Month</Button>
                <Button variant="secondary" size="sm">Week</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-7 border-t border-border/50 h-[500px]">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="border-r border-border/50 last:border-r-0 flex flex-col">
                    <div className="p-3 text-center border-b border-border/50 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {day}
                    </div>
                    <div className="flex-1 p-2 space-y-2 bg-muted/5 overflow-y-auto">
                      {day === 'Tue' && (
                        <div className="p-2 rounded-md bg-primary/20 border border-primary/30 text-[10px] space-y-1">
                          <div className="flex justify-between">
                            <span className="font-bold">18:00</span>
                            <Instagram className="w-2 h-2" />
                          </div>
                          <p className="truncate font-medium">Product Demo</p>
                        </div>
                      )}
                      {day === 'Wed' && (
                        <div className="p-2 rounded-md bg-secondary/20 border border-secondary/30 text-[10px] space-y-1">
                          <div className="flex justify-between">
                            <span className="font-bold">09:30</span>
                            <Linkedin className="w-2 h-2" />
                          </div>
                          <p className="truncate font-medium">Thought Leadership</p>
                        </div>
                      )}
                      {day === 'Fri' && (
                        <div className="p-2 rounded-md bg-foreground/10 border border-foreground/20 text-[10px] space-y-1">
                          <div className="flex justify-between">
                            <span className="font-bold">12:00</span>
                            <Twitter className="w-2 h-2" />
                          </div>
                          <p className="truncate font-medium">Industry Rant</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Engagement Heatmap</CardTitle>
              <CardDescription>When your specific audience is most active</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-[repeat(24,1fr)] gap-1 h-32">
                {heatmapData.map((column, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    {column.map((intensity, j) => (
                      <div 
                        key={j} 
                        className="flex-1 rounded-sm" 
                        style={{ 
                          backgroundColor: intensity > 0.7 
                            ? 'hsl(var(--primary))' 
                            : intensity > 0.4 
                            ? 'hsl(var(--primary) / 0.5)' 
                            : 'hsl(var(--muted) / 0.2)' 
                        }} 
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[10px] text-muted-foreground font-mono uppercase">
                <span>12 AM</span>
                <span>6 AM</span>
                <span>12 PM</span>
                <span>6 PM</span>
                <span>11 PM</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-primary" />
                AI Strategy
              </CardTitle>
              <CardDescription>Best times to post this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec, i) => (
                <div key={i} className="p-4 rounded-xl border border-border/50 bg-background/40 space-y-3 hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="flex gap-1 items-center font-mono">
                      {rec.platform === 'Instagram' && <Instagram className="w-3 h-3" />}
                      {rec.platform === 'LinkedIn' && <Linkedin className="w-3 h-3" />}
                      {rec.platform === 'Twitter/X' && <Twitter className="w-3 h-3" />}
                      {rec.platform}
                    </Badge>
                    <span className="text-xs font-bold text-primary">{rec.time} • {rec.day}</span>
                  </div>
                  <div className="flex gap-2">
                    <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                    <p className="text-xs text-muted-foreground">{rec.reason}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-xs h-8"
                    onClick={() => handleScheduleAction(`${rec.platform} - ${rec.time}`)}
                  >
                    Schedule for this time
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-primary/5 p-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border-0"
            />
          </Card>

          <Card className="border-border/50 bg-primary/5 p-6 overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <BarChart3 className="w-24 h-24" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Pro Tip</h3>
            <p className="text-xs text-foreground/80 leading-relaxed">
              Posting "Thought Leadership" content between 8 AM and 10 AM on Tuesdays historically yields a 3.4x higher engagement rate for your account.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
