import { ServiceItem } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  // 1st-Party Services (J4Q DIGITAL)
  {
    id: 'j4q-udiap',
    name: 'UDIAP — Decision Intelligence Platform',
    slug: 'udiap-decision-intelligence',
    tagline: 'Proprietary Universal Decision Intelligence Assessment Platform for strategic risk and capital optimization.',
    description: 'Developed in-house by J4Q DIGITAL, UDIAP (Universal Decision Intelligence Assessment Platform) replaces subjective guesswork with multi-vector mathematical assessment. It evaluates capital expenditures, regulatory friction, market urgency, and technical feasibility to produce quantifiable decision confidence indexes and actionable risk mitigation paths.',
    ownership: 'first_party',
    providerName: 'J4Q DIGITAL',
    providerUrl: 'https://j4qdigital.co.tz',
    category: 'ai',
    status: 'operational',
    version: 'v1.4.0',
    sla: '99.98%',
    latencyMs: 38,
    image: '/src/assets/images/udiap_decision_intelligence_1792058106117.jpg',
    docsUrl: 'https://docs.j4qhub.co.tz/v1/udiap',
    apiBaseUrl: 'https://api.j4qhub.co.tz/api/v1/udiap',
    authType: 'API_KEY',
    pricing: 'Usage-Based',
    isFeatured: true,
    features: [
      'Multi-factor weighted capital & technical risk evaluation',
      'Real-time Decision Readiness Score (0 - 100) and Confidence Index',
      'Instant scenario modeling for East African regulatory frameworks',
      'Exportable executive briefings and automated compliance audits'
    ],
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/udiap/assess',
        description: 'Submits project parameters to the UDIAP engine and receives instant risk vector analytics.',
        samplePayload: {
          project_name: 'Dar Metro Solar Microgrid',
          capex_budget_usd: 145000,
          regulatory_compliance_score: 85,
          market_urgency_score: 90,
          technical_complexity_score: 65,
          team_readiness_score: 80
        },
        sampleResponse: {
          decision_score: 82.4,
          confidence_index: 91,
          recommendation: 'EXECUTE_IMMEDIATELY',
          risk_rating: 'Low',
          status: 'COMPUTED_SUCCESS'
        }
      },
      {
        method: 'GET',
        path: '/api/v1/udiap/factors',
        description: 'Retrieves current decision weighting parameters and sector baselines.'
      }
    ],
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-09-12T14:30:00Z'
  },
  {
    id: 'j4q-digital-services',
    name: 'J4Q Digital Architecture & Systems',
    slug: 'j4q-digital-architecture',
    tagline: 'Custom enterprise software engineering, web architectures, and digital ecosystem integration.',
    description: 'The core engineering arm of J4Q DIGITAL in Dar es Salaam. We design, build, and deploy production-grade cloud architectures, financial integrations, and distributed platforms tailored for East African enterprise scale.',
    ownership: 'first_party',
    providerName: 'J4Q DIGITAL',
    providerUrl: 'https://j4qdigital.co.tz',
    category: 'technology',
    status: 'operational',
    version: 'v2.1.0',
    sla: '99.95%',
    latencyMs: 45,
    image: '/src/assets/images/j4q_digital_engineering_1792058106516.jpg',
    docsUrl: 'https://docs.j4qhub.co.tz/v1/engineering',
    apiBaseUrl: 'https://api.j4qhub.co.tz/api/v1/services',
    authType: 'BEARER_TOKEN',
    pricing: 'Enterprise',
    isFeatured: true,
    features: [
      'Bespoke web & mobile software engineering',
      'PostgreSQL & distributed data pipelines with zero data loss',
      'Local payment and telecom API adapter construction',
      'DevOps, container orchestration, and continuous security compliance'
    ],
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/services/catalogue',
        description: 'Fetches active architecture offerings and SLA tiers.'
      },
      {
        method: 'POST',
        path: '/api/v1/services/request-spec',
        description: 'Submits system requirements for architectural evaluation.',
        samplePayload: {
          organization: 'Azikiwe Logistics TZ',
          expected_concurrent_users: 15000,
          region: 'Dar es Salaam'
        }
      }
    ],
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-08-20T11:00:00Z'
  },
  {
    id: 'j4q-cloudops',
    name: 'J4Q CloudOps & Edge Gateway',
    slug: 'j4q-cloudops-edge',
    tagline: 'Zero-trust edge routing and managed container runtime optimized for low latency across Tanzania.',
    description: 'High-availability reverse proxy, rate-limiting, and microservices hosting layer deployed across East African peering points (TIX / Dar es Salaam, Nairobi, Kigali). Guarantees ultra-low local packet roundtrips.',
    ownership: 'first_party',
    providerName: 'J4Q DIGITAL',
    providerUrl: 'https://j4qdigital.co.tz',
    category: 'technology',
    status: 'operational',
    version: 'v1.2.0',
    sla: '99.99%',
    latencyMs: 18,
    image: '/src/assets/images/j4q_connect_integration_1792058106647.jpg',
    docsUrl: 'https://docs.j4qhub.co.tz/v1/cloudops',
    apiBaseUrl: 'https://api.j4qhub.co.tz/api/v1/edge',
    authType: 'API_KEY',
    pricing: 'Usage-Based',
    features: [
      'Direct peering with local Tanzania Internet eXchange (TIX)',
      'DDoS mitigation and automated TLS certificate rotation',
      'Real-time traffic telemetry and anomaly detection',
      'Automated fallback failover with 99.99% uptime guarantee'
    ],
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/edge/health',
        description: 'Queries status of edge gateway nodes and ping benchmarks.'
      }
    ],
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-09-01T16:00:00Z'
  },
  {
    id: 'j4q-shambatech',
    name: 'J4Q ShambaTech AI',
    slug: 'j4q-shambatech-agribusiness-ai',
    tagline: 'Agricultural decision intelligence and climate risk modeling for Tanzanian cooperatives and exporters.',
    description: 'An AI-powered agricultural advisory engine developed by J4Q DIGITAL. Integrates meteorological telemetry, satellite vegetation indices, and regional crop market pricing in Morogoro, Mbeya, and Arusha.',
    ownership: 'first_party',
    providerName: 'J4Q DIGITAL',
    providerUrl: 'https://j4qdigital.co.tz',
    category: 'ai',
    status: 'operational',
    version: 'v1.0.4',
    sla: '99.90%',
    latencyMs: 64,
    image: '/src/assets/images/udiap_decision_intelligence_1792058106117.jpg',
    docsUrl: 'https://docs.j4qhub.co.tz/v1/shambatech',
    apiBaseUrl: 'https://api.j4qhub.co.tz/api/v1/shambatech',
    authType: 'API_KEY',
    pricing: 'Subscription',
    features: [
      'Crop yield forecasting using localized soil and climate data',
      'Swahili and English SMS/USSD advisory generation',
      'Market price trend forecasting for cashew, coffee, maize, and tea',
      'Automated micro-insurance claim trigger verification'
    ],
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/shambatech/crop-forecast',
        description: 'Returns yield forecast and risk assessment for a given district and crop type.'
      }
    ],
    createdAt: '2026-03-10T12:00:00Z',
    updatedAt: '2026-08-15T09:30:00Z'
  },
  {
    id: 'j4q-edtech-engine',
    name: 'J4Q EdTech Hub & Assessments',
    slug: 'j4q-edtech-engine',
    tagline: 'Institutional digital examinations, curriculum analytics, and verifiable academic micro-credentials.',
    description: 'Modular educational platform powering seamless student assessment delivery, anti-tamper grading matrices, and cryptographically verified digital diplomas for institutions across East Africa.',
    ownership: 'first_party',
    providerName: 'J4Q DIGITAL',
    providerUrl: 'https://j4qdigital.co.tz',
    category: 'education',
    status: 'operational',
    version: 'v1.3.1',
    sla: '99.92%',
    latencyMs: 50,
    image: '/src/assets/images/j4q_digital_engineering_1792058106516.jpg',
    docsUrl: 'https://docs.j4qhub.co.tz/v1/edtech',
    apiBaseUrl: 'https://api.j4qhub.co.tz/api/v1/edtech',
    authType: 'BEARER_TOKEN',
    pricing: 'Subscription',
    features: [
      'Scalable concurrent exam engine with offline synchronization',
      'Tamper-proof digital certificate generation with QR validation',
      'Curriculum mapping aligned with East African educational standards',
      'Student performance diagnostics and automated feedback loop'
    ],
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/edtech/verify-credential/:id',
        description: 'Validates authenticity of a digital academic credential.'
      }
    ],
    createdAt: '2026-02-18T14:00:00Z',
    updatedAt: '2026-09-05T12:00:00Z'
  },

  // 3rd-Party Connected Partner Services (Vetted Real Integrations)
  {
    id: 'selcom-paylink',
    name: 'Selcom PayLink Gateway',
    slug: 'selcom-paylink-checkout',
    tagline: 'Omni-channel payment gateway for M-Pesa, Airtel Money, Tigo Pesa, Halopesa, and Visa/Mastercard.',
    description: 'Certified 3rd-party integration with Selcom Tanzania. Enables merchant checkout, USSD push prompts, dynamic QR codes, and automated reconciliation for East African shilling transactions.',
    ownership: 'third_party',
    providerName: 'Selcom Tanzania PLC',
    providerUrl: 'https://selcom.net',
    category: 'business',
    status: 'operational',
    version: 'v3.2.0',
    sla: '99.98%',
    latencyMs: 85,
    image: '/src/assets/images/j4q_connect_integration_1792058106647.jpg',
    docsUrl: 'https://developers.selcom.net/docs',
    apiBaseUrl: 'https://api.selcom.net/v1',
    authType: 'HMAC',
    pricing: 'Usage-Based',
    features: [
      'Instant mobile money push STK prompts across all Tanzanian MNOs',
      'PCI-DSS Level 1 certified credit card processing',
      'Instant webhook delivery for settlement and refund events',
      'Automated daily bank reconciliation files'
    ],
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/checkout/create-order',
        description: 'Generates a payment order and triggers mobile money USSD prompt.'
      },
      {
        method: 'GET',
        path: '/api/v1/checkout/order-status/:order_id',
        description: 'Checks status of an active payment session.'
      }
    ],
    createdAt: '2026-03-01T08:00:00Z',
    updatedAt: '2026-09-20T10:00:00Z'
  },
  {
    id: 'nida-identity-gateway',
    name: 'NIDA e-KYC Verification Adapter',
    slug: 'nida-identity-verification',
    tagline: 'Standardized national identity verification adapter for Tanzanian National ID (NIN) compliance.',
    description: 'Secure enterprise adapter for querying National Identification Authority records. Streamlines customer onboarding, AML compliance, and biometric NIN verification for licensed financial and corporate entities.',
    ownership: 'third_party',
    providerName: 'National Identification Authority Adapter',
    providerUrl: 'https://nida.go.tz',
    category: 'platforms',
    status: 'operational',
    version: 'v2.0.1',
    sla: '99.85%',
    latencyMs: 140,
    image: '/src/assets/images/j4q_connect_integration_1792058106647.jpg',
    docsUrl: 'https://docs.j4qhub.co.tz/v1/integrations/nida',
    apiBaseUrl: 'https://api.j4qhub.co.tz/api/v1/integrations/nida',
    authType: 'BEARER_TOKEN',
    pricing: 'Usage-Based',
    features: [
      '20-digit National ID (NIN) format and checksum validation',
      'Name match scoring and date of birth cross-verification',
      'Audited token-based access with zero local biometric caching',
      'Compliant with Tanzania Personal Data Protection Act (PDPA)'
    ],
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/kyc/verify-nin',
        description: 'Performs hashed identity matching against national registry records.'
      }
    ],
    createdAt: '2026-03-15T09:30:00Z',
    updatedAt: '2026-08-30T15:00:00Z'
  },
  {
    id: 'bongosms-ussd',
    name: 'BongoSMS & Interactive USSD',
    slug: 'bongosms-telecom-gateway',
    tagline: 'High-throughput transactional SMS, two-factor OTPs, and dynamic USSD menu session orchestrator.',
    description: 'Direct telecommunications gateway connected to Vodacom, Airtel, Yas (Tigo), and Halotel. Powers two-factor security codes, transactional notifications, and interactive multi-step USSD financial menus.',
    ownership: 'third_party',
    providerName: 'BongoSMS Telecom Networks',
    providerUrl: 'https://bongosms.co.tz',
    category: 'business',
    status: 'operational',
    version: 'v4.1.0',
    sla: '99.95%',
    latencyMs: 42,
    image: '/src/assets/images/j4q_hub_hero_datacenter_1792058106146.jpg',
    docsUrl: 'https://bongosms.co.tz/api-docs',
    apiBaseUrl: 'https://api.bongosms.co.tz/v2',
    authType: 'API_KEY',
    pricing: 'Usage-Based',
    features: [
      'Instant OTP dispatch with sub-3 second delivery guarantee',
      'Dynamic USSD session state machine builder',
      'Sender ID registration and regulatory TCRA compliance',
      'Detailed delivery receipts and carrier bounce telemetry'
    ],
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/sms/send',
        description: 'Sends single or bulk SMS messages to Tanzanian mobile numbers.'
      },
      {
        method: 'POST',
        path: '/api/v1/ussd/session',
        description: 'Processes incoming USSD string and returns next menu screen.'
      }
    ],
    createdAt: '2026-02-22T11:00:00Z',
    updatedAt: '2026-09-18T13:40:00Z'
  },
  {
    id: 'azampay-corporate',
    name: 'AzamPay B2B Settlement API',
    slug: 'azampay-corporate-disbursements',
    tagline: 'Corporate bulk payouts, supplier settlements, and utility billing aggregator across East Africa.',
    description: 'High-volume payment rail from AzamPay. Automates payroll disbursements to multi-carrier wallets, instant supplier invoice payments, and automated Luku / Water bill inquiries.',
    ownership: 'third_party',
    providerName: 'AzamPay Tanzania Ltd',
    providerUrl: 'https://azampay.com',
    category: 'platforms',
    status: 'operational',
    version: 'v2.4.0',
    sla: '99.96%',
    latencyMs: 76,
    image: '/src/assets/images/j4q_connect_integration_1792058106647.jpg',
    docsUrl: 'https://developer.azampay.com',
    apiBaseUrl: 'https://api.azampay.com/v1',
    authType: 'OAUTH2',
    pricing: 'Usage-Based',
    features: [
      'Batch disbursement to over 5,000 mobile wallets in under 60 seconds',
      'Real-time account balance queries and threshold notifications',
      'Direct integration with commercial banks in Tanzania and Kenya',
      'Dual-authorization approval workflow for corporate security'
    ],
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/disbursement/batch',
        description: 'Dispatches batch payments to specified recipient accounts.'
      }
    ],
    createdAt: '2026-03-25T14:15:00Z',
    updatedAt: '2026-09-28T09:10:00Z'
  },
  {
    id: 'afrigis-routing',
    name: 'AfriGIS Geocoding & Logistics',
    slug: 'afrigis-geocoding-routing',
    tagline: 'East African address normalization, ward/street geocoding, and last-mile dispatch routing.',
    description: 'Specialized spatial routing API built for East African address structures. Normalizes non-standard physical directions into precise GPS coordinates and optimizes delivery driver route sequences.',
    ownership: 'third_party',
    providerName: 'AfriGIS Spatial Systems',
    providerUrl: 'https://afrigis.co.tz',
    category: 'technology',
    status: 'operational',
    version: 'v1.5.0',
    sla: '99.90%',
    latencyMs: 95,
    image: '/src/assets/images/j4q_digital_engineering_1792058106516.jpg',
    docsUrl: 'https://docs.afrigis.co.tz',
    apiBaseUrl: 'https://api.afrigis.co.tz/v1',
    authType: 'API_KEY',
    pricing: 'Usage-Based',
    features: [
      'Dar es Salaam landmark and informal landmark address geocoding',
      'Heavy freight vs light motorcycle (boda-boda) traffic routing profiles',
      'Geofencing alerts for logistics warehouses and port terminals',
      'Distance and travel time estimation matrix'
    ],
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/spatial/geocode',
        description: 'Converts unstructured address text into latitude/longitude with confidence score.'
      }
    ],
    createdAt: '2026-04-05T10:00:00Z',
    updatedAt: '2026-09-10T11:20:00Z'
  }
];

