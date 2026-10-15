import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Text, JSON
from .database import Base

class ServiceModel(Base):
    __tablename__ = "services"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(128), nullable=False)
    slug = Column(String(128), unique=True, index=True, nullable=False)
    tagline = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    ownership = Column(String(32), default="first_party", index=True)  # first_party vs third_party
    provider_name = Column(String(128), nullable=False)
    provider_url = Column(String(255), nullable=True)
    category = Column(String(64), nullable=False, index=True)
    status = Column(String(32), default="operational", index=True)
    version = Column(String(32), default="v1.0.0")
    sla = Column(String(16), default="99.95%")
    latency_ms = Column(Integer, default=45)
    api_base_url = Column(String(255), nullable=False)
    auth_type = Column(String(32), default="API_KEY")
    pricing = Column(String(32), default="Usage-Based")
    features = Column(JSON, default=list)
    endpoints = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


class PartnerSubmissionModel(Base):
    __tablename__ = "partner_submissions"

    id = Column(String(64), primary_key=True, index=True)
    service_name = Column(String(128), nullable=False)
    provider_name = Column(String(128), nullable=False)
    provider_email = Column(String(128), nullable=False)
    category = Column(String(64), nullable=False)
    tagline = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    api_base_url = Column(String(255), nullable=False)
    health_endpoint = Column(String(128), default="/health")
    auth_type = Column(String(32), default="API_KEY")
    sla = Column(String(16), default="99.95%")
    pricing = Column(String(32), default="Usage-Based")
    docs_url = Column(String(255), nullable=True)
    status = Column(String(32), default="pending", index=True)  # pending, approved, rejected
    rejection_reason = Column(Text, nullable=True)
    submitted_at = Column(DateTime, default=datetime.datetime.utcnow)
    reviewed_at = Column(DateTime, nullable=True)


class UdiapAssessmentModel(Base):
    __tablename__ = "udiap_assessments"

    id = Column(String(64), primary_key=True, index=True)
    project_name = Column(String(128), nullable=False)
    capex_budget_usd = Column(Float, nullable=False)
    regulatory_score = Column(Float, nullable=False)
    market_urgency_score = Column(Float, nullable=False)
    technical_complexity_score = Column(Float, nullable=False)
    team_readiness_score = Column(Float, nullable=False)
    computed_decision_score = Column(Float, nullable=False)
    confidence_index = Column(Float, nullable=False)
    recommendation = Column(String(64), nullable=False)
    risk_rating = Column(String(32), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


# New user model for authentication
class UserModel(Base):
    __tablename__ = "users"

    username = Column(String(128), primary_key=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(32), default="user", index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
