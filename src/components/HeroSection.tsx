import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Activity, TrendingUp } from "lucide-react";
import heroImage from "@/assets/disaster-hero.jpg";

export const HeroSection = () => {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-info/5 to-success/10 border-none">
      <div className="absolute inset-0 opacity-20">
        <img 
          src={heroImage} 
          alt="Disaster Management Command Center"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
      </div>
      
      <div className="relative p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="success" className="animate-pulse">
                <Activity className="h-3 w-3 mr-1" />
                System Active
              </Badge>
              <Badge variant="info">
                24/7 Monitoring
              </Badge>
            </div>
            
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                AI-Powered Disaster Response
              </h1>
              <h2 className="text-xl text-muted-foreground mb-4">
                Coordinating Emergency Relief Across India
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Real-time monitoring, predictive analytics, and coordinated response 
                for natural disasters. Protecting communities through technology and 
                rapid emergency management.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="emergency" className="shadow-emergency">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Dashboard
              </Button>
              <Button variant="outline">
                View Documentation
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Response Time</span>
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div className="text-2xl font-bold text-success">&lt; 30s</div>
              <div className="text-xs text-muted-foreground">Average alert distribution</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Coverage</span>
                <Activity className="h-4 w-4 text-info" />
              </div>
              <div className="text-2xl font-bold text-info">28 States</div>
              <div className="text-xs text-muted-foreground">Pan-India monitoring</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Active Volunteers</span>
                <Activity className="h-4 w-4 text-warning" />
              </div>
              <div className="text-2xl font-bold text-warning">1,247</div>
              <div className="text-xs text-muted-foreground">Ready for deployment</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">AI Predictions</span>
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">99.2%</div>
              <div className="text-xs text-muted-foreground">Accuracy rate</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};