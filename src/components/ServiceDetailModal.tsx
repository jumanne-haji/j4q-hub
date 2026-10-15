import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Play, 
  Copy, 
  Check, 
  Key, 
  Cpu, 
  Layers, 
  Sliders, 
  BookOpen 
} from 'lucide-react';
import { calculateUdiapDecision } from '../utils/udiapEngine';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  const { currentUser, language, runApiSimulation, t } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'api' | 'playground' | 'credentials'>('overview');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Playground state for generic API testing
  const [selectedEndpointIndex, setSelectedEndpointIndex] = useState(0);
  const [isLoadingTest, setIsLoadingTest] = useState(false);
  const [testResponse, setTestResponse] = useState<any>(null);

  // UDIAP specific playground parameters
  const [udiapCapex, setUdiapCapex] = useState(120000);
  const [udiapRegulatory, setUdiapRegulatory] = useState(82);
  const [udiapUrgency, setUdiapUrgency] = useState(78);
  const [udiapTechComplexity, setUdiapTechComplexity] = useState(60);
  const [udiapTeamReadiness, setUdiapTeamReadiness] = useState(85);

  if (!service) return null;

  const isUdiap = service.id === 'j4q-udiap';
  const isFirstParty = service.ownership === 'first_party';

  const activeEndpoint = service.endpoints[selectedEndpointIndex] || service.endpoints[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleRunApiTest = async () => {
    setIsLoadingTest(true);
    setTestResponse(null);
    try {
      const res = await runApiSimulation(
        activeEndpoint.method,
        activeEndpoint.path,
        activeEndpoint.samplePayload
      );
      setTestResponse(res);
    } finally {
      setIsLoadingTest(false);
    }
  };

  const udiapResult = isUdiap ? calculateUdiapDecision({
    capexBudget: udiapCapex,
    regulatoryComplianceScore: udiapRegulatory,
    marketUrgencyScore: udiapUrgency,
    technicalComplexityScore: udiapTechComplexity,
    teamReadinessScore: udiapTeamReadiness,
  }, language) : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative w-full max-w-4xl bg-[#0f172a] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header Bar */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/60 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            {/* Unboxed Metadata Line */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className={`font-semibold uppercase tracking-wider ${isFirstParty ? 'text-orange-400' : 'text-emerald-400'}`}>
                {isFirstParty ? 'J4Q DIGITAL (1st-Party)' : 'Verified Partner'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{service.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-300">{service.version}</span>
            </div>

            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {service.name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300">
              {service.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close details modal"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 border-b border-slate-800 bg-slate-950/40 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'overview'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Overview
            </span>
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'api'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              API Endpoints ({service.endpoints.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'playground'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              Interactive Playground
            </span>
          </button>

          <button
            onClick={() => setActiveTab('credentials')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'credentials'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" />
              API Key & Access
            </span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200 text-sm">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Technical Key-Value Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
                <div>
                  <div className="text-slate-400">Guaranteed SLA</div>
                  <div className="font-bold text-white font-mono tabular-nums text-sm mt-0.5">{service.sla}</div>
                </div>
                <div>
                  <div className="text-slate-400">Avg Roundtrip</div>
                  <div className="font-bold text-emerald-400 font-mono tabular-nums text-sm mt-0.5">{service.latencyMs}ms</div>
                </div>
                <div>
                  <div className="text-slate-400">Auth Mechanism</div>
                  <div className="font-bold text-orange-400 font-mono text-sm mt-0.5">{service.authType}</div>
                </div>
                <div>
                  <div className="text-slate-400">Pricing Model</div>
                  <div className="font-bold text-white font-mono text-sm mt-0.5">{service.pricing}</div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Service Architecture & Scope
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Core Capabilities
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/80">
                      <span className="text-orange-400 font-bold">✓</span>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Provider Info */}
              <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">Maintained By</div>
                  <div className="text-sm font-bold text-white">{service.providerName}</div>
                </div>
                {service.providerUrl && (
                  <a
                    href={service.providerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    <span>Provider Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: API ENDPOINTS */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Registered Endpoints on J4Q Connect
                </div>

                {service.endpoints.map((ep, idx) => (
                  <div 
                    key={idx}
                    className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded ${
                          ep.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                        }`}>
                          {ep.method}
                        </span>
                        <code className="text-xs font-mono text-white font-semibold">{ep.path}</code>
                      </div>

                      <button
                        onClick={() => handleCopy(`${service.apiBaseUrl}${ep.path}`, `ep-${idx}`)}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 py-1 px-2 rounded bg-slate-800"
                      >
                        {copiedText === `ep-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy URL</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-300">{ep.description}</p>

                    {ep.samplePayload && (
                      <div className="space-y-1">
                        <div className="text-[11px] font-mono text-slate-400">Sample Request Payload:</div>
                        <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto border border-slate-850">
                          {JSON.stringify(ep.samplePayload, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: INTERACTIVE PLAYGROUND */}
          {activeTab === 'playground' && (
            <div className="space-y-6">
              {isUdiap ? (
                /* Specialized UDIAP Interactive Decision Engine */
                <div className="space-y-6">
                  <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                    <h3 className="text-sm font-bold text-orange-400 flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      Live UDIAP Decision Intelligence Simulator
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Adjust your investment and operational vectors below to observe how UDIAP computes decision viability, confidence indexes, and automated risk mitigation paths.
                    </p>
                  </div>

                  {/* Sliders Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* CapEx Input */}
                    <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">CapEx Budget (USD)</span>
                        <span className="font-mono text-orange-400 font-bold tabular-nums">
                          ${udiapCapex.toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10000"
                        max="500000"
                        step="5000"
                        value={udiapCapex}
                        onChange={(e) => setUdiapCapex(Number(e.target.value))}
                        className="w-full accent-orange-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>$10k (Agile)</span>
                        <span>$500k (Enterprise)</span>
                      </div>
                    </div>

                    {/* Regulatory Compliance */}
                    <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">Regulatory & Legal Compliance</span>
                        <span className="font-mono text-emerald-400 font-bold tabular-nums">
                          {udiapRegulatory}/100
                        </span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={udiapRegulatory}
                        onChange={(e) => setUdiapRegulatory(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>High Friction</span>
                        <span>Full TCRA/PDPA Clearance</span>
                      </div>
                    </div>

                    {/* Market Urgency */}
                    <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">Market Urgency & Demand</span>
                        <span className="font-mono text-amber-400 font-bold tabular-nums">
                          {udiapUrgency}/100
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={udiapUrgency}
                        onChange={(e) => setUdiapUrgency(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Exploratory</span>
                        <span>Critical Window</span>
                      </div>
                    </div>

                    {/* Technical Complexity */}
                    <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">Technical Complexity</span>
                        <span className="font-mono text-blue-400 font-bold tabular-nums">
                          {udiapTechComplexity}/100
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={udiapTechComplexity}
                        onChange={(e) => setUdiapTechComplexity(Number(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Standard API</span>
                        <span>Distributed Sharded Kernel</span>
                      </div>
                    </div>

                    {/* Team Readiness */}
                    <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2 sm:col-span-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">Engineering & Operational Team Readiness</span>
                        <span className="font-mono text-emerald-400 font-bold tabular-nums">
                          {udiapTeamReadiness}/100
                        </span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={udiapTeamReadiness}
                        onChange={(e) => setUdiapTeamReadiness(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Resource Deficit</span>
                        <span>Fully Staffed Squads</span>
                      </div>
                    </div>
                  </div>

                  {/* Computed Results Matrix */}
                  {udiapResult && (
                    <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div className="p-3 bg-slate-900/60 rounded-lg">
                          <div className="text-[11px] text-slate-400">UDIAP Score</div>
                          <div className="text-2xl font-black text-orange-400 font-mono tabular-nums">
                            {udiapResult.decisionScore}
                          </div>
                        </div>

                        <div className="p-3 bg-slate-900/60 rounded-lg">
                          <div className="text-[11px] text-slate-400">Confidence</div>
                          <div className="text-2xl font-black text-emerald-400 font-mono tabular-nums">
                            {udiapResult.confidenceIndex}%
                          </div>
                        </div>

                        <div className="p-3 bg-slate-900/60 rounded-lg sm:col-span-2 text-left">
                          <div className="text-[11px] text-slate-400">Directive</div>
                          <div className="text-xs font-bold text-white mt-1">
                            {language === 'sw' ? udiapResult.recommendationSw : udiapResult.recommendation.replace('_', ' ')}
                          </div>
                          <div className="text-[11px] text-slate-400">Risk: {udiapResult.riskRating}</div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 italic">
                        "{udiapResult.summary}"
                      </p>

                      {/* Factor Breakdown */}
                      <div className="space-y-1.5 pt-2">
                        <div className="text-xs font-semibold text-slate-400">Factor Vector Weighting:</div>
                        {udiapResult.factors.map((f, i) => (
                          <div key={i} className="flex items-center justify-between text-xs p-1.5 bg-slate-900/50 rounded">
                            <span className="text-slate-300">{f.name} (wt: {f.weight}%)</span>
                            <span className="font-mono font-bold tabular-nums text-slate-200">{f.score}/100</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Generic API Live Tester */
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-semibold text-slate-300">Select Test Endpoint:</div>
                    <select
                      value={selectedEndpointIndex}
                      onChange={(e) => setSelectedEndpointIndex(Number(e.target.value))}
                      className="bg-slate-900 text-xs text-slate-200 border border-slate-700 rounded px-2.5 py-1 focus:ring-1 focus:ring-orange-500"
                    >
                      {service.endpoints.map((ep, i) => (
                        <option key={i} value={i}>
                          {ep.method} {ep.path}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono text-emerald-400">
                        {activeEndpoint.method} {service.apiBaseUrl}{activeEndpoint.path}
                      </div>

                      <button
                        onClick={handleRunApiTest}
                        disabled={isLoadingTest}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>{isLoadingTest ? 'Executing Probe...' : 'Send Live Request'}</span>
                      </button>
                    </div>

                    {activeEndpoint.samplePayload && (
                      <div className="space-y-1">
                        <div className="text-[11px] text-slate-400">JSON Payload:</div>
                        <pre className="p-3 bg-slate-900 rounded text-xs font-mono text-slate-300 overflow-x-auto">
                          {JSON.stringify(activeEndpoint.samplePayload, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Response Inspector */}
                  {testResponse && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-emerald-400 font-bold">
                          HTTP {testResponse.status} {testResponse.statusText}
                        </span>
                        <span className="text-slate-400 tabular-nums">
                          Latency: {testResponse.latencyMs}ms
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[11px] text-slate-400">Response Payload (JSON):</div>
                        <pre className="p-3 bg-slate-900 rounded text-xs font-mono text-emerald-400 overflow-x-auto max-h-48">
                          {JSON.stringify(testResponse.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: API CREDENTIALS & ACCESS */}
          {activeTab === 'credentials' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Your Active API Key</div>
                    <code className="text-xs font-mono text-orange-400 break-all select-all">
                      {currentUser.apiKey}
                    </code>
                  </div>
                  <button
                    onClick={() => handleCopy(currentUser.apiKey || '', 'api-key')}
                    className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-lg text-xs flex items-center gap-1 shrink-0"
                  >
                    {copiedText === 'api-key' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* cURL Snippet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>cURL Command</span>
                  <button
                    onClick={() => handleCopy(`curl -X ${activeEndpoint.method} "${service.apiBaseUrl}${activeEndpoint.path}" \\\n  -H "Authorization: Bearer ${currentUser.apiKey}" \\\n  -H "Content-Type: application/json"`, 'curl')}
                    className="text-orange-400 hover:underline flex items-center gap-1"
                  >
                    {copiedText === 'curl' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy cURL</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800">
{`curl -X ${activeEndpoint.method} "${service.apiBaseUrl}${activeEndpoint.path}" \\
  -H "Authorization: Bearer ${currentUser.apiKey}" \\
  -H "Content-Type: application/json"`}
                </pre>
              </div>

              {/* Python Snippet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Python (FastAPI / Requests) Integration</span>
                  <button
                    onClick={() => handleCopy(`import requests\n\nurl = "${service.apiBaseUrl}${activeEndpoint.path}"\nheaders = {\n    "Authorization": "Bearer ${currentUser.apiKey}",\n    "Content-Type": "application/json"\n}\nresponse = requests.${activeEndpoint.method.toLowerCase()}(url, headers=headers)\nprint(response.json())`, 'py')}
                    className="text-orange-400 hover:underline flex items-center gap-1"
                  >
                    {copiedText === 'py' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy Python</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto border border-slate-800">
{`import requests

url = "${service.apiBaseUrl}${activeEndpoint.path}"
headers = {
    "Authorization": "Bearer ${currentUser.apiKey}",
    "Content-Type": "application/json"
}

response = requests.${activeEndpoint.method.toLowerCase()}(url, headers=headers)
print(response.json())`}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-300">{service.id}</span>
            <span>·</span>
            <span>J4Q HUB Registry</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
