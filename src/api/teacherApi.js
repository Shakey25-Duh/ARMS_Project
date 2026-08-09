import API from "./axios";

export const getTeachers = () => API.get("/teachers/");

export const addTeacher = (teacher) => API.post("/teachers/", teacher);

export const updateTeacher = (id, teacher) =>
  API.put(`/teachers/${id}`, teacher);

export const deleteTeacher = (id) => API.delete(`/teachers/${id}`);
