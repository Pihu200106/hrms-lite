from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.attendance import Attendance
from models.employee import Employee
from schemas.attendance import AttendanceCreate, AttendanceResponse
from typing import List

router = APIRouter(prefix="/attendance", tags=["Attendance"])


# DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ➕ Mark Attendance
@router.post("/", response_model=AttendanceResponse)
def mark_attendance(data: AttendanceCreate, db: Session = Depends(get_db)):

    # ✅ search using numeric ID
    emp = db.query(Employee).filter(Employee.id == data.employee_id).first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    record = Attendance(
        employee_id=data.employee_id,
        date=data.date,
        status=data.status
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return record


# 📋 Get Attendance
@router.get("/{employee_id}", response_model=List[AttendanceResponse])
def get_attendance(employee_id: int, db: Session = Depends(get_db)):
    return db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    ).all()
