"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Clock, 
  ArrowUpRight, 
  Play,
  Zap,
  Globe
} from "lucide-react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"

const stats = [
  { name: "Total Engagement", value: "1.2M", change: "+12.5%", icon: Users },
  { name: "Viral Content", value: "24", change: "+4", icon: Zap },
  { name: "Global Reach", value: "18", change: "Countries", icon: Globe },
  { name: "AI Saved Hours", value: "142h", change: "This month", icon: Clock },
]

const chartData = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 600 },
  { name: "Thu", value: 800 },
  { name: "Fri", value: 500 },
  { name: "Sat", value: 900 },
  { name: "Sun", value: 1100 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-foreground">Welcome back, Alex</h1>
          <p className="text-muted-foreground mt-1">Your content is trending in 4 countries today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex">View Analytics</Button>
          <Button className="premium-gradient">
            <Sparkles className="w-4 h-4 mr-2" />
            Create New Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden group hover:border-primary/50 transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="flex items-center text-xs font-medium text-emerald-500">
                  {stat.change}
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <h3 className="text-2xl font-headline font-bold mt-1">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-border/50 bg-card/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-headline">Performance Overview</CardTitle>
            <CardDescription>Engagement growth across all platforms</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-headline">Trending Now</CardTitle>
            <CardDescription>Viral topics to hop on</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { topic: "#GenerativeAI", reach: "4.2M", trend: "up" },
              { topic: "Remote Workflow", reach: "1.8M", trend: "up" },
              { topic: "Sustainable Tech", reach: "900K", trend: "neutral" },
              { topic: "#Web3Future", reach: "2.4M", trend: "up" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-medium text-sm">{item.topic}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{item.reach}</span>
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4 text-primary hover:text-primary/80 hover:bg-primary/5">
              Explore All Trends
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-headline">Recent Generations</CardTitle>
              <CardDescription>Your latest AI creations</CardDescription>
            </div>
            <Button variant="outline" size="sm">View History</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "AI Ethics Post", platform: "LinkedIn", date: "2h ago" },
              { title: "Tech Newsletter", platform: "Email", date: "5h ago" },
              { title: "Summer Vlog Script", platform: "YouTube", date: "Yesterday" },
            ].map((item, i) => (
              <div key={i} className="flex items-center p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-md bg-secondary/10 flex items-center justify-center mr-4">
                  <Sparkles className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.platform} • {item.date}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute inset-0 premium-gradient opacity-10 pointer-events-none" />
          <CardHeader>
            <CardTitle className="text-xl font-headline">Upcoming Planner</CardTitle>
            <CardDescription>Next 3 scheduled posts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { time: "18:00", platform: "Instagram", topic: "Product Showcase" },
              { time: "Tomorrow, 09:30", platform: "Twitter/X", topic: "Industry Rant" },
              { time: "Wed, 14:00", platform: "LinkedIn", topic: "Career Advice" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-xs font-mono text-muted-foreground w-20">{item.time}</div>
                <div className="flex-1 border-l-2 border-primary pl-4 py-1">
                  <h4 className="font-medium text-sm">{item.topic}</h4>
                  <p className="text-xs text-muted-foreground">{item.platform}</p>
                </div>
              </div>
            ))}
            <Button className="w-full mt-4 bg-foreground text-background hover:bg-foreground/90">
              Open Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}