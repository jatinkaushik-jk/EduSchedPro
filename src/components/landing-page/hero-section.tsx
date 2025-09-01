import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Play } from 'lucide-react'

const HeroSection = () => {
  return (
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
  )
}

export default HeroSection