from fastapi import APIRouter, Depends

from auth import get_current_user, require_admin
from models import User


router = APIRouter(
    prefix="/test",
    tags=["Authentication Test"]
)


# ==========================
# Any Logged-in User
# ==========================

@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):

    return {
        "message": "You are logged in",
        "username": current_user.username,
        "role": current_user.role
    }


# ==========================
# Admin Only
# ==========================

@router.get("/admin")
def admin_test(
    current_user: User = Depends(require_admin)
):

    return {
        "message": "You are an admin",
        "username": current_user.username,
        "role": current_user.role
    }