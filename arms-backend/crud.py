from sqlalchemy.orm import Session
import models
import schemas
from auth import hash_password


# ==========================
# Teacher CRUD
# ==========================


def get_teachers(db: Session):
    return db.query(models.Teacher).all()


def delete_teacher(db: Session, teacher_id: int):
    teacher = db.query(models.Teacher).filter(
        models.Teacher.id == teacher_id
    ).first()

    if not teacher:
        return None

    db.delete(teacher)
    db.commit()

    return teacher

def create_teacher(db: Session, teacher: schemas.TeacherCreate):
    new_user = models.User(
        username=teacher.username,
        email=teacher.email,
        password_hash=hash_password(teacher.password),
        role="teacher"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    new_teacher = models.Teacher(
        fullname=teacher.fullname,
        email=teacher.email,
        phone=teacher.phone,
        department=teacher.department,
        subject=teacher.subject,
        semester=teacher.semester,
        user_id=new_user.id
    )
    db.add(new_teacher)
    db.commit()
    db.refresh(new_teacher)

    return new_teacher


def update_teacher(db: Session, teacher_id: int, teacher_data: schemas.TeacherUpdate):
    teacher = db.query(models.Teacher).filter(
        models.Teacher.id == teacher_id
    ).first()

    if not teacher:
        return None

    teacher.fullname = teacher_data.fullname
    teacher.email = teacher_data.email
    teacher.phone = teacher_data.phone
    teacher.department = teacher_data.department
    teacher.subject = teacher_data.subject
    teacher.semester = teacher_data.semester

    db.commit()
    db.refresh(teacher)

    return teacher
# ==========================
# Gradable Students (dept + semester match)
# ==========================

def get_gradable_students(db: Session, teacher: models.Teacher):
    return db.query(models.Student).filter(
        models.Student.department == teacher.department,
        models.Student.semester == teacher.semester
    ).all()


# ==========================
# Marks CRUD
# ==========================
def create_marks(db: Session, marks_data: schemas.MarksCreate, teacher: models.Teacher):
    student = db.query(models.Student).filter(
        models.Student.id == marks_data.student_id
    ).first()

    if not student:
        return None, "not_found"

    if student.department != teacher.department or student.semester != teacher.semester:
        return None, "forbidden"

    existing = db.query(models.Marks).filter(
        models.Marks.student_id == marks_data.student_id,
        models.Marks.teacher_id == teacher.id
    ).first()

    if existing:
        return None, "already_exists"

    subject_record = db.query(models.Subject).filter(
        models.Subject.name == teacher.subject,
        models.Subject.department == teacher.department,
        models.Subject.semester == teacher.semester
    ).first()

    credit_hour = subject_record.credit_hour if subject_record else 3

    new_marks = models.Marks(
        student_id=marks_data.student_id,
        teacher_id=teacher.id,
        subject=teacher.subject,
        semester=teacher.semester,
        credit_hour=credit_hour,
        full_marks=marks_data.full_marks,
        obtained_marks=marks_data.obtained_marks
    )

    db.add(new_marks)
    db.commit()
    db.refresh(new_marks)

    return new_marks, None


def get_marks_by_teacher(db: Session, teacher_id: int):
    return db.query(models.Marks).filter(
        models.Marks.teacher_id == teacher_id
    ).all()


def update_marks(db: Session, marks_id: int, marks_data: schemas.MarksUpdate, teacher_id: int):
    marks = db.query(models.Marks).filter(
        models.Marks.id == marks_id
    ).first()

    if not marks:
        return None, "not_found"

    if marks.teacher_id != teacher_id:
        return None, "forbidden"

    marks.full_marks = marks_data.full_marks
    marks.obtained_marks = marks_data.obtained_marks

    db.commit()
    db.refresh(marks)

    return marks, None


def delete_marks(db: Session, marks_id: int, teacher_id: int):
    marks = db.query(models.Marks).filter(
        models.Marks.id == marks_id
    ).first()

    if not marks:
        return None, "not_found"

    if marks.teacher_id != teacher_id:
        return None, "forbidden"

    db.delete(marks)
    db.commit()

    return marks, None



# ==========================
# Student CRUD
# ==========================
def create_student(db: Session, student: schemas.StudentCreate, teacher_id: int):
    new_user = models.User(
        username=student.username,
        email=student.email,
        password_hash=hash_password(student.password),
        role="student"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    new_student = models.Student(
        fullname=student.fullname,
        roll_no=student.roll_no,
        registration_no=student.registration_no,
        email=student.email,
        phone=student.phone,
        gender=student.gender,
        dob=student.dob,
        semester=student.semester,
        section=student.section,
        batch=student.batch,
        department=student.department,
        address=student.address,
        guardian=student.guardian,
        guardian_phone=student.guardian_phone,
        user_id=new_user.id,
        created_by_teacher_id=teacher_id
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return new_student



def get_students_by_teacher(db: Session, teacher_id: int):
    return db.query(models.Student).filter(
        models.Student.created_by_teacher_id == teacher_id
    ).all()


def get_student(db: Session, student_id: int):
    return db.query(models.Student).filter(
        models.Student.id == student_id
    ).first()

def update_student(db: Session, student_id: int, student_data: schemas.StudentUpdate, teacher_id: int):
    student = get_student(db, student_id)

    if not student:
        return None, "not_found"

    if student.created_by_teacher_id != teacher_id:
        return None, "forbidden"

    student.fullname = student_data.fullname
    student.roll_no = student_data.roll_no
    student.registration_no = student_data.registration_no
    student.email = student_data.email
    student.phone = student_data.phone
    student.gender = student_data.gender
    student.dob = student_data.dob
    student.semester = student_data.semester
    student.section = student_data.section
    student.batch = student_data.batch
    student.department = student_data.department
    student.address = student_data.address
    student.guardian = student_data.guardian
    student.guardian_phone = student_data.guardian_phone

    db.commit()
    db.refresh(student)

    return student, None

def delete_student(db: Session, student_id: int, teacher_id: int):
    student = get_student(db, student_id)

    if not student:
        return None, "not_found"

    if student.created_by_teacher_id != teacher_id:
        return None, "forbidden"

    db.delete(student)
    db.commit()

    return student, None

def get_student_by_user(db: Session, user_id: int):
    return db.query(models.Student).filter(
        models.Student.user_id == user_id
    ).first()


def get_marks_by_student(db: Session, student_id: int):
    return db.query(models.Marks).filter(
        models.Marks.student_id == student_id
    ).all()


def get_subjects_for_student(db: Session, student: models.Student):
    return db.query(models.Teacher).filter(
        models.Teacher.department == student.department,
        models.Teacher.semester == student.semester
    ).all()