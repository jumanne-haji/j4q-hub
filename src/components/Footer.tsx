import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveNavTab, setLanguage, language, t } = useApp();

  return (
    <footer className="w-full bg-[#080c14] border-t border-slate-800/80 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-850">
          
          {/* Brand & Parentage */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-orange-500 to-emerald-500 flex items-center justify-center text-white font-black text-xs">
                J4Q
              </div>
              <span className="text-base font-bold text-white tracking-tight">J4Q HUB</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hybrid Digital Services Platform by J4Q DIGITAL. Unifying proprietary innovations and verified enterprise partner integrations across East Africa.
            </p>
            <div className="text-[11px] text-slate-400 pt-1">
              Dar es Salaam, Tanzania
            </div>
          </div>

          {/* Directory Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Platform Registry
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveNavTab('directory')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.directory}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNavTab('udiap')}
                  className="hover:text-white transition-colors"
                >
                  UDIAP Decision Intelligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNavTab('connect')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.connect}
                </button>
              </li>
            </ul>
          </div>

          {/* Ecosystem & Partners */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Ecosystem & Roles
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveNavTab('partner')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.partner}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNavTab('admin')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.admin}
                </button>
              </li>
              <li>
                <a
                  href="https://j4qdigital.co.tz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  J4Q DIGITAL Parent Brand
                </a>
              </li>
            </ul>
          </div>

          {/* Technology Standards & Locale */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Architecture & Language
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Engineered with FastAPI REST specifications, PostgreSQL schema models, and high-resiliency Edge routing.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                  language === 'en' ? 'bg-orange-500 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('sw')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                  language === 'sw' ? 'bg-orange-500 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                Kiswahili
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} J4Q HUB · All rights reserved by J4Q DIGITAL.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-slate-400">Version 1.0.0-MVP</span>
            <span>·</span>
            <span>Zero Mockups Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
