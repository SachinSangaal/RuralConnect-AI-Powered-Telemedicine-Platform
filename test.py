import sys
import mysql.connector
import requests
import webbrowser
if len(sys.argv) != 2:
    print("Usage: python test.py <data>")
    sys.exit(1)
    
data = sys.argv[1]
print("Received data from Express.js: {data}")

conn=mysql.connector.connect(host='localhost',username='root',password='root',database='sih')
mycursor=conn.cursor()


doctors = [
    {
        "name": "Allergy and Immunology Specialist",
        "specialty": "Allergy and Immunology",
        "symptoms": ["Allergies", "Frequent infections", "Immunodeficiency"]
    },
    {
        "name": "Pulmonary Rehabilitation Specialist",
        "specialty": "Pulmonary Rehabilitation",
        "symptoms": ["Difficulty breathing", "Muscle weakness"]
    },
    {
        "name": "Pain Rehabilitation Specialist",
        "specialty": "Pain Rehabilitation",
        "symptoms": ["Chronic pain", "Muscle weakness"]
    },
    {
        "name": "Nephrologic Oncologist",
        "specialty": "Nephrologic Oncology",
        "symptoms": ["Blood in urine", "Unexplained weight loss"]
    },
    {
        "name": "Neonatologist",
        "specialty": "Neonatology",
        "symptoms": ["Neonatal jaundice"]
    },
    {
        "name": "Pediatric Gastrointestinal Surgeon",
        "specialty": "Pediatric Surgery",
        "symptoms": ["Severe abdominal pain", "Vomiting blood"]
    },
    {
        "name": "Neuro-Ophthalmologist",
        "specialty": "Neuro-Ophthalmology",
        "symptoms": ["Visual disturbances", "Double vision"]
    },
    {
        "name": "Interventional Radiologist",
        "specialty": "Interventional Radiology",
        "symptoms": ["Vascular issues", "Minimally invasive procedures"]
    },
    {
        "name": "Hepatobiliary Surgeon",
        "specialty": "Hepatobiliary Surgery",
        "symptoms": ["Jaundice", "Enlarged liver"]
    },
    {
    "name": "Sexologist",
    "specialty": "Sexology",
    "symptoms": ["Erectile dysfunction", "Low libido", "Sexual pain", "Premature ejaculation", "Difficulty with orgasm", "Sexual orientation and identity issues", 
                 "Relationship and intimacy problems", "Sexual anxiety or depression", "sex related issues"]
    },

    {
        "name": "Vascular Medicine Specialist",
        "specialty": "Vascular Medicine",
        "symptoms": ["Blood clotting disorders", "Peripheral artery disease"]
    },
    {
        "name": "Cardiothoracic Surgeon",
        "specialty": "Cardiothoracic Surgery",
        "symptoms": ["Chest pain", "Cardiac surgery"]
    },
    {
        "name": "Orthopedic Hand Surgeon",
        "specialty": "Orthopedic Hand Surgery",
        "symptoms": ["Hand and wrist pain", "Carpal tunnel syndrome"]
    },
    {
        "name": "Pain Psychologist",
        "specialty": "Pain Psychology",
        "symptoms": ["Chronic pain", "Psychological pain management"]
    },
    {
        "name": "Neurotologist",
        "specialty": "Neurotology",
        "symptoms": ["Ear-related dizziness", "Balance disorders"]
    },
    {
        "name": "Oncologic Radiologist",
        "specialty": "Oncologic Radiology",
        "symptoms": ["Radiotherapy for cancer treatment"]
    },
    {
        "name": "Neuro-oncologist",
        "specialty": "Neuro-oncology",
        "symptoms": ["Brain tumors", "Neurological complications of cancer"]
    },
    {
        "name": "Pediatric Endocrinologist",
        "specialty": "Pediatric Endocrinology",
        "symptoms": ["Growth disorders", "Hormonal imbalances in children"]
    },
    {
        "name": "Vascular Neurologist",
        "specialty": "Vascular Neurology",
        "symptoms": ["Stroke management", "Cerebral vascular disorders"]
    },
    {
        "name": "Pediatric Hematologist",
        "specialty": "Pediatric Hematology",
        "symptoms": ["Blood disorders in children", "Anemia in children"]
    },
    {
        "name": "Pediatric Nephrologist",
        "specialty": "Pediatric Nephrology",
        "symptoms": ["Kidney disorders in children", "Pediatric hypertension"]
    },
    {
        "name": "Pediatric Rheumatologic Immunologist",
        "specialty": "Pediatric Rheumatologic Immunology",
        "symptoms": ["Autoimmune disorders in children", "Rheumatologic conditions in children"]
    },
    {
        "name": "Clinical Geneticist",
        "specialty": "Clinical Genetics",
        "symptoms": ["Genetic disorders", "Hereditary conditions"]
    },
 
    {
        "name": "Hormone Therapist",
        "specialty": "Hormone Therapy",
        "symptoms": ["Hormonal imbalances", "Hormone replacement therapy"]
    },
    {
        "name": "Orthopedic Trauma Surgeon",
        "specialty": "Orthopedic Trauma Surgery",
        "symptoms": ["Fractures", "Orthopedic trauma"]
    },
    {
        "name": "Infectious Disease Specialist",
        "specialty": "Infectious Disease",
        "symptoms": ["Nausea", "Vomiting", "Diarrhea", "Cough", "Shortness of breath", "Chills", "Sweating", "Frequent infections"]
    },
    {
        "name": "Cardiologist",
        "specialty": "Cardiology",
        "symptoms": ["Chest pain", "Palpitations", "High blood pressure", "Low blood pressure", "Irregular heartbeat", "Chest tightness"]
    },
    {
        "name": "Pulmonologist",
        "specialty": "Pulmonology",
        "symptoms": ["Cough", "Shortness of breath", "Chest tightness", "Wheezing", "Coughing up blood", "Rapid breathing", "Blue lips or fingers"]
    },
    {
        "name": "Neurologist",
        "specialty": "Neurology",
        "symptoms": ["Headache", "Dizziness", "Blurred vision", "Seizures", "Confusion", "Memory loss", "Difficulty concentrating", "Hallucinations", "Mood swings"]
    },
    {
        "name": "Psychiatrist",
        "specialty": "Psychiatry",
        "symptoms": ["Mood swings", "Depression", "Anxiety", "Panic attacks", "Hallucinations"]
    },
    {
        "name": "Endocrinologist",
        "specialty": "Endocrinology",
        "symptoms": ["Weight gain", "Excessive thirst", "Excessive urination", "Changes in weight"]
    },
    {
        "name": "Gastroenterologist",
        "specialty": "Gastroenterology",
        "symptoms": ["Abdominal pain", "Constipation", "Diarrhea", "Blood in stool", "Heartburn", "Difficulty swallowing", "Changes in bowel habits"]
    },
    {
        "name": "Rheumatologist",
        "specialty": "Rheumatology",
        "symptoms": ["Joint pain", "Muscle weakness", "Swelling", "Stiffness", "Redness and warmth in joints"]
    },
    {
        "name": "Orthopedic Surgeon",
        "specialty": "Orthopedic Surgery",
        "symptoms": ["Joint pain", "Difficulty walking", "Balance problems", "Difficulty using limbs"]
    },
    {
        "name": "Otolaryngologist (ENT Specialist)",
        "specialty": "Otolaryngology",
        "symptoms": ["Sore throat", "Runny nose", "Difficulty swallowing", "Hearing loss"]
    },
    {
        "name": "Ophthalmologist",
        "specialty": "Ophthalmology",
        "symptoms": ["Vision changes", "Eye redness", "Double vision", "Difficulty focusing"]
    },
    {
        "name": "Dermatologist",
        "specialty": "Dermatology",
        "symptoms": ["Skin rash", "Itching", "Moles", "Warts", "Sores that won't heal"]
    },
    {
        "name": "Urologist",
        "specialty": "Urology",
        "symptoms": ["Blood in urine", "Painful urination", "Erectile dysfunction", "Urinary issues"]
    },
    {
        "name": "Gynecologist",
        "specialty": "Gynecology",
        "symptoms": ["Irregular menstrual cycles", "Heavy menstrual bleeding", "Missed periods", "Vaginal discharge", "Pelvic pain"]
    },
    {
        "name": "Andrologist",
        "specialty": "Andrology",
        "symptoms": ["Pain in testicles", "Erectile dysfunction", "Loss of libido", "Painful erections"]
    },
    {
        "name": "Breast Surgeon",
        "specialty": "Breast Surgery",
        "symptoms": ["Breast lumps", "Nipple discharge", "Changes in breast tissue"]
    },
    {
        "name": "Hematologist",
        "specialty": "Hematology",
        "symptoms": ["Unexplained bruising", "Frequent nosebleeds"]
    },
    {
        "name": "Nephrologist",
        "specialty": "Nephrology",
        "symptoms": ["High blood pressure", "Blood in urine", "Lower back pain"]
    },
    {
        "name": "Oncologist",
        "specialty": "Oncology",
        "symptoms": ["Unexplained weight loss", "Unexplained weight gain", "Sores that won't heal"]
    },
    {
        "name": "Allergist/Immunologist",
        "specialty": "Allergy and Immunology",
        "symptoms": ["Chills", "Sweating", "Frequent infections"]
    },
    {
        "name": "Hepatologist",
        "specialty": "Hepatology",
        "symptoms": ["Jaundice", "Enlarged liver", "Enlarged spleen"]
    },
    {
    "name": "Cardiologist",
    "specialty": "Cardiology",
    "symptoms": ["Chest pain","heart", "Palpitations", "High blood pressure", "Low blood pressure", 
                 "Irregular heartbeat", "Chest tightness", "Shortness of breath", "Dizziness", "Fatigue", 
                 "Swelling in the legs or ankles", "Rapid or irregular pulse", "Fainting or near-fainting episodes",
                 "Family history of heart disease", "Heart murmurs", "Heart palpitations", "Shortness of breath with exertion", 
                 "Leg pain or cramping with exertion", "Unexplained fatigue or weakness"]
    },
    {
        "name": "Rheumatoid Arthritis Specialist",
        "specialty": "Rheumatology",
        "symptoms": ["Joint swelling", "Difficulty using limbs"]
    },
    {
        "name": "Speech-Language Pathologist",
        "specialty": "Speech-Language Pathology",
        "symptoms": ["Difficulty speaking", "Slurred speech"]
    },
    {
        "name": "ENT Specialist",
        "specialty": "ENT",
        "symptoms": ["Difficulty speaking", "hear", "hearing", "ear", "nose", "smell", "Throat", "listen"]
    },
      {
          "name": "General Physician",
          "specialty": "General Medicine",
          "symptoms": [
            "Fever",
            "Cold",
            "Cough",
            "Sore throat",
            "Headache",
            "Back pain",
            "Joint pain",
            "Muscle pain",
            "Fatigue",
            "Shortness of breath",
            "Chest pain",
            "High blood pressure",
            "Diabetes",
            "Indigestion",
            "Nausea",
            "Vomiting",
            "Diarrhea",
            "Constipation",
            "Acne",
            "Eczema",
            "Skin rashes",
            "Minor skin infections",
            "Allergies",
            "Ear infections",
            "Urinary tract infections (UTIs)",
            "Gastrointestinal issues",
            "Respiratory infections (e.g., bronchitis)",
            "Asthma",
            "COPD (Chronic Obstructive Pulmonary Disease)",
            "Depression",
            "Anxiety",
            "Stress-related issues",
            "Insomnia",
            "Weight management",
            "Nutritional guidance",
            "Vaccinations",
            "Routine check-ups",
            "Chronic disease management",
            "Pediatric care",
            "Women's health (e.g., gynecological exams)",
            "Men's health",
            "Age-related issues",
            "Prostate health",
            "Growth monitoring (for children)",
            "Minor injuries (e.g., cuts, sprains)",
            "Health screenings",
            "Preventive care"
    ]
  }

]

