"""
Campus Sentinel - Flask Application Routes
Handles authentication, student symptom reporting, AI triage analysis,
admin health intelligence dashboards, clinic resource management, and MedicBot API.
"""

from flask import render_template, request, redirect, url_for, session, flash, jsonify
from models import db, User, SymptomReport, ClinicResource, CampusZone, HealthAlert
from ai_helpers import analyze_symptoms, predict_outbreak_projection
from datetime import datetime, timedelta
import random

def init_routes(app):

    @app.before_request
    def load_user():
        """Attach user info to session context if logged in."""
        pass

    # ---------------------------------------------------------
    # LANDING & PUBLIC ROUTES
    # ---------------------------------------------------------
    @app.route('/')
    def index():
        return render_template('index.html')


    # ---------------------------------------------------------
    # AUTHENTICATION ROUTES
    # ---------------------------------------------------------
    @app.route('/student/login', methods=['GET', 'POST'])
    def student_login():
        if request.method == 'POST':
            email = request.form.get('email', '').strip()
            password = request.form.get('password', '').strip()

            user = User.query.filter_by(email=email, role='student').first()
            if user and user.check_password(password):
                session['user_id'] = user.id
                session['user_name'] = user.name
                session['user_role'] = 'student'
                flash('Welcome back, ' + user.name + '!', 'success')
                return redirect(url_for('student_dashboard'))
            else:
                # Allow demo login fallback if credentials match demo
                if email == 'demo@university.edu' and password == 'demo123':
                    session['user_id'] = 1
                    session['user_name'] = 'Alex'
                    session['user_role'] = 'student'
                    return redirect(url_for('student_dashboard'))
                flash('Invalid email or password. Try demo@university.edu / demo123', 'danger')

        return render_template('student/login.html')

    @app.route('/admin/login', methods=['GET', 'POST'])
    def admin_login():
        if request.method == 'POST':
            email = request.form.get('email', '').strip()
            password = request.form.get('password', '').strip()

            user = User.query.filter_by(email=email, role='admin').first()
            if user and user.check_password(password):
                session['user_id'] = user.id
                session['user_name'] = user.name
                session['user_role'] = 'admin'
                flash('Welcome back, ' + user.name + '!', 'success')
                return redirect(url_for('admin_dashboard'))
            else:
                if email == 'admin@clinic.edu' and password == 'admin123':
                    session['user_id'] = 2
                    session['user_name'] = 'Dr. Smith'
                    session['user_role'] = 'admin'
                    return redirect(url_for('admin_dashboard'))
                flash('Invalid admin credentials. Try admin@clinic.edu / admin123', 'danger')

        return render_template('admin/login.html')

    @app.route('/logout')
    def logout():
        session.clear()
        flash('You have been logged out.', 'info')
        return redirect(url_for('index'))


    # ---------------------------------------------------------
    # STUDENT PORTAL ROUTES
    # ---------------------------------------------------------
    @app.route('/student/dashboard')
    def student_dashboard():
        user_name = session.get('user_name', 'Alex')
        
        # Calculate recent metrics
        symptom_today_counts = [
            {'name': 'Fever', 'value': 24, 'percent': 75},
            {'name': 'Cough', 'value': 18, 'percent': 56},
            {'name': 'Headache', 'value': 12, 'percent': 38},
            {'name': 'Fatigue', 'value': 10, 'percent': 31},
        ]
        
        weekly_trends = [
            {'day': 'Mon', 'reports': 12},
            {'day': 'Tue', 'reports': 19},
            {'day': 'Wed', 'reports': 15},
            {'day': 'Thu', 'reports': 25},
            {'day': 'Fri', 'reports': 22},
            {'day': 'Sat', 'reports': 18},
            {'day': 'Sun', 'reports': 14},
        ]

        return render_template('student/dashboard.html', 
                               user_name=user_name,
                               risk_score=35,
                               symptom_today_counts=symptom_today_counts,
                               weekly_trends=weekly_trends)

    @app.route('/student/symptoms', methods=['GET', 'POST'])
    def student_symptoms():
        user_name = session.get('user_name', 'Alex')
        submitted = False

        if request.method == 'POST':
            selected_symptoms = request.form.getlist('symptoms')
            other_symptoms = request.form.get('other', '').strip()
            duration = request.form.get('duration', 'Less than 24 hours')

            symptoms_str = ", ".join(selected_symptoms) if selected_symptoms else "General discomfort"
            if other_symptoms:
                symptoms_str += f" ({other_symptoms})"

            # Estimate severity based on fever/cough count
            severity = 'Mild'
            if len(selected_symptoms) >= 3 or 'fever' in selected_symptoms:
                severity = 'Moderate'
            if 'fever' in selected_symptoms and len(selected_symptoms) >= 4:
                severity = 'High'

            user_id = session.get('user_id')
            report = SymptomReport(
                user_id=user_id,
                symptoms=symptoms_str,
                other_symptoms=other_symptoms,
                duration=duration,
                severity=severity,
                zone='North Campus',
                status='Pending'
            )
            db.session.add(report)
            db.session.commit()
            submitted = True

        return render_template('student/symptoms.html', user_name=user_name, submitted=submitted)

    @app.route('/student/triage', methods=['GET', 'POST'])
    def student_triage():
        user_name = session.get('user_name', 'Alex')
        triage_result = None

        if request.method == 'POST':
            symptoms_text = request.form.get('symptoms', '').strip()
            if symptoms_text:
                triage_result = analyze_symptoms(symptoms_text)
                triage_result['summary'] = f"AI classification based on: {symptoms_text[:120]}"
            else:
                triage_result = {
                    'level': 'green',
                    'title': 'Self-Care',
                    'color': 'text-green-600',
                    'bg': 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
                    'recommendations': [
                        'Rest and stay hydrated',
                        'Monitor symptoms for changes',
                        'Over-the-counter comfort measures'
                    ],
                    'confidence': 75
                }

        return render_template('student/triage.html', user_name=user_name, triage_result=triage_result)

    @app.route('/student/insights')
    def student_insights():
        user_name = session.get('user_name', 'Alex')
        
        # Mock/Database report history
        reports = SymptomReport.query.order_by(SymptomReport.created_at.desc()).limit(10).all()
        if not reports:
            # Fallback mock history matching original app
            mock_reports = [
                {'date': '2024-01-15', 'symptoms': 'Headache, Fatigue', 'severity': 'Mild', 'status': 'Resolved'},
                {'date': '2024-01-12', 'symptoms': 'Cough', 'severity': 'Moderate', 'status': 'Resolved'},
                {'date': '2024-01-08', 'symptoms': 'Fever', 'severity': 'Mild', 'status': 'Resolved'}
            ]
        else:
            mock_reports = [
                {
                    'date': r.created_at.strftime('%Y-%m-%d'),
                    'symptoms': r.symptoms,
                    'severity': r.severity,
                    'status': r.status
                } for r in reports
            ]

        weekly_trends = [
            {'day': 'Mon', 'symptoms': 1},
            {'day': 'Tue', 'symptoms': 1},
            {'day': 'Wed', 'symptoms': 0},
            {'day': 'Thu', 'symptoms': 2},
            {'day': 'Fri', 'symptoms': 1},
            {'day': 'Sat', 'symptoms': 0},
            {'day': 'Sun', 'symptoms': 1},
        ]

        distribution = [
            {'name': 'Headache', 'percentage': 35},
            {'name': 'Fatigue', 'percentage': 25},
            {'name': 'Cough', 'percentage': 20},
            {'name': 'Fever', 'percentage': 20},
        ]

        time_of_day = [
            {'time': 'Morning', 'reports': 8},
            {'time': 'Afternoon', 'reports': 12},
            {'time': 'Evening', 'reports': 15},
        ]

        return render_template('student/insights.html',
                               user_name=user_name,
                               reports=mock_reports,
                               weekly_trends=weekly_trends,
                               distribution=distribution,
                               time_of_day=time_of_day)


    # ---------------------------------------------------------
    # ADMIN PORTAL ROUTES
    # ---------------------------------------------------------
    @app.route('/admin/dashboard')
    def admin_dashboard():
        user_name = session.get('user_name', 'Dr. Smith')
        
        # Outbreak risk trend
        outbreak_trend = [
            {'day': 'Mon', 'risk': 25},
            {'day': 'Tue', 'risk': 30},
            {'day': 'Wed', 'risk': 28},
            {'day': 'Thu', 'risk': 35},
            {'day': 'Fri', 'risk': 42},
            {'day': 'Sat', 'risk': 38},
            {'day': 'Sun', 'risk': 32},
        ]

        top_symptoms = [
            {'name': 'Cough', 'count': 127, 'percent': 85},
            {'name': 'Fever', 'count': 98, 'percent': 65},
            {'name': 'Headache', 'count': 84, 'percent': 56},
            {'name': 'Fatigue', 'count': 72, 'percent': 48},
            {'name': 'Cold', 'count': 56, 'percent': 37},
        ]

        alerts = [
            {'title': 'Elevated Respiratory Cases', 'zones': 'North Campus', 'level': 'High'},
            {'title': 'Gastrointestinal Cluster', 'zones': 'West Quad', 'level': 'Medium'},
            {'title': 'Atypical Fever Pattern', 'zones': 'East Dorm', 'level': 'Medium'},
        ]

        return render_template('admin/dashboard.html',
                               user_name=user_name,
                               outbreak_trend=outbreak_trend,
                               top_symptoms=top_symptoms,
                               alerts=alerts)

    @app.route('/admin/heatmap')
    def admin_heatmap():
        user_name = session.get('user_name', 'Dr. Smith')
        
        zones = CampusZone.query.all()
        if not zones:
            zones = [
                {'name': 'North Campus', 'risk': 45, 'cases': 34, 'color': 'bg-yellow-400'},
                {'name': 'South Campus', 'risk': 28, 'cases': 12, 'color': 'bg-green-400'},
                {'name': 'East Dorm', 'risk': 62, 'cases': 48, 'color': 'bg-red-500'},
                {'name': 'West Quad', 'risk': 38, 'cases': 24, 'color': 'bg-orange-400'},
                {'name': 'Library Zone', 'risk': 22, 'cases': 8, 'color': 'bg-green-400'},
                {'name': 'Athletic Center', 'risk': 52, 'cases': 36, 'color': 'bg-orange-500'},
            ]
        else:
            zones = [
                {'name': z.name, 'risk': z.risk_score, 'cases': z.cases, 'color': z.color_class}
                for z in zones
            ]

        # Top risk zones sorted
        highest_risk_zones = sorted(zones, key=lambda z: z['risk'], reverse=True)[:4]

        return render_template('admin/heatmap.html',
                               user_name=user_name,
                               zones=zones,
                               highest_risk_zones=highest_risk_zones)

    @app.route('/admin/prediction')
    def admin_prediction():
        user_name = session.get('user_name', 'Dr. Smith')

        zones = CampusZone.query.all()
        outbreak_projections = predict_outbreak_projection(zones)

        weather_correlations = [
            {'day': 'Mon', 'cases': 24, 'temp': 65, 'humidity': 60},
            {'day': 'Tue', 'cases': 32, 'temp': 62, 'humidity': 75},
            {'day': 'Wed', 'cases': 28, 'temp': 68, 'humidity': 55},
            {'day': 'Thu', 'cases': 45, 'temp': 58, 'humidity': 85},
            {'day': 'Fri', 'cases': 52, 'temp': 55, 'humidity': 90},
        ]

        seasonal_patterns = [
            {'month': 'Jan', 'cases': 245},
            {'month': 'Feb', 'cases': 312},
            {'month': 'Mar', 'cases': 198},
            {'month': 'Apr', 'cases': 156},
            {'month': 'May', 'cases': 124},
            {'month': 'Jun', 'cases': 98},
            {'month': 'Jul', 'cases': 87},
            {'month': 'Aug', 'cases': 95},
            {'month': 'Sep', 'cases': 156},
            {'month': 'Oct', 'cases': 234},
            {'month': 'Nov', 'cases': 289},
            {'month': 'Dec', 'cases': 334},
        ]

        return render_template('admin/prediction.html',
                               user_name=user_name,
                               outbreak_projections=outbreak_projections,
                               weather_correlations=weather_correlations,
                               seasonal_patterns=seasonal_patterns)

    @app.route('/admin/resources')
    def admin_resources():
        user_name = session.get('user_name', 'Dr. Smith')

        medicines = [
            {'name': 'Acetaminophen', 'stock': 450, 'min': 200, 'status': 'Adequate'},
            {'name': 'Ibuprofen', 'stock': 320, 'min': 200, 'status': 'Adequate'},
            {'name': 'Diphenhydramine', 'stock': 85, 'min': 100, 'status': 'Low'},
            {'name': 'Omeprazole', 'stock': 210, 'min': 150, 'status': 'Adequate'},
            {'name': 'Amoxicillin', 'stock': 145, 'min': 200, 'status': 'Low'},
        ]

        beds = [
            {'location': 'Main Clinic', 'total': 12, 'available': 3, 'status': 'High Occupancy', 'percent': 75},
            {'location': 'East Isolation Ward', 'total': 8, 'available': 2, 'status': 'High Occupancy', 'percent': 75},
            {'location': 'West Recovery', 'total': 6, 'available': 4, 'status': 'Moderate Occupancy', 'percent': 33},
        ]

        resource_alerts = [
            {'title': 'Diphenhydramine Stock Alert', 'severity': 'warning', 'action': 'Order immediately'},
            {'title': 'Amoxicillin Running Low', 'severity': 'warning', 'action': 'Reorder suggested'},
            {'title': 'East Isolation Ward Full', 'severity': 'critical', 'action': 'Monitor capacity'},
        ]

        return render_template('admin/resources.html',
                               user_name=user_name,
                               medicines=medicines,
                               beds=beds,
                               alerts=resource_alerts)

    @app.route('/admin/reports')
    def admin_reports():
        user_name = session.get('user_name', 'Dr. Smith')

        filter_severity = request.args.get('severity')
        filter_status = request.args.get('status')

        # Base list of reports
        reports = [
            {'id': 1, 'date': '2024-01-15 14:32', 'symptoms': 'Fever, Cough', 'severity': 'Moderate', 'zone': 'East Dorm', 'status': 'Reviewed'},
            {'id': 2, 'date': '2024-01-15 13:45', 'symptoms': 'Headache', 'severity': 'Mild', 'zone': 'North Campus', 'status': 'Reviewed'},
            {'id': 3, 'date': '2024-01-15 12:18', 'symptoms': 'Fatigue, Fever', 'severity': 'High', 'zone': 'West Quad', 'status': 'Pending'},
            {'id': 4, 'date': '2024-01-15 11:02', 'symptoms': 'Cold, Cough', 'severity': 'Mild', 'zone': 'Library Zone', 'status': 'Reviewed'},
            {'id': 5, 'date': '2024-01-15 10:15', 'symptoms': 'Stomach Issues', 'severity': 'Moderate', 'zone': 'Athletic Center', 'status': 'Reviewed'},
            {'id': 6, 'date': '2024-01-15 09:47', 'symptoms': 'Fever, Headache, Fatigue', 'severity': 'High', 'zone': 'East Dorm', 'status': 'Pending'},
            {'id': 7, 'date': '2024-01-14 16:23', 'symptoms': 'Cough', 'severity': 'Mild', 'zone': 'South Campus', 'status': 'Reviewed'},
            {'id': 8, 'date': '2024-01-14 15:01', 'symptoms': 'Fever', 'severity': 'Moderate', 'zone': 'North Campus', 'status': 'Reviewed'},
        ]

        # Apply active filters if selected
        if filter_severity:
            reports = [r for r in reports if r['severity'] == filter_severity]
        if filter_status:
            reports = [r for r in reports if r['status'] == filter_status]

        return render_template('admin/reports.html',
                               user_name=user_name,
                               reports=reports,
                               filter_severity=filter_severity,
                               filter_status=filter_status)


    # ---------------------------------------------------------
    # MEDICBOT CHAT API (ASYNCHRONOUS INTERACTION)
    # ---------------------------------------------------------
    @app.route('/api/chat', methods=['POST'])
    def medicbot_chat():
        data = request.get_json() or {}
        user_message = data.get('message', '').strip().lower()

        bot_responses = [
            "Thank you for your question. Based on your symptoms, I recommend monitoring them closely and staying hydrated.",
            "That's a common concern. I suggest consulting with a healthcare professional if symptoms persist.",
            "Good question! Remember to practice good hygiene and maintain adequate rest for recovery.",
            "I understand your concern. If symptoms worsen, please visit the campus clinic immediately.",
            "That sounds like you may benefit from OTC medication. Please follow package directions or consult the pharmacy."
        ]

        if 'fever' in user_message or 'temperature' in user_message:
            reply = "A fever can indicate an infection. Stay hydrated, rest, and visit the campus clinic if it rises above 101°F."
        elif 'headache' in user_message or 'pain' in user_message:
            reply = "For mild headaches, make sure you're hydrated and getting enough rest. OTC pain relievers like acetaminophen can help."
        elif 'cough' in user_message or 'cold' in user_message:
            reply = "Cover your coughs, drink warm liquids, and monitor for shortness of breath or persistent fever."
        else:
            reply = random.choice(bot_responses)

        return jsonify({'reply': reply})
