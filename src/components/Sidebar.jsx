import { Link } from "react-router-dom";

function Sidebar({ role = "admin" }) {

    return (

        <div className="sidebar">

            <h3 className="text-center mb-4">

                {
                    role === "admin"
                        ? "ARMS Admin"
                        : role === "teacher"
                            ? "ARMS Teacher"
                            : "ARMS Student"
                }

            </h3>

            {/* ================= ADMIN ================= */}

            {
                role === "admin" && (

                    <>

                        <Link to="/admin-dashboard">
                            🏠 Dashboard
                        </Link>

                        <hr />

                        <h6>Teacher</h6>

                        <Link to="/add-teacher">
                            ➕ Add Teacher
                        </Link>

                        <Link to="/manage-teachers">
                            👨‍🏫 Manage Teachers
                        </Link>

                        <hr />

                        <h6>Subject</h6>

                        <Link to="/add-subject">
                            📘 Add Subject
                        </Link>

                        <Link to="/manage-subjects">
                            📚 Manage Subjects
                        </Link>

                        <hr />

                        <h6>Department</h6>

                        <Link to="/add-department">
                            🏢 Add Department
                        </Link>

                        <Link to="/manage-departments">
                            🏫 Manage Departments
                        </Link>

                        <hr />

                        <Link to="/reports">
                            📊 Reports
                        </Link>

                    </>

                )
            }

            {/* ================= TEACHER ================= */}

            {
                role === "teacher" && (

                    <>

                        <Link to="/teacher-dashboard">
                            🏠 Dashboard
                        </Link>

                        <hr />

                        <h6>Subjects</h6>

                        <Link to="/my-subjects">
                            📚 My Subjects
                        </Link>

                        <hr />

                        <h6>Students</h6>

                        <Link to="/add-student">
                            ➕ Add Student
                        </Link>

                        <Link to="/manage-students">
                            👨‍🎓 Manage Students
                        </Link>

                        <hr />

                        <h6>Marks</h6>

                        <Link to="/add-marks">
                            📝 Add Marks
                        </Link>

                        <Link to="/manage-marks">
                            📑 Manage Marks
                        </Link>

                        <hr />

                        <h6>Profile</h6>

                        <Link to="/teacher-profile">
                            👤 My Profile
                        </Link>

                    </>

                )
            }

            {/* ================= STUDENT ================= */}

            {
                role === "student" && (

                    <>

                        <Link to="/student-dashboard">
                            🏠 Dashboard
                        </Link>

                        <hr />

                        <Link to="/student-profile">
                            👤 My Profile
                        </Link>

                        <hr />

                        <Link to="/student-subjects">
                            📚 My Subjects
                        </Link>

                        <hr />

                        <Link to="/student-marks">
                            📝 My Marks
                        </Link>

                        <hr />

                        <Link to="/student-result">
                            📊 Result
                        </Link>

                        <hr />

                       

                    </>

                )
            }

        </div>

    );

}

export default Sidebar;