import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Activity, TrendingUp, Map, Brain } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-smooth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 slide-in-up">
            <Activity className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Campus Sentinel</span>
            <span className="text-xs text-muted-foreground ml-2">by Emeka Sentinel Labs</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Features
            </a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Testimonials
            </a>
            <Link href="/student/login">
              <Button variant="outline" size="sm" className="transition-smooth hover:scale-105 bg-transparent">
                Student Login
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button size="sm" className="bg-primary hover:bg-primary/90 transition-smooth hover:scale-105">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 fade-in">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 slide-in-up">
            AI-Powered Campus
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Health Intelligence
            </span>
          </h1>
          <p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto slide-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Predict outbreaks. Protect students. Save lives.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 slide-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link href="/student/dashboard">
              <Button size="lg" className="gap-2 transition-smooth hover:shadow-lg hover:scale-105">
                Enter Student Portal
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button
                size="lg"
                variant="outline"
                className="transition-smooth hover:shadow-lg hover:scale-105 bg-transparent"
              >
                Admin Login
              </Button>
            </Link>
          </div>

          {/* Animated Chart Preview */}
          <Card
            className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10 fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center justify-center pulse-soft">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-primary/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Interactive Analytics Dashboard</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 fade-in">Powerful Health Intelligence</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto fade-in">
            Advanced AI technology to predict, monitor, and manage campus health
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Brain,
                title: "AI Disease Prediction",
                description: "Machine learning models predict disease patterns and outbreak risks",
              },
              {
                icon: Activity,
                title: "Smart Symptom Checker",
                description: "AI-powered triage system for accurate symptom analysis",
              },
              {
                icon: Map,
                title: "Campus Health Heatmap",
                description: "Real-time visualization of health risks across campus zones",
              },
              {
                icon: TrendingUp,
                title: "Wellness Analytics",
                description: "Comprehensive insights into student health trends and patterns",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="p-6 hover:shadow-lg transition-smooth hover:-translate-y-1 fade-in"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <feature.icon className="w-8 h-8 text-secondary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 fade-in">Trusted by Universities</h2>
          <div className="space-y-6">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Campus Health Director",
                text: "Campus Sentinel has transformed how we manage student health and predict outbreaks.",
              },
              {
                name: "Prof. James Miller",
                role: "University Administrator",
                text: "The real-time insights and predictive analytics are invaluable for decision-making.",
              },
            ].map((testimonial, i) => (
              <Card
                key={i}
                className="p-6 fade-in hover:shadow-md transition-smooth"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Campus Sentinel by Emeka Sentinel Labs</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
              About
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
              Contact
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
