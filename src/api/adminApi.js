import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const getAllStudents = () =>
    API.get("/students/all");

export const getAllMarks = () =>
    API.get("/marks/all");

export const getStudentMarks = (studentId) =>
    API.get(`/marks/student/${studentId}`);