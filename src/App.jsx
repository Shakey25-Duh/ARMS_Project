import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

/* ================= ADMIN ================= */

import AdminDashboard from "./pages/AdminDashboard";

import AddTeacher from "./pages/AddTeacher";
import ManageTeachers from "./pages/ManageTeachers";

import AddSubject from "./pages/AddSubject";
import ManageSubjects from "./pages/ManageSubjects";

import AddDepartment from "./pages/AddDepartment";
import ManageDepartments from "./pages/ManageDepartments";

import Reports from "./pages/Reports";

/* ================= TEACHER ================= */

import TeacherDashboard from "./pages/TeacherDashboard";

import MySubjects from "./pages/MySubjects";

import AddStudent from "./pages/AddStudent";
import ManageStudents from "./pages/ManageStudents";

import AddMarks from "./pages/AddMarks";
import ManageMarks from "./pages/ManageMarks";

import TeacherProfile from "./pages/TeacherProfile";

/* ================= STUDENT ================= */

import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import StudentSubjects from "./pages/StudentSubjects";
import StudentMarks from "./pages/StudentMarks";
import StudentResult from "./pages/StudentResult";

function App() {

    return (

        <Routes>

            {/* ================= HOME ================= */}

            <Route
                path="/"
                element={<Home />}
            />

            {/* ================= ADMIN ================= */}

            <Route
                path="/admin-dashboard"
                element={<AdminDashboard />}
            />

            <Route
                path="/add-teacher"
                element={<AddTeacher />}
            />

            <Route
                path="/manage-teachers"
                element={<ManageTeachers />}
            />

            <Route
                path="/add-subject"
                element={<AddSubject />}
            />

            <Route
                path="/manage-subjects"
                element={<ManageSubjects />}
            />

            <Route
                path="/add-department"
                element={<AddDepartment />}
            />

            <Route
                path="/manage-departments"
                element={<ManageDepartments />}
            />

            <Route
                path="/reports"
                element={<Reports />}
            />

            {/* ================= TEACHER ================= */}

            <Route
                path="/teacher-dashboard"
                element={<TeacherDashboard />}
            />

            <Route
                path="/my-subjects"
                element={<MySubjects />}
            />

            <Route
                path="/add-student"
                element={<AddStudent />}
            />

            <Route
                path="/manage-students"
                element={<ManageStudents />}
            />

            <Route
                path="/add-marks"
                element={<AddMarks />}
            />

            <Route
                path="/manage-marks"
                element={<ManageMarks />}
            />

            <Route
                path="/teacher-profile"
                element={<TeacherProfile />}
            />

            {/* ================= STUDENT ================= */}

            <Route
                path="/student-dashboard"
                element={<StudentDashboard />}
            />

            <Route
                path="/student-profile"
                element={<StudentProfile />}
            />

            <Route
                path="/student-subjects"
                element={<StudentSubjects />}
            />

            <Route
                path="/student-marks"
                element={<StudentMarks />}
            />

            <Route
                path="/student-result"
                element={<StudentResult />}
            />

        </Routes>

    );

}

export default App;