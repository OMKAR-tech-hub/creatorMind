
"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Clock, 
  ArrowUpRight, 
  Play,
  Zap,
  Globe,
  ChevronRight,
  Activity
} from "lucide-react"
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts"
import { motion } from "framer-motion"

const stats = [
  { name: "Total Engagement", value: "1.2M", change: "+12.5%", icon: Users, color: "primary" },
  { name: "Viral Content", value: "24", change: "+4", icon: Zap, color: "secondary" },
  { name: "Global Reach", value: "18", change: "Countries", icon: Globe, color: "emerald" },
  { name: "AI Capacity Used", value: "142h", change: "This month", icon: Activity, color: "violet" },
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
    <div className="space-y-10 animate-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-headline font-bold text-foreground tracking-tight"
          >
            Welcome, <span className="premium-gradient bg-clip-text text-transparent italic">Alex Rivera</span>
          </motion.h1>
          <p className="text-muted-foreground mt-2 text-lg">Your content OS is primed for viral expansion today.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex rounded-xl bg-white/5 border-white/10 hover:bg-white/10 h-12 px-6" asChild>
            <Link href="/dashboard/trends">View Trends</Link>
          </Button>
          <Button className="premium-button rounded-xl h-12 px-6" asChild>
            <Link href="/dashboard/generator">
              <Sparkles className="w-5 h-5 mr-2" />
              Scribe New Content
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass-card overflow-hidden group hover:border-primary/40 transition-all cursor-default glow-border">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className={cn(
                    "p-3 rounded-2xl transition-all duration-300 group-hover:scale-110",
                    i % 2 === 0 ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(139,92,246,0.2)]" : "bg-secondary/10 text-secondary shadow-[0_0_15px_rgba(30,64,175,0.2)]"
                  )}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 bg-emerald-500/5 px-2 py-0.5">
                    {stat.change}
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </Badge>
                </div>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">{stat.name}</p>
                  <h3 className="text-3xl font-headline font-bold mt-2 tabular-nums">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Analytics & Trends Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <div>
              <CardTitle className="text-2xl font-headline">Growth Trajectory</CardTitle>
              <CardDescription className="text-muted-foreground text-base">Engagement metrics across neural networks</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="rounded-lg h-8 px-3 text-xs">7D</Button>
              <Button variant="secondary" size="sm" className="rounded-lg h-8 px-3 text-xs">30D</Button>
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(10, 10, 20, 0.9)", 
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    backdropFilter: "blur(20px)"
                  }} 
                />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 glass-card">
          <CardHeader className="pb-8">
            <CardTitle className="text-2xl font-headline">Neural Trends</CardTitle>
            <CardDescription className="text-muted-foreground">Topics achieving critical mass</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { topic: "#GeminiUltra", reach: "4.2M", trend: "up", intensity: 95 },
              { topic: "Autonomous Agents", reach: "1.8M", trend: "up", intensity: 82 },
              { topic: "Quantum UI", reach: "2.4M", trend: "up", intensity: 78 },
              { topic: "Creative Scribe", reach: "900K", trend: "neutral", intensity: 65 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-sm block">{item.topic}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.reach} Reach</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary">{item.intensity}%</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4 h-11 text-primary hover:text-primary hover:bg-primary/5 rounded-xl font-bold" asChild>
              <Link href="/dashboard/trends">
                Trend Explorer
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Features Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-headline">Neural Log</CardTitle>
              <CardDescription>Recent AI thought processes</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl bg-white/5 border-white/10 h-10 px-4" asChild>
              <Link href="/dashboard/repurpose">History</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {[
              { title: "Neuro-Marketing Post", platform: "LinkedIn", date: "2h ago", icon: Zap },
              { title: "SaaS OS Strategy", platform: "Email", date: "5h ago", icon: Sparkles },
              { title: "Futuristic UI Thread", platform: "Twitter/X", date: "Yesterday", icon: Activity },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 10 }}
                className="flex items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.platform} • {item.date}</p>
                </div>
                <div className="p-2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-4 h-4 text-primary fill-primary" />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none group-hover:opacity-20 transition-opacity" />
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Neural Planner</CardTitle>
            <CardDescription>Optimized temporal allocation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {[
              { time: "18:00 Today", platform: "Instagram", topic: "Product Synthesis", type: "Visual" },
              { time: "09:30 Tomorrow", platform: "Twitter/X", topic: "Neural Rant", type: "Short" },
              { time: "14:00 Wed", platform: "LinkedIn", topic: "Neuro-Career Advice", type: "Long" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 p-4 rounded-2xl bg-white/2 border border-white/5">
                <div className="text-xs font-mono font-bold text-primary w-24 text-right">{item.time}</div>
                <div className="flex-1 border-l-2 border-primary/40 pl-6 py-1">
                  <h4 className="font-bold text-base">{item.topic}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{item.platform}</span>
                    <span className="text-[10px] text-primary font-bold uppercase bg-primary/10 px-2 rounded-full">{item.type}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button className="w-full mt-6 premium-button rounded-xl h-12 text-lg font-bold" asChild>
              <Link href="/dashboard/planner">
                Spatial Calendar
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
