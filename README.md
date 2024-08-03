# Project: Tele-Medicine Service

## Overview

| Field                | Content                                                   |
|----------------------|-----------------------------------------------------------|
| Introduction         | This project aims to create an AI-assisted telemedicine robotic kiosk to provide healthcare solutions in rural India. It focuses on easy access to expert doctors through AI technology, connecting individuals to medical consultations via the e-sanjeevani app. |
|Directory structure   | given below. | 
| Features             | - AI-powered telemedicine kiosk - Online consultations with expert doctors - Medicine delivery through local healthcare workers without delay |
| Technologies Used    | - Node.js - Express.js - MySQL - Python - Bootstrap |

## Introduction

This project is dedicated to revolutionizing healthcare accessibility in rural areas of India. The primary goal is to introduce an AI-powered telemedicine kiosk that enables remote medical consultations for individuals residing in villages. With the aid of the e-sanjeevani app and an AI-assisted system, this initiative aims to bridge the gap between rural communities and expert healthcare professionals.

The project emphasizes easy access to medical advice, efficient delivery of prescribed medications, and leveraging technology to improve the healthcare infrastructure in remote regions. Through the seamless integration of technology and local healthcare services, the project endeavors to enhance the overall well-being of rural populations.

## Features

### 1. AI-assisted Telemedicine Kiosk
- The system leverages AI-powered telemedicine kiosks placed in villages for easy access to medical consultations.
- Users interact with the kiosk, providing information about their illness using speech recognition.

### 2. Expert Consultation via e-Sanjeevani App
- The kiosk directs users to connect with expert doctors via the e-Sanjeevani App for consultations.

### 3. Medication and Follow-up Services
- Post-consultation, medications and associated services are coordinated and provided by local healthcare workers (e.g., Asha workers).

### 4. Technologies Used
- **Express.js & Node.js:** Backend server handling various functionalities.
- **Python:** Executing backend logic and performing data processing tasks.
- **MySQL Database:** Storing user information and medical records.
- **Google Translate API:** Facilitating translation between languages for better accessibility.

## File Structure
project-directory/
│
├── public/
│   ├── home.html
│   ├── display.html
│   ├── images/
│   │   ├── i1.jpg
│   │   ├── i2.jpg
│   │   └── i3.jpg
│   └── (other static files)
│
├── scripts/
│   ├── test.py
│   └── test1.py
│
├── views/
│   ├── one.ejs
│   └── (other EJS templates)
│
├── server.js
├── README.md
└── (other project files)



## How to Run

### Prerequisites
- Node.js and npm installed
- MySQL database setup
- Python installed

### Steps
1. **Setup Dependencies:**
   - Run `npm install` to install all required Node.js packages.

2. **Database Configuration:**
   - Set up MySQL database configurations in `server.js` (host, user, password, database).

3. **Start the Server:**
   - Run `node server.js` to start the Express.js server.

4. **Accessing the Application:**
   - Open a browser and visit:
     - `http://localhost:3000/` for the home page.
     - `http://localhost:3000/display.html` for a specific display page.
     - `http://localhost:3000/about` for additional information.
