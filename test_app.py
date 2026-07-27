"""
Verification test for Campus Sentinel Flask App
"""
import unittest
from app import create_app
from models import db, User, SymptomReport, CampusZone

class CampusSentinelTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()

    def test_landing_page(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'AI-Powered Campus', response.data)

    def test_student_login_page(self):
        response = self.client.get('/student/login')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Student Portal', response.data)

    def test_admin_login_page(self):
        response = self.client.get('/admin/login')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Admin & Clinic Portal', response.data)

    def test_student_dashboard(self):
        response = self.client.get('/student/dashboard')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Health Dashboard', response.data)

    def test_student_symptoms_post(self):
        response = self.client.post('/student/symptoms', data={
            'symptoms': ['Fever', 'Cough'],
            'other': 'Feeling tired',
            'duration': '1-3 days'
        }, follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Symptom Submitted Anonymously', response.data)

    def test_student_triage(self):
        response = self.client.post('/student/triage', data={
            'symptoms': 'I have a high fever of 102F and persistent cough'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Visit Campus Clinic', response.data)

    def test_admin_dashboard(self):
        response = self.client.get('/admin/dashboard')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Campus Health Intelligence', response.data)

    def test_admin_heatmap(self):
        response = self.client.get('/admin/heatmap')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Campus Health Heatmap', response.data)

    def test_admin_prediction(self):
        response = self.client.get('/admin/prediction')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Disease Prediction Analytics', response.data)

    def test_admin_resources(self):
        response = self.client.get('/admin/resources')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Clinic Resources', response.data)

    def test_admin_reports(self):
        response = self.client.get('/admin/reports?severity=Mild')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Student Symptom Reports', response.data)

    def test_medicbot_chat_api(self):
        response = self.client.post('/api/chat', json={'message': 'What should I do if I have a fever?'})
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'reply', response.data)

if __name__ == '__main__':
    unittest.main()
