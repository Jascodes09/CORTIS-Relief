import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Shield, 
  Users, 
  MapPin, 
  Heart, 
  Truck,
  TrendingUp,
  Clock
} from "lucide-react";


const stats = [
  {
    title: "Active Incidents",
    value: "23",
    change: "+3 in last hour",
    icon: AlertTriangle,
    variant: "emergency" as const,
    trend: "up"
  },
  {
    title: "Safe Zones",
    value: "156",
    change: "All operational",
    icon: Shield,
    variant: "success" as const,
    trend: "stable"
  },
  {
    title: "Volunteers Deployed",
    value: "1,247",
    change: "+89 today",
    icon: Users,
    variant: "info" as const,
    trend: "up"
  },
  {
    title: "Resources Available",
    value: "8,432",
    change: "85% capacity",
    icon: Truck,
    variant: "warning" as const,
    trend: "down"
  },
  {
    title: "Medical Facilities",
    value: "67",
    change: "12 on standby",
    icon: Heart,
    variant: "success" as const,
    trend: "stable"
  },
  {
    title: "High-Risk Areas",
    value: "12",
    change: "Weather alert",
    icon: MapPin,
    variant: "risk-high" as const,
    trend: "up"
  }
];

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="relative overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <IconComponent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
                    {stat.trend === "stable" && <Clock className="h-3 w-3" />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <Badge variant={stat.variant} className="text-xs">
                  {stat.trend === "up" ? "↑" : stat.trend === "down" ? "↓" : "●"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};