import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  AlertTriangle, 
  Shield, 
  Hospital, 
  Home,
  RefreshCw,
  Layers,
  Filter
} from "lucide-react";

const incidents = [
  { id: 1, type: "Flood", location: "Mumbai, Maharashtra", severity: "critical", time: "2 min ago", lat: 30, lng: 40 },
  { id: 2, type: "Earthquake", location: "Delhi NCR", severity: "high", time: "15 min ago", lat: 60, lng: 30 },
  { id: 3, type: "Cyclone", location: "Chennai, Tamil Nadu", severity: "medium", time: "1 hour ago", lat: 20, lng: 70 }
];

const resources = [
  { id: 1, type: "Shelter", name: "Relief Camp Alpha", location: "Sector 15", capacity: "500", lat: 45, lng: 25 },
  { id: 2, type: "Hospital", name: "Emergency Medical Center", location: "Civil Lines", capacity: "200", lat: 35, lng: 65 },
  { id: 3, type: "Supply", name: "Food Distribution Point", location: "Market Road", capacity: "1000", lat: 70, lng: 45 }
];

export const DisasterMap = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Section */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Live Disaster Map</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Layers className="h-4 w-4 mr-2" />
                Layers
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="map-container relative">
            <div className="map-overlay" />
            
            {/* Simulated map markers */}
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${incident.lng}%`, top: `${incident.lat}%` }}
              >
                <div className={`relative p-2 rounded-full bg-risk-${incident.severity === "critical" ? "critical" : incident.severity === "high" ? "high" : "medium"} shadow-lg`}>
                  <AlertTriangle className="h-4 w-4 text-white" />
                  {incident.severity === "critical" && (
                    <div className="absolute inset-0 rounded-full bg-risk-critical animate-ping opacity-75" />
                  )}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {incident.type} - {incident.location}
                </div>
              </div>
            ))}

            {resources.map((resource) => (
              <div
                key={resource.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${resource.lng}%`, top: `${resource.lat}%` }}
              >
                <div className="p-2 rounded-full bg-success shadow-lg">
                  {resource.type === "Hospital" && <Hospital className="h-4 w-4 text-white" />}
                  {resource.type === "Shelter" && <Home className="h-4 w-4 text-white" />}
                  {resource.type === "Supply" && <Shield className="h-4 w-4 text-white" />}
                </div>
              </div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
              <h4 className="font-semibold text-sm mb-2">Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-risk-critical" />
                  <span>Critical Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-risk-high" />
                  <span>High Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span>Safe Zone/Resource</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-emergency" />
            <span>Active Incidents</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {incidents.map((incident) => (
            <div key={incident.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-sm">{incident.type}</h4>
                  <p className="text-xs text-muted-foreground">{incident.location}</p>
                </div>
                <Badge 
                  variant={
                    incident.severity === "critical" ? "risk-critical" :
                    incident.severity === "high" ? "risk-high" :
                    incident.severity === "medium" ? "risk-medium" : "risk-low"
                  } 
                  className="text-xs"
                >
                  {incident.severity}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{incident.time}</span>
                <Button variant="outline" size="sm" className="h-6 text-xs">
                  Details
                </Button>
              </div>
            </div>
          ))}
          
          <Button className="w-full" variant="outline">
            View All Incidents
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};