from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth import require_admin, get_current_user

import models
import schemas

from database import get_db

router = APIRouter(
    prefix="/departments",
    tags=["Departments"],
    dependencies=[Depends(require_admin)]
)


@router.post("/", response_model=schemas.DepartmentResponse)
def add_department(
    department: schemas.DepartmentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_admin)
):

    new_department = models.Department(
        name=department.name,
        faculty=department.faculty
    )

    db.add(new_department)
    db.commit()
    db.refresh(new_department)

    return new_department


@router.get("/", response_model=list[schemas.DepartmentResponse])
def get_departments(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    return db.query(models.Department).all()


@router.put("/{department_id}", response_model=schemas.DepartmentResponse)
def update_department(
    department_id: int,
    department: schemas.DepartmentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_admin)
):
    existing = db.query(models.Department).filter(
        models.Department.id == department_id
    ).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Department not found")

    existing.name = department.name
    existing.faculty = department.faculty

    db.commit()
    db.refresh(existing)

    return existing


@router.delete("/{department_id}")
def delete_department(
    department_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_admin)
):
    existing = db.query(models.Department).filter(
        models.Department.id == department_id
    ).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Department not found")

    db.delete(existing)
    db.commit()

    return {"message": "Department deleted successfully"}