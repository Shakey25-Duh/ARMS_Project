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

export const getTeachers = () =>
    API.get("/teachers/");

export const addTeacher = (teacher) =>
    API.post("/teachers/", teacher);

export const updateTeacher = (id, teacher) =>
    API.put(`/teachers/${id}`, teacher);

export const deleteTeacher = (id) =>
    API.delete(`/teachers/${id}`);