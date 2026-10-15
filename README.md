# J4Q HUB — Hybrid Digital Services Platform

> **Jukwaa Moja la Kidijitali na Huduma Mseto (Hybrid Digital Services Platform)**
> Imetengenezwa na **J4Q DIGITAL**, Dar es Salaam, Tanzania.

---

## 🎯 Kuhusu J4Q HUB

**J4Q HUB** ni jukwaa kuu linalowaunganisha watumiaji, biashara, na watengenezaji programu (developers) na huduma mbalimbali za kidijitali katika sehemu moja, badala ya kumlazimisha mtumiaji kufungua tovuti nyingi tofauti.

Jukwaa hili linafanya kazi kwa mfumo wa **Hybrid**:
1. **Huduma Zinazomilikiwa na J4Q DIGITAL (1st-Party)**:
   - **UDIAP (Universal Decision Intelligence Assessment Platform)**: Mfumo wa mahesabu ya kiakili wa kutathmini vihatarishi vya uwekezaji, utayari wa kiutendaji, na kufanya maamuzi ya kimkakati.
   - **J4Q Digital Services & Systems**: Uhandisi wa mifumo ya kisasa ya wavuti, programu, na wingu.
   - **J4Q CloudOps & Edge**: Miundombinu ya server yenye kasi ya chini (low latency) nchini Tanzania.
   - **J4Q ShambaTech AI**: Ushauri wa kilimo cha kisasa na makadirio ya mazao kwa wakulima.
   - **J4Q EdTech Engine**: Usimamizi wa mitihani ya kidijitali na vyeti visivyoweza kugushiwa.

2. **Huduma za Washirika Zilizounganishwa (3rd-Party Verified Integrations)**:
   - **Selcom PayLink & Checkout**: Malipo ya M-Pesa, Airtel Money, Tigo Pesa, Halopesa, Visa/Mastercard.
   - **NIDA e-KYC Verification Gateway**: Uthibitisho wa vitambulisho vya taifa (NIN).
   - **BongoSMS & USSD Gateway**: SMS za OTP na miamala ya USSD.
   - **AzamPay Corporate API**: Malipo ya pamoja na makusanyo ya bili.
   - **AfriGIS Geocoding & Logistics**: Anwani na ramani za usafirishaji Dar es Salaam na Afrika Mashariki.

---

## 🛠️ Teknolojia Zilizotumika (Tech Stack)

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons, Vite.
- **Backend**: Python 3.11+, FastAPI, Pydantic v2.
- **Database**: PostgreSQL / SQLite (SQLAlchemy ORM & Alembic migrations).
- **APIs & Testing**: RESTful Architecture (`/api/v1`), Pytest.

---

## 🚀 Jinsi ya Kuendesha Mfumo (Local Setup)

### 1. Frontend (React + Vite)
```bash
# Sakinisha package zote
npm install

# Anzisha dev server
npm run dev
```
Tembelea: `http://localhost:3000`

### 2. Backend (Python FastAPI)
```bash
cd backend

# Tengeneza virtual environment
python -m venv venv
source venv/bin/activate  # Kwenye Windows: venv\Scripts\activate

# Sakinisha requirements
pip install -r requirements.txt

# Anzisha FastAPI server
uvicorn main:app --reload --port 8000
```
- API Documentation (Swagger UI): `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 3. Kuendesha Majaribio (Pytest)
```bash
cd backend
pytest test_main.py -v
```

---

## 🌐 Kupakia Kwenye GitHub (Pushing to GitHub)

1. Unda repository mpya kwenye akaunti yako ya GitHub (k.m. `j4q-hub`).
2. Kwenye kompyuta yako au terminal:
```bash
git init
git add .
git commit -m "feat: Initial commit for J4Q HUB MVP"
git branch -M main
git remote add origin https://github.com/JINA_LAKO_LA_GITHUB/j4q-hub.git
git push -u origin main
```

---

## ☁️ Kuanzisha Mtandaoni (Deployment / Hosting)

- **Frontend (Vercel au Render)**:
  - Unganisha repository yako ya GitHub na Vercel (bure na inachukua chini ya dakika 2).
  - Build Command: `npm run build`
  - Output Directory: `dist`
- **Backend (Render, Railway, au Cloud Run)**:
  - Tengeneza Web Service kwenye Render/Railway.
  - Start Command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`

---

## 📄 Hakimiliki na Leseni

&copy; 2026 **J4Q DIGITAL**, Dar es Salaam, Tanzania. Haki zote zimehifadhiwa.
