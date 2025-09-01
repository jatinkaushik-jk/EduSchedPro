import { Button } from "@/components/ui/button";
import { BarChart3, Award, Play, BookOpen, Settings } from "lucide-react";

const featuresList = [
  {
    icon: Settings,
    title: "Advanced Constraint Management",
    description:
      "Handle complex scheduling requirements including faculty availability, room capacity, equipment needs, and time preferences.",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics Dashboard",
    description:
      "Forecast resource utilization, predict conflicts, and analyze faculty workload patterns with intelligent insights.",
  },
  {
    icon: BookOpen,
    title: "Multidisciplinary Course Support",
    description:
      "Full NEP 2020 compliance with cross-department electives, flexible curricula, and choice-based credit systems.",
  },
  {
    icon: Award,
    title: "Approval Workflow System",
    description:
      "Multi-level approval processes with revision tracking, comments system, and automated notifications.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-muted/30 px-4 sm:px-8 lg:px-16">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful Features for Modern Education
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create, manage, and optimize academic
            schedules with enterprise-grade reliability and government
            compliance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Feature List */}
          <div className="space-y-8">
            {featuresList.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
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
                Experience the power of intelligent scheduling with our
                interactive demo. Watch how conflicts are detected and resolved
                in real-time.
              </p>
              <div className="bg-white/20 rounded-lg p-4 mb-6 backdrop-blur">
                <div className="flex items-center justify-between text-sm">
                  <span>Optimization Progress</span>
                  <span>87%</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: "87%" }}
                  ></div>
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
  );
};

export default FeaturesSection;
