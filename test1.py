import sys
import json

if len(sys.argv) != 2:
    print("Usage: python test.py <data>")
    sys.exit(1)

data = sys.argv[1]
print(f"Received data from Express.js: {data}")

symptoms = [
    "Fever", "Cold", "Body aches", "Cough", "Fatigue", "Headache", "Nausea", "Vomiting", "Diarrhea", "Shortness of breath", "Chest pain",
    "Sore throat", "Runny nose", "Chills", "Sweating", "Joint pain", "Muscle weakness", "Dizziness", "Blurred vision", "Abdominal pain",
    "Constipation", "Weight loss", "Weight gain", "Loss of appetite", "Excessive thirst", "Excessive urination", "Skin rash", "Itching",
    "Swelling", "Jaundice", "Night sweats", "Blood in urine", "Blood in stool", "Difficulty swallowing", "Changes in bowel habits",
    "Palpitations", "High blood pressure", "Low blood pressure", "Irregular heartbeat", "Chest tightness", "Wheezing", "Coughing up blood",
    "Difficulty breathing", "Rapid breathing", "Blue lips or fingers", "Seizures", "Confusion", "Memory loss", "Difficulty concentrating",
    "Hallucinations", "Mood swings", "Depression", "Anxiety", "Panic attacks", "Insomnia", "Fatigue", "Weakness", "Numbness or tingling",
    "Loss of coordination", "Tremors", "Muscle spasms", "Stiffness", "Joint swelling", "Redness and warmth in joints", "Difficulty walking",
    "Balance problems", "Difficulty speaking", "Slurred speech", "Memory problems", "Frequent headaches", "Visual disturbances", "Hearing loss",
    "Ringing in the ears", "Nausea and vomiting", "Loss of appetite", "Weight loss", "Abdominal pain", "Bloating", "Diarrhea", "Constipation",
    "Blood in stool", "Blood in vomit", "Heartburn", "Difficulty swallowing", "Changes in bowel habits", "Frequent urination", "Painful urination",
    "Blood in urine", "Lower back pain", "Pain during intercourse", "Irregular menstrual cycles", "Heavy menstrual bleeding", "Missed periods",
    "Vaginal discharge", "Pelvic pain", "Pain in testicles", "Erectile dysfunction", "Loss of libido", "Painful erections", "Breast lumps",
    "Nipple discharge", "Skin changes", "Moles", "Warts", "Sores that won't heal", "Hair loss", "Vision changes", "Eye redness", "Eye discharge",
    "Double vision", "Difficulty focusing", "Swollen lymph nodes", "Enlarged spleen", "Enlarged liver", "Jaundice", "Swollen tonsils",
    "Difficulty swallowing", "White patches in the mouth", "Sores on the genitals", "Painful or frequent urination", "Fatigue",
    "Muscle pain", "Joint pain", "Fever", "Night sweats"
]

user_statement = data.lower()  # Convert input to lowercase for case-insensitive matching

# Initialize a response variable
response = ""

general_doctor_anirudh = [
    "fever", "cold", "body aches", "cough", "fatigue", "headache", "nausea", "vomiting", "diarrhea", "shortness of breath", "chest pain",
    "sore throat", "runny nose", "chills", "sweating", "joint pain", "muscle weakness", "dizziness", "blurred vision", "abdominal pain",
]

skin_specialist_yashwanth = [
    "constipation", "weight loss", "weight gain", "loss of appetite", "excessive thirst", "excessive urination", "skin rash", "itching",
    "swelling", "jaundice", "night sweats", "blood in urine", "blood in stool", "difficulty swallowing", "changes in bowel habits",
]

sexologist_naveen = [
    "balance problems", "difficulty speaking", "slurred speech", "memory problems", "frequent headaches", "visual disturbances", "hearing loss",
    "ringing in the ears", "nausea and vomiting", "loss of appetite", "weight loss", "abdominal pain", "bloating", "diarrhea", "constipation",
    "blood in stool", "blood in vomit", "heartburn", "difficulty swallowing", "changes in bowel habits", "frequent urination", "painful urination",
    "blood in urine", "lower back pain", "pain during intercourse", "irregular menstrual cycles", "heavy menstrual bleeding", "missed periods",
    "vaginal discharge", "pelvic pain", "pain in testicles", "erectile dysfunction", "loss of libido", "painful erections", "breast lumps",
    "nipple discharge", "skin changes", "moles", "warts", "sores that won't heal", "hair loss", "vision changes", "eye redness", "eye discharge",
    "double vision", "difficulty focusing", "swollen lymph nodes", "enlarged spleen", "enlarged liver", "jaundice", "swollen tonsils",
    "difficulty swallowing", "white patches in the mouth", "sores on the genitals", "painful or frequent urination", "fatigue",
    "muscle pain", "joint pain", "night sweats",
]

# Check for symptoms in the user's statement
# Check for symptoms in the user's statement
for symp in user_statement.split():
    if symp in general_doctor_anirudh:
        response = "Consult General Doctor Anirudh, Phn: 9829372919"
        break
    elif symp in skin_specialist_yashwanth:
        response = "Consult Skin Doctor Yash, Phn: 9829372919"
        break
    elif symp in sexologist_naveen:
        response = "Consult Sex Doctor Naveen, Phn: 9829372919"
        break

# If no match found, provide a generic response
print(response)
if not response:
    response = "No specific specialist found for your symptoms. Please consult a general doctor."

response_data = {"message": response}

# Convert the dictionary to a JSON string and print it
response_json = json.dumps(response_data)
print(response_json)

