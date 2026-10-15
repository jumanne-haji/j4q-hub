import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, User, Globe, ChevronDown, Sparkles } from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  onOpenAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuthModal }) => {
  const { 
    activeNavTab, 
    setActiveNavTab, 
    language, 
    setLanguage, 
    currentUser, 
    setUserRole, 
    t 
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = React.useState(false);

  const roles: { id: UserRole; label: string; desc: string }[] = [
    { id: 'public_user', label: t.roles.public_user, desc: 'Browse catalogue, test APIs' },
    { id: 'verified_partner', label: t.roles.verified_partner, desc: 'Submit & manage services' },
    { id: 'system_admin', label: t.roles.system_admin, desc: 'Approve submissions & gateway' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0f17]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button 
          onClick={() => setActiveNavTab('home')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-emerald-500 flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-md">
              J4Q
            </div>
            <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group-hover:text-orange-400 transition-colors">
              J4Q HUB
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 Concise Single-line Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveNavTab('directory')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white py-1 ${
              activeNavTab === 'directory' ? 'text-orange-400 border-b-2 border-orange-500' : 'text-slate-300'
            }`}
          >
            {t.nav.directory}
          </button>

          <button
            onClick={() => setActiveNavTab('udiap')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white py-1 ${
              activeNavTab === 'udiap' ? 'text-orange-400 border-b-2 border-orange-500' : 'text-slate-300'
            }`}
          >
            UDIAP Engine
          </button>

          <button
            onClick={() => setActiveNavTab('connect')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white py-1 ${
              activeNavTab === 'connect' ? 'text-orange-400 border-b-2 border-orange-500' : 'text-slate-300'
            }`}
          >
            {t.nav.connect}
          </button>

          <button
            onClick={() => setActiveNavTab('partner')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white py-1 ${
              activeNavTab === 'partner' ? 'text-orange-400 border-b-2 border-orange-500' : 'text-slate-300'
            }`}
          >
            {t.nav.partner}
          </button>

          <button
            onClick={() => setActiveNavTab('admin')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white py-1 ${
              activeNavTab === 'admin' ? 'text-orange-400 border-b-2 border-orange-500' : 'text-slate-300'
            }`}
          >
            {t.nav.admin}
          </button>
        </nav>

        {/* Zone 3: Primary Action & Quick Switches */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
            title="Toggle English / Kiswahili"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-md transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="uppercase">{language}</span>
          </button>

          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-md transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider text-slate-400">
                {currentUser.role === 'system_admin' ? 'Admin' : currentUser.role === 'verified_partner' ? 'Partner' : 'User'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-[#111827] border border-slate-700/80 rounded-lg shadow-xl p-1 z-50 text-left"
                onMouseLeave={() => setIsRoleDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-800 text-[11px] text-slate-400">
                  {t.roles.switchPrompt}
                </div>
                {roles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setUserRole(r.id);
                      setIsRoleDropdownOpen(false);
                      if (r.id === 'system_admin') setActiveNavTab('admin');
                      else if (r.id === 'verified_partner') setActiveNavTab('partner');
                    }}
                    className={`w-full text-left px-3 py-2 rounded text-xs transition-colors ${
                      currentUser.role === r.id 
                        ? 'bg-orange-500/10 text-orange-400 font-semibold' 
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-medium">{r.label}</div>
                    <div className="text-[11px] text-slate-500 font-normal">{r.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-md transition-all shadow-sm hover:shadow-orange-500/20 whitespace-nowrap shrink-0"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{currentUser.fullName.split(' ')[0]}</span>
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 border-t border-slate-800/80 overflow-x-auto gap-3 text-xs bg-[#0b0f17]">
        <button
          onClick={() => setActiveNavTab('directory')}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeNavTab === 'directory' ? 'text-orange-400 font-semibold' : 'text-slate-400'}`}
        >
          {t.nav.directory}
        </button>
        <button
          onClick={() => setActiveNavTab('udiap')}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeNavTab === 'udiap' ? 'text-orange-400 font-semibold' : 'text-slate-400'}`}
        >
          UDIAP
        </button>
        <button
          onClick={() => setActiveNavTab('connect')}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeNavTab === 'connect' ? 'text-orange-400 font-semibold' : 'text-slate-400'}`}
        >
          Connect API
        </button>
        <button
          onClick={() => setActiveNavTab('partner')}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeNavTab === 'partner' ? 'text-orange-400 font-semibold' : 'text-slate-400'}`}
        >
          {t.nav.partner}
        </button>
        <button
          onClick={() => setActiveNavTab('admin')}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeNavTab === 'admin' ? 'text-orange-400 font-semibold' : 'text-slate-400'}`}
        >
          Admin
        </button>
      </div>
    </header>
  );
};
