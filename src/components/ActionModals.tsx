import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Users, 
  Truck, 
  Megaphone,
  Phone,
  FileText,
  X,
  MapPin,
  Clock,
  User
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface ActionModalProps {
  action: string | null;
  onClose: () => void;
}

export const ActionModals = ({ action, onClose }: ActionModalProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSubmit = (actionType: string, formData: any) => {
    toast({
      title: t('success'),
      description: `${actionType} action completed successfully`,
    });
    onClose();
  };

  if (!action) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {action === 'report' && <ReportIncidentModal onClose={onClose} onSubmit={handleSubmit} />}
      {action === 'volunteers' && <DeployVolunteersModal onClose={onClose} onSubmit={handleSubmit} />}
      {action === 'resources' && <ResourceRequestModal onClose={onClose} onSubmit={handleSubmit} />}
      {action === 'alert' && <SendAlertModal onClose={onClose} onSubmit={handleSubmit} />}
      {action === 'contacts' && <EmergencyContactsModal onClose={onClose} />}
      {action === 'report-gen' && <GenerateReportModal onClose={onClose} onSubmit={handleSubmit} />}
    </div>
  );
};

const ReportIncidentModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: (type: string, data: any) => void }) => {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    severity: '',
    contactNumber: ''
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-emergency" />
            <span>Report Incident</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="incident-type">Incident Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select incident type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flood">Flood</SelectItem>
              <SelectItem value="earthquake">Earthquake</SelectItem>
              <SelectItem value="fire">Fire</SelectItem>
              <SelectItem value="cyclone">Cyclone</SelectItem>
              <SelectItem value="landslide">Landslide</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            placeholder="Enter location details"
          />
        </div>
        
        <div>
          <Label htmlFor="severity">Severity Level</Label>
          <Select value={formData.severity} onValueChange={(value) => setFormData({...formData, severity: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Describe the incident in detail"
            rows={3}
          />
        </div>
        
        <div>
          <Label htmlFor="contact">Contact Number</Label>
          <Input
            id="contact"
            value={formData.contactNumber}
            onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
            placeholder="Your contact number"
          />
        </div>
        
        <div className="flex space-x-2 pt-4">
          <Button onClick={() => onSubmit('Report Incident', formData)} className="flex-1">
            Submit Report
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const DeployVolunteersModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: (type: string, data: any) => void }) => {
  const [formData, setFormData] = useState({
    location: '',
    skillsRequired: '',
    numberOfVolunteers: '',
    urgency: '',
    duration: ''
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-info" />
            <span>Deploy Volunteers</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="v-location">Deployment Location</Label>
          <Input
            id="v-location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            placeholder="Enter deployment area"
          />
        </div>
        
        <div>
          <Label htmlFor="skills">Skills Required</Label>
          <Select value={formData.skillsRequired} onValueChange={(value) => setFormData({...formData, skillsRequired: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select required skills" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medical">Medical Aid</SelectItem>
              <SelectItem value="rescue">Search & Rescue</SelectItem>
              <SelectItem value="logistics">Logistics Support</SelectItem>
              <SelectItem value="communication">Communication</SelectItem>
              <SelectItem value="general">General Support</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="volunteers">Number of Volunteers</Label>
          <Input
            id="volunteers"
            type="number"
            value={formData.numberOfVolunteers}
            onChange={(e) => setFormData({...formData, numberOfVolunteers: e.target.value})}
            placeholder="How many volunteers needed?"
          />
        </div>
        
        <div>
          <Label htmlFor="urgency">Urgency Level</Label>
          <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="urgent">Urgent (within 2 hours)</SelectItem>
              <SelectItem value="planned">Planned (within 24 hours)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex space-x-2 pt-4">
          <Button onClick={() => onSubmit('Deploy Volunteers', formData)} className="flex-1">
            Deploy Now
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ResourceRequestModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: (type: string, data: any) => void }) => {
  const [formData, setFormData] = useState({
    resourceType: '',
    quantity: '',
    location: '',
    priority: '',
    description: ''
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5 text-warning" />
            <span>Resource Request</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="resource-type">Resource Type</Label>
          <Select value={formData.resourceType} onValueChange={(value) => setFormData({...formData, resourceType: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select resource type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medical">Medical Supplies</SelectItem>
              <SelectItem value="food">Food & Water</SelectItem>
              <SelectItem value="shelter">Temporary Shelters</SelectItem>
              <SelectItem value="vehicles">Transport Vehicles</SelectItem>
              <SelectItem value="equipment">Emergency Equipment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="quantity">Quantity Needed</Label>
          <Input
            id="quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            placeholder="Specify quantity/units"
          />
        </div>
        
        <div>
          <Label htmlFor="r-location">Delivery Location</Label>
          <Input
            id="r-location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            placeholder="Where should resources be delivered?"
          />
        </div>
        
        <div>
          <Label htmlFor="priority">Priority Level</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="critical">Critical (Life-threatening)</SelectItem>
              <SelectItem value="high">High (Urgent need)</SelectItem>
              <SelectItem value="medium">Medium (Important)</SelectItem>
              <SelectItem value="low">Low (When available)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex space-x-2 pt-4">
          <Button onClick={() => onSubmit('Resource Request', formData)} className="flex-1">
            Submit Request
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const SendAlertModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: (type: string, data: any) => void }) => {
  const [formData, setFormData] = useState({
    alertType: '',
    message: '',
    targetAreas: '',
    severity: '',
    language: 'both'
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Megaphone className="h-5 w-5 text-emergency" />
            <span>Send Emergency Alert</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="alert-type">Alert Type</Label>
          <Select value={formData.alertType} onValueChange={(value) => setFormData({...formData, alertType: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select alert type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="evacuation">Evacuation Order</SelectItem>
              <SelectItem value="weather">Weather Warning</SelectItem>
              <SelectItem value="safety">Safety Advisory</SelectItem>
              <SelectItem value="resources">Resource Availability</SelectItem>
              <SelectItem value="all-clear">All Clear</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="alert-message">Alert Message</Label>
          <Textarea
            id="alert-message"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            placeholder="Enter alert message (keep it clear and actionable)"
            rows={3}
          />
        </div>
        
        <div>
          <Label htmlFor="target-areas">Target Areas</Label>
          <Input
            id="target-areas"
            value={formData.targetAreas}
            onChange={(e) => setFormData({...formData, targetAreas: e.target.value})}
            placeholder="Specify affected areas/districts"
          />
        </div>
        
        <div>
          <Label htmlFor="alert-severity">Severity</Label>
          <Select value={formData.severity} onValueChange={(value) => setFormData({...formData, severity: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">Information</SelectItem>
              <SelectItem value="advisory">Advisory</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex space-x-2 pt-4">
          <Button 
            onClick={() => onSubmit('Emergency Alert', formData)} 
            className="flex-1"
            variant="emergency"
          >
            Broadcast Alert
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const EmergencyContactsModal = ({ onClose }: { onClose: () => void }) => {
  const contacts = [
    { name: 'National Emergency Response', number: '112', type: 'Primary' },
    { name: 'Fire Department', number: '101', type: 'Fire' },
    { name: 'Police', number: '100', type: 'Security' },
    { name: 'Medical Emergency', number: '108', type: 'Medical' },
    { name: 'Disaster Management (NDMA)', number: '1078', type: 'Coordination' },
    { name: 'Women Helpline', number: '181', type: 'Safety' },
    { name: 'Railway Inquiry', number: '139', type: 'Transport' },
    { name: 'Tourist Emergency', number: '1363', type: 'Tourism' }
  ];

  return (
    <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-success" />
            <span>Emergency Contacts</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 overflow-y-auto">
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
            <div>
              <h4 className="font-semibold text-sm">{contact.name}</h4>
              <Badge variant="outline" className="text-xs mt-1">{contact.type}</Badge>
            </div>
            <div className="text-right">
              <div className="font-mono text-lg font-bold text-primary">{contact.number}</div>
              <Button size="sm" variant="outline" className="mt-1" 
                onClick={() => window.open(`tel:${contact.number}`)}>
                Call Now
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const GenerateReportModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: (type: string, data: any) => void }) => {
  const [formData, setFormData] = useState({
    reportType: '',
    timeRange: '',
    includeAnalysis: true,
    format: 'pdf'
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-secondary" />
            <span>Generate Report</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="report-type">Report Type</Label>
          <Select value={formData.reportType} onValueChange={(value) => setFormData({...formData, reportType: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="incident">Incident Summary</SelectItem>
              <SelectItem value="resource">Resource Utilization</SelectItem>
              <SelectItem value="volunteer">Volunteer Deployment</SelectItem>
              <SelectItem value="damage">Damage Assessment</SelectItem>
              <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="time-range">Time Range</Label>
          <Select value={formData.timeRange} onValueChange={(value) => setFormData({...formData, timeRange: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last24h">Last 24 Hours</SelectItem>
              <SelectItem value="last7d">Last 7 Days</SelectItem>
              <SelectItem value="last30d">Last 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="format">Export Format</Label>
          <Select value={formData.format} onValueChange={(value) => setFormData({...formData, format: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF Document</SelectItem>
              <SelectItem value="excel">Excel Spreadsheet</SelectItem>
              <SelectItem value="json">JSON Data</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex space-x-2 pt-4">
          <Button onClick={() => onSubmit('Generate Report', formData)} className="flex-1">
            Generate Report
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};