import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Bell, 
  Settings, 
  Shield,
  Globe,
  MapPin,
  Phone,
  Languages
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

export const DashboardHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();

  return (
    <Card className="border-b rounded-none">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">
              {t('disaster.response.platform')}
            </h1>
          </div>
          
          <div className="flex items-center space-x-1 relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground z-10" />
            <Input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 pl-10 w-96"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="emergency" className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>{t('emergency.helpline')}</span>
            </Badge>
            
            <Select value={language} onValueChange={(value: 'en' | 'hi') => {
              setLanguage(value);
              toast({
                title: "Language Changed",
                description: `Language switched to ${value === 'en' ? 'English' : 'हिंदी'}`,
              });
            }}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="hi">🇮🇳 हिंदी</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" onClick={() => toast({
              title: "Notifications",
              description: "No new emergency alerts",
            })}>
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => toast({
              title: "Settings",
              description: "Settings panel opened",
            })}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};