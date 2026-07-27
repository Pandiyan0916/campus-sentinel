# Campus Sentinel (Flask Edition)

**Campus Sentinel** is an AI-powered campus health intelligence web application designed for predicting health outbreaks, analyzing symptoms, managing clinic resources, and visualizing zone risks across campus.

This project has been refactored from a JavaScript/Next.js stack into a clean, maintainable **Python (Flask)** architecture with **HTML5 + CSS3 (Jinja2 Templates)**.

---

## 🌟 Key Features

### 🎓 Student Portal
- **Health Dashboard**: Real-time campus risk score, local weather impact factors, trending symptoms summary, and preventive health tips.
- **Anonymous Symptom Reporter**: Easy-to-use form to report symptoms anonymously to help protect the campus.
- **AI Triage Assistant**: Intelligent symptom assessment providing tailored recommendations (*Self-Care, OTC Medication, Visit Campus Clinic, or Emergency*).
- **Health Insights**: Personal report history, symptom distribution analysis, and reporting patterns by time of day.
- **MedicBot Assistant**: Interactive floating AI chat drawer for answering health questions in real-time.

### 🏥 Admin & Clinic Portal
- **Health Intelligence Dashboard**: Key health metrics, 7-day outbreak risk trends, top weekly symptoms, and active health warnings.
- **Campus Heatmap**: Interactive color-coded visual map tracking symptom density and case counts across 6 campus zones (*North Campus, South Campus, East Dorm, West Quad, Library Zone, Athletic Center*).
- **Disease Prediction Analytics**: 5-week outbreak projections with confidence scores, weather correlation metrics, and seasonal pattern analysis.
- **Clinic Resource Management**: Live inventory tracking for medicine stocks (Acetaminophen, Ibuprofen, Amoxicillin, etc.) and bed capacity across clinic wards.
- **Student Symptom Reports**: Filterable management table allowing staff to filter reports by severity (*Mild, Moderate, High*) and status (*Pending, Reviewed*).

---

## 📁 Project Structure

```
campus-sentinel/
├── app.py                  # Main Flask application entrypoint & seeding logic
├── routes.py               # Application routes for Student and Admin portals
├── models.py               # SQLite database schemas using Flask-SQLAlchemy
├── test_app.py             # Automated unit tests for all routes and endpoints
├── requirements.txt        # Python dependencies (Flask, Flask-SQLAlchemy, Werkzeug)
├── database.db             # SQLite database file (automatically created on first run)
│
├── templates/              # Jinja2 HTML Templates
│   ├── base.html           # Base layout template with CSS & font imports
│   ├── index.html          # Public landing page
│   ├── student/
│   │   ├── layout.html     # Student portal sidebar & top navigation
│   │   ├── login.html      # Student login page
│   │   ├── dashboard.html  # Student health dashboard
│   │   ├── symptoms.html   # Symptom reporter form
│   │   ├── triage.html     # AI Triage assessment assistant
│   │   └── insights.html   # Student health insights & report history
│   ├── admin/
│   │   ├── layout.html     # Admin portal sidebar & top navigation
│   │   ├── login.html      # Admin login page
│   │   ├── dashboard.html  # Admin health intelligence dashboard
│   │   ├── heatmap.html    # Campus zone health heatmap
│   │   ├── prediction.html # Outbreak prediction analytics
│   │   ├── resources.html  # Clinic resources & bed capacity
│   │   └── reports.html    # Filterable student symptom reports
│   └── components/
│       └── chat_bot.html   # MedicBot floating assistant drawer
│
├── static/
│   ├── css/
│   │   └── styles.css      # Core CSS tokens, colors, custom utility classes
│   └── js/
│       └── script.js       # Minimal JS (< 5% codebase) for menu & chat drawer
│
└── README.md               # Maintainer documentation & setup guide
```

---

## 🚀 Quickstart Setup Guide

### 1. Requirements
- Python 3.8+ (Python 3.13 recommended)

### 2. Installation
Open a terminal in the project root directory and install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Running the Server
Launch the Flask development server:

```bash
python app.py
```

Then open your browser and navigate to:
👉 **[http://127.0.0.1:5000](http://127.0.0.1:5000)**

---

## 🚄 Railway Deployment
This repo is ready for Railway deployment with the included `Procfile` and `runtime.txt`.

1. Connect your GitHub repo to Railway.
2. Create a new Railway project from this repository.
3. Railway will detect the Python app and run the `gunicorn app:app` command.
4. Add any environment variables if needed (for example, `SECRET_KEY`).

Railway will automatically set the `PORT` environment variable, and the app listens on `0.0.0.0`.

Website live at campus-sentinel-production.up.railway.app

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Portal |
|---|---|---|---|
| **Student** | `demo@university.edu` | `demo123` | `/student/login` |
| **Admin** | `admin@clinic.edu` | `admin123` | `/admin/login` |

---

## 🧪 Running Automated Unit Tests

Run the included test suite to verify all routes, form handlers, and endpoints:

```bash
python test_app.py
```

---

## ⚙️ Maintainer Notes for Python Team

- **Database**: SQLite is configured by default via `database.db`. If you wish to switch to MySQL or PostgreSQL, update `SQLALCHEMY_DATABASE_URI` in `app.py`.
- **Logic**: All business logic (auth, triage rule evaluation, report filtering, MedicBot chat response generation) is written in pure Python in `routes.py`.
- **Templates**: Front-end templates use Jinja2 syntax (`{{ variable }}`, `{% for item in list %}`).
- **JavaScript**: Kept under 5% of the codebase, strictly contained in `static/js/script.js` for mobile sidebar drawer toggling, symptom button selection, and MedicBot AJAX chat messaging.
