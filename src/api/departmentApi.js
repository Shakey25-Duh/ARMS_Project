import API from "./axios";

export const getDepartments = () => API.get("/departments/");

export const addDepartment = (department) =>
  API.post("/departments/", department);

export const updateDepartment = (id, department) =>
  API.put(`/departments/${id}`, department);

export const deleteDepartment = (id) => API.delete(`/departments/${id}`);
