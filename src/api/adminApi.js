import API from "./axios";

export const getAllStudents = () =>
    API.get("/students/all");

export const getAllMarks = () =>
    API.get("/marks/all");

export const getStudentMarks = (studentId) =>
    API.get(`/marks/student/${studentId}`);