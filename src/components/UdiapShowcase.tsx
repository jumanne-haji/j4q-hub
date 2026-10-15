import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Cpu, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  Sliders, 
  Download, 
  Copy, 
  Check, 
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { calculateUdiapDecision } from '../utils/udiapEngine';

export const UdiapShowcase: React.FC = () => {
  const { language, setActiveNavTab, t } = useApp();

  const [projectName, setProjectName] = useState('East Africa Unified Transit Clearing Hub');
  const [sector, setSector] = useState('Fintech & Logistics');
  const [capexBudget, setCapexBudget] = useState(175000);
  const [regulatoryScore, setRegulatoryScore] = useState(88);
  const [marketUrgency, setMarketUrgency] = useState(82);
  const [techComplexity, setTechComplexity] = useState(65);
  const [teamReadiness, setTeamReadiness] = useState(80);
  const [isCopied, setIsCopied] = useState(false);

  const result = calculateUdiapDecision({
    capexBudget,
    regulatoryComplianceScore: regulatoryScore,
    marketUrgencyScore: marketUrgency,
    technicalComplexityScore: techComplexity,
    teamReadinessScore: teamReadiness,
  }, language);

  const handleExportJson = () => {
    const exportData = {
      platform: 'UDIAP - Universal Decision Intelligence Assessment Platform',
      maintainer: 'J4Q DIGITAL, Dar es Salaam',
      evaluated_project: projectName,
      sector,
      parameters: {
        capex_budget_usd: capexBudget,
        regulatory_compliance_score: regulatoryScore,
        market_urgency_score: marketUrgency,
        technical_complexity_score: techComplexity,
        team_readiness_score: teamReadiness
      },
      evaluation: result,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `udiap-assessment-${projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopySummary = () => {
    const text = `UDIAP Decision Intelligence Assessment:\nProject: ${projectName}\nScore: ${result.decisionScore}/100\nConfidence: ${result.confidenceIndex}%\nDirective: ${result.recommendation}\nRisk Rating: ${result.riskRating}\nSummary: ${result.summary}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="py-12 bg-[#0b0f17] space-y-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Banner Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider">
              <span>J4Q 1st-Party Innovation</span>
              <span aria-hidden="true">·</span>
              <span>UDIAP Engine</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {t.udiap.title}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {t.udiap.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleExportJson}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg flex items-center gap-2 transition-colors border border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-orange-400" />
                <span>Export Assessment JSON</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg flex items-center gap-2 transition-colors border border-slate-700"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied to Clipboard' : 'Copy Executive Summary'}</span>
              </button>

              <button
                onClick={() => setActiveNavTab('connect')}
                className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-orange-500/30"
              >
                <span>View API Spec</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
              <img
                src="/src/assets/images/udiap_decision_intelligence_1792058106117.jpg"
                alt="UDIAP Assessment Console"
                className="w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 border-t border-slate-800/80 bg-slate-900/80 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">Algorithmic Risk Engine v1.4</span>
                <span className="font-mono text-emerald-400 font-bold tabular-nums">99.98% Model Uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive Evaluation Laboratory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Vector Sliders & Parameters */}
          <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-orange-400" />
                  Decision Assessment Vectors
                </h2>
                <p className="text-xs text-slate-400">Tweak operational vectors to recalculate live model.</p>
              </div>
            </div>

            {/* Project Profile Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Target Initiative Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Domain Sector</label>
                <input
                  type="text"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-2">
              {/* CapEx Budget */}
              <div className="space-y-1.5 p-3 bg-slate-950/60 rounded-lg border border-slate-850">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">CapEx Budget Commitment (USD)</span>
                  <span className="font-mono text-orange-400 font-bold tabular-nums">
                    ${capexBudget.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={capexBudget}
                  onChange={(e) => setCapexBudget(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>$5,000 (Micro-pilot)</span>
                  <span>$500,000 (Major Infrastructure)</span>
                </div>
              </div>

              {/* Regulatory Compliance */}
              <div className="space-y-1.5 p-3 bg-slate-950/60 rounded-lg border border-slate-850">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Regulatory & Privacy Compliance Score</span>
                  <span className="font-mono text-emerald-400 font-bold tabular-nums">
                    {regulatoryScore}/100
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={regulatoryScore}
                  onChange={(e) => setRegulatoryScore(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Regulatory Uncertainty</span>
                  <span>Full BOT / TCRA / PDPA Clearance</span>
                </div>
              </div>

              {/* Market Urgency */}
              <div className="space-y-1.5 p-3 bg-slate-950/60 rounded-lg border border-slate-850">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Market Urgency & Competitive Window</span>
                  <span className="font-mono text-amber-400 font-bold tabular-nums">
                    {marketUrgency}/100
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={marketUrgency}
                  onChange={(e) => setMarketUrgency(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Long Horizon</span>
                  <span>Urgent First-Mover Window</span>
                </div>
              </div>

              {/* Technical Complexity */}
              <div className="space-y-1.5 p-3 bg-slate-950/60 rounded-lg border border-slate-850">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Technical Complexity Vector</span>
                  <span className="font-mono text-blue-400 font-bold tabular-nums">
                    {techComplexity}/100
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={techComplexity}
                  onChange={(e) => setTechComplexity(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Standard Off-the-shelf</span>
                  <span>Bespoke Sharded Microkernel</span>
                </div>
              </div>

              {/* Team Readiness */}
              <div className="space-y-1.5 p-3 bg-slate-950/60 rounded-lg border border-slate-850">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Squad & Operational Capability</span>
                  <span className="font-mono text-emerald-400 font-bold tabular-nums">
                    {teamReadiness}/100
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={teamReadiness}
                  onChange={(e) => setTeamReadiness(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Talent Gap</span>
                  <span>Senior Engineering Squad Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Computed Output Matrix & Directives */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Main Score Board */}
            <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Engine Output Matrix
                </span>
                <span className="text-xs font-mono text-orange-400">
                  Model: UDIAP-V1-FAST
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950 rounded-lg text-center border border-slate-850">
                  <div className="text-xs text-slate-400 mb-1">{t.udiap.score}</div>
                  <div className="text-3xl font-black text-orange-400 font-mono tabular-nums">
                    {result.decisionScore}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Scale 0 - 100</div>
                </div>

                <div className="p-4 bg-slate-950 rounded-lg text-center border border-slate-850">
                  <div className="text-xs text-slate-400 mb-1">{t.udiap.confidence}</div>
                  <div className="text-3xl font-black text-emerald-400 font-mono tabular-nums">
                    {result.confidenceIndex}%
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Variance Tested</div>
                </div>

                <div className="p-4 bg-slate-950 rounded-lg text-center border border-slate-850 col-span-2 sm:col-span-1">
                  <div className="text-xs text-slate-400 mb-1">Risk Exposure</div>
                  <div className={`text-xl font-bold font-mono mt-1 ${
                    result.riskRating === 'Low' ? 'text-emerald-400' :
                    result.riskRating === 'Moderate' ? 'text-amber-400' :
                    result.riskRating === 'Elevated' ? 'text-orange-500' : 'text-red-400'
                  }`}>
                    {result.riskRating}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Overall Profile</div>
                </div>
              </div>

              {/* Recommendation Directive */}
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400 font-medium">Strategic Directive:</div>
                <div className="text-sm font-extrabold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'sw' ? result.recommendationSw : result.recommendation.replace('_', ' ')}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {result.summary}
                </p>
              </div>

              {/* Factors Breakdown */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400">{t.udiap.factors}</div>
                <div className="space-y-1.5">
                  {result.factors.map((f, i) => (
                    <div key={i} className="p-2.5 bg-slate-950 rounded-lg flex items-center justify-between text-xs border border-slate-850">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          f.impact === 'Positive' ? 'bg-emerald-400' : f.impact === 'Neutral' ? 'bg-amber-400' : 'bg-red-400'
                        }`} />
                        <span className="text-slate-300 font-medium">{f.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400">Weight: {f.weight}%</span>
                        <span className="font-mono font-bold text-white tabular-nums">{f.score}/100</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mitigation Steps */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-semibold text-slate-400">Pre-Deployment Mitigation Steps:</div>
                <ul className="space-y-1.5 text-xs">
                  {result.mitigationSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                      <span className="text-orange-400 font-mono text-[11px] shrink-0 font-bold">0{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
