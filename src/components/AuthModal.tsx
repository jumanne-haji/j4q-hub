import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { X, ShieldCheck, Key, User, Check, Copy, RefreshCw } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, setUserRole, regenerateApiKey, t } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'switch_role'>('profile');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const roleOptions: { role: UserRole; title: string; desc: string }[] = [
    {
      role: 'public_user',
      title: t.roles.public_user,
      desc: 'Browse public directory, run UDIAP playground simulator, test public endpoints.'
    },
    {
      role: 'verified_partner',
      title: t.roles.verified_partner,
      desc: 'Access Partner Portal, submit 3rd-party services, manage API keys and webhook secrets.'
    },
    {
      role: 'system_admin',
      title: t.roles.system_admin,
      desc: 'Root administrative clearance to moderate services, configure gateway routing, and view audit trails.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-lg bg-[#0f172a] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-orange-400" />
            <h3 className="text-base font-bold text-white">Account & Role Management</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            User Profile & Credentials
          </button>
          <button
            onClick={() => setActiveTab('switch_role')}
            className={`flex-1 py-3 border-b-2 transition-colors ${
              activeTab === 'switch_role'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Switch Active Role (RBAC)
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-xs text-slate-300">
          
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">{currentUser.fullName}</div>
                    <div className="text-slate-400">{currentUser.email}</div>
                  </div>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/40 uppercase font-semibold">
                    {currentUser.role.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Organization: <span className="text-white font-medium">{currentUser.organization}</span>
                </div>
              </div>

              {/* API Key */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Platform API Key (Bearer)</span>
                  <button
                    onClick={() => handleCopy(currentUser.apiKey || '', 'key')}
                    className="text-orange-400 hover:underline flex items-center gap-1"
                  >
                    {copiedKey === 'key' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <code className="p-2.5 bg-slate-950 rounded-lg text-emerald-400 font-mono text-[11px] block truncate border border-slate-850">
                  {currentUser.apiKey}
                </code>
              </div>

              {/* Webhook Secret */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Webhook Signing Secret</span>
                  <button
                    onClick={() => handleCopy(currentUser.webhookSecret || '', 'wh')}
                    className="text-orange-400 hover:underline flex items-center gap-1"
                  >
                    {copiedKey === 'wh' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <code className="p-2.5 bg-slate-950 rounded-lg text-orange-400 font-mono text-[11px] block truncate border border-slate-850">
                  {currentUser.webhookSecret}
                </code>
              </div>

              <button
                onClick={regenerateApiKey}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Rotate Secret Credentials</span>
              </button>
            </div>
          )}

          {activeTab === 'switch_role' && (
            <div className="space-y-3">
              <p className="text-slate-400">
                Switch role instantaneously to test permissions, navigation access, and portal capabilities across the platform:
              </p>

              <div className="space-y-2.5">
                {roleOptions.map((opt) => (
                  <button
                    key={opt.role}
                    onClick={() => {
                      setUserRole(opt.role);
                      onClose();
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      currentUser.role === opt.role
                        ? 'bg-orange-500/10 border-orange-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white flex items-center gap-2">
                        <ShieldCheck className={`w-4 h-4 ${currentUser.role === opt.role ? 'text-orange-400' : 'text-slate-500'}`} />
                        {opt.title}
                      </span>
                      {currentUser.role === opt.role && (
                        <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
