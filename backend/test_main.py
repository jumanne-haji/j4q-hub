from fastapi.testclient import TestClient
import os
import tempfile

from backend.main import app
from backend.database import Base, engine
from backend.auth import get_password_hash

client = TestClient(app)


def setup_module(module):
    # Ensure a clean sqlite DB for tests
    # Use a temporary sqlite file
    tmp = tempfile.NamedTemporaryFile(delete=False)
    db_url = f"sqlite:///{tmp.name}"
    os.environ["DATABASE_URL"] = db_url
    # Recreate engine/tables
    Base.metadata.create_all(bind=engine)


def test_register_and_admin_flow():
    # Register initial admin
    resp = client.post(
        "/api/v1/auth/register",
        json={"username": "admin", "hashed_password": get_password_hash("strongpass")},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["username"] == "admin"

    # Obtain token via password grant
    resp = client.post(
        "/api/v1/auth/token",
        data={"username": "admin", "password": "strongpass"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert resp.status_code == 200
    token = resp.json()["access_token"]
    assert token

    # Attempt to list submissions (none exist) using admin token
    resp = client.get(
        "/api/v1/admin/submissions",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)


def test_partner_submission_and_approve_requires_admin():
    # Submit a partner service
    resp = client.post(
        "/api/v1/partners/submit",
        json={
            "service_name": "Test Service",
            "provider_name": "Provider A",
            "provider_email": "a@example.com",
            "category": "finance",
            "tagline": "Test",
            "description": "Desc",
            "api_base_url": "https://api.example.com",
            "health_endpoint": "/health",
        },
    )
    assert resp.status_code == 200
    sub = resp.json()
    assert sub["status"] == "pending"

    # Try approving without token => 401
    resp = client.post(f"/api/v1/admin/submissions/{sub['id']}/approve")
    assert resp.status_code == 401 or resp.status_code == 403

