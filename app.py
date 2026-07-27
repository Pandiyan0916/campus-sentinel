"""
Campus Sentinel - Flask Main Application Entrypoint
Run this file with: `python app.py`
"""

import os
from flask import Flask
from models import db, User, CampusZone, ClinicResource
from routes import init_routes

def create_app():
    app = Flask(__name__)

    # Secret Key & Configuration
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'campus-sentinel-secret-key-2026')

    # SQLite Database Configuration
    db_path = os.path.join(app.root_path, 'database.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize Database Extension
    db.init_app(app)

    # Initialize Application Routes
    init_routes(app)

    # Create Tables & Seed Data inside application context
    with app.app_context():
        db.create_all()
        seed_database()

    return app

def seed_database():
    """Seed initial demo users and campus health metrics if database is fresh."""
    if not User.query.first():
        student = User(email='demo@university.edu', name='Alex', role='student')
        student.set_password('demo123')

        admin = User(email='admin@clinic.edu', name='Dr. Smith', role='admin')
        admin.set_password('admin123')

        db.session.add_all([student, admin])
        db.session.commit()

    if not CampusZone.query.first():
        zones = [
            CampusZone(name='North Campus',    risk_score=45, cases=34, color_class='bg-yellow-400'),
            CampusZone(name='South Campus',    risk_score=28, cases=12, color_class='bg-green-400'),
            CampusZone(name='East Dorm',       risk_score=62, cases=48, color_class='bg-red-500'),
            CampusZone(name='West Quad',       risk_score=38, cases=24, color_class='bg-orange-400'),
            CampusZone(name='Library Zone',    risk_score=22, cases=8,  color_class='bg-green-400'),
            CampusZone(name='Athletic Center', risk_score=52, cases=36, color_class='bg-orange-500'),
        ]
        db.session.add_all(zones)
        db.session.commit()

    if not ClinicResource.query.first():
        resources = [
            ClinicResource(name='Acetaminophen', category='medicine', stock=120, required_min=50, status='Adequate'),
            ClinicResource(name='Ibuprofen',     category='medicine', stock=80,  required_min=50, status='Adequate'),
            ClinicResource(name='Amoxicillin',   category='medicine', stock=30,  required_min=40, status='Low'),
            ClinicResource(name='General Ward',  category='bed',      total_beds=20, available_beds=8,  status='Moderate'),
            ClinicResource(name='ICU',           category='bed',      total_beds=5,  available_beds=2,  status='Critical'),
        ]
        db.session.add_all(resources)
        db.session.commit()

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting Campus Sentinel Flask Server on http://0.0.0.0:{port} ...")
    app.run(debug=True, host='0.0.0.0', port=port)
