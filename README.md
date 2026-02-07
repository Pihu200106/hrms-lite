# HRMS Lite – Full Stack Assignment

HRMS Lite is a simple Human Resource Management System built as part of a full-stack coding assignment.

The system allows management of employees and tracking of daily attendance.

---

## 🚀 Tech Stack

### Frontend
- React
- Tailwind CSS

### Backend
- FastAPI
- SQLAlchemy

### Database
- MySQL

---

## ✨ Features

### 👩‍💼 Employee Management
- Add new employee
- Unique employee ID validation
- Email validation
- View employee list
- Delete employee

### 📅 Attendance Management
- Mark employee as **Present / Absent**
- Record date
- View attendance history per employee

---

## 🧠 System Design

- RESTful API architecture
- Clean separation:
  - models
  - schemas
  - routes
  - services
- Relational database with foreign keys
- Proper validation & error handling
- Async-ready backend
- Reusable UI components

---

## 📦 Project Structure

hrms-lite/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── schemas/
│ ├── database.py
│ └── main.py
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.js
│
└── README.md


---

## ⚙️ Backend Setup

cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
Create .env file:

DATABASE_URL=mysql+pymysql://USER:PASSWORD@localhost/hrms_lite
Run server:

uvicorn main:app --reload

Backend runs on:
http://127.0.0.1:8000

Swagger docs:
http://127.0.0.1:8000/docs

💻 Frontend Setup
cd frontend
npm install
npm start

Runs on:
http://localhost:3000

🔌 API Endpoints
Employees
POST /employees/

GET /employees/

DELETE /employees/{id}

Attendance
POST /attendance/

GET /attendance/{employee_id}

🛡 Validations & Rules
Required fields enforced

Email format validation

Duplicate employee prevention

Employee existence checked before attendance

Meaningful HTTP errors returned

🌍 Deployment Plan
Frontend → Vercel / Netlify
Backend → Render / Railway
Database → Cloud MySQL

Environment variables configured securely.

🎯 Assignment Goals Covered
✅ CRUD operations
✅ API design
✅ Database persistence
✅ Validation
✅ Error handling
✅ Clean UI
✅ Modular code

👩‍💻 Author
Pihu Bhardwaj

📌 Notes
This project focuses on correctness, clarity, and maintainability while keeping the UI clean and modern.

The implementation follows practical backend standards used in real production systems.
