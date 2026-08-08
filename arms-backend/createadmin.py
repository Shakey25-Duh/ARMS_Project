from database import SessionLocal
from models import User
from auth import hash_password


db = SessionLocal()

admin = User(
    username="admin",
    email="admin@arms.com",
    password_hash=hash_password("admin123"),
    role="admin"
)

db.add(admin)
db.commit()

print("Admin created successfully!")

db.close()