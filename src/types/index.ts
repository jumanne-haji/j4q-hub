export type ServiceCategory = 
  | 'business'
  | 'education'
  | 'technology'
  | 'ai'
  | 'platforms';

export type ServiceOwnership = 'first_party' | 'third_party';

export type ServiceStatus = 'operational' | 'in_review' | 'maintenance' | 'beta';

export interface ServiceEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  samplePayload?: Record<string, unknown>;
  sampleResponse?: Record<string, unknown>;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  ownership: ServiceOwnership; // 1st party (J4Q DIGITAL) vs 3rd party partner
  providerName: string;
  providerUrl?: string;
  category: ServiceCategory;
  status: ServiceStatus;
  version: string;
  sla: string; // e.g. "99.95%"
  latencyMs: number; // e.g. 42
  image: string;
  docsUrl: string;
  apiBaseUrl: string;
  authType: 'API_KEY' | 'BEARER_TOKEN' | 'OAUTH2' | 'HMAC';
  pricing: 'Free Tier' | 'Usage-Based' | 'Enterprise' | 'Subscription';
  features: string[];
  endpoints: ServiceEndpoint[];
  createdAt: string;
  updatedAt: string;
  isFeatured?: boolean;
}

export type UserRole = 'public_user' | 'verified_partner' | 'system_admin';

export interface UserAccount {
  id: string;
  email: string;
  fullName: string;
  organization?: string;
  role: UserRole;
  apiKey?: string;
  webhookSecret?: string;
}

export interface PartnerSubmission {
  id: string;
  serviceName: string;
  providerName: string;
  providerEmail: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  apiBaseUrl: string;
  healthEndpoint: string;
  authType: 'API_KEY' | 'BEARER_TOKEN' | 'OAUTH2' | 'HMAC';
  sla: string;
  pricing: 'Free Tier' | 'Usage-Based' | 'Enterprise' | 'Subscription';
  docsUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
}

export interface UdiapFactorInput {
  capexBudget: number; // in USD or TZS equivalent
  regulatoryComplianceScore: number; // 0 - 100
  marketUrgencyScore: number; // 0 - 100
  technicalComplexityScore: number; // 0 - 100
  teamReadinessScore: number; // 0 - 100
}

export interface UdiapEvaluationResult {
  decisionScore: number; // 0 - 100
  confidenceIndex: number; // 0 - 100%
  recommendation: 'EXECUTE_IMMEDIATELY' | 'CONDITIONAL_APPROVAL' | 'PILOT_VALIDATION' | 'REVISE_PROPOSAL';
  recommendationSw: string;
  summary: string;
  riskRating: 'Low' | 'Moderate' | 'Elevated' | 'Critical';
  factors: {
    name: string;
    score: number;
    weight: number;
    impact: 'Positive' | 'Neutral' | 'Risk';
  }[];
  mitigationSteps: string[];
}

export interface ApiTestResult {
  status: number;
  statusText: string;
  latencyMs: number;
  timestamp: string;
  headers: Record<string, string>;
  data: unknown;
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  role: UserRole;
  details: string;
}
