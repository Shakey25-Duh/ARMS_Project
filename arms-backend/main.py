from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
from database import engine


models.Base.metadata.create_all(bind=engine)


from routers.teacher_self import router as teacher_self_router
from routers.teacher import router as teacher_router
from routers.subject import router as subject_router
from routers.department import router as department_router
from routers.auth import router as auth_router

from routers.student import router as student_router
from routers.marks import router as marks_router



app = FastAPI(
    title="ARMS Backend",
    version="1.0.0"
)

# CORS
origins = [
    "https://arms-project-git-main-arms9.vercel.app", 
    "http://localhost:5173",                           
]

origin_regex = r"^https:\/\/arms-project-[a-zA-Z0-9\-]+-arms9\.vercel\.app$"gin_regex = r"^https:\/\/your-app-[a-zA-Z0-9\-]+\.vercel\.app$"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(teacher_self_router)
app.include_router(teacher_router)
app.include_router(subject_router)
app.include_router(department_router)
app.include_router(auth_router)
app.include_router(student_router)
app.include_router(marks_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to ARMS Backend"
    }