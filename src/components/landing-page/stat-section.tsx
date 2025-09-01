import { BarChart3, Clock, Star, Target } from "lucide-react";

const statsList = [
  { label: "Conflict Reduction", value: "95%", icon: Target },
  { label: "Time Saved", value: "80%", icon: Clock },
  { label: "Room Utilization", value: "85%", icon: BarChart3 },
  { label: "Faculty Satisfaction", value: "92%", icon: Star },
];

const StatSection = () => {
  return (
    <section className="py-16 bg-muted/50 px-4 sm:px-8 lg:px-16">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsList.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatSection;
