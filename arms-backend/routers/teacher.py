from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from auth import require_admin
import crud
import schemas
from database import SessionLocal

router = APIRouter(
    prefix="/teachers",
    tags=["Teachers"],
    dependencies=[Depends(require_admin)]
)


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# ==========================
# ADD TEACHER
# ==========================

@router.post("/")
def add_teacher(
    teacher: schemas.TeacherCreate,
    db: Session = Depends(get_db)
):
    return crud.create_teacher(db, teacher)


# ==========================
# GET TEACHERS
# ==========================

@router.get("/")
def all_teachers(
    db: Session = Depends(get_db)
):
    return crud.get_teachers(db)


# ==========================
# UPDATE TEACHER
# ==========================

@router.put("/{teacher_id}")
def update_teacher(
    teacher_id: int,
    teacher: schemas.TeacherUpdate,
    db: Session = Depends(get_db)
):

    updated_teacher = crud.update_teacher(
        db,
        teacher_id,
        teacher
    )

    if not updated_teacher:
        raise HTTPException(
            status_code=404,
            detail="Teacher not found"
        )

    return updated_teacher


# ==========================
# DELETE TEACHER
# ==========================

@router.delete("/{teacher_id}")
def delete_teacher(
    teacher_id: int,
    db: Session = Depends(get_db)
):

    deleted_teacher = crud.delete_teacher(
        db,
        teacher_id
    )

    if not deleted_teacher:
        raise HTTPException(
            status_code=404,
            detail="Teacher not found"
        )

    return {
        "message": "Teacher deleted successfully"
    }