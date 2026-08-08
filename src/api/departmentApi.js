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

export const getDepartments = () =>
    API.get("/departments/");

export const addDepartment = (department) =>
    API.post("/departments/", department);

export const updateDepartment = (id, department) =>
    API.put(`/departments/${id}`, department);

export const deleteDepartment = (id) =>
    API.delete(`/departments/${id}`);