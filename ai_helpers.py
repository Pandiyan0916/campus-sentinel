from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import Pipeline
from sklearn.tree import DecisionTreeClassifier

SYMPTOM_TRAINING_DATA = [
    ('high fever cough shortness of breath chest pain', 'red'),
    ('severe headache vomiting dizziness confusion', 'red'),
    ('persistent fever vomiting dehydration', 'orange'),
    ('high temperature cough sore throat', 'orange'),
    ('mild cough cold headache', 'yellow'),
    ('sore throat runny nose fatigue', 'yellow'),
    ('mild headache tiredness', 'green'),
    ('slight sniffles occasional cough', 'green'),
    ('general discomfort tired', 'green'),
    ('runny nose sneezing', 'green'),
]

RECOMMENDATION_MAP = {
    'red': {
        'level': 'red',
        'title': 'Emergency',
        'color': 'text-red-600',
        'bg': 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
        'recommendations': [
            'Call 911 or campus emergency immediately',
            'Go to nearest emergency room',
            'Inform healthcare provider of severe symptoms'
        ]
    },
    'orange': {
        'level': 'orange',
        'title': 'Visit Campus Clinic',
        'color': 'text-orange-600',
        'bg': 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
        'recommendations': [
            'Schedule appointment at campus clinic',
            'Bring symptom documentation',
            'Clinic Hours: Mon-Fri 9am-6pm'
        ]
    },
    'yellow': {
        'level': 'yellow',
        'title': 'OTC Medication',
        'color': 'text-yellow-600',
        'bg': 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
        'recommendations': [
            'Consider over-the-counter medication',
            'Consult pharmacist if needed',
            'Follow package instructions & rest'
        ]
    },
    'green': {
        'level': 'green',
        'title': 'Self-Care',
        'color': 'text-green-600',
        'bg': 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
        'recommendations': [
            'Rest and stay hydrated',
            'Monitor symptoms for changes',
            'Over-the-counter comfort measures'
        ]
    },
}

symptom_texts = [item[0] for item in SYMPTOM_TRAINING_DATA]
labels = [item[1] for item in SYMPTOM_TRAINING_DATA]

TRIAGE_PIPELINE = Pipeline([
    ('vectorizer', CountVectorizer()),
    ('classifier', DecisionTreeClassifier(max_depth=5, random_state=42))
])
TRIAGE_PIPELINE.fit(symptom_texts, labels)

OUTBREAK_X = [[15], [25], [35], [45], [55], [65], [75], [85], [95]]
OUTBREAK_Y = [12, 20, 30, 45, 60, 75, 92, 108, 125]
OUTBREAK_MODEL = LinearRegression().fit(OUTBREAK_X, OUTBREAK_Y)


def analyze_symptoms(symptoms_text: str) -> dict:
    """Return a classification result for symptom text using a local AI model."""
    sanitized = symptoms_text.strip().lower() if symptoms_text else 'no symptoms reported'
    prediction = TRIAGE_PIPELINE.predict([sanitized])[0]
    proba = max(TRIAGE_PIPELINE.predict_proba([sanitized])[0])
    result = RECOMMENDATION_MAP.get(prediction, RECOMMENDATION_MAP['green']).copy()
    result['confidence'] = int(proba * 100)
    return result


def predict_outbreak_projection(zones, weeks=5):
    """Create an outbreak projection based on average campus risk using a local regression model."""
    if not zones:
        avg_risk = 35
    else:
        avg_risk = sum(getattr(zone, 'risk_score', 0) for zone in zones) / len(zones)

    base_prediction = float(OUTBREAK_MODEL.predict([[avg_risk]])[0])
    projections = []
    for week_index in range(1, weeks + 1):
        predicted = max(5, int(base_prediction + (week_index - 1) * (avg_risk * 0.12)))
        confidence = min(97, max(72, 100 - abs(avg_risk - 55) * 0.6))
        projections.append({
            'week': f'Week {week_index}',
            'predicted': predicted,
            'confidence': int(confidence)
        })

    return projections
