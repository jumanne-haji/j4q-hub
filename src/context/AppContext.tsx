import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ServiceItem, 
  ServiceCategory, 
  ServiceOwnership, 
  ServiceStatus, 
  PartnerSubmission, 
  UserAccount, 
  UserRole, 
  SystemAuditLog,
  ApiTestResult 
} from '../types';
import { INITIAL_SERVICES, INITIAL_SUBMISSIONS } from '../data/initialServices';
import { Language, translations } from '../utils/translations';

interface AppContextType {
  services: ServiceItem[];
  partnerSubmissions: PartnerSubmission[];
  currentUser: UserAccount;
  language: Language;
  activeNavTab: string;
  selectedCategory: ServiceCategory | 'all';
  selectedOwnership: ServiceOwnership | 'all';
  searchQuery: string;
  selectedService: ServiceItem | null;
  bookmarkedIds: string[];
  auditLogs: SystemAuditLog[];
  apiTestResults: ApiTestResult[];
  
  // Actions
  setLanguage: (lang: Language) => void;
  setActiveNavTab: (tab: string) => void;
  setSelectedCategory: (cat: ServiceCategory | 'all') => void;
  setSelectedOwnership: (owner: ServiceOwnership | 'all') => void;
  setSearchQuery: (query: string) => void;
  setSelectedService: (service: ServiceItem | null) => void;
  toggleBookmark: (serviceId: string) => void;
  setUserRole: (role: UserRole) => void;
  
  // Partner & Admin flows
  addPartnerSubmission: (data: Omit<PartnerSubmission, 'id' | 'status' | 'submittedAt'>) => void;
  approveSubmission: (submissionId: string) => void;
  rejectSubmission: (submissionId: string, reason: string) => void;
  updateServiceStatus: (serviceId: string, status: ServiceStatus) => void;
  regenerateApiKey: () => void;
  runApiSimulation: (method: string, path: string, payload?: Record<string, unknown>) => Promise<ApiTestResult>;
  
  // Translation helper
  t: typeof translations.en;
}

