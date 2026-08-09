import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { getTeachers } from "../api/teacherApi";
import { getSubjects } from "../api/subjectApi";
import { getDepartments } from "../api/departmentApi";
import { getAllStudents, getAllMarks } from "../api/adminApi";

function AdminDashboard() {
  const [counts, setCounts] = useState({
    teachers: 0,
    subjects: 0,
    departments: 0,
    students: 0,
    published: 0,
    pending: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [teachersRes, subjectsRes, departmentsRes, studentsRes, marksRes] =
        await Promise.all([
          getTeachers(),
          getSubjects(),
          getDepartments(),
          getAllStudents(),
          getAllMarks(),
        ]);

      const totalStudents = studentsRes.data.length;
      const totalMarks = marksRes.data.length;

      const studentsWithMarks = new Set(marksRes.data.map((m) => m.student_id))
        .size;

      setCounts({
        teachers: teachersRes.data.length,
        subjects: subjectsRes.data.length,
        departments: departmentsRes.data.length,
        students: totalStudents,
        published: totalMarks,
        pending: totalStudents - studentsWithMarks,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DashboardLayout role="admin" title="Admin Dashboard">
      <div className="container-fluid mt-4">
        <h2 className="mb-4">Welcome, Admin!</h2>

        <div className="row">
          <div className="col-md-4 mb-4">
            <Link to="/manage-teachers" className="text-decoration-none">
              <div className="card shadow top-card bg-primary text-white">
                <div className="card-body text-center">
                  <h5>Total Teachers</h5>
                  <h1>{counts.teachers}</h1>
                  <small>Click to View</small>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4 mb-4">
            <Link to="/manage-subjects" className="text-decoration-none">
              <div className="card shadow top-card bg-success text-white">
                <div className="card-body text-center">
                  <h5>Total Subjects</h5>
                  <h1>{counts.subjects}</h1>
                  <small>Click to View</small>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4 mb-4">
            <Link to="/manage-departments" className="text-decoration-none">
              <div className="card shadow top-card bg-warning">
                <div className="card-body text-center">
                  <h5>Departments</h5>
                  <h1>{counts.departments}</h1>
                  <small>Click to View</small>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow top-card bg-info text-white">
              <div className="card-body text-center">
                <h5>Total Students</h5>
                <h1>{counts.students}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow top-card bg-danger text-white">
              <div className="card-body text-center">
                <h5>Students Pending Marks</h5>
                <h1>{counts.pending > 0 ? counts.pending : 0}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow top-card bg-dark text-white">
              <div className="card-body text-center">
                <h5>Marks Submitted</h5>
                <h1>{counts.published}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
