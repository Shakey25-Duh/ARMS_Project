import API from "./axios";

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