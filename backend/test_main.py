"""
Pytest Integration Test Suite for J4Q HUB FastAPI Backend
Execute via: pytest backend/test_main.py -v
"""
import pytest
from fastapi.testclient import TestClient
from .main import app

client = TestClient(app)

def test_health_check():
    """Verify system health endpoint and datacenter location."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["datacenter"] == "TIX_DAR_ES_SALAAM"
    assert "uptime" in data

def test_services_catalog_list():
    """Verify services catalog returns 200 and list structure."""
    response = client.get("/api/v1/services")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_udiap_evaluation_high_readiness():
    """Test UDIAP algorithmic decision engine with high compliance and low risk."""
    payload = {
        "project_name": "Tanzania Solar Grid Automation",
        "capex_budget_usd": 120000,
        "regulatory_compliance_score": 90,
        "market_urgency_score": 85,
        "technical_complexity_score": 60,
        "team_readiness_score": 88
    }
    response = client.post("/api/v1/udiap/assess", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "decision_score" in data
    assert "confidence_index" in data
    assert data["decision_score"] >= 78
    assert data["recommendation"] == "EXECUTE_IMMEDIATELY"
    assert data["risk_rating"] == "Low"
    assert len(data["factors"]) == 5

def test_udiap_evaluation_high_risk():
    """Test UDIAP flags elevated risk when compliance or budget fails."""
    payload = {
        "project_name": "Unverified Speculative Gateway",
        "capex_budget_usd": 480000,
        "regulatory_compliance_score": 35,
        "market_urgency_score": 40,
        "technical_complexity_score": 95,
        "team_readiness_score": 30
    }
    response = client.post("/api/v1/udiap/assess", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["decision_score"] < 50
    assert data["recommendation"] == "REVISE_PROPOSAL"
    assert data["risk_rating"] == "Critical"

def test_partner_service_submission_and_lifecycle():
    """Test submitting a new 3rd-party service and tracking status."""
    payload = {
        "service_name": "Kilimanjaro SMS Dispatcher",
        "provider_name": "Moshi Telecoms Ltd",
        "provider_email": "api@moshitelecom.co.tz",
        "category": "business",
        "tagline": "Regional bulk SMS and SMS shortcode router.",
        "description": "High-speed SMS routing across Arusha and Kilimanjaro regions.",
        "api_base_url": "https://api.moshitelecom.co.tz/v1",
        "health_endpoint": "/health",
        "auth_type": "API_KEY",
        "sla": "99.90%",
        "pricing": "Usage-Based",
        "docs_url": "https://docs.moshitelecom.co.tz"
    }
    response = client.post("/api/v1/partners/submit", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["service_name"] == "Kilimanjaro SMS Dispatcher"
    assert data["status"] == "pending"
    assert "id" in data
