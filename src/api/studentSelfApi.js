import API from "./axios";

export const getMyProfile = () =>
    API.get("/students/me");

export const getMySubjects = () =>
    API.get("/students/me/subjects");

export const getMyMarks = () =>
    API.get("/marks/me");