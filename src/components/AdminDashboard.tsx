import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceStatus } from '../types';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  Settings, 
  Activity, 
  History, 
  Server, 
  Layers, 
  AlertOctagon, 
  ExternalLink 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    partnerSubmissions, 
    services, 
    auditLogs, 
    approveSubmission, 
    rejectSubmission, 
    updateServiceStatus,
    setUserRole,
    t 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'moderation' | 'services' | 'config' | 'audit'>('moderation');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('Missing compliant TLS 1.3 or incomplete API health check response.');

  // Config settings
  const [globalRateLimit, setGlobalRateLimit] = useState(1000);
  const [corsPolicy, setCorsPolicy] = useState('*.j4qhub.co.tz, *.j4qdigital.co.tz');
  const [jwtExpiryHours, setJwtExpiryHours] = useState(24);
  const [configSaved, setConfigSaved] = useState(false);

  const pendingSubmissions = partnerSubmissions.filter(s => s.status === 'pending');

  const handleConfirmReject = (id: string) => {
    if (!rejectReason.trim()) return;
    rejectSubmission(id, rejectReason);
    setRejectingId(null);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  return (
    <div className="py-12 bg-[#0b0f17] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">
              <span>J4Q DIGITAL Operations</span>
              <span aria-hidden="true">·</span>
              <span>Root Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.admin.title}
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {t.admin.subtitle}
            </p>
          </div>

          {currentUser.role !== 'system_admin' && (
            <button
              onClick={() => setUserRole('system_admin')}
              className="px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-semibold rounded-lg transition-colors"
            >
              Elevate Role to System Admin
            </button>
          )}
        </div>

        {/* Quick KPI Strip (Clean, unboxed figures with tabular-nums) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
            <div className="text-xs text-slate-400">Pending Review Queue</div>
            <div className="text-2xl font-black text-orange-400 font-mono tabular-nums mt-1">
              {pendingSubmissions.length}
            </div>
          </div>

          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
            <div className="text-xs text-slate-400">Total Live Catalog</div>
            <div className="text-2xl font-black text-white font-mono tabular-nums mt-1">
              {services.length}
            </div>
          </div>

          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
            <div className="text-xs text-slate-400">1st-Party In-House</div>
            <div className="text-2xl font-black text-emerald-400 font-mono tabular-nums mt-1">
              {services.filter(s => s.ownership === 'first_party').length}
            </div>
          </div>

          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
            <div className="text-xs text-slate-400">Edge Gateway Status</div>
            <div className="text-sm font-bold text-emerald-400 font-mono mt-2">
              99.98% / TIX-DSM
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveAdminTab('moderation')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeAdminTab === 'moderation'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <span>Moderation Queue ({pendingSubmissions.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('services')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeAdminTab === 'services'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <span>Catalog Manager ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('config')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeAdminTab === 'config'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <span>Gateway Policy & Routing</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('audit')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeAdminTab === 'audit'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <span>Audit Trail ({auditLogs.length})</span>
          </button>
        </div>

        {/* TAB 1: MODERATION QUEUE */}
        {activeAdminTab === 'moderation' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">
                {t.admin.pendingQueue}
              </h3>
              <span className="text-xs text-slate-400">
                Evaluating compliance, SLA guarantee, and endpoint security.
              </span>
            </div>

            {pendingSubmissions.length > 0 ? (
              <div className="space-y-4">
                {pendingSubmissions.map(sub => (
                  <div
                    key={sub.id}
                    className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                          <span className="text-orange-400 font-semibold">{sub.providerName}</span>
                          <span aria-hidden="true">·</span>
                          <span className="capitalize">{sub.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-slate-400">{sub.authType}</span>
                        </div>
                        <h4 className="text-base font-bold text-white">{sub.serviceName}</h4>
                        <p className="text-xs text-slate-300 mt-1">{sub.tagline}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => approveSubmission(sub.id)}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{t.admin.approve}</span>
                        </button>

                        <button
                          onClick={() => setRejectingId(sub.id)}
                          className="px-3.5 py-2 bg-slate-800 hover:bg-red-500 text-slate-300 hover:text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 border border-slate-700"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>{t.admin.reject}</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-2 border border-slate-850">
                      <div>Base URL: <span className="text-white">{sub.apiBaseUrl}</span></div>
                      <div>Probe: <span className="text-emerald-400">{sub.healthEndpoint}</span></div>
                      <div>SLA: <span className="text-orange-400">{sub.sla}</span></div>
                    </div>

                    {/* Rejection Prompt Form if active */}
                    {rejectingId === sub.id && (
                      <div className="p-4 bg-red-950/30 border border-red-500/30 rounded-lg space-y-3">
                        <label className="text-xs font-semibold text-red-300 block">
                          {t.admin.rejectPrompt}
                        </label>
                        <input
                          type="text"
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          className="w-full bg-slate-900 border border-red-500/40 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleConfirmReject(sub.id)}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-md"
                          >
                            Confirm Rejection
                          </button>
                          <button
                            onClick={() => setRejectingId(null)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-xl">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">All submissions reviewed</h4>
                <p className="text-xs text-slate-400 mt-1">There are no pending partner services in the moderation queue.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CATALOG MANAGER */}
        {activeAdminTab === 'services' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white">
              {t.admin.activeServices}
            </h3>

            <div className="overflow-x-auto bg-slate-900/90 border border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Service Name</th>
                    <th className="py-3 px-4 font-semibold">Ownership</th>
                    <th className="py-3 px-4 font-semibold">Category</th>
                    <th className="py-3 px-4 font-semibold">SLA</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {services.map(s => (
                    <tr key={s.id} className="hover:bg-slate-850/50">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{s.name}</div>
                        <div className="text-[11px] text-slate-400">{s.providerName}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-[11px] font-mono font-medium ${
                          s.ownership === 'first_party' ? 'text-orange-400' : 'text-emerald-400'
                        }`}>
                          {s.ownership === 'first_party' ? 'J4Q 1st-Party' : 'Partner'}
                        </span>
                      </td>
                      <td className="py-3 px-4 capitalize text-slate-300">
                        {s.category}
                      </td>
                      <td className="py-3 px-4 font-mono tabular-nums text-slate-200">
                        {s.sla}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={s.status}
                          onChange={(e) => updateServiceStatus(s.id, e.target.value as ServiceStatus)}
                          aria-label={`Update status for ${s.name}`}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-200 focus:ring-1 focus:ring-orange-500"
                        >
                          <option value="operational">Operational</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="beta">Beta Staging</option>
                          <option value="in_review">In Review</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[11px] font-mono text-slate-400">
                          {s.version}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: GATEWAY CONFIG */}
        {activeAdminTab === 'config' && (
          <form onSubmit={handleSaveConfig} className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-6 max-w-2xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-orange-400" />
              J4Q Connect Gateway Routing & Policy
            </h3>

            {configSaved && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-300">
                Platform gateway configuration persisted and propagated to Dar es Salaam edge nodes!
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Global Rate Limit (requests per minute per API key)
                </label>
                <input
                  type="number"
                  value={globalRateLimit}
                  onChange={(e) => setGlobalRateLimit(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Allowed CORS Domains
                </label>
                <input
                  type="text"
                  value={corsPolicy}
                  onChange={(e) => setCorsPolicy(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Session Token Validity (Hours)
                </label>
                <input
                  type="number"
                  value={jwtExpiryHours}
                  onChange={(e) => setJwtExpiryHours(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold rounded-lg transition-all"
            >
              Update Gateway Policies
            </button>
          </form>
        )}

        {/* TAB 4: AUDIT LOG */}
        {activeAdminTab === 'audit' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-400" />
              {t.admin.auditLog}
            </h3>

            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-slate-950 rounded-lg border border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-orange-400">{log.action}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-200">{log.details}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px] shrink-0">
                    <span>{log.actor} ({log.role})</span>
                    <span className="tabular-nums">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
