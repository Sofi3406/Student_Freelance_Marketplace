import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { ArrowRight, Briefcase, GraduationCap, Shield, Star, TrendingUp, Users } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">StudentMarket</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Connect Students with Opportunities</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            The premier marketplace where talented students offer their skills and businesses find the perfect
            freelancers for their projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register?role=student">
              <Button size="lg" className="w-full sm:w-auto">
                I'm a Student
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/register?role=client">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                I'm Hiring
                <Briefcase className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose StudentMarket?</h2>
          <p className="text-xl text-muted-foreground">Everything you need to succeed in one platform</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 border-border hover:border-primary transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Verified Students</h3>
            <p className="text-muted-foreground">
              All students are verified with university credentials, ensuring quality and professionalism.
            </p>
          </Card>

          <Card className="p-8 border-border hover:border-primary transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Secure Payments</h3>
            <p className="text-muted-foreground">
              Protected transactions with escrow system. Money is only released when you're satisfied.
            </p>
          </Card>

          <Card className="p-8 border-border hover:border-primary transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Quality Guaranteed</h3>
            <p className="text-muted-foreground">
              Review system and ratings ensure you work with the best. Get refunds if expectations aren't met.
            </p>
          </Card>

          <Card className="p-8 border-border hover:border-primary transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Grow Your Skills</h3>
            <p className="text-muted-foreground">
              Students gain real-world experience and build portfolios while earning money.
            </p>
          </Card>

          <Card className="p-8 border-border hover:border-primary transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Flexible Projects</h3>
            <p className="text-muted-foreground">
              From quick tasks to long-term projects. Find opportunities that fit your schedule.
            </p>
          </Card>

          <Card className="p-8 border-border hover:border-primary transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Student-Friendly</h3>
            <p className="text-muted-foreground">
              Lower rates than traditional freelancers, perfect for startups and small businesses.
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold">StudentMarket</span>
            </div>
            <div className="text-sm text-muted-foreground">© 2025 StudentMarket. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
