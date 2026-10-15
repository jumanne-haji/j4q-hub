import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCategory } from '../types';
import { 
  Building2, 
  Key, 
  Send, 
  ShieldCheck, 
  RefreshCw, 
  Copy, 
  Check, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  PlusCircle,
  ExternalLink 
} from 'lucide-react';

export const PartnerPortal: React.FC = () => {
  const { 
    currentUser, 
    partnerSubmissions, 
    addPartnerSubmission, 
    regenerateApiKey,
    setActiveNavTab,
    setUserRole,
    t 
  } = useApp();

  const [serviceName, setServiceName] = useState('');
  const [providerName, setProviderName] = useState(currentUser.organization || 'Kilima Cloud Solutions');
  const [providerEmail, setProviderEmail] = useState(currentUser.email);
  const [category, setCategory] = useState<ServiceCategory>('business');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [apiBaseUrl, setApiBaseUrl] = useState('https://api.example.co.tz');
  const [healthEndpoint, setHealthEndpoint] = useState('/api/v1/health');
  const [authType, setAuthType] = useState<'API_KEY' | 'BEARER_TOKEN' | 'OAUTH2' | 'HMAC'>('API_KEY');
  const [sla, setSla] = useState('99.95%');
  const [pricing, setPricing] = useState<'Free Tier' | 'Usage-Based' | 'Enterprise' | 'Subscription'>('Usage-Based');
  const [docsUrl, setDocsUrl] = useState('https://docs.example.co.tz');
  
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim() || !tagline.trim() || !description.trim()) {
      alert('Please complete all required fields.');
      return;
    }

    addPartnerSubmission({
      serviceName,
      providerName,
      providerEmail,
      category,
      tagline,
      description,
      apiBaseUrl,
      healthEndpoint,
      authType,
      sla,
      pricing,
      docsUrl
    });

    setSubmissionSuccess(true);
    setServiceName('');
    setTagline('');
    setDescription('');
    setTimeout(() => setSubmissionSuccess(false), 5000);
  };

  return (
    <div className="py-12 bg-[#0b0f17] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">
              B2B Developer Onboarding
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.partner.title}
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {t.partner.subtitle}
            </p>
          </div>

          {currentUser.role !== 'verified_partner' && (
            <button
              onClick={() => setUserRole('verified_partner')}
              className="px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-medium rounded-lg transition-colors"
            >
              Set Active Role to Verified Partner
            </button>
          )}
        </div>

        {/* Credentials & Organization Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-bold text-white">Partner Organization Credentials</span>
            </div>

            <button
              onClick={regenerateApiKey}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Rotate Secret Keys</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-850 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{t.partner.apiKey}</span>
                <button
                  onClick={() => handleCopy(currentUser.apiKey || '', 'api-key')}
                  className="text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  {copiedKey === 'api-key' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <code className="text-xs font-mono text-white block truncate">
                {currentUser.apiKey}
              </code>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-850 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{t.partner.webhookSecret}</span>
                <button
                  onClick={() => handleCopy(currentUser.webhookSecret || '', 'wh-secret')}
                  className="text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  {copiedKey === 'wh-secret' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <code className="text-xs font-mono text-emerald-400 block truncate">
                {currentUser.webhookSecret}
              </code>
            </div>
          </div>
        </div>

        {/* Two-Column Form & Submission Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Submission Form */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-emerald-400" />
                {t.partner.submitNew}
              </span>
              <span className="text-xs text-slate-400">Requires Admin Review</span>
            </div>

            {submissionSuccess && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-3 text-xs text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold">Service Submitted Successfully!</div>
                  <div>Your API specification has been routed to the J4Q Digital Admin moderation queue.</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">
                    {t.partner.serviceName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="e.g. Serengeti IoT Fleet Telematics"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">
                    {t.partner.category} *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="business">Business Services</option>
                    <option value="education">Education</option>
                    <option value="technology">Technology</option>
                    <option value="ai">AI Services</option>
                    <option value="platforms">Digital Platforms</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">
                    {t.partner.providerName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={providerName}
                    onChange={(e) => setProviderName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">
                    {t.partner.providerEmail} *
                  </label>
                  <input
                    type="email"
                    required
                    value={providerEmail}
                    onChange={(e) => setProviderEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">
                  {t.partner.tagline} *
                </label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="One sentence value proposition for enterprise users"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">
                  {t.partner.description} *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive technical scope, protocol support, and data models..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">
                    {t.partner.apiBaseUrl} *
                  </label>
                  <input
                    type="url"
                    required
                    value={apiBaseUrl}
                    onChange={(e) => setApiBaseUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">
                    {t.partner.healthEndpoint} *
                  </label>
                  <input
                    type="text"
                    required
                    value={healthEndpoint}
                    onChange={(e) => setHealthEndpoint(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">
                    {t.partner.authType}
                  </label>
                  <select
                    value={authType}
                    onChange={(e) => setAuthType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="API_KEY">API Key</option>
                    <option value="BEARER_TOKEN">Bearer Token</option>
                    <option value="OAUTH2">OAuth 2.0</option>
                    <option value="HMAC">HMAC Signature</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">
                    {t.partner.sla}
                  </label>
                  <input
                    type="text"
                    value={sla}
                    onChange={(e) => setSla(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">
                    {t.partner.pricing}
                  </label>
                  <select
                    value={pricing}
                    onChange={(e) => setPricing(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="Free Tier">Free Tier</option>
                    <option value="Usage-Based">Usage-Based</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Subscription">Subscription</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">
                  {t.partner.docsUrl}
                </label>
                <input
                  type="url"
                  value={docsUrl}
                  onChange={(e) => setDocsUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.partner.submitBtn}</span>
              </button>

            </form>
          </div>

          {/* Submitted Services Status Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-white">
                  {t.partner.yourServices}
                </span>
                <span className="text-xs font-mono text-slate-400 tabular-nums">
                  {partnerSubmissions.length} Registered
                </span>
              </div>

              <div className="space-y-3">
                {partnerSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-white">{sub.serviceName}</h4>
                      <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                        sub.status === 'approved' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : sub.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {sub.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 line-clamp-2">
                      {sub.tagline}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-850">
                      <span>{sub.category} · {sub.authType}</span>
                      <span className="font-mono tabular-nums">
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </span>
                    </div>

                    {sub.rejectionReason && (
                      <div className="p-2 bg-red-500/10 border border-red-500/20 rounded text-[11px] text-red-300">
                        <strong>Feedback:</strong> {sub.rejectionReason}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
