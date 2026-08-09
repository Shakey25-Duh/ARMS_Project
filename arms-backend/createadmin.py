from database import SessionLocal
from models import User
from auth import hash_password


def create_admin():
    db = SessionLocal()

    try:
        existing_admin = db.query(User).filter(
            User.email == "admin@arms.com"
        ).first()

        if existing_admin:
            print("Admin already exists!")
            return

        admin = User(
            username="admin",
            email="admin@arms.com",
            password_hash=hash_password("arms@123"),
            role="admin"
        )

        db.add(admin)
        db.commit()

        print("Admin created successfully!")

    finally:
        db.close()