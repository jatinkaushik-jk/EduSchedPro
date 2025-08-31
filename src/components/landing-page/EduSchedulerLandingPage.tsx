import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar,
  Users,
  Brain,
  Clock,
  CheckCircle,
  BarChart3,
  Smartphone,
  Shield,
  Zap,
  Target,
  Award,
  ArrowRight,
  Play,
  Star,
  Globe,
  BookOpen,
  Settings
} from 'lucide-react';
import Navbar from "./Navbar";

const EduSchedulerLandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-8 lg:px-16">
        <Navbar />
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 px-4 sm:px-8 lg:px-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-analogous-primary/10" />
          <div className="container relative">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-6 text-primary bg-background">
                SIH 2025 • Government of Jharkhand • NEP 2020 Compliant
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                <span className="primaryTextGradient">
                  Intelligent Scheduling
                </span>
                <br />
                for Modern Education
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Transform your institution with AI-powered timetabling that eliminates conflicts, 
                maximizes resource utilization, and ensures NEP 2020 compliance. Built specifically 
                for government higher education institutions.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  95%+ Conflict-Free Schedules
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Real-time Optimization
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Enterprise Ready
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/50 px-4 sm:px-8 lg:px-16">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Conflict Reduction", value: "95%", icon: Target },
                { label: "Time Saved", value: "80%", icon: Clock },
                { label: "Room Utilization", value: "85%", icon: BarChart3 },
                { label: "Faculty Satisfaction", value: "92%", icon: Star }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose EduSchedPro */}
        <section id="why-choose" className="py-20 px-4 sm:px-8 lg:px-16">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why Choose EduSchedPro?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Built for the unique challenges of Indian higher education institutions 
                with government-grade security and NEP 2020 compliance.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "AI-Powered Intelligence",
                  description: "Advanced hybrid optimization using Genetic Algorithms, Simulated Annealing, and Machine Learning for conflict resolution.",
                  color: "text-primary"
                },
                {
                  icon: Shield,
                  title: "NEP 2020 Compliant",
                  description: "First-to-market solution supporting multidisciplinary curricula, choice-based credit systems, and flexible learning pathways.",
                  color: "text-green-500"
                },
                {
                  icon: Zap,
                  title: "Real-time Optimization",
                  description: "Live conflict detection, instant rescheduling, and dynamic resource allocation with WebSocket-powered updates.",
                  color: "text-amber-500"
                },
                {
                  icon: Users,
                  title: "Multi-Stakeholder Design",
                  description: "Purpose-built interfaces for administrators, HODs, faculty, and students with role-based permissions.",
                  color: "text-primary"
                },
                {
                  icon: Globe,
                  title: "Enterprise Integration",
                  description: "Seamless integration with existing ERP systems, calendar applications, and notification services.",
                  color: "text-green-500"
                },
                {
                  icon: Smartphone,
                  title: "Mobile-First PWA",
                  description: "Progressive Web App with offline capabilities, push notifications, and responsive design for all devices.",
                  color: "text-amber-500"
                }
              ].map((reason, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <reason.icon className={`h-12 w-12 ${reason.color} mb-4`} />
                    <CardTitle className="text-xl">{reason.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30 px-4 sm:px-8 lg:px-16">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Powerful Features for Modern Education
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create, manage, and optimize academic schedules 
                with enterprise-grade reliability and government compliance.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Feature List */}
              <div className="space-y-8">
                {[
                  {
                    icon: Settings,
                    title: "Advanced Constraint Management",
                    description: "Handle complex scheduling requirements including faculty availability, room capacity, equipment needs, and time preferences."
                  },
                  {
                    icon: BarChart3,
                    title: "Predictive Analytics Dashboard",
                    description: "Forecast resource utilization, predict conflicts, and analyze faculty workload patterns with intelligent insights."
                  },
                  {
                    icon: BookOpen,
                    title: "Multidisciplinary Course Support",
                    description: "Full NEP 2020 compliance with cross-department electives, flexible curricula, and choice-based credit systems."
                  },
                  {
                    icon: Award,
                    title: "Approval Workflow System",
                    description: "Multi-level approval processes with revision tracking, comments system, and automated notifications."
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column - Demo Preview */}
              <div className="relative">
                <div className="rounded-2xl primaryGradient p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">See It In Action</h3>
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    Experience the power of intelligent scheduling with our interactive demo. 
                    Watch how conflicts are detected and resolved in real-time.
                  </p>
                  <div className="bg-white/20 rounded-lg p-4 mb-6 backdrop-blur">
                    <div className="flex items-center justify-between text-sm">
                      <span>Optimization Progress</span>
                      <span>87%</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Launch Interactive Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Algorithm Showcase */}
        <section className="py-20 px-4 sm:px-8 lg:px-16" id="getting-started">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-primary border-primary">
                Technical Excellence
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Powered by Advanced Algorithms
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Our hybrid optimization engine combines multiple AI techniques to deliver 
                superior results that outperform traditional scheduling methods.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  name: "OR-Tools CSP",
                  description: "Constraint satisfaction for hard requirements",
                  accuracy: "100%",
                  color: "border-primary"
                },
                {
                  name: "Genetic Algorithm", 
                  description: "Multi-objective optimization",
                  accuracy: "95%",
                  color: "border-green-500"
                },
                {
                  name: "Simulated Annealing",
                  description: "Local optimization refinement", 
                  accuracy: "88%",
                  color: "border-red-500"
                },
                {
                  name: "ML Conflict Resolution",
                  description: "Pattern-based suggestions",
                  accuracy: "92%",
                  color: "border-yellow-500"
                }
              ].map((algo, index) => (
                <Card key={index} className={`border-2 ${algo.color} hover:shadow-lg transition-shadow`}>
                  <CardHeader className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {algo.accuracy}
                    </div>
                    <CardTitle className="text-lg">{algo.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-sm text-muted-foreground">
                      {algo.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section id="demo" className="py-20 secondaryGradient px-4 sm:px-8 lg:px-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-white">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Join the future of educational scheduling with EduSchedPro. 
              Built for Smart India Hackathon 2025 and ready for government deployment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white">
                Download Brochure
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                30-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                No setup fees
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                24/7 support
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Government-grade security
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t py-12 px-4 sm:px-8 lg:px-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                  <Calendar className="h-4 w-4" />
                </div>
                <span className="text-xl font-bold">EduSchedPro</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Intelligent scheduling solution for modern education institutions. 
                Built for Smart India Hackathon 2025 with NEP 2020 compliance and 
                government-grade security.
              </p>
              <div className="flex space-x-2">
                <Badge variant="secondary">SIH 2025</Badge>
                <Badge variant="secondary">NEP 2020</Badge>
                <Badge variant="secondary">Government Ready</Badge>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Demo</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API Documentation</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Training</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Implementation</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 EduScheduler Pro. Built for Smart India Hackathon 2025.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Badge variant="outline" className="text-primary border-primary">
                <Award className="mr-1 h-3 w-3" />
                SIH 2025 Finalist
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EduSchedulerLandingPage;