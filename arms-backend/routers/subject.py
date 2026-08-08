from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth import require_admin, get_current_user
from sqlalchemy.orm import Session


import models
import schemas

from database import get_db

router = APIRouter(
    prefix="/subjects",
    tags=["Subjects"],
    dependencies=[Depends(require_admin)]
)

@router.post("/", response_model=schemas.SubjectResponse)
def add_subject(subject: schemas.SubjectCreate, db: Session = Depends(get_db)):

    new_subject = models.Subject(
        code=subject.code,
        name=subject.name,
        semester=subject.semester,
        department=subject.department,
        credit_hour=subject.credit_hour
    )

    db.add(new_subject)
    db.commit()
    db.refresh(new_subject)

    return new_subject


@router.get("/", response_model=list[schemas.SubjectResponse])
def get_subjects(db: Session = Depends(get_db)):

    return db.query(models.Subject).all()

@router.put("/{subject_id}", response_model=schemas.SubjectResponse)
def update_subject(
    subject_id: int,
    subject: schemas.SubjectCreate,
    db: Session = Depends(get_db)
):
    existing = db.query(models.Subject).filter(
        models.Subject.id == subject_id
    ).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Subject not found")

    existing.code = subject.code
    existing.name = subject.name
    existing.semester = subject.semester
    existing.department = subject.department
    existing.credit_hour = subject.credit_hour

    db.commit()
    db.refresh(existing)

    return existing


@router.delete("/{subject_id}")
def delete_subject(
    subject_id: int,
    db: Session = Depends(get_db)
):
    existing = db.query(models.Subject).filter(
        models.Subject.id == subject_id
    ).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Subject not found")

    db.delete(existing)
    db.commit()

    return {"message": "Subject deleted successfully"}