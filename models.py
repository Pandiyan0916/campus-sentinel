"""
Campus Sentinel - Database Models (SQLAlchemy / SQLite)
Clean, beginner-friendly data models for student symptom tracking,
clinic resources, zone heatmaps, and administration.
"""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    """User account model for Students and Admin/Clinic personnel."""
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='student') # 'student' or 'admin'
    created_at = db.Column(db.DateTime, default=datetime.now)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class SymptomReport(db.Model):
    """Symptom submission reported anonymously or by a student."""
    __tablename__ = 'symptom_reports'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    symptoms = db.Column(db.String(255), nullable=False) # e.g. "Fever, Cough"
    other_symptoms = db.Column(db.Text, nullable=True)
    duration = db.Column(db.String(50), nullable=False, default='Less than 24 hours')
    severity = db.Column(db.String(20), nullable=False, default='Mild') # 'Mild', 'Moderate', 'High'
    zone = db.Column(db.String(100), nullable=False, default='North Campus')
    status = db.Column(db.String(20), nullable=False, default='Pending') # 'Pending', 'Reviewed'
    created_at = db.Column(db.DateTime, default=datetime.now)


class ClinicResource(db.Model):
    """Inventory items for clinic medicine stock and bed availability."""
    __tablename__ = 'clinic_resources'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(20), nullable=False) # 'medicine' or 'bed'
    stock = db.Column(db.Integer, default=0)
    required_min = db.Column(db.Integer, default=0)
    total_beds = db.Column(db.Integer, default=0)
    available_beds = db.Column(db.Integer, default=0)
    status = db.Column(db.String(50), nullable=False, default='Adequate')


class CampusZone(db.Model):
    """Campus zone risk scores for heatmaps."""
    __tablename__ = 'campus_zones'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    risk_score = db.Column(db.Integer, nullable=False, default=0) # 0-100%
    cases = db.Column(db.Integer, nullable=False, default=0)
    color_class = db.Column(db.String(50), nullable=False, default='bg-green-400')


class HealthAlert(db.Model):
    """Health alerts for admin dashboard & clinic warnings."""
    __tablename__ = 'health_alerts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    zones = db.Column(db.String(255), nullable=False)
    level = db.Column(db.String(20), nullable=False, default='Medium') # 'High', 'Medium', 'critical', 'warning'
    action = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
