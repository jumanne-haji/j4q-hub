import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCategory, ServiceItem, ServiceOwnership } from '../types';
import { ServiceCard } from './ServiceCard';
import { Search, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ServiceDirectoryProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServiceDirectory: React.FC<ServiceDirectoryProps> = ({ onSelectService }) => {
  const { 
    services, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    selectedOwnership, 
    setSelectedOwnership, 
    t 
  } = useApp();

  const [sortBy, setSortBy] = useState<'recommended' | 'latency' | 'sla' | 'name'>('recommended');

  const categories: { id: ServiceCategory | 'all'; label: string }[] = [
    { id: 'all', label: t.categories.all },
    { id: 'business', label: t.categories.business },
    { id: 'education', label: t.categories.education },
    { id: 'technology', label: t.categories.technology },
    { id: 'ai', label: t.categories.ai },
    { id: 'platforms', label: t.categories.platforms },
  ];

  // Filtering
  const filtered = services.filter(service => {
    // Ownership
    if (selectedOwnership !== 'all' && service.ownership !== selectedOwnership) {
      return false;
    }
    // Category
    if (selectedCategory !== 'all' && service.category !== selectedCategory) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = service.name.toLowerCase().includes(q);
      const matchTagline = service.tagline.toLowerCase().includes(q);
      const matchProvider = service.providerName.toLowerCase().includes(q);
      const matchCategory = service.category.toLowerCase().includes(q);
      const matchFeature = service.features.some(f => f.toLowerCase().includes(q));
      const matchEndpoint = service.endpoints.some(e => e.path.toLowerCase().includes(q));
      if (!matchName && !matchTagline && !matchProvider && !matchCategory && !matchFeature && !matchEndpoint) {
        return false;
      }
    }
    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'latency') return a.latencyMs - b.latencyMs;
    if (sortBy === 'sla') return parseFloat(b.sla) - parseFloat(a.sla);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    // default recommended: 1st party first, then featured
    if (a.ownership === 'first_party' && b.ownership !== 'first_party') return -1;
    if (b.ownership === 'first_party' && a.ownership !== 'first_party') return 1;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <section className="py-12 bg-[#0b0f17] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">
              Centralized Service Registry
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.nav.directory}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Discover, test, and orchestrate verified 1st-party tools and 3rd-party enterprise APIs without leaving J4Q HUB.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <span>Showing</span>
            <span className="font-bold text-white tabular-nums">{sorted.length}</span>
            <span>of</span>
            <span className="font-bold text-slate-300 tabular-nums">{services.length}</span>
            <span>registered services</span>
          </div>
        </div>

        {/* Control Bar: Categories & Sorting */}
        <div className="space-y-4">
          
          {/* Interactive Category Segmented Control */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-orange-500 text-white shadow-sm font-semibold'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Filter Line */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            
            {/* Ownership Filter */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Provider:</span>
              <button
                onClick={() => setSelectedOwnership('all')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedOwnership === 'all'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedOwnership('first_party')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedOwnership === 'first_party'
                    ? 'bg-orange-500/20 text-orange-400 font-semibold border border-orange-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                J4Q DIGITAL (1st-Party)
              </button>
              <button
                onClick={() => setSelectedOwnership('third_party')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedOwnership === 'third_party'
                    ? 'bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Connected Partners
              </button>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort services by criteria"
                className="bg-slate-900 text-slate-200 border border-slate-800 rounded-md px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="recommended">Featured & 1st-Party</option>
                <option value="latency">Fastest Latency</option>
                <option value="sla">Highest SLA</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

          </div>

        </div>

        {/* Services Grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={onSelectService}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center border border-dashed border-slate-800 rounded-xl bg-slate-900/40">
            <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No services found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No registered digital services matched your active search and category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedOwnership('all');
              }}
              className="mt-4 px-4 py-1.5 text-xs font-medium text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded-md transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
