import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { useApp } from '../context/AppContext';
import { Bookmark, BookmarkCheck, ArrowUpRight, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const { bookmarkedIds, toggleBookmark, t } = useApp();
  const [imageFailed, setImageFailed] = useState(false);
  const isBookmarked = bookmarkedIds.includes(service.id);

  const isFirstParty = service.ownership === 'first_party';

  return (
    <div className="flex flex-col justify-between bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 hover:shadow-xl transition-all duration-200 group">
      
      {/* Top Image Showcase Slot with Resilient Fallback */}
      <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
        {!imageFailed && service.image ? (
          <img
            src={service.image}
            alt={service.name}
            onError={() => setImageFailed(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-4 text-center">
            {isFirstParty ? (
              <Cpu className="w-10 h-10 text-orange-500 mb-2" />
            ) : (
              <Layers className="w-10 h-10 text-emerald-500 mb-2" />
            )}
            <span className="text-xs font-semibold text-slate-300">{service.providerName}</span>
          </div>
        )}

        {/* Ambient overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />

        {/* Top Floating Controls */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(service.id);
            }}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark service'}
            className="p-1.5 rounded-md bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 backdrop-blur-sm transition-colors"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-orange-400" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Unboxed Metadata Line with typographic separators (Strict Zero-Pill adherence) */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span className={`font-semibold uppercase tracking-wider ${isFirstParty ? 'text-orange-400' : 'text-emerald-400'}`}>
              {isFirstParty ? 'J4Q 1st-Party' : 'Verified Partner'}
            </span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{service.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-400">{service.version}</span>
          </div>

          {/* Primary Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors leading-snug">
            {service.name}
          </h3>

          {/* Tagline / Value proposition */}
          <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {service.tagline}
          </p>
        </div>

        {/* Technical Telemetry Strip (Tabular numerals, unboxed clean text) */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>SLA:</span>
            <span className="font-mono font-medium text-slate-200 tabular-nums">{service.sla}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500/80" />
            <span>Latency:</span>
            <span className="font-mono font-medium text-slate-200 tabular-nums">{service.latencyMs}ms</span>
          </div>

          <div className="font-mono text-[11px] text-slate-400">
            {service.pricing}
          </div>
        </div>

        {/* Primary Interactive CTA */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => onSelect(service)}
            className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-orange-500 text-white transition-all duration-150 flex items-center justify-center gap-1.5 shadow-sm group-hover:bg-orange-500"
          >
            <span>{t.card.viewDetails}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
