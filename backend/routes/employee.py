from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.employee import Employee
from models.attendance import Attendance
from schemas.employee import EmployeeCreate, EmployeeResponse
from typing import List

router = APIRouter(prefix="/employees", tags=["Employees"])


# dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ➕ Add Employee
@router.post("/", response_model=EmployeeResponse)
def create_employee(emp: EmployeeCreate, db: Session = Depends(get_db)):
    
    # check duplicate employee_id
    if db.query(Employee).filter(Employee.employee_id == emp.employee_id).first():
        raise HTTPException(status_code=400, detail="Employee ID already exists")

    # check duplicate email
    if db.query(Employee).filter(Employee.email == emp.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    new_emp = Employee(
        employee_id=emp.employee_id,
        full_name=emp.full_name,
        email=emp.email,
        department=emp.department
    )

    db.add(new_emp)
    db.commit()
    db.refresh(new_emp)

    return new_emp


# 📋 List Employees
@router.get("/", response_model=List[EmployeeResponse])
def list_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()


# ❌ Delete Employee (SAFE)
@router.delete("/{emp_id}")
def delete_employee(emp_id: int, db: Session = Depends(get_db)):
    emp = db.query(Employee).filter(Employee.id == emp_id).first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    # remove attendance records first
    db.query(Attendance).filter(Attendance.employee_id == emp_id).delete()

    # then delete employee
    db.delete(emp)
    db.commit()

    return {"message": "Employee deleted successfully"}
