from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


# ==========================
# User Model
# ==========================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False)


# ==========================
# Teacher Model
# ==========================

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String(100))
    email = Column(String(100))
    phone = Column(String(20))
    department = Column(String(100))
    subject = Column(String(100))
    semester = Column(String(20))
    

    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    user = relationship("User")


class Marks(Base):
    __tablename__ = "marks"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    teacher_id = Column(Integer, ForeignKey("teachers.id"))
    subject = Column(String(100))
    semester = Column(String(20))
    full_marks = Column(Integer, default=100)
    obtained_marks = Column(Integer)
    credit_hour = Column(Integer, default=3)

    student = relationship("Student")
    teacher = relationship("Teacher")

# ==========================
# Student Model
# ==========================
class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String(100))
    roll_no = Column(String(50))
    registration_no = Column(String(50))
    email = Column(String(100))
    phone = Column(String(20))
    gender = Column(String(20))
    dob = Column(String(20))
    semester = Column(String(20))
    section = Column(String(10))
    batch = Column(String(20))
    department = Column(String(100))
    address = Column(String(255))
    guardian = Column(String(100))
    guardian_phone = Column(String(20))

    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    created_by_teacher_id = Column(Integer, ForeignKey("teachers.id"))

    user = relationship("User")
    teacher = relationship("Teacher")


# ==========================
# Subject Model
# ==========================
class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(20))
    name = Column(String(100))
    semester = Column(String(20))
    department = Column(String(100))
    credit_hour = Column(Integer, default=3)


# ==========================
# Department Model
# ==========================
class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    faculty = Column(String(100))