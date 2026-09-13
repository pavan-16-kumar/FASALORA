# FASALORA (FarmConnect) 🌱

> Direct Farmer-to-Consumer & Aggregator Supply Chain Platform (SIH 2026 - Problem Statement: SIH26033)

---

## 📌 Overview

**FASALORA** is a full-stack digital agricultural supply chain platform connecting farmers directly with institutional buyers, local hubs, transporters, and retail consumers. It eliminates unnecessary intermediaries, guarantees fair prices, provides transparent route and delivery tracking, and streamlines collection hubs and cold storage logistics.

---

## 📁 Project Structure

```text
FASALORA/
├── .agents/                 # Workspace AI agent configurations, skills & rules
├── backend/                 # FastAPI (Python) backend service
│   ├── main.py              # API routes, JWT auth, simulation endpoints
│   └── requirements.txt     # Python backend dependencies
├── docs/                    # Architecture, SRS & Design documentation
│   ├── modules/             # Specification for 19 core functional modules
│   ├── presentations/       # SIH presentation slides & pitch decks (PDF/MD)
│   ├── FarmConnect_SRS_Architecture.md
│   └── farmconnect_modules_design.md
├── public/                  # Static assets, hero imagery, simulation stages
├── src/                     # Next.js frontend application (App Router)
│   ├── app/                 # Next.js pages, layouts, and API routes
│   ├── components/          # Reusable UI components (Farmer, Home, Panels, Maps)
│   ├── context/             # React Context providers (FarmerAuth, FarmConnect)
│   ├── lib/                 # Utility libraries and state stores
│   └── types/               # TypeScript interfaces & data contracts
├── .gitignore               # Unified ignore rules for Node, Python, Next.js, and OS files
├── AGENTS.md                # AI Agent guidelines & workflow rules
├── eslint.config.mjs        # ESLint configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Node dependencies and scripts
├── postcss.config.mjs       # PostCSS & TailwindCSS configuration
├── supabase_schema.sql      # Supabase/PostgreSQL schema definitions
├── tsconfig.json            # TypeScript compiler configuration
└── vercel.json              # Vercel deployment configuration
```

---

## 🚀 Quick Start

### 1. Frontend (Next.js 16 + React 19 + TailwindCSS)

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 2. Backend (FastAPI + Python 3.10+)

```bash
# Navigate to backend directory
cd backend

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn main:app --reload --port 8000
```

FastAPI interactive documentation will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, TailwindCSS, Lucide React, Leaflet / React Leaflet
- **Backend**: Python FastAPI, Pydantic, Jose JWT, Uvicorn
- **Database**: Supabase / PostgreSQL (`supabase_schema.sql`)
- **Deployment**: Vercel ready (`vercel.json`)

---

## 📄 Documentation

- [19 Functional Module Specifications](docs/modules/)
- [System Architecture & SRS](docs/FarmConnect_SRS_Architecture.md)
- [Presentation Slides & Decks](docs/presentations/)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.