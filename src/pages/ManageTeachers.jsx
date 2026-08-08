import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
    getTeachers,
    updateTeacher,
    deleteTeacher
} from "../api/teacherApi";
import { getDepartments } from "../api/departmentApi";
import { getSubjects } from "../api/subjectApi";

function ManageTeachers() {

    const [teachers, setTeachers] = useState([]);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        loadTeachers();
        loadDropdownData();
    }, []);

    async function loadTeachers() {
        try {
            const response = await getTeachers();
            setTeachers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function loadDropdownData() {
        try {
            const [deptRes, subjRes] = await Promise.all([
                getDepartments(),
                getSubjects()
            ]);

            setDepartments(deptRes.data);
            setSubjects(subjRes.data);

        } catch (error) {
            console.log(error);
        }
    }

    const filteredSubjects = editingTeacher
        ? subjects.filter((s) => s.department === editingTeacher.department)
        : [];

    const handleChange = (e) => {

        if (e.target.name === "department") {

            setEditingTeacher({
                ...editingTeacher,
                department: e.target.value,
                subject: "",
                semester: "",
                credit_hour: ""
            });

            return;
        }

        if (e.target.name === "subject") {

            const selectedSubject = subjects.find(
                (s) => s.name === e.target.value
            );

            setEditingTeacher({
                ...editingTeacher,
                subject: e.target.value,
                semester: selectedSubject ? selectedSubject.semester : "",
                credit_hour: selectedSubject ? selectedSubject.credit_hour : ""
            });

            return;
        }

        setEditingTeacher({
            ...editingTeacher,
            [e.target.name]: e.target.value
        });

    };

    async function saveChanges() {

        try {

            await updateTeacher(
                editingTeacher.id,
                {
                    fullname: editingTeacher.fullname,
                    email: editingTeacher.email,
                    phone: editingTeacher.phone,
                    department: editingTeacher.department,
                    subject: editingTeacher.subject,
                    semester: editingTeacher.semester,
                    credit_hour: editingTeacher.credit_hour
                }
            );

            alert("Teacher Updated Successfully");

            setEditingTeacher(null);

            loadTeachers();

        } catch (error) {

            console.log(error);

            alert("Failed to update teacher");

        }

    }

    async function handleDeleteTeacher(id) {

        if (!window.confirm("Delete this teacher?")) {
            return;
        }

        try {

            await deleteTeacher(id);

            alert("Teacher Deleted Successfully");

            loadTeachers();

        } catch (error) {

            console.log(error);

            alert("Failed to delete teacher");

        }

    }

    return (

        <>

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="container mt-4">

                    <div className="card shadow">

                        <div className="card-header bg-success text-white">
                            <h3>Manage Teachers</h3>
                        </div>

                        <div className="card-body">

                            <table className="table table-bordered table-hover">

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Department</th>
                                        <th>Subject</th>
                                        <th>Semester</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {teachers.map((teacher) => (
                                        <tr key={teacher.id}>
                                            <td>{teacher.id}</td>
                                            <td>{teacher.fullname}</td>
                                            <td>{teacher.email}</td>
                                            <td>{teacher.phone}</td>
                                            <td>{teacher.department}</td>
                                            <td>{teacher.subject}</td>
                                            <td>{teacher.semester}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => setEditingTeacher(teacher)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteTeacher(teacher.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>

                    </div>

                    {editingTeacher && (

                        <div className="card shadow mt-4">

                            <div className="card-header bg-primary text-white">
                                <h4>Edit Teacher</h4>
                            </div>

                            <div className="card-body">

                                <div className="mb-3">
                                    <label>Name</label>
                                    <input
                                        className="form-control"
                                        name="fullname"
                                        value={editingTeacher.fullname}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Email</label>
                                    <input
                                        className="form-control"
                                        name="email"
                                        value={editingTeacher.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Phone</label>
                                    <input
                                        className="form-control"
                                        name="phone"
                                        value={editingTeacher.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">

                                    <label>Department</label>

                                    <select
                                        className="form-control"
                                        name="department"
                                        value={editingTeacher.department}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Department</option>

                                        {departments.map((dept) => (
                                            <option key={dept.id} value={dept.name}>
                                                {dept.name}
                                            </option>
                                        ))}

                                    </select>

                                </div>

                                <div className="mb-3">

                                    <label>Subject</label>

                                    <select
                                        className="form-control"
                                        name="subject"
                                        value={editingTeacher.subject || ""}
                                        onChange={handleChange}
                                        disabled={!editingTeacher.department}
                                    >

                                        <option value="">
                                            {editingTeacher.department ? "Select Subject" : "Select Department First"}
                                        </option>

                                        {filteredSubjects.map((s) => (
                                            <option key={s.id} value={s.name}>
                                                {s.name}
                                            </option>
                                        ))}

                                    </select>

                                </div>

                                <div className="mb-3">

                                    <label>Semester</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="semester"
                                        value={editingTeacher.semester || ""}
                                        readOnly
                                    />

                                </div>

                                <button
                                    className="btn btn-success me-2"
                                    onClick={saveChanges}
                                >
                                    Save
                                </button>

                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setEditingTeacher(null)}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </>

    );

}

export default ManageTeachers;