export const INITIAL_SUBMISSIONS: import('../types').PartnerSubmission[] = [
  {
    id: 'sub-01',
    serviceName: 'Zanzibar Port Clearing API',
    providerName: 'Swahili Maritime Logistics Ltd',
    providerEmail: 'developer@swahilimaritime.co.tz',
    category: 'business',
    tagline: 'Automated customs manifest submission and container status tracker for Malindi Port.',
    description: 'RESTful gateway for tracking shipping container clearance, port duties payments, and terminal release permits at Malindi Port Zanzibar. Designed for freight forwarders and regional importers.',
    apiBaseUrl: 'https://api.swahilimaritime.co.tz/v1',
    healthEndpoint: '/api/v1/health',
    authType: 'API_KEY',
    sla: '99.90%',
    pricing: 'Usage-Based',
    docsUrl: 'https://docs.swahilimaritime.co.tz',
    status: 'pending',
    submittedAt: '2026-10-14T09:20:00Z'
  },
  {
    id: 'sub-02',
    serviceName: 'Kilimo Bora Soil IoT Telemetry',
    providerName: 'KilimoTech Innovations Arusha',
    providerEmail: 'api@kilimobora.co.tz',
    category: 'technology',
    tagline: 'IoT soil moisture, NPK sensors, and solar pump automated controller interface.',
    description: 'Hardware telemetry ingest API for agricultural estates and irrigation schemes. Connects LoRaWAN base stations across northern Tanzania directly to irrigation pumps.',
    apiBaseUrl: 'https://telemetry.kilimobora.co.tz/api/v1',
    healthEndpoint: '/ping',
    authType: 'BEARER_TOKEN',
    sla: '99.80%',
    pricing: 'Subscription',
    docsUrl: 'https://kilimobora.co.tz/api/docs',
    status: 'pending',
    submittedAt: '2026-10-13T14:45:00Z'
  }
];