const DEFAULT_USER: UserAccount = {
  id: 'usr-j4q-8841',
  fullName: 'Jumanne Haji',
  email: 'jumannehaji79@gmail.com',
  organization: 'J4Q DIGITAL Hub',
  role: 'system_admin', // Default to admin for full reviewer experience, can be switched freely
  apiKey: 'j4q_live_key_9f82d1c47a6e430b8d2e850b',
  webhookSecret: 'whsec_7c12f0e4b85961a9d034b7f8c11e'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('j4q_lang') as Language) || 'en';
  });

  const [activeNavTab, setActiveNavTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [selectedOwnership, setSelectedOwnership] = useState<ServiceOwnership | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('j4q_services');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_SERVICES;
  });

  const [partnerSubmissions, setPartnerSubmissions] = useState<PartnerSubmission[]>(() => {
    const saved = localStorage.getItem('j4q_submissions');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_SUBMISSIONS;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount>(() => {
    const saved = localStorage.getItem('j4q_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return DEFAULT_USER;
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('j4q_bookmarks');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return ['j4q-udiap', 'selcom-paylink'];
  });

  const [auditLogs, setAuditLogs] = useState<SystemAuditLog[]>([
    {
      id: 'log-01',
      timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
      action: 'SERVICE_INITIALIZATION',
      actor: 'system',
      role: 'system_admin',
      details: 'J4Q HUB Core Registry loaded 10 production endpoints.'
    },
    {
      id: 'log-02',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      action: 'GATEWAY_HEALTH_CHECK',
      actor: 'j4q-cloudops',
      role: 'system_admin',
      details: 'Dar es Salaam (TIX) edge node latency measured at 18ms.'
    }
  ]);

  const [apiTestResults, setApiTestResults] = useState<ApiTestResult[]>([]);

  // Persist critical state changes
  useEffect(() => {
    localStorage.setItem('j4q_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('j4q_submissions', JSON.stringify(partnerSubmissions));
  }, [partnerSubmissions]);

  useEffect(() => {
    localStorage.setItem('j4q_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('j4q_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('j4q_lang', lang);
  };

  const toggleBookmark = (serviceId: string) => {
    setBookmarkedIds(prev => 
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    );
  };

  const setUserRole = (role: UserRole) => {
    setCurrentUser(prev => ({ ...prev, role }));
    const log: SystemAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'ROLE_SWITCH',
      actor: currentUser.fullName,
      role,
      details: `Active session elevated/switched to ${role}`
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  const addPartnerSubmission = (data: Omit<PartnerSubmission, 'id' | 'status' | 'submittedAt'>) => {
    const newSub: PartnerSubmission = {
      ...data,
      id: `sub-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    setPartnerSubmissions(prev => [newSub, ...prev]);

    const log: SystemAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'PARTNER_SUBMISSION',
      actor: data.providerName,
      role: 'verified_partner',
      details: `New digital service submitted for review: ${data.serviceName} (${data.category})`
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  const approveSubmission = (submissionId: string) => {
    const sub = partnerSubmissions.find(s => s.id === submissionId);
    if (!sub) return;

    // Update submission status
    setPartnerSubmissions(prev => 
      prev.map(s => s.id === submissionId ? { ...s, status: 'approved', reviewedAt: new Date().toISOString() } : s)
    );

    // Create live service record
    const newService: ServiceItem = {
      id: `partner-${Date.now()}`,
      name: sub.serviceName,
      slug: sub.serviceName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: sub.tagline,
      description: sub.description,
      ownership: 'third_party',
      providerName: sub.providerName,
      providerUrl: sub.apiBaseUrl,
      category: sub.category,
      status: 'operational',
      version: 'v1.0.0',
      sla: sub.sla || '99.90%',
      latencyMs: Math.floor(Math.random() * 50) + 40,
      image: '/src/assets/images/j4q_connect_integration_1792058106647.jpg',
      docsUrl: sub.docsUrl || 'https://docs.j4qhub.co.tz',
      apiBaseUrl: sub.apiBaseUrl,
      authType: sub.authType,
      pricing: sub.pricing,
      features: [
        'Verified integration through J4Q Connect Gateway',
        `Authenticated via ${sub.authType}`,
        `Guaranteed SLA: ${sub.sla}`
      ],
      endpoints: [
        {
          method: 'GET',
          path: sub.healthEndpoint || '/health',
          description: `Health check and liveness probe for ${sub.serviceName}`
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setServices(prev => [newService, ...prev]);

    const log: SystemAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'SERVICE_APPROVED',
      actor: currentUser.fullName,
      role: 'system_admin',
      details: `Approved service: ${sub.serviceName} and published to catalog.`
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  const rejectSubmission = (submissionId: string, reason: string) => {
    setPartnerSubmissions(prev => 
      prev.map(s => s.id === submissionId ? { 
        ...s, 
        status: 'rejected', 
        rejectionReason: reason, 
        reviewedAt: new Date().toISOString() 
      } : s)
    );

    const log: SystemAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'SERVICE_REJECTED',
      actor: currentUser.fullName,
      role: 'system_admin',
      details: `Rejected submission: ID ${submissionId}. Reason: ${reason}`
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  const updateServiceStatus = (serviceId: string, status: ServiceStatus) => {
    setServices(prev => 
      prev.map(s => s.id === serviceId ? { ...s, status, updatedAt: new Date().toISOString() } : s)
    );

    const log: SystemAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'STATUS_UPDATE',
      actor: currentUser.fullName,
      role: 'system_admin',
      details: `Updated service ${serviceId} status to ${status}`
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  const regenerateApiKey = () => {
    const newKey = `j4q_live_key_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    const newSecret = `whsec_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    setCurrentUser(prev => ({ ...prev, apiKey: newKey, webhookSecret: newSecret }));

    const log: SystemAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'CREDENTIAL_ROTATION',
      actor: currentUser.fullName,
      role: currentUser.role,
      details: 'Rotated API credentials and Webhook Secret'
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  const runApiSimulation = async (method: string, path: string, payload?: Record<string, unknown>): Promise<ApiTestResult> => {
    const start = performance.now();
    // Simulate real network trip with micro-jitter
    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 80) + 35));
    const latency = Math.round(performance.now() - start);

    let sampleData: unknown = {};
    if (path.includes('udiap')) {
      sampleData = {
        engine: 'UDIAP_v1.4',
        assessment_id: `udiap-eval-${Math.random().toString(36).substring(2, 7)}`,
        decision_score: 84.6,
        confidence_index: 92,
        recommendation: 'EXECUTE_IMMEDIATELY',
        recommendation_sw: 'TEKELEZA MARA MOJA',
        risk_vectors: { regulatory: 'Compliant', financial: 'Optimized', technical: 'Feasible' },
        timestamp: new Date().toISOString()
      };
    } else if (path.includes('services')) {
      sampleData = {
        total_count: services.length,
        status: 'ok',
        registry: 'J4Q HUB Central Registry',
        region: 'Dar es Salaam, Tanzania (TIX)',
        timestamp: new Date().toISOString()
      };
    } else if (path.includes('checkout') || path.includes('selcom')) {
      sampleData = {
        trans_id: `SELCOM-TZ-${Math.floor(Math.random() * 900000 + 100000)}`,
        carrier: 'M-Pesa / Tigo Pesa / Airtel Money',
        currency: 'TZS',
        gateway_status: 'ACTIVE_LISTENING',
        ussd_push_state: 'DISPATCHED_TO_HANDSET'
      };
    } else {
      sampleData = {
        status: 'OPERATIONAL',
        path,
        method,
        received_payload: payload || {},
        gateway: 'J4Q Connect Reverse Proxy (Dar es Salaam)',
        auth: 'VERIFIED_BEARER',
        edge_datacenter: 'TIX-DSM-01'
      };
    }

    const result: ApiTestResult = {
      status: 200,
      statusText: 'OK',
      latencyMs: latency,
      timestamp: new Date().toISOString(),
      headers: {
        'content-type': 'application/json',
        'x-j4q-edge-region': 'tanzania-dar-es-salaam',
        'x-j4q-gateway-version': '1.4.2-hub',
        'x-rate-limit-remaining': '984',
        'cache-control': 'no-cache, private'
      },
      data: sampleData
    };

    setApiTestResults(prev => [result, ...prev.slice(0, 9)]);
    return result;
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        services,
        partnerSubmissions,
        currentUser,
        language,
        activeNavTab,
        selectedCategory,
        selectedOwnership,
        searchQuery,
        selectedService,
        bookmarkedIds,
        auditLogs,
        apiTestResults,
        setLanguage,
        setActiveNavTab,
        setSelectedCategory,
        setSelectedOwnership,
        setSearchQuery,
        setSelectedService,
        toggleBookmark,
        setUserRole,
        addPartnerSubmission,
        approveSubmission,
        rejectSubmission,
        updateServiceStatus,
        regenerateApiKey,
        runApiSimulation,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
