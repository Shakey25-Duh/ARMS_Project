import API from "./axios";

export const getMyTeacherProfile = () => API.get("/teachers/me");
