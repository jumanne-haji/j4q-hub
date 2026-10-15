from datetime import datetime
import os
import uuid
from typing import List, Optional

from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import get_db, engine, Base
from .models import ServiceModel, PartnerSubmissionModel, UdiapAssessmentModel
from .schemas import (
    ServiceResponse,
    PartnerSubmissionCreate,
    PartnerSubmissionResponse,
    UdiapAssessmentRequest,
    UdiapAssessmentResponse,
    Token,
    TokenData,
    UserCreate,
)
from .auth import (
    get_current_user,
    require_admin,
    create_access_token,
    authenticate_user,
)

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="J4Q HUB — Hybrid Digital Services Platform API",
    description="Unified API gateway connecting 1st-party products like UDIAP and verified 3rd-party services across East Africa.",
    version="1.0.1",
    docs_url="/docs",
    redoc_url="/redoc",
)

# startup time for uptime calculation
START_TIME = datetime.utcnow()

# CORS Policy (restrict via env VAR)
_allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in _allowed_origins if o.strip()],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.get("/api/v1/health", tags=["System"])
def health_check():
    """Liveness probe verifying gateway and database connection status."""
    uptime_delta = datetime.utcnow() - START_TIME
    # Represent uptime as ISO duration-like string
    uptime = str(uptime_delta)
    return {
        "status": "healthy",
        "service": "J4Q HUB Core Gateway",
        "datacenter": os.getenv("DATACENTER", "TIX_DAR_ES_SALAAM"),
        "timestamp": datetime.utcnow().isoformat(),
        "uptime": uptime,
    }


# ----------------- SERVICES CATALOGUE -----------------

@app.get("/api/v1/services", response_model=List[ServiceResponse], tags=["Catalogue"])
def list_services(
    category: Optional[str] = Query(None, description="Filter by category"),
    ownership: Optional[str] = Query(None, description="Filter by first_party or third_party"),
    search: Optional[str] = Query(None, description="Search keyword in name or tagline"),
    db: Session = Depends(get_db),
):
    """Fetches all operational digital services from the J4Q HUB PostgreSQL repository."""
    query = db.query(ServiceModel).filter(ServiceModel.status == "operational")
    if category and category != "all":
        query = query.filter(ServiceModel.category == category)
    if ownership and ownership != "all":
        query = query.filter(ServiceModel.ownership == ownership)
    if search:
        query = query.filter(
            ServiceModel.name.ilike(f"%{search}%") | ServiceModel.tagline.ilike(f"%{search}%")
        )

    return query.all()


