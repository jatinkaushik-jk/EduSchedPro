import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const showcaseAlgorithmsList = [
  {
    name: "OR-Tools CSP",
    description: "Constraint satisfaction for hard requirements",
    accuracy: "100%",
    color: "border-primary",
  },
  {
    name: "Genetic Algorithm",
    description: "Multi-objective optimization",
    accuracy: "95%",
    color: "border-green-500",
  },
  {
    name: "Simulated Annealing",
    description: "Local optimization refinement",
    accuracy: "88%",
    color: "border-red-500",
  },
  {
    name: "ML Conflict Resolution",
    description: "Pattern-based suggestions",
    accuracy: "92%",
    color: "border-yellow-500",
  },
];

const ShowcaseSection = () => {
  return (
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
            Our hybrid optimization engine combines multiple AI techniques to
            deliver superior results that outperform traditional scheduling
            methods.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {showcaseAlgorithmsList.map((algo, index) => (
            <Card
              key={index}
              className={`border-2 ${algo.color} hover:shadow-lg transition-shadow`}
            >
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
  );
};

export default ShowcaseSection;
