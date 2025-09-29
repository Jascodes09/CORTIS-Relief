import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Package, 
  Hospital, 
  Home, 
  Truck, 
  Users, 
  MapPin,
  Plus,
  MoreHorizontal
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const resources = [
  {
    id: 1,
    type: "Medical Supplies",
    location: "Central Hospital, Mumbai",
    available: 450,
    capacity: 500,
    status: "High",
    lastUpdated: "5 min ago",
    icon: Hospital
  },
  {
    id: 2,
    type: "Emergency Shelters",
    location: "Relief Camp Network",
    available: 1200,
    capacity: 1500,
    status: "Medium",
    lastUpdated: "10 min ago",
    icon: Home
  },
  {
    id: 3,
    type: "Food Supplies",
    location: "Distribution Centers",
    available: 2800,
    capacity: 4000,
    status: "Good",
    lastUpdated: "2 min ago",
    icon: Package
  },
  {
    id: 4,
    type: "Transport Vehicles",
    location: "Emergency Fleet",
    available: 45,
    capacity: 60,
    status: "High",
    lastUpdated: "1 min ago",
    icon: Truck
  },
  {
    id: 5,
    type: "Rescue Personnel",
    location: "Field Teams",
    available: 320,
    capacity: 400,
    status: "Medium",
    lastUpdated: "3 min ago",
    icon: Users
  }
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "High": return "success";
    case "Medium": return "warning";
    case "Low": return "emergency";
    default: return "secondary";
  }
};

const getProgressValue = (available: number, capacity: number) => {
  return (available / capacity) * 100;
};

export const ResourcesPanel = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-primary" />
            <span>{t('resource.management')}</span>
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => toast({
            title: t('success'),
            description: "Add Resource form opened",
          })}>
            <Plus className="h-4 w-4 mr-2" />
            {t('add.resource')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {resources.map((resource) => {
          const IconComponent = resource.icon;
          const progressValue = getProgressValue(resource.available, resource.capacity);
          
          return (
            <div key={resource.id} className="p-4 border rounded-lg space-y-3 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{resource.type}</h4>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{resource.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusVariant(resource.status) as any}>
                    {resource.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toast({
                    title: "Resource Options",
                    description: `Managing ${resource.type}`,
                  })}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Availability</span>
                  <span className="font-medium">
                    {resource.available} / {resource.capacity}
                  </span>
                </div>
                <Progress value={progressValue} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{Math.round(progressValue)}% available</span>
                  <span>Updated {resource.lastUpdated}</span>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full" onClick={() => toast({
              title: t('success'),
              description: "Resource request form opened",
            })}>
              {t('request.resources')}
            </Button>
            <Button variant="outline" className="w-full" onClick={() => toast({
              title: "Resources",
              description: "All resources view opened",
            })}>
              {t('view.all.resources')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};