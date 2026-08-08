from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth import require_teacher, require_student, require_admin

import crud
import schemas
import models
from database import SessionLocal

router = APIRouter(
    prefix="/marks",
    tags=["Marks"]
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


@router.post("/", response_model=schemas.MarksResponse)
def add_marks(
    marks: schemas.MarksCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_teacher)
):
    teacher = get_teacher_profile(db, current_user)
    result, error = crud.create_marks(db, marks, teacher)

    if error == "not_found":
        raise HTTPException(status_code=404, detail="Student not found")
    if error == "forbidden":
        raise HTTPException(status_code=403, detail="This student is not in your department/semester")
    if error == "already_exists":
        raise HTTPException(status_code=400, detail="Marks already submitted for this student")

    return result


@router.get("/", response_model=list[schemas.MarksResponse])
def my_marks(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_teacher)
):
    teacher = get_teacher_profile(db, current_user)
    return crud.get_marks_by_teacher(db, teacher.id)


@router.put("/{marks_id}", response_model=schemas.MarksResponse)
def edit_marks(
    marks_id: int,
    marks: schemas.MarksUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_teacher)
):
    teacher = get_teacher_profile(db, current_user)
    updated, error = crud.update_marks(db, marks_id, marks, teacher.id)

    if error == "not_found":
        raise HTTPException(status_code=404, detail="Marks not found")
    if error == "forbidden":
        raise HTTPException(status_code=403, detail="You can only edit marks you submitted")

    return updated


@router.delete("/{marks_id}")
def remove_marks(
    marks_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_teacher)
):
    teacher = get_teacher_profile(db, current_user)
    deleted, error = crud.delete_marks(db, marks_id, teacher.id)

    if error == "not_found":
        raise HTTPException(status_code=404, detail="Marks not found")
    if error == "forbidden":
        raise HTTPException(status_code=403, detail="You can only delete marks you submitted")

    return {"message": "Marks deleted successfully"}

@router.get("/me", response_model=list[schemas.MarksResponse])
def my_marks(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_student)
):
    student = crud.get_student_by_user(db, current_user.id)

    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")

    return crud.get_marks_by_student(db, student.id)

@router.get("/all", response_model=list[schemas.MarksResponse])
def all_marks(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_admin)
):
    return db.query(models.Marks).all()

@router.get("/student/{student_id}", response_model=list[schemas.MarksResponse])
def marks_for_student(
    student_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_admin)
):
    return crud.get_marks_by_student(db, student_id)