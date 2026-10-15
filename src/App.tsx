import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceDirectory } from './components/ServiceDirectory';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { UdiapShowcase } from './components/UdiapShowcase';
import { J4QConnect } from './components/J4QConnect';
import { PartnerPortal } from './components/PartnerPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Cpu, Layers, ArrowRight, ShieldCheck, Terminal, Zap } from 'lucide-react';
import { ServiceItem } from './types';

const MainLayout: React.FC = () => {
  const { 
    activeNavTab, 
    setActiveNavTab, 
    selectedService, 
    setSelectedService, 
    services, 
    t 
  } = useApp();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const udiapService = services.find(s => s.id === 'j4q-udiap') || services[0];
  const digitalServices = services.find(s => s.id === 'j4q-digital-services') || services[1];

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Top Bar adhering to 3-zone contract */}
      <Header onOpenAuthModal={() => setIsAuthModalOpen(true)} />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeNavTab === 'home' && (
          <div className="space-y-16">
            {/* Hero Section */}
            <Hero />

            {/* Curated 1st-Party Bento Showcase */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">
                    J4Q DIGITAL In-House Engineering
                  </div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    Proprietary Flagship Platforms
                  </h2>
                </div>

                <button
                  onClick={() => setActiveNavTab('directory')}
                  className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
                >
                  <span>View All {services.length} Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Asymmetric 2-Card Bento */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* UDIAP Marquee Spotlight (col-span-7) */}
                <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider">
                      <Cpu className="w-4 h-4 text-orange-400" />
                      <span>UDIAP Engine · Decision Intelligence</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                      Universal Decision Intelligence Assessment Platform
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      Replaces subjective guesswork with multi-vector mathematical assessment. Evaluates capital expenditure, regulatory friction, market demand, and technical feasibility into a real-time readiness index.
                    </p>

                    <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-850">
                        <div className="text-slate-400 text-[11px]">SLA Target</div>
                        <div className="font-mono font-bold text-white tabular-nums mt-0.5">99.98%</div>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-850">
                        <div className="text-slate-400 text-[11px]">Latency</div>
                        <div className="font-mono font-bold text-emerald-400 tabular-nums mt-0.5">38ms</div>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-850">
                        <div className="text-slate-400 text-[11px]">Security</div>
                        <div className="font-mono font-bold text-orange-400 mt-0.5">TLS 1.3 / API</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setActiveNavTab('udiap')}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm"
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Launch Decision Calculator</span>
                    </button>

                    <button
                      onClick={() => setSelectedService(udiapService)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors border border-slate-700"
                    >
                      Inspect Specification
                    </button>
                  </div>
                </div>

                {/* J4Q Digital Architecture Spotlight (col-span-5) */}
                <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      <span>J4Q Digital Services · Systems</span>
                    </div>

                    <h3 className="text-xl font-bold text-white leading-snug">
                      Custom Enterprise Systems & Cloud Architectures
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      Full-stack engineering division delivering distributed PostgreSQL systems, payment gateway connectors, and low-latency digital ecosystems for East Africa.
                    </p>

                    <ul className="space-y-2 text-xs text-slate-300 pt-1">
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>High-throughput mobile money API adapters</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>PostgreSQL migrations & microservices</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>Tanzania Internet eXchange (TIX) peering</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setSelectedService(digitalServices)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 border border-slate-700"
                    >
                      <span>View Technical Capabilities</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* Service Directory Section */}
            <ServiceDirectory onSelectService={(s: ServiceItem) => setSelectedService(s)} />

            {/* J4Q Connect Fast Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#101928] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    <Terminal className="w-4 h-4" />
                    <span>J4Q Connect API Gateway</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Need to connect your enterprise software or API?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Our modular integration layer standardizes authentication, provides live health probers, and manages webhooks with automated rate limiting.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveNavTab('connect')}
                    className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold rounded-lg transition-all shadow-md"
                  >
                    Launch API Console
                  </button>
                  <button
                    onClick={() => setActiveNavTab('partner')}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors border border-slate-700"
                  >
                    Submit 3rd-Party Service
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeNavTab === 'directory' && (
          <ServiceDirectory onSelectService={(s: ServiceItem) => setSelectedService(s)} />
        )}

        {activeNavTab === 'udiap' && (
          <UdiapShowcase />
        )}

        {activeNavTab === 'connect' && (
          <J4QConnect />
        )}

        {activeNavTab === 'partner' && (
          <PartnerPortal />
        )}

        {activeNavTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Footer adhering to quiet provenance */}
      <Footer />

      {/* Modals */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
