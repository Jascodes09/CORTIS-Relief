import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'disaster.response.platform': 'Disaster Response Platform',
    'search.placeholder': 'Search incidents, resources, or locations...',
    'emergency.helpline': 'Emergency Helpline: 112',
    
    // Stats
    'active.incidents': 'Active Incidents',
    'people.affected': 'People Affected',
    'relief.camps': 'Relief Camps',
    'volunteers.deployed': 'Volunteers Deployed',
    
    // Quick Actions
    'quick.actions': 'Quick Actions',
    'report.incident': 'Report Incident',
    'report.incident.desc': 'Report new disaster or emergency',
    'deploy.volunteers': 'Deploy Volunteers',
    'deploy.volunteers.desc': 'Assign volunteers to affected areas',
    'resource.request': 'Resource Request',
    'resource.request.desc': 'Request supplies and equipment',
    'send.alert': 'Send Alert',
    'send.alert.desc': 'Broadcast emergency alerts',
    'emergency.contacts': 'Emergency Contacts',
    'emergency.contacts.desc': 'Access important phone numbers',
    'generate.report': 'Generate Report',
    'generate.report.desc': 'Create situation reports',
    'ai.assistant': 'AI Assistant',
    'ai.assistant.desc': 'Ask me anything about disaster management, resource allocation, or emergency protocols.',
    'start.ai.chat': 'Start AI Chat',
    
    // Alerts
    'emergency.alerts': 'Emergency Alerts',
    'new.alert': 'New Alert',
    'severe.flooding': 'Severe Flooding in Mumbai',
    'flooding.message': 'Heavy monsoon rains causing severe flooding in low-lying areas. Immediate evacuation required.',
    'earthquake.aftershocks': 'Earthquake Aftershocks Expected',
    'earthquake.message': 'Aftershocks expected in Delhi NCR region. Stay alert and follow safety protocols.',
    'relief.camps.operational': 'Relief Camps Operational',
    'relief.camps.message': '12 new relief camps are now operational in affected areas. Food and medical aid available.',
    
    // Resource Management
    'resource.management': 'Resource Management',
    'add.resource': 'Add Resource',
    'medical.supplies': 'Medical Supplies',
    'emergency.shelters': 'Emergency Shelters',
    'food.supplies': 'Food Supplies',
    'transport.vehicles': 'Transport Vehicles',
    'rescue.personnel': 'Rescue Personnel',
    'request.resources': 'Request Resources',
    'view.all.resources': 'View All Resources',
    
    // Common
    'close': 'Close',
    'submit': 'Submit',
    'cancel': 'Cancel',
    'success': 'Success',
    'error': 'Error',
    'loading': 'Loading...',
  },
  hi: {
    // Header
    'disaster.response.platform': 'आपदा प्रतिक्रिया मंच',
    'search.placeholder': 'घटनाएं, संसाधन, या स्थान खोजें...',
    'emergency.helpline': 'आपातकालीन हेल्पलाइन: 112',
    
    // Stats
    'active.incidents': 'सक्रिय घटनाएं',
    'people.affected': 'प्रभावित लोग',
    'relief.camps': 'राहत शिविर',
    'volunteers.deployed': 'तैनात स्वयंसेवक',
    
    // Quick Actions
    'quick.actions': 'त्वरित कार्य',
    'report.incident': 'घटना की रिपोर्ट करें',
    'report.incident.desc': 'नई आपदा या आपातकाल की रिपोर्ट करें',
    'deploy.volunteers': 'स्वयंसेवकों को तैनात करें',
    'deploy.volunteers.desc': 'प्रभावित क्षेत्रों में स्वयंसेवकों को भेजें',
    'resource.request': 'संसाधन अनुरोध',
    'resource.request.desc': 'आपूर्ति और उपकरण का अनुरोध करें',
    'send.alert': 'अलर्ट भेजें',
    'send.alert.desc': 'आपातकालीन अलर्ट प्रसारित करें',
    'emergency.contacts': 'आपातकालीन संपर्क',
    'emergency.contacts.desc': 'महत्वपूर्ण फोन नंबर देखें',
    'generate.report': 'रिपोर्ट तैयार करें',
    'generate.report.desc': 'स्थिति रिपोर्ट बनाएं',
    'ai.assistant': 'AI सहायक',
    'ai.assistant.desc': 'आपदा प्रबंधन, संसाधन आवंटन, या आपातकालीन प्रोटोकॉल के बारे में कुछ भी पूछें।',
    'start.ai.chat': 'AI चैट शुरू करें',
    
    // Alerts
    'emergency.alerts': 'आपातकालीन अलर्ट',
    'new.alert': 'नया अलर्ट',
    'severe.flooding': 'मुंबई में गंभीर बाढ़',
    'flooding.message': 'भारी मानसूनी बारिश के कारण निचले इलाकों में गंभीर बाढ़। तत्काल निकासी आवश्यक।',
    'earthquake.aftershocks': 'भूकंप के झटकों की संभावना',
    'earthquake.message': 'दिल्ली एनसीआर क्षेत्र में झटकों की संभावना। सतर्क रहें और सुरक्षा प्रोटोकॉल का पालन करें।',
    'relief.camps.operational': 'राहत शिविर परिचालन में',
    'relief.camps.message': '12 नए राहत शिविर अब प्रभावित क्षेत्रों में परिचालन में हैं। भोजन और चिकित्सा सहायता उपलब्ध।',
    
    // Resource Management
    'resource.management': 'संसाधन प्रबंधन',
    'add.resource': 'संसाधन जोड़ें',
    'medical.supplies': 'चिकित्सा आपूर्ति',
    'emergency.shelters': 'आपातकालीन आश्रय',
    'food.supplies': 'खाद्य आपूर्ति',
    'transport.vehicles': 'परिवहन वाहन',
    'rescue.personnel': 'बचाव कर्मी',
    'request.resources': 'संसाधन का अनुरोध करें',
    'view.all.resources': 'सभी संसाधन देखें',
    
    // Common
    'close': 'बंद करें',
    'submit': 'जमा करें',
    'cancel': 'रद्द करें',
    'success': 'सफलता',
    'error': 'त्रुटि',
    'loading': 'लोड हो रहा है...',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Fallback for development
    console.warn('useLanguage must be used within a LanguageProvider');
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: (key: string) => key
    };
  }
  return context;
};