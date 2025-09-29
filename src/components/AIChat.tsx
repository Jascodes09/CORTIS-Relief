import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  X,
  Zap
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChat = ({ isOpen, onClose }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI disaster management assistant. I can help you with emergency protocols, resource allocation, risk assessment, and coordination strategies. How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  // Mock AI responses for demo
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('flood') || message.includes('बाढ़')) {
      return 'For flood management: 1) Immediate evacuation of low-lying areas 2) Deploy rescue boats to affected zones 3) Set up relief camps on higher ground 4) Coordinate with meteorology dept for weather updates 5) Distribute emergency supplies (food, water, blankets). Priority zones: Areas below 10m elevation near rivers.';
    }
    
    if (message.includes('earthquake') || message.includes('भूकंप')) {
      return 'Earthquake response protocol: 1) Activate emergency response teams 2) Check for structural damage in buildings 3) Set up medical camps for injured 4) Ensure clear evacuation routes 5) Monitor for aftershocks. Remember: DROP, COVER, and HOLD ON during shaking.';
    }
    
    if (message.includes('resource') || message.includes('संसाधन')) {
      return 'Resource allocation strategy: 1) Assess immediate needs (medical, food, shelter) 2) Deploy resources based on population density and severity 3) Coordinate with local authorities and NGOs 4) Track resource utilization in real-time 5) Maintain emergency reserves for unexpected demands.';
    }
    
    if (message.includes('volunteer') || message.includes('स्वयंसेवक')) {
      return 'Volunteer deployment guidelines: 1) Match volunteer skills with needs (medical, rescue, logistics) 2) Provide safety briefings and equipment 3) Assign team leaders for coordination 4) Establish communication protocols 5) Rotate teams to prevent fatigue. Current priority: Need 50 medical volunteers in Mumbai flood zones.';
    }
    
    if (message.includes('alert') || message.includes('अलर्ट')) {
      return 'Emergency alert best practices: 1) Use clear, actionable language 2) Include specific location and time 3) Provide multilingual support (Hindi, English, local language) 4) Use multiple channels (SMS, radio, mobile apps) 5) Include safety instructions. Current alert protocols activated for monsoon season.';
    }
    
    return 'I can help you with disaster response strategies, emergency protocols, resource coordination, volunteer management, and risk assessment. Please specify your question about flood management, earthquake response, resource allocation, volunteer coordination, or emergency alerts.';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      toast({
        title: "AI Response Generated",
        description: "Emergency protocols and recommendations provided",
      });
    }, 1500);
  };

  const quickPrompts = [
    "How to handle flood emergency?",
    "Resource allocation strategy",
    "Volunteer deployment guidelines",
    "Emergency alert protocols"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <span>AI Disaster Assistant</span>
              <Badge variant="info" className="ml-2">
                <Zap className="h-3 w-3 mr-1" />
                Online
              </Badge>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col space-y-4">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    message.isUser 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    {message.isUser ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.isUser ? 'text-right' : ''}`}>
                    <div className={`p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground ml-12'
                        : 'bg-muted mr-12'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-3">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg mr-12">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {/* Quick Prompts */}
          <div className="grid grid-cols-2 gap-2">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setInputMessage(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about disaster management, resources, or emergency protocols..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};