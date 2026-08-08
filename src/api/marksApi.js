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

export const getGradableStudents = () =>
    API.get("/students/gradable");

export const getMyMarks = () =>
    API.get("/marks/");

export const addMarks = (marks) =>
    API.post("/marks/", marks);

export const updateMarks = (id, marks) =>
    API.put(`/marks/${id}`, marks);

export const deleteMarks = (id) =>
    API.delete(`/marks/${id}`);