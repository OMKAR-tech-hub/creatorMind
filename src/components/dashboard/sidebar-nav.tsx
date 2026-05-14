"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Sparkles, 
  Search, 
  Languages, 
  Calendar, 
  Settings, 
  Scale, 
  Zap, 
  Layers,
  Heart,
  Mic,
  Image as ImageIcon,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const mainNav = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Content Lab", icon: Sparkles, href: "/dashboard/generator" },
  { name: "Image Studio", icon: ImageIcon, href: "/dashboard/image-studio" },
  { name: "Mood AI", icon: Heart, href: "/dashboard/mood" },
  { name: "Voice AI", icon: Mic, href: "/dashboard/voice" },
  { name: "Viral Predictor", icon: Zap, href: "/dashboard/predictor" },
  { name: "Repurpose Studio", icon: Layers, href: "/dashboard/repurpose" },
]

const toolNav = [
  { name: "AI Judge", icon: Scale, href: "/dashboard/judge" },
  { name: "Global Mode", icon: Languages, href: "/dashboard/language" },
  { name: "Trend Finder", icon: Search, href: "/dashboard/trends" },
  { name: "Planner", icon: Calendar, href: "/dashboard/planner" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r-0 bg-transparent">
      <SidebarHeader className="h-20 flex items-center px-6 mt-4">
        <Link href="/" className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.4)]"
          >
            <Sparkles className="text-white w-6 h-6" />
          </motion.div>
          <span className="font-headline font-bold text-xl tracking-tight group-data-[collapsible=icon]:hidden bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            CreatorMind
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 gap-6">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50">Core</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    tooltip={item.name}
                    className={cn(
                      "h-11 rounded-xl transition-all duration-300",
                      pathname === item.href 
                        ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]" 
                        : "hover:bg-white/5 text-muted-foreground hover:text-white"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-primary" : "")} />
                      <span className="font-medium">{item.name}</span>
                      {pathname === item.href && (
                        <motion.div layoutId="active" className="ml-auto w-1 h-4 bg-primary rounded-full" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50">Intelligence</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {toolNav.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    tooltip={item.name}
                    className={cn(
                      "h-11 rounded-xl transition-all duration-300",
                      pathname === item.href 
                        ? "bg-secondary/10 text-secondary border border-secondary/20 shadow-[0_0_15px_rgba(30,64,175,0.1)]" 
                        : "hover:bg-white/5 text-muted-foreground hover:text-white"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-secondary" : "")} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 mb-4">
        <div className="glass-card p-4 rounded-2xl flex items-center gap-3 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-10 w-10 border border-white/10 ring-2 ring-primary/20">
            <AvatarImage src="https://picsum.photos/seed/user1/40/40" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold truncate">Alex Rivera</span>
            <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Infinity Pass</span>
          </div>
          <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
             <Settings className="w-4 h-4 ml-auto text-muted-foreground hover:text-foreground cursor-pointer group-data-[collapsible=icon]:hidden" />
          </motion.div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
