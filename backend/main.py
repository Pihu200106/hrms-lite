from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from models.employee import Employee
from models.attendance import Attendance
from routes.employee import router as employee_router
from routes.attendance import router as attendance_router

app = FastAPI(title="HRMS Lite API")


# ✅ allow frontend requests (development friendly)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# create tables in database
Base.metadata.create_all(bind=engine)


# register routes
app.include_router(employee_router)
app.include_router(attendance_router)


@app.get("/")
def home():
    return {"message": "HRMS Lite API Running"}
