from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth import require_teacher, require_student, require_admin, get_current_user

import crud
import schemas
import models
from database import SessionLocal

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_teacher_profile(db: Session, current_user: models.User):
    teacher = db.query(models.Teacher).filter(
        models.Teacher.user_id == current_user.id
    ).first()

    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher profile not found")

    return teacher

@router.get("/gradable", response_model=list[schemas.StudentResponse])
def gradable_students(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_teacher)
):
    teacher = get_teacher_profile(db, current_user)
    return crud.get_gradable_students(db, teacher)


# ==========================
# ADD STUDENT
# ==========================

@router.post("/", response_model=schemas.StudentResponse)
def add_student(
    student: schemas.StudentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_teacher)
):
    teacher = get_teacher_profile(db, current_user)
    return crud.create_student(db, student, teacher.id)


# ==========================
# LIST OWN STUDENTS
# ==========================

@router.get("/", response_model=list[schemas.StudentResponse])
def my_students(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_teacher)
):
    teacher = get_teacher_profile(db, current_user)
    return crud.get_students_by_teacher(db, teacher.id)


# ==========================
# EDIT OWN STUDENT 
# ==========================

@router.put("/{student_id}", response_model=schemas.StudentResponse)
def edit_student(
    student_id: int,
    student: schemas.StudentUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_teacher)
):
    teacher = get_teacher_profile(db, current_user)
    updated, error = crud.update_student(db, student_id, student, teacher.id)

    if error == "not_found":
        raise HTTPException(status_code=404, detail="Student not found")
    if error == "forbidden":
        raise HTTPException(status_code=403, detail="You can only edit students you created")

    return updated


# ==========================
# DELETE OWN STUDENT
# ==========================

@router.delete("/{student_id}")
def remove_student(
    student_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_teacher)
):
    teacher = get_teacher_profile(db, current_user)
    deleted, error = crud.delete_student(db, student_id, teacher.id)

    if error == "not_found":
        raise HTTPException(status_code=404, detail="Student not found")
    if error == "forbidden":
        raise HTTPException(status_code=403, detail="You can only delete students you created")

    return {"message": "Student deleted successfully"}

@router.get("/me", response_model=schemas.StudentResponse)
def my_profile(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_student)
):
    student = crud.get_student_by_user(db, current_user.id)

    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")

    return student


@router.get("/me/subjects", response_model=list[schemas.TeacherSubjectResponse])
def my_subjects(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_student)
):
    student = crud.get_student_by_user(db, current_user.id)

    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")

    return crud.get_subjects_for_student(db, student)

@router.get("/all", response_model=list[schemas.StudentResponse])
def all_students(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_admin)
):
    return db.query(models.Student).all()



@router.post("/", response_model=schemas.SubjectResponse)
def add_subject(
    subject: schemas.SubjectCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_admin)
):

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
def get_subjects(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Subject).all()


@router.put("/{subject_id}", response_model=schemas.SubjectResponse)
def update_subject(
    subject_id: int,
    subject: schemas.SubjectCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_admin)
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
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_admin)
):
    existing = db.query(models.Subject).filter(
        models.Subject.id == subject_id
    ).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Subject not found")

    db.delete(existing)
    db.commit()

    return {"message": "Subject deleted successfully"}