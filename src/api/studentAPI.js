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

export const getStudents = () =>
    API.get("/students/");

export const addStudent = (student) =>
    API.post("/students/", student);

export const updateStudent = (id, student) =>
    API.put(`/students/${id}`, student);

export const deleteStudent = (id) =>
    API.delete(`/students/${id}`);