import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, ArrowRight, ShieldCheck, Cpu, Zap, Activity } from 'lucide-react';
import { ServiceOwnership } from '../types';

interface HeroProps {
  onSearchFocus?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedOwnership, 
    setSelectedOwnership, 
    setActiveNavTab, 
    services,
    t 
  } = useApp();

  const firstPartyCount = services.filter(s => s.ownership === 'first_party').length;
  const thirdPartyCount = services.filter(s => s.ownership === 'third_party').length;

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:py-20 border-b border-slate-800/60 bg-gradient-to-b from-[#0b0f17] via-[#0d1424] to-[#0b0f17]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Proposition & Search */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Regional Division / Provenance (Natural unboxed text separator, no pulsing dot) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-400 uppercase">
              <span>Dar es Salaam</span>
              <span aria-hidden="true">·</span>
              <span>J4Q DIGITAL</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">Hybrid Platform</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              {t.hero.title}
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Search Input Box */}
            <div className="pt-2">
              <div className="relative max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.hero.searchPlaceholder}
                  className="w-full pl-11 pr-24 py-3.5 text-sm bg-slate-900/90 text-white placeholder-slate-400 border border-slate-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-inner transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 inset-y-0 text-xs text-slate-400 hover:text-white my-auto px-2 py-1 rounded"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Filter Tabs (Buttons allowed per constitution) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 mr-1">Filter Source:</span>
              <button
                onClick={() => setSelectedOwnership('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedOwnership === 'all'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {t.hero.allServices} ({services.length})
              </button>
              <button
                onClick={() => setSelectedOwnership('first_party')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedOwnership === 'first_party'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {t.hero.firstPartyOnly} ({firstPartyCount})
              </button>
              <button
                onClick={() => setSelectedOwnership('third_party')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedOwnership === 'third_party'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {t.hero.thirdPartyOnly} ({thirdPartyCount})
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => setActiveNavTab('directory')}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-lg transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
              >
                <span>{t.hero.browseDirectory}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveNavTab('udiap')}
                className="px-5 py-2.5 text-sm font-semibold text-emerald-400 bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/30 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>{t.hero.launchUdiap}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset & Platform Architecture Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl group">
              <img
                src="/src/assets/images/j4q_hub_hero_datacenter_1792058106146.jpg"
                alt="J4Q HUB Innovation Center Dar es Salaam"
                className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/40 to-transparent" />
              
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="font-semibold text-white">DAR ES SALAAM EDGE NODE</span>
                  <span className="text-emerald-400 tabular-nums">99.98% UPTIME</span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800 text-xs">
                  <div>
                    <div className="text-slate-400 text-[11px]">Active Services</div>
                    <div className="font-bold text-white font-mono tabular-nums">{services.length} Endpoints</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[11px]">Avg Gateway Ping</div>
                    <div className="font-bold text-emerald-400 font-mono tabular-nums">38ms (TIX)</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[11px]">Hybrid Architecture</div>
                    <div className="font-bold text-orange-400 font-mono">1st + 3rd Party</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
