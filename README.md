# AI-Assisted Telemedicine Kiosk for Rural India

## Project Overview

**Objective:** To provide accessible healthcare solutions in rural India using AI technology.

## Description

This project is a web application designed to offer telemedicine services in rural areas. It integrates AI-driven language translation and data processing to connect patients with healthcare professionals through a secure interface.

## Key Features

1. **Authentication:**
   - Users authenticate via a One-Time Password (OTP) using phone number.

2. **Language and Speech Input:**
   - Users can speak in Telugu after authentication.
   - The system supports spoken interactions in Telugu.

3. **Speech-to-Text and Translation:**
   - Converts spoken Telugu into text.
   - Translates the text from Telugu to English.

4. **AI-Based Disease Evaluation:**
   - The AI model processes the translated text to evaluate symptoms.
   - Checks for disease-related keywords in the translated text.
   - Matches identified diseases with a database of doctors to find the best-fit doctor for the patient.

5. **Doctor Recommendation:**
   - Recommends suitable doctors from the database based on the evaluated disease and the doctors' specialties.

## Technologies Used

- **Express.js & Node.js:** Backend server handling various functionalities.
- **Python:** Executing backend logic and performing data processing tasks.
- **MySQL Database:** Storing user information and medical records.
- **Google Translate API:** Facilitating translation between languages for better accessibility.

