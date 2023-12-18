# Project: Tele-Medicine Service

## Overview

| Field                | Content                                                   |
|----------------------|-----------------------------------------------------------|
| Introduction         | This project aims to create an AI-assisted telemedicine robotic kiosk to provide healthcare solutions in rural India. It focuses on easy access to expert doctors through AI technology, connecting individuals to medical consultations via the e-sanjeevani app. |
|Directory structure   | given below. | 
| Features             | - AI-powered telemedicine kiosk - Online consultations with expert doctors - Medicine delivery through local healthcare workers without delay |
| Installation         | - Clone the repository: `git clone https://github.com/your/repository.git` - Install dependencies: `npm install` |
| Usage                | - Run the server: `node server.js` - Access the application in a web browser at `http://localhost:3000` |
| Technologies Used    | - Node.js - Express.js - MySQL - Python - Bootstrap |
| Contributing         | - Fork the repository - Create a new branch: `git checkout -b feature/new-feature` - Make changes, commit, and push to your branch - Create a pull request |
| License              | This project is licensed under the [MIT License](link-to-license). |
## Introduction

This project is dedicated to revolutionizing healthcare accessibility in rural areas of India. The primary goal is to introduce an AI-powered telemedicine kiosk that enables remote medical consultations for individuals residing in villages. With the aid of the e-sanjeevani app and an AI-assisted system, this initiative aims to bridge the gap between rural communities and expert healthcare professionals.

The project emphasizes easy access to medical advice, efficient delivery of prescribed medications, and leveraging technology to improve the healthcare infrastructure in remote regions. Through the seamless integration of technology and local healthcare services, the project endeavors to enhance the overall well-being of rural populations.
## Usage

To use the AI-assisted telemedicine kiosk:

1. Open a web browser and navigate to the provided URL (e.g., `http://your-domain.com`).
2. On the home page, click on the "Start Speaking" button to activate the speech recognition feature.
3. Follow the prompts to provide information about your medical condition or queries verbally.
4. The system will engage in a conversation, inquire about symptoms, and provide guidance on the next steps.
5. Upon completion of the consultation, you will receive instructions regarding medication and associated services via the platform.

Please note: The kiosk operates using Telugu language recognition (as of the current version). Ensure your microphone is enabled and properly set up for optimal functionality.
## Installation

To set up the project locally, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/your/repository.git
    ```

2. Navigate to the project directory:

    ```bash
    cd project-directory
    ```

3. Install project dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    ```bash
    node server.js
    ```

5. Access the application in a web browser at [http://localhost:3000](http://localhost:3000).

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

## Additional Information

- **Error Handling:**
  - Implement robust error handling mechanisms, especially during Python script execution and API interactions.
  
- **Security Considerations:**
  - Secure sensitive data (database credentials, API keys) and input validation to prevent security vulnerabilities.

- **Deployment & Scaling:**
  - Consider deploying the application on cloud services for better accessibility and scalability.

- **Improvements & Future Work:**
  - Enhance user experience with better UI/UX.
  - Implement real-time consultation features.
  - Expand language support for wider accessibility.