@app.get("/api/v1/services/{service_id}", response_model=ServiceResponse, tags=["Catalogue"])
def get_service_detail(service_id: str, db: Session = Depends(get_db)):
    """Retrieves full metadata, SLA, and endpoint specifications for a specific service."""
    service = db.query(ServiceModel).filter(ServiceModel.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found in J4Q HUB registry")
    return service


# ----------------- UDIAP EVALUATION ENGINE -----------------

@app.post(
    "/api/v1/udiap/assess",
    response_model=UdiapAssessmentResponse,
    tags=["UDIAP Engine"],
)
def assess_decision_readiness(req: UdiapAssessmentRequest, db: Session = Depends(get_db)):
    """
    Executes algorithmic decision evaluation using J4Q's proprietary UDIAP mathematical vectors.
    """
    capex_norm = max(0, min(100, 100 - (req.capex_budget_usd / 5000)))
    tech_feasibility = max(10, 100 - (req.technical_complexity_score * 0.6) + (req.team_readiness_score * 0.4))

    # 25% Reg, 20% Market, 20% Tech, 20% Team, 15% CapEx
    decision_score = round(
        (req.regulatory_compliance_score * 0.25)
        + (req.market_urgency_score * 0.20)
        + (tech_feasibility * 0.20)
        + (req.team_readiness_score * 0.20)
        + (capex_norm * 0.15),
        1,
    )

    variance = abs(req.regulatory_compliance_score - req.team_readiness_score) * 0.15
    confidence_index = min(98.0, max(45.0, round(88.0 - variance + (8 if req.regulatory_compliance_score > 75 else -5), 1)))

    if decision_score >= 78 and req.regulatory_compliance_score >= 70:
        recommendation = "EXECUTE_IMMEDIATELY"
        recommendation_sw = "TEKELEZA MARA MOJA"
        risk_rating = "Low"
        summary = "UDIAP assessment confirms superior operational viability, compliant regulatory posture, and strong execution synergy."
    elif decision_score >= 64:
        recommendation = "CONDITIONAL_APPROVAL"
        recommendation_sw = "IDHINISHO LA MASHARTI"
        risk_rating = "Moderate"
        summary = "Viable strategic initiative with favorable returns. Requires milestone-gated capital release and pre-launch compliance confirmation."
    elif decision_score >= 50:
        recommendation = "PILOT_VALIDATION"
        recommendation_sw = "JARIBIO LA AWALI (PILOT)"
        risk_rating = "Elevated"
        summary = "Elevated technical or regulatory friction detected. Recommend scoping a contained sandbox or pilot cohort before broader capital deployment."
    else:
        recommendation = "REVISE_PROPOSAL"
        recommendation_sw = "REKEBISHA PENDEKEZO KWANZA"
        risk_rating = "Critical"
        summary = "Fundamental operational deficits identified. Capital commitment poses high vulnerability without substantial restructuring."

    factors = [
        {"name": "Regulatory & Legal Compliance", "score": req.regulatory_compliance_score, "weight": 25},
        {"name": "CapEx Efficiency", "score": round(capex_norm, 1), "weight": 15},
        {"name": "Market Urgency", "score": req.market_urgency_score, "weight": 20},
        {"name": "Technical Feasibility", "score": round(tech_feasibility, 1), "weight": 20},
        {"name": "Team Readiness", "score": req.team_readiness_score, "weight": 20},
    ]

    mitigation_steps = [
        "Audit data retention protocols under Tanzania Personal Data Protection Act (PDPA).",
        "Contract redundant cloud interconnects to uphold sub-50ms regional SLA targets.",
        "Structure capital drawdown across 3 milestone-gated tranches tied to user validation.",
    ]

    assessment_id = f"udiap-{uuid.uuid4().hex[:8]}"

    # Persist assessment record to PostgreSQL
    record = UdiapAssessmentModel(
        id=assessment_id,
        project_name=req.project_name,
        capex_budget_usd=req.capex_budget_usd,
        regulatory_score=req.regulatory_compliance_score,
        market_urgency_score=req.market_urgency_score,
        technical_complexity_score=req.technical_complexity_score,
        team_readiness_score=req.team_readiness_score,
        computed_decision_score=decision_score,
        confidence_index=confidence_index,
        recommendation=recommendation,
        risk_rating=risk_rating,
    )
    db.add(record)
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to persist UDIAP assessment")

    return UdiapAssessmentResponse(
        assessment_id=assessment_id,
        project_name=req.project_name,
        decision_score=decision_score,
        confidence_index=confidence_index,
        recommendation=recommendation,
        recommendation_sw=recommendation_sw,
        risk_rating=risk_rating,
        summary=summary,
        factors=factors,
        mitigation_steps=mitigation_steps,
        timestamp=datetime.utcnow(),
    )


# ----------------- PARTNER ONBOARDING & MODERATION -----------------

@app.post(
    "/api/v1/partners/submit",
    response_model=PartnerSubmissionResponse,
    tags=["Partner Portal"],
)
def submit_service_for_review(sub: PartnerSubmissionCreate, db: Session = Depends(get_db)):
    """Enables external partner organizations to submit a digital service for review."""
    # Pydantic already validates api_base_url as HttpUrl. Additional check for health_endpoint
    if not sub.health_endpoint.startswith("/"):
        raise HTTPException(status_code=400, detail="health_endpoint must start with '/'")

    submission_id = f"sub-{uuid.uuid4().hex[:8]}"
    record = PartnerSubmissionModel(
        id=submission_id,
        service_name=sub.service_name,
        provider_name=sub.provider_name,
        provider_email=sub.provider_email,
        category=sub.category,
        tagline=sub.tagline,
        description=sub.description,
        api_base_url=str(sub.api_base_url),
        health_endpoint=sub.health_endpoint,
        auth_type=sub.auth_type,
        sla=sub.sla,
        pricing=sub.pricing,
        docs_url=sub.docs_url,
        status="pending",
    )
    db.add(record)
    try:
        db.commit()
        db.refresh(record)
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to save submission")
    return record


@app.get(
    "/api/v1/admin/submissions",
    response_model=List[PartnerSubmissionResponse],
    tags=["Admin Governance"],
)
def list_pending_submissions(
    status_filter: str = "pending",
    current_user=Depends(require_admin),
    db: Session = Depends(get_db),
):
    """Admin-only endpoint to inspect pending partner submissions."""
    return db.query(PartnerSubmissionModel).filter(PartnerSubmissionModel.status == status_filter).all()


@app.post("/api/v1/admin/submissions/{submission_id}/approve", tags=["Admin Governance"])
def approve_submission(
    submission_id: str, current_user=Depends(require_admin), db: Session = Depends(get_db)
):
    """Approves a partner submission and publishes it to the operational service catalogue."""
    sub = db.query(PartnerSubmissionModel).filter(PartnerSubmissionModel.id == submission_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Submission not found")

    sub.status = "approved"
    sub.reviewed_at = datetime.utcnow()

    # Create published service record
    service = ServiceModel(
        id=f"svc-{uuid.uuid4().hex[:8]}",
        name=sub.service_name,
        slug=sub.service_name.lower().replace(" ", "-"),
        tagline=sub.tagline,
        description=sub.description,
        ownership="third_party",
        provider_name=sub.provider_name,
        category=sub.category,
        status="operational",
        version="v1.0.0",
        sla=sub.sla,
        api_base_url=sub.api_base_url,
        auth_type=sub.auth_type,
        pricing=sub.pricing,
        features=[f"Integrated via J4Q Connect ({sub.auth_type})", f"SLA: {sub.sla}"],
        endpoints=[{"method": "GET", "path": sub.health_endpoint, "description": "Liveness probe"}],
    )
    db.add(service)
    try:
        db.commit()
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to approve submission")
    return {"status": "success", "message": f"Service {sub.service_name} approved and published."}


# ----------------- AUTH: expose token endpoint and registration helper -----------------
from fastapi.security import OAuth2PasswordRequestForm


@app.post("/api/v1/auth/token", response_model=Token, tags=["Authentication"])
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username, "role": user.role})
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/api/v1/auth/register", tags=["Authentication"])
def register_admin(user_in: UserCreate, db: Session = Depends(get_db)):
    """Register an initial admin user. Allowed only if no users exist in the system (bootstrap scenario)."""
    from .models import UserModel

    existing = db.query(UserModel).first()
    if existing:
        raise HTTPException(status_code=400, detail="Registration disabled: users already exist")
    user = UserModel(username=user_in.username, hashed_password=user_in.hashed_password, role="admin")
    db.add(user)
    try:
        db.commit()
        db.refresh(user)
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to create admin user")
    return {"username": user.username, "role": user.role}
