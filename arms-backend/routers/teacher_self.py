from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from auth import require_teacher
import models
import schemas
from database import SessionLocal

router = APIRouter(
    prefix="/teachers",
    tags=["Teacher Self"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/me", response_model=schemas.TeacherResponse)
def my_profile(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_teacher)
):
    teacher = db.query(models.Teacher).filter(
        models.Teacher.user_id == current_user.id
    ).first()

    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher profile not found")

    return teacher