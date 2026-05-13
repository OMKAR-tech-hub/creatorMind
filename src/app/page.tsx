import Link from "next/link"
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Layers, 
  Globe, 
  Scale, 
  TrendingUp,
  Play,
  CheckCircle2,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="font-headline font-bold text-2xl tracking-tight">CreatorMind</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hidden sm:block text-sm font-medium hover:text-primary transition-colors">Login</Link>
            <Button className="premium-gradient rounded-full px-6" asChild>
              <Link href="/dashboard">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Powered by Gemini 2.5 Flash</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold mb-8 tracking-tighter animate-in [animation-delay:100ms]">
            Create Content That <br />
            <span className="premium-gradient bg-clip-text text-transparent italic">Actually Goes Viral.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10 animate-in [animation-delay:200ms]">
            The all-in-one AI engine for modern creators. Generate high-performance copy, predict engagement, and scale your growth with professional analytics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in [animation-delay:300ms]">
            <Button size="lg" className="premium-gradient rounded-full h-14 px-10 text-lg font-semibold w-full sm:w-auto" asChild>
              <Link href="/dashboard">
                Start Creating Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-10 text-lg font-semibold w-full sm:w-auto" asChild>
              <Link href="#features">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Link>
            </Button>
          </div>

          <div className="mt-20 relative max-w-5xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 animate-in [animation-delay:400ms]">
            <img 
              src="https://picsum.photos/seed/creatormind_hero/1200/800" 
              alt="CreatorMind Dashboard" 
              className="rounded-xl shadow-2xl border border-white/5"
            />
            <div className="absolute -bottom-10 -left-10 hidden lg:block animate-bounce [animation-duration:3s]">
              <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full premium-gradient flex items-center justify-center">
                  <Zap className="text-white w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">Viral Potential</p>
                  <p className="text-xl font-bold">98/100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4">Everything you need to go viral.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Six powerful tools designed to work together and amplify your presence across every digital platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Multimodal Lab", desc: "Generate captions, scripts, and threads that resonate with platform-specific algorithms.", icon: Sparkles },
              { title: "Viral Predictor", desc: "Know how your content will perform before you hit post with our engagement analytics.", icon: Zap },
              { title: "AI Judge", desc: "Get brutally honest feedback on your copy and direct suggestions for improvement.", icon: Scale },
              { title: "Repurpose Engine", desc: "Turn one single blog post into 15+ micro-content pieces in seconds.", icon: Layers },
              { title: "Global Mode", desc: "Translate and adapt your content for local cultures with slang and nuanced tone.", icon: Globe },
              { title: "Trend Finder", desc: "Real-time AI insights into what people are searching for right now.", icon: TrendingUp },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4">Simple, transparent pricing.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Choose the plan that fits your creative journey. No hidden fees.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                name: "Starter", 
                price: "$0", 
                desc: "Perfect for new creators", 
                features: ["5 AI Generations/day", "Basic Analytics", "Standard Support"],
                buttonText: "Get Started Free",
                popular: false
              },
              { 
                name: "Pro", 
                price: "$29", 
                desc: "For the serious creator", 
                features: ["Unlimited Generations", "Viral Predictor", "Global Mode", "Priority Support"],
                buttonText: "Go Pro Now",
                popular: true
              },
              { 
                name: "Studio", 
                price: "$99", 
                desc: "For teams and agencies", 
                features: ["Multiple Accounts", "Advanced Team Tools", "API Access", "Dedicated Manager"],
                buttonText: "Contact Sales",
                popular: false
              }
            ].map((plan, i) => (
              <div key={i} className={cn(
                "glass-card p-8 rounded-[2rem] border relative flex flex-col transition-all duration-300",
                plan.popular ? "border-primary shadow-2xl shadow-primary/10 scale-105 z-10 bg-primary/5" : "border-white/5"
              )}>
                {plan.popular && (
                  <Badge className="absolute top-4 right-4 premium-gradient border-none">Most Popular</Badge>
                )}
                <h3 className="text-xl font-headline font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
                <div className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Button className={cn("w-full rounded-full h-12 font-bold", plan.popular ? "premium-gradient" : "")} variant={plan.popular ? "default" : "outline"} asChild>
                  <Link href="/dashboard">{plan.buttonText}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">Built for the next generation of creators.</h2>
              <div className="space-y-6">
                {[
                  "Optimized for Instagram Reels, TikTok, and YouTube Shorts.",
                  "Deep understanding of LinkedIn's professional networking algorithms.",
                  "Culturally nuanced content in 8+ international languages.",
                  "Save 20+ hours of content planning every single week."
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-10 h-14 px-8 rounded-full text-lg font-semibold premium-gradient" asChild>
                <Link href="/dashboard">Join 50,000+ Creators</Link>
              </Button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="glass-card p-6 rounded-2xl">
                  <p className="text-sm italic mb-4">"CreatorMind changed my workflow. I went from 5k to 100k followers in 3 months."</p>
                  <p className="font-bold">Sarah J.</p>
                  <p className="text-xs text-muted-foreground">Lifestyle Influencer</p>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                  <p className="text-sm italic mb-4">"The AI Judge is like having a professional editor available 24/7."</p>
                  <p className="font-bold">Marcus T.</p>
                  <p className="text-xs text-muted-foreground">Tech Reviewer</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="glass-card p-6 rounded-2xl">
                  <p className="text-sm italic mb-4">"Translation that actually sounds like a local. Unbelievable."</p>
                  <p className="font-bold">Elena R.</p>
                  <p className="text-xs text-muted-foreground">Global Educator</p>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                  <p className="text-sm italic mb-4">"Finally, an AI that understands viral hooks."</p>
                  <p className="font-bold">David L.</p>
                  <p className="text-xs text-muted-foreground">SaaS Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="premium-gradient rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-20">
              <Sparkles className="w-40 h-40 text-white" />
            </div>
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-white mb-8">Ready to own the feed?</h2>
            <p className="text-xl text-white/80 max-w-xl mx-auto mb-10 font-medium">
              Start your journey today. No credit card required for the basic tier.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full h-14 px-10 text-lg font-bold" asChild>
                <Link href="/dashboard">Get Started Now</Link>
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 rounded-full h-14 px-10 text-lg font-bold" asChild>
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center">
                  <Sparkles className="text-white w-5 h-5" />
                </div>
                <span className="font-headline font-bold text-xl">CreatorMind</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empowering the next billion creators with intelligent AI workflows and predictive growth analytics.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground">Content Lab</Link></li>
                <li><Link href="/dashboard/predictor" className="hover:text-foreground">Viral Predictor</Link></li>
                <li><Link href="/dashboard/judge" className="hover:text-foreground">AI Judge</Link></li>
                <li><Link href="/dashboard/trends" className="hover:text-foreground">Trend Finder</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">About Us</Link></li>
                <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Subscribe</h4>
              <p className="text-sm text-muted-foreground mb-4">Get the latest viral strategies weekly.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary"
                />
                <Button variant="secondary" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-xs text-muted-foreground">
            © 2024 CreatorMind AI. All rights reserved. Built with passion for creators everywhere.
          </div>
        </div>
      </footer>
    </div>
  )
}
