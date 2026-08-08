from pydantic import BaseModel
from typing import List


# ==========================
# Teacher Schemas
# ==========================
from pydantic import BaseModel, computed_field


class TeacherCreate(BaseModel):
    fullname: str
    email: str
    phone: str
    department: str
    subject: str
    semester: str
    username: str
    password: str


class TeacherUpdate(BaseModel):
    fullname: str
    email: str
    phone: str
    department: str
    subject: str
    semester: str


class TeacherResponse(BaseModel):
    id: int
    fullname: str
    email: str
    phone: str
    department: str
    subject: str
    semester: str

    class Config:
        from_attributes = True


def calculate_grade(percentage: float):
    if percentage >= 90:
        return "A", 4.0
    elif percentage >= 85:
        return "A-", 3.7
    elif percentage >= 80:
        return "B+", 3.3
    elif percentage >= 75:
        return "B", 3.0
    elif percentage >= 70:
        return "B-", 2.7
    elif percentage >= 65:
        return "C+", 2.3
    elif percentage >= 60:
        return "C", 2.0
    elif percentage >= 55:
        return "C-", 1.7
    elif percentage >= 50:
        return "D+", 1.3
    elif percentage >= 45:
        return "D", 1.0
    else:
        return "NG", 0.0

class MarksResponse(BaseModel):
    id: int
    student_id: int
    teacher_id: int
    subject: str
    semester: str
    credit_hour: int
    full_marks: int
    obtained_marks: int

    class Config:
        from_attributes = True

    @computed_field
    @property
    def percentage(self) -> float:
        return round((self.obtained_marks / self.full_marks) * 100, 1)

    @computed_field
    @property
    def grade(self) -> str:
        letter, _ = calculate_grade(self.percentage)
        return letter

    @computed_field
    @property
    def grade_point(self) -> float:
        _, point = calculate_grade(self.percentage)
        return point

    @computed_field
    @property
    def obtained_credit(self) -> float:
        _, point = calculate_grade(self.percentage)
        return round((point / 4.0) * self.credit_hour, 2)
# ==========================
# Marks Schemas
# ==========================

class MarksCreate(BaseModel):
    student_id: int
    full_marks: int
    obtained_marks: int


class MarksUpdate(BaseModel):
    full_marks: int
    obtained_marks: int


# Student Schemas
# ==========================
class StudentCreate(BaseModel):
    fullname: str
    roll_no: str
    registration_no: str
    email: str
    phone: str
    gender: str
    dob: str
    semester: str
    section: str
    batch: str
    department: str
    address: str
    guardian: str
    guardian_phone: str
    username: str
    password: str


class StudentUpdate(BaseModel):
    fullname: str
    roll_no: str
    registration_no: str
    email: str
    phone: str
    gender: str
    dob: str
    semester: str
    section: str
    batch: str
    department: str
    address: str
    guardian: str
    guardian_phone: str


class StudentResponse(BaseModel):
    id: int
    fullname: str
    roll_no: str
    registration_no: str
    email: str
    phone: str
    gender: str
    dob: str
    semester: str
    section: str
    batch: str
    department: str
    address: str
    guardian: str
    guardian_phone: str
    created_by_teacher_id: int

    class Config:
        from_attributes = True



class TeacherSubjectResponse(BaseModel):
    subject: str
    semester: str
    fullname: str

    class Config:
        from_attributes = True

# ==========================
# Subject Schemas
# ==========================

class SubjectCreate(BaseModel):
    code: str
    name: str
    semester: str
    department: str
    credit_hour: int


class SubjectResponse(SubjectCreate):
    id: int

    class Config:
        from_attributes = True


# ==========================
# Department Schemas
# ==========================

class DepartmentCreate(BaseModel):
    name: str
    faculty: str


class DepartmentResponse(DepartmentCreate):
    id: int

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: str
    password: str


class LoginResponse(BaseModel):
    message: str
    access_token: str
    token_type: str
    username: str
    role: str