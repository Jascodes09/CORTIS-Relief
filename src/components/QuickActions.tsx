/* import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Users, 
  Truck, 
  MessageCircle, 
  FileText, 
  Phone,
  Megaphone,
  Settings
} from "lucide-react";

import { ActionModals } from "@/components/ActionModals";
import { AIChat } from "@/components/AIChat";

const quickActions = [
  {
    title: "Report Incident",
    description: "Report new disaster or emergency",
    icon: AlertTriangle,
    variant: "emergency" as const,
    action: "report"
  },
  {
    title: "Deploy Volunteers",
    description: "Assign volunteers to affected areas",
    icon: Users,
    variant: "info" as const,
    action: "volunteers"
  },
  {
    title: "Resource Request",
    description: "Request supplies and equipment",
    icon: Truck,
    variant: "warning" as const,
    action: "resources"
  },
  {
    title: "Send Alert",
    description: "Broadcast emergency alerts",
    icon: Megaphone,
    variant: "emergency" as const,
    action: "alert"
  },
  {
    title: "Emergency Contacts",
    description: "Access important phone numbers",
    icon: Phone,
    variant: "success" as const,
    action: "contacts"
  },
  {
    title: "Generate Report",
    description: "Create situation reports",
    icon: FileText,
    variant: "secondary" as const,
    action: "report-gen"
  }
];

export const QuickActions = () => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                variant={action.variant === "emergency" ? "destructive" : action.variant === "info" ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-center space-y-2 text-center group hover:scale-105 transition-transform"
                onClick={() => setActiveAction(action.action)}
              >
                <IconComponent className="h-6 w-6" />
                <div>
                  <div className="font-semibold text-sm">{action.title}</div>
                  <div className="text-xs opacity-80">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <MessageCircle className="h-4 w-4 text-info" />
            <span className="font-medium">AI Assistant</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Ask me anything about disaster management, resource allocation, or emergency protocols.
          </p>
          <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => setIsChatOpen(true)}>
            Start AI Chat
          </Button>
        </div>
      </CardContent>
    </Card>
    
    <ActionModals 
      action={activeAction} 
      onClose={() => setActiveAction(null)} 
    />
    
    <AIChat 
      isOpen={isChatOpen} 
      onClose={() => setIsChatOpen(false)} 
    />
    </>
  );
}; */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Users, 
  Truck, 
  Phone,
  Megaphone,
  Settings,
  FileText,
  MessageCircle
} from "lucide-react";

import { ActionModals } from "@/components/ActionModals";
import { AIChat } from "@/components/AIChat";

const quickActions = [
  {
    title: "Report Incident",
    description: "Report new disaster or emergency",
    icon: AlertTriangle,
    variant: "emergency" as const,
    action: "report"
  },
  {
    title: "Deploy Volunteers",
    description: "Assign volunteers to affected areas",
    icon: Users,
    variant: "info" as const,
    action: "volunteers"
  },
  {
    title: "Resource Request",
    description: "Request supplies and equipment",
    icon: Truck,
    variant: "warning" as const,
    action: "resources"
  },
  {
    title: "Send Alert",
    description: "Broadcast emergency alerts",
    icon: Megaphone,
    variant: "emergency" as const,
    action: "alert"
  },
  {
    title: "Emergency Contacts",
    description: "Access important phone numbers",
    icon: Phone,
    variant: "success" as const,
    action: "contacts"
  },
  {
    title: "Generate Report",
    description: "Create situation reports",
    icon: FileText,
    variant: "secondary" as const,
    action: "report-gen"
  }
];

export const QuickActions = () => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/*           💡 FIX: Removed 'absolute' positioning, ensured the button uses 'flex' layout 
          and added 'whitespace-normal' and 'max-w-full' to prevent overflow 
        */}
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                variant={action.variant === "emergency" ? "destructive" : action.variant === "info" ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-center space-y-2 text-center group hover:scale-105 transition-transform"
                onClick={() => setActiveAction(action.action)}
              >
                <IconComponent className="h-6 w-6" />
                <div className="max-w-full whitespace-normal"> {/* Ensure the text container doesn't exceed the button width */}
                  <div className="font-semibold text-sm">{action.title}</div>
                  <div className="text-xs opacity-80">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <MessageCircle className="h-4 w-4 text-info" />
            <span className="font-medium">AI Assistant</span>
                      </div>
          <p className="text-xs text-muted-foreground mt-1">
            Ask me anything about disaster management, resource allocation, or emergency protocols.
          </p>
          <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => setIsChatOpen(true)}>
            Start AI Chat
          </Button>
        </div>
      </CardContent>
    </Card>
    
    <ActionModals 
      action={activeAction} 
      onClose={() => setActiveAction(null)} 
    />
    
    <AIChat 
      isOpen={isChatOpen} 
      onClose={() => setIsChatOpen(false)} 
    />
    </>
  );
};