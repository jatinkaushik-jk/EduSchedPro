import { Users, Brain, Smartphone, Shield, Zap, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const reasonsToChooseList = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description:
      "Advanced hybrid optimization using Genetic Algorithms, Simulated Annealing, and Machine Learning for conflict resolution.",
    color: "text-primary",
  },
  {
    icon: Shield,
    title: "NEP 2020 Compliant",
    description:
      "First-to-market solution supporting multidisciplinary curricula, choice-based credit systems, and flexible learning pathways.",
    color: "text-green-500",
  },
  {
    icon: Zap,
    title: "Real-time Optimization",
    description:
      "Live conflict detection, instant rescheduling, and dynamic resource allocation with WebSocket-powered updates.",
    color: "text-amber-500",
  },
  {
    icon: Users,
    title: "Multi-Stakeholder Design",
    description:
      "Purpose-built interfaces for administrators, HODs, faculty, and students with role-based permissions.",
    color: "text-primary",
  },
  {
    icon: Globe,
    title: "Enterprise Integration",
    description:
      "Seamless integration with existing ERP systems, calendar applications, and notification services.",
    color: "text-green-500",
  },
  {
    icon: Smartphone,
    title: "Mobile-First PWA",
    description:
      "Progressive Web App with offline capabilities, push notifications, and responsive design for all devices.",
    color: "text-amber-500",
  },
];

const WhyChooseSection = () => {
  return (
    <section id="why-choose" className="py-20 px-4 sm:px-8 lg:px-16">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose EduSchedPro?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for the unique challenges of Indian higher education
            institutions with government-grade security and NEP 2020 compliance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasonsToChooseList.map((reason, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow"
            >
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
  );
};

export default WhyChooseSection;
