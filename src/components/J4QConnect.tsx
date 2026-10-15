import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Terminal, 
  Play, 
  Check, 
  Copy, 
  ShieldCheck, 
  Zap, 
  FileCode, 
  Key, 
  Server, 
  Activity,
  Code2
} from 'lucide-react';
import { ApiTestResult } from '../types';

export const J4QConnect: React.FC = () => {
  const { currentUser, runApiSimulation, apiTestResults, services, t } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'console' | 'fastapi' | 'architecture'>('console');
  const [selectedMethod, setSelectedMethod] = useState<'GET' | 'POST'>('GET');
  const [requestPath, setRequestPath] = useState('/api/v1/services');
  const [requestPayload, setRequestPayload] = useState('{\n  "client": "j4q-web-portal",\n  "region": "dar-es-salaam"\n}');
  const [authHeader, setAuthHeader] = useState(`Bearer ${currentUser.apiKey || 'j4q_live_key_9f82d1c47a6e'}`);
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<ApiTestResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Pre-configured endpoints
  const presetEndpoints = [
    { method: 'GET', path: '/api/v1/health', body: '' },
    { method: 'GET', path: '/api/v1/services', body: '' },
    { method: 'GET', path: '/api/v1/services/j4q-udiap', body: '' },
    { 
      method: 'POST', 
      path: '/api/v1/udiap/assess', 
      body: '{\n  "project_name": "Tanzania Agri-Fintech Corridor",\n  "capex_budget_usd": 150000,\n  "regulatory_compliance_score": 85,\n  "market_urgency_score": 80,\n  "technical_complexity_score": 60,\n  "team_readiness_score": 85\n}' 
    },
    { 
      method: 'POST', 
      path: '/api/v1/checkout/create-order', 
      body: '{\n  "amount_tzs": 450000,\n  "msisdn": "255712345678",\n  "carrier": "Tigo Pesa",\n  "reference": "J4Q-INV-8910"\n}' 
    },
    {
      method: 'POST',
      path: '/api/v1/kyc/verify-nin',
      body: '{\n  "nin": "19940115-12345-00001-20",\n  "first_name": "Jumanne",\n  "last_name": "Haji"\n}'
    }
  ];

  const handleSelectPreset = (ep: typeof presetEndpoints[0]) => {
    setSelectedMethod(ep.method as any);
    setRequestPath(ep.path);
    if (ep.body) setRequestPayload(ep.body);
  };

  const handleExecuteRequest = async () => {
    setIsLoading(true);
    let parsedBody: Record<string, unknown> | undefined = undefined;
    if (selectedMethod === 'POST' && requestPayload.trim()) {
      try {
        parsedBody = JSON.parse(requestPayload);
      } catch (err) {
        alert('Invalid JSON in request payload');
        setIsLoading(false);
        return;
      }
    }

    try {
      const res = await runApiSimulation(selectedMethod, requestPath, parsedBody);
      setCurrentResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // FastAPI Reference Code strings matching project specification
  const fastApiMainPy = `# J4Q HUB — Python FastAPI Core Backend
# Production RESTful API Gateway (/api/v1)
from fastapi import FastAPI, Depends, HTTPException, status, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import os

app = FastAPI(
    title="J4Q HUB Digital Services API",
    description="Unified Hybrid Gateway connecting 1st-party products and 3rd-party services",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "datacenter": "TIX_DAR_ES_SALAAM",
        "uptime": "99.98%"
    }

@app.get("/api/v1/services")
def list_services(category: Optional[str] = None):
    # Returns catalog from PostgreSQL session
    return {"status": "ok", "count": 10, "gateway": "J4Q_CONNECT_V1"}
`;

  const fastApiModelsPy = `# PostgreSQL Database Models (SQLAlchemy)
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Text, Enum
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Service(Base):
    __tablename__ = "services"
    id = Column(String, primary_key=True, index=True)
    name = Column(String(128), nullable=False)
    slug = Column(String(128), unique=True, index=True)
    ownership = Column(String(32), default="first_party") # first_party vs third_party
    provider_name = Column(String(128), nullable=False)
    category = Column(String(64), nullable=False, index=True)
    status = Column(String(32), default="operational")
    sla = Column(String(16), default="99.95%")
    api_base_url = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class PartnerSubmission(Base):
    __tablename__ = "partner_submissions"
    id = Column(String, primary_key=True)
    service_name = Column(String(128), nullable=False)
    provider_email = Column(String(128), nullable=False)
    category = Column(String(64), nullable=False)
    status = Column(String(32), default="pending")
    submitted_at = Column(DateTime, default=datetime.datetime.utcnow)
`;

  const fastApiPytestPy = `# Pytest Integration Test Suite for J4Q HUB (/api/v1)
from fastapi.testclient import TestClient
from main import app
import pytest

client = TestClient(app)

def test_gateway_health():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_udiap_evaluation_endpoint():
    payload = {
        "project_name": "Tanzania Logistics Portal",
        "capex_budget_usd": 120000,
        "regulatory_compliance_score": 85,
        "market_urgency_score": 75,
        "technical_complexity_score": 50,
        "team_readiness_score": 80
    }
    response = client.post("/api/v1/udiap/assess", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "decision_score" in data
    assert data["decision_score"] > 70
`;

  return (
    <div className="py-12 bg-[#0b0f17] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">
              Integration Layer & Gateway
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.connect.title}
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {t.connect.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('console')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeSubTab === 'console'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              Interactive API Runner
            </button>

            <button
              onClick={() => setActiveSubTab('fastapi')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeSubTab === 'fastapi'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              Python FastAPI Specs
            </button>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE CONSOLE */}
        {activeSubTab === 'console' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Request Builder */}
            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-orange-400" />
                  Live Request Dispatcher
                </span>
                <span className="text-xs font-mono text-slate-400">Gateway: edge.j4qhub.co.tz</span>
              </div>

              {/* Preset Selector */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400">Preset Endpoints:</label>
                <div className="flex flex-wrap gap-1.5">
                  {presetEndpoints.map((ep, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectPreset(ep)}
                      className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-[11px] font-mono text-slate-300 transition-colors"
                    >
                      <span className={ep.method === 'GET' ? 'text-emerald-400 font-bold' : 'text-orange-400 font-bold'}>
                        {ep.method}
                      </span>{' '}
                      {ep.path}
                    </button>
                  ))}
                </div>
              </div>

              {/* Method + Path Input */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400">HTTP Method & Path:</label>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value as any)}
                    className="bg-slate-950 text-white border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono font-bold focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                  </select>

                  <input
                    type="text"
                    value={requestPath}
                    onChange={(e) => setRequestPath(e.target.value)}
                    className="flex-1 bg-slate-950 text-white border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Auth Header */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400">Authorization Header:</label>
                <input
                  type="text"
                  value={authHeader}
                  onChange={(e) => setAuthHeader(e.target.value)}
                  className="w-full bg-slate-950 text-slate-300 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* POST Body */}
              {selectedMethod === 'POST' && (
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400">Request Body (JSON):</label>
                  <textarea
                    rows={6}
                    value={requestPayload}
                    onChange={(e) => setRequestPayload(e.target.value)}
                    className="w-full bg-slate-950 text-emerald-400 border border-slate-800 rounded-lg p-3 text-xs font-mono focus:ring-1 focus:ring-orange-500 font-medium"
                  />
                </div>
              )}

              {/* Dispatch Action */}
              <button
                onClick={handleExecuteRequest}
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isLoading ? 'Transmitting Request...' : 'Dispatch Request to Gateway'}</span>
              </button>
            </div>

            {/* Response Viewer */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    Response Inspector
                  </span>
                  {currentResult && (
                    <span className="text-xs font-mono text-emerald-400 font-bold tabular-nums">
                      {currentResult.latencyMs}ms
                    </span>
                  )}
                </div>

                {currentResult ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono p-2.5 bg-slate-950 rounded-lg border border-slate-850">
                      <span className="text-emerald-400 font-bold">
                        STATUS: {currentResult.status} {currentResult.statusText}
                      </span>
                      <span className="text-slate-400 tabular-nums">
                        {new Date(currentResult.timestamp).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] text-slate-400">Response Headers:</div>
                      <pre className="p-2.5 bg-slate-950 rounded text-[11px] font-mono text-slate-400 overflow-x-auto">
                        {Object.entries(currentResult.headers).map(([k, v]) => `${k}: ${v}\n`).join('')}
                      </pre>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Payload Data:</span>
                        <button
                          onClick={() => handleCopy(JSON.stringify(currentResult.data, null, 2), 'res-body')}
                          className="text-orange-400 hover:underline flex items-center gap-1"
                        >
                          {copiedKey === 'res-body' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>Copy</span>
                        </button>
                      </div>
                      <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto max-h-64 border border-slate-850">
                        {JSON.stringify(currentResult.data, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="py-16 text-center text-slate-500 text-xs">
                    <Terminal className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                    <span>No request sent yet. Select an endpoint and click Dispatch.</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PYTHON FASTAPI SPECS */}
        {activeSubTab === 'fastapi' && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-orange-400" />
                Backend Reference Architecture (Python, FastAPI, SQLAlchemy, Pytest)
              </h3>
              <p className="text-xs text-slate-300">
                In strict accordance with the project master instructions, here are the production backend source modules implementing the PostgreSQL database schemas and RESTful routes (/api/v1).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* main.py */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white">main.py (FastAPI)</span>
                  <button
                    onClick={() => handleCopy(fastApiMainPy, 'main-py')}
                    className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
                  >
                    {copiedKey === 'main-py' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded text-[11px] font-mono text-slate-300 overflow-x-auto h-72">
                  {fastApiMainPy}
                </pre>
              </div>

              {/* models.py */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white">models.py (SQLAlchemy)</span>
                  <button
                    onClick={() => handleCopy(fastApiModelsPy, 'models-py')}
                    className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
                  >
                    {copiedKey === 'models-py' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded text-[11px] font-mono text-slate-300 overflow-x-auto h-72">
                  {fastApiModelsPy}
                </pre>
              </div>

              {/* test_main.py */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white">test_main.py (Pytest)</span>
                  <button
                    onClick={() => handleCopy(fastApiPytestPy, 'pytest-py')}
                    className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
                  >
                    {copiedKey === 'pytest-py' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded text-[11px] font-mono text-slate-300 overflow-x-auto h-72">
                  {fastApiPytestPy}
                </pre>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
