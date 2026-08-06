import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

// Admin
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import AddTeacher from "./pages/AddTeacher";
import ManageTeachers from "./pages/ManageTeachers";

import AddSubject from "./pages/AddSubject";
import ManageSubjects from "./pages/ManageSubjects";

import AddDepartment from "./pages/AddDepartment";
import ManageDepartments from "./pages/ManageDepartments";

import Reports from "./pages/Reports";

// Teacher
import TeacherLogin from "./pages/TeacherLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import MySubjects from "./pages/MySubjects";
import AddStudent from "./pages/AddStudent";
import ManageStudents from "./pages/ManageStudents";
import AddMarks from "./pages/AddMarks";
import ManageMarks from "./pages/ManageMarks";
import TeacherProfile from "./pages/TeacherProfile";

function App() {

  return (

    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<Home />} />

      {/* ================= ADMIN ================= */}

      <Route path="/admin-login" element={<AdminLogin />} />

      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      <Route path="/add-teacher" element={<AddTeacher />} />

      <Route path="/manage-teachers" element={<ManageTeachers />} />

      <Route path="/add-subject" element={<AddSubject />} />

      <Route path="/manage-subjects" element={<ManageSubjects />} />

      <Route path="/add-department" element={<AddDepartment />} />

      <Route path="/manage-departments" element={<ManageDepartments />} />

      <Route path="/reports" element={<Reports />} />

      {/* ================= TEACHER ================= */}

      <Route path="/teacher-login" element={<TeacherLogin />} />

      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />

      <Route path="/my-subjects" element={<MySubjects />} />

      <Route path="/add-student" element={<AddStudent />} />

      <Route path="/manage-students" element={<ManageStudents />} />

      <Route path="/add-marks" element={<AddMarks />} />

      <Route path="/manage-marks" element={<ManageMarks />} />

      <Route path="/teacher-profile" element={<TeacherProfile />} />

    </Routes>

  );

}

export default App;