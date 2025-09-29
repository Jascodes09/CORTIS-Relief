import React, { useState } from 'react'; // Import useState for the translation toggle
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Megaphone, 
  Clock, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  Globe,
  Volume2
} from "lucide-react";
// Assuming useLanguage and useToast are correctly imported from your project
// Dummy implementations for missing hooks to make the code runnable standalone
const useLanguage = () => ({
  t: (key) => {
    if (key === 'emergency.alerts') return 'Emergency Alerts';
    if (key === 'new.alert') return 'New Alert';
    if (key === 'success') return 'Success';
    return key;
  }
});
const useToast = () => ({
  toast: (options) => console.log('Toast:', options.title, options.description)
});

const alerts = [
  {
    id: 1,
    type: "Critical",
    title: "Severe Flooding in Mumbai",
    message: "Heavy monsoon rains causing severe flooding in low-lying areas. Immediate evacuation required.",
    messageHindi: "मुंबई में भारी बाढ़। तत्काल निकासी आवश्यक।",
    time: "2 minutes ago",
    status: "active",
    reach: "2.3M people"
  },
  {
    id: 2,
    type: "Warning",
    title: "Earthquake Aftershocks Expected",
    message: "Aftershocks expected in Delhi NCR region. Stay alert and follow safety protocols.",
    messageHindi: "दिल्ली एनसीआर में भूकंप के झटके संभावित। सुरक्षा प्रोटोकॉल का पालन करें।",
    time: "15 minutes ago",
    status: "active",
    reach: "5.7M people"
  },
  {
    id: 3,
    type: "Info",
    title: "Relief Camps Operational",
    message: "12 new relief camps are now operational in affected areas. Food and medical aid available.",
    messageHindi: "12 नई राहत शिविर अब परिचालन में हैं। भोजन और चिकित्सा सहायता उपलब्ध।",
    time: "1 hour ago",
    status: "sent",
    reach: "1.2M people"
  }
];

// Helper to centralize the badge and icon logic
const getAlertTypeProps = (type: string): { variant: "destructive" | "default" | "secondary"; icon: React.ElementType; color: string } => {
  if (type === "Critical") return { variant: "destructive", icon: AlertTriangle, color: "border-red-500" };
  if (type === "Warning") return { variant: "default", icon: AlertTriangle, color: "border-yellow-500" };
  return { variant: "secondary", icon: Info, color: "border-blue-500" };
};

export const AlertsPanel = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  // State to manage which alert's translation is open
  const [openTranslationId, setOpenTranslationId] = useState(null);

  const toggleTranslation = (id) => {
    setOpenTranslationId(openTranslationId === id ? null : id);
  };
  
  return (
    // Full width for responsiveness and centering for desktop (max-w-4xl)
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="p-4 md:p-6 border-b">
        <div className="flex items-center justify-between flex-wrap gap-2"> 
          <CardTitle className="flex items-center space-x-2 text-xl md:text-2xl">
            <Megaphone className="h-6 w-6 text-red-600" /> 
            <span>{t('emergency.alerts') || "Emergency Alerts"}</span>
          </CardTitle>
          <Button 
            variant="destructive" 
            size="default" 
            className="shadow-lg hover:shadow-xl transition-shadow" 
            onClick={() => toast({
              title: t('success'),
              description: "New alert form opened",
            })}
          >
            <Volume2 className="h-4 w-4 mr-2" />
            {t('new.alert') || "New Alert"}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 p-4 md:p-6">
        {alerts.map((alert) => { // Use curly braces for the map function body
          const { variant, icon: Icon, color } = getAlertTypeProps(alert.type);
          const isTranslationOpen = openTranslationId === alert.id;
          
          return (
            <div 
              key={alert.id} 
              // Severity border highlight and modern shadows
              className={`
                p-4 border rounded-xl shadow-md transition-all hover:shadow-lg bg-white space-y-3
                border-l-4 ${color}
              `}
            >
              {/* Top Row: Badges and Time (Border-b added for separation) */}
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center space-x-2">
                  <Badge 
                    className="min-w-[80px] justify-center" 
                    variant={variant} // Using helper function
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {alert.type}
                  </Badge>
                  
                  <Badge variant={alert.status === "active" ? "outline" : "secondary"} className="text-xs">
                    {/* Status Dot Indicator */}
                    {alert.status === "active" ? (
                      <span className="h-2 w-2 mr-1 rounded-full bg-green-500 animate-pulse" />
                    ) : (
                      <span className="h-2 w-2 mr-1 rounded-full bg-gray-400" />
                    )}
                    {alert.status === "active" ? "Broadcasting" : "Sent"}
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {alert.time}
                </div>
              </div>

              {/* Content Section: Title and Messages */}
              <div>
                <h4 className="font-bold text-lg mb-2 mt-2">{alert.title}</h4>
                
                {/* English Message with Toggle Button */}
                <div className="flex justify-between items-start">
                  <p className="text-base text-gray-700 max-w-[70%] md:max-w-full">{alert.message}</p>
                  <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs p-1 h-auto shrink-0"
                      onClick={() => toggleTranslation(alert.id)}>
                      <Globe className="h-3 w-3 mr-1" />
                      {isTranslationOpen ? 'Hide' : 'Show Hindi'}
                  </Button>
                </div>

                {/* Hindi Translation Block (Conditionally Rendered) */}
                {isTranslationOpen && (
                  <div className="mt-3 bg-orange-50/70 border border-orange-200 p-3 rounded-lg text-sm transition-all duration-300">
                    <div className="flex items-center space-x-1 mb-1">
                      <Globe className="h-4 w-4 text-orange-600" />
                      <span className="text-xs font-semibold text-orange-600">हिंदी Translation</span>
                    </div>
                    <p className="text-sm text-gray-800">{alert.messageHindi}</p>
                  </div>
                )}
              </div>

              {/* Bottom Row: Reach and Actions */}
              <div className="flex items-center justify-between pt-3 border-t mt-3"> 
                <div className="flex items-center space-x-2 text-sm font-medium text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Reached {alert.reach}</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-3 text-sm" 
                        onClick={() => toast({
                        title: "Edit Alert",
                        // FIX: Use backticks for template literal
                        description: `Editing alert: ${alert.title}`,
                      })}>
                    Edit
                  </Button>
                  {alert.status === "active" && (
                    <Button 
                          variant="secondary" 
                          size="sm" 
                          className="h-8 px-3 text-sm" 
                          onClick={() => toast({
                          title: "Alert Stopped",
                            // FIX: Use backticks for template literal
                          description: `Broadcasting stopped for: ${alert.title}`,
                        })}>
                      Stop
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* AI Assistant Section (Enhanced Styling) */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-inner mt-6">
          <div className="flex items-center space-x-2 mb-2">
            <Megaphone className="h-5 w-5 text-indigo-600" />
            <span className="font-bold text-base text-indigo-700">AI Alert System</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Automatically generates multilingual alerts based on incident severity and affected population.
          </p>
          <Button variant="default" size="sm" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => toast({
            title: "AI Configuration",
            description: "AI Alert configuration panel opened",
          })}>
            Configure AI Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};