import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')


def preprocess_text(text):
    tokens = word_tokenize(text.lower())
    tokens = [WordNetLemmatizer().lemmatize(token) for token in tokens if token not in stopwords.words('english')]
    return ' '.join(tokens)

def normalize_symptoms(symptoms):
    # Add symptom normalization logic here, e.g., mapping "heart attack" to "chest pain"
    return symptoms

def get_best_matching_doctor(user_symptoms, doctors):
    user_symptoms = normalize_symptoms(user_symptoms)
    user_symptoms = preprocess_text(user_symptoms)
    doctor_symptoms = [preprocess_text(' '.join(doctor['symptoms'])) for doctor in doctors]

    vectorizer = TfidfVectorizer()
    symptom_matrix = vectorizer.fit_transform([user_symptoms] + doctor_symptoms)

    cosine_similarities = cosine_similarity(symptom_matrix[0], symptom_matrix[1:])

    best_match_index = cosine_similarities.argmax()

    similarity_threshold = 0.2

    if cosine_similarities[0][best_match_index] >= similarity_threshold:
        best_doctor = doctors[best_match_index]
    else:
        general_physician = {
            "name": "General Physician",
            "specialty": "General Medicine",
            "symptoms": ["Fever", "Cold", "Cough", "Sore throat", "Headache", ]
        }
        best_doctor = general_physician

    return best_doctor

user_symptoms = data
best_doctor = get_best_matching_doctor(user_symptoms, doctors)

print("Best matching doctor for your symptoms is:", best_doctor['name'])

# mycursor.execute("create table doctor(name varchar(150)) ")

insert_query = "INSERT INTO care (name) VALUES (%s)"
mycursor.execute(insert_query, (best_doctor['name'],))

print("sucessfully inserted")

conn.commit()
conn.close()

print("sucessfully connected")

