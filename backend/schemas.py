from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, HttpUrl
import datetime

class EndpointSchema(BaseModel):
    method: str
    path: str
    description: str
    sample_payload: Optional[Dict[str, Any]] = None
    sample_response: Optional[Dict[str, Any]] = None

class ServiceBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=128)
    slug: str
    tagline: str
    description: str
    ownership: str = "first_party"
    provider_name: str
    provider_url: Optional[str] = None
    category: str
    status: str = "operational"
    version: str = "v1.0.0"
    sla: str = "99.95%"
    api_base_url: str
    auth_type: str = "API_KEY"
    pricing: str = "Usage-Based"
    features: List[str] = []
    endpoints: List[EndpointSchema] = []

class ServiceResponse(ServiceBase):
    id: str
    latency_ms: int
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        from_attributes = True

class PartnerSubmissionCreate(BaseModel):
    service_name: str
    provider_name: str
    provider_email: str
    category: str
    tagline: str
    description: str
    api_base_url: str
    health_endpoint: str = "/health"
    auth_type: str = "API_KEY"
    sla: str = "99.95%"
    pricing: str = "Usage-Based"
    docs_url: Optional[str] = None

class PartnerSubmissionResponse(PartnerSubmissionCreate):
    id: str
    status: str
    rejection_reason: Optional[str] = None
    submitted_at: datetime.datetime
    reviewed_at: Optional[datetime.datetime] = None

    class Config:
        from_attributes = True

class UdiapAssessmentRequest(BaseModel):
    project_name: str
    capex_budget_usd: float = Field(..., ge=0)
    regulatory_compliance_score: float = Field(..., ge=0, le=100)
    market_urgency_score: float = Field(..., ge=0, le=100)
    technical_complexity_score: float = Field(..., ge=0, le=100)
    team_readiness_score: float = Field(..., ge=0, le=100)

class UdiapAssessmentResponse(BaseModel):
    assessment_id: str
    project_name: str
    decision_score: float
    confidence_index: float
    recommendation: str
    recommendation_sw: str
    risk_rating: str
    summary: str
    factors: List[Dict[str, Any]]
    mitigation_steps: List[str]
    timestamp: datetime.datetime
