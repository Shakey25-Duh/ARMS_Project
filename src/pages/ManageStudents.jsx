import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
    getStudents,
    updateStudent,
    deleteStudent
} from "../api/studentApi";

function ManageStudents() {

    const [students, setStudents] = useState([]);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadStudents();
    }, []);

    async function loadStudents() {
        try {
            const response = await getStudents();
            setStudents(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleChange(e) {
        setEditing({
            ...editing,
            [e.target.name]: e.target.value
        });
    }

    async function saveStudent() {
        try {

            await updateStudent(editing.id, {
                fullname: editing.fullname,
                roll_no: editing.roll_no,
                registration_no: editing.registration_no,
                email: editing.email,
                phone: editing.phone,
                gender: editing.gender,
                dob: editing.dob,
                semester: editing.semester,
                section: editing.section,
                batch: editing.batch,
                department: editing.department,
                address: editing.address,
                guardian: editing.guardian,
                guardian_phone: editing.guardian_phone
            });

            alert("Student Updated Successfully");

            setEditing(null);

            loadStudents();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.detail ||
                "Failed to update student"
            );

        }
    }

    async function handleDeleteStudent(id) {

        if (!window.confirm("Delete this student?")) {
            return;
        }

        try {

            await deleteStudent(id);

            alert("Student Deleted Successfully");

            loadStudents();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.detail ||
                "Failed to delete student"
            );

        }
    }

    const filteredStudents = students.filter(student =>
        student.fullname.toLowerCase().includes(search.toLowerCase()) ||
        student.roll_no.toLowerCase().includes(search.toLowerCase()) ||
        student.registration_no.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <DashboardLayout role="teacher" title="Manage Students">

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-success text-white">
                        <h3>Manage Students</h3>
                    </div>

                    <div className="card-body">

                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Search by Name, Roll or Registration Number"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <div className="table-responsive">

                            <table className="table table-bordered table-hover">

                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Roll</th>
                                        <th>Registration</th>
                                        <th>Semester</th>
                                        <th>Section</th>
                                        <th>Batch</th>
                                        <th>Department</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredStudents.map(student => (
                                        <tr key={student.id}>
                                            <td>{student.id}</td>
                                            <td>{student.fullname}</td>
                                            <td>{student.roll_no}</td>
                                            <td>{student.registration_no}</td>
                                            <td>{student.semester}</td>
                                            <td>{student.section}</td>
                                            <td>{student.batch}</td>
                                            <td>{student.department}</td>
                                            <td>{student.email}</td>
                                            <td>{student.phone}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => setEditing(student)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteStudent(student.id)}
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

                </div>

                {editing && (

                    <div className="card shadow mt-4">

                        <div className="card-header bg-primary text-white">
                            <h4>Edit Student</h4>
                        </div>

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label>Full Name</label>
                                    <input className="form-control" name="fullname" value={editing.fullname} onChange={handleChange} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Roll Number</label>
                                    <input className="form-control" name="roll_no" value={editing.roll_no} onChange={handleChange} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Registration Number</label>
                                    <input className="form-control" name="registration_no" value={editing.registration_no} onChange={handleChange} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Gender</label>
                                    <select className="form-control" name="gender" value={editing.gender} onChange={handleChange}>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Date of Birth</label>
                                    <input type="date" className="form-control" name="dob" value={editing.dob} onChange={handleChange} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Semester</label>
                                    <select className="form-control" name="semester" value={editing.semester} onChange={handleChange}>
                                        <option>1st</option>
                                        <option>2nd</option>
                                        <option>3rd</option>
                                        <option>4th</option>
                                        <option>5th</option>
                                        <option>6th</option>
                                        <option>7th</option>
                                        <option>8th</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Section</label>
                                    <input className="form-control" name="section" value={editing.section} onChange={handleChange} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Batch</label>
                                    <input className="form-control" name="batch" value={editing.batch} onChange={handleChange} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Department</label>
                                    <select className="form-control" name="department" value={editing.department} onChange={handleChange}>
                                        <option>BCA</option>
                                        <option>BBA</option>
                                        <option>BHM</option>
                                        <option>BIT</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Email</label>
                                    <input className="form-control" name="email" value={editing.email} onChange={handleChange} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Phone Number</label>
                                    <input className="form-control" name="phone" value={editing.phone} onChange={handleChange} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Address</label>
                                    <input className="form-control" name="address" value={editing.address} onChange={handleChange} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Guardian Name</label>
                                    <input className="form-control" name="guardian" value={editing.guardian} onChange={handleChange} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Guardian Contact</label>
                                    <input className="form-control" name="guardian_phone" value={editing.guardian_phone} onChange={handleChange} />
                                </div>

                            </div>

                            <button className="btn btn-success me-2" onClick={saveStudent}>
                                Save Changes
                            </button>

                            <button className="btn btn-secondary" onClick={() => setEditing(null)}>
                                Cancel
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </DashboardLayout>

    );
}

export default ManageStudents;