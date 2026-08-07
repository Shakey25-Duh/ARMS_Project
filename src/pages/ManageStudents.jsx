import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function ManageStudents() {

    const [students, setStudents] = useState([

        {
            id: 1,
            fullname: "Hari Sharma",
            roll: "BCA001",
            registration: "PU-2024-001",
            gender: "Male",
            dob: "2004-05-12",
            semester: "1st Semester",
            section: "A",
            batch: "2024",
            department: "BCA",
            email: "hari@gmail.com",
            phone: "9800000001",
            address: "Pokhara",
            guardian: "Ramesh Sharma",
            guardianContact: "9811111111"
        },

        {
            id: 2,
            fullname: "Ram Karki",
            roll: "BCA002",
            registration: "PU-2024-002",
            gender: "Male",
            dob: "2004-07-18",
            semester: "2nd Semester",
            section: "A",
            batch: "2024",
            department: "BCA",
            email: "ram@gmail.com",
            phone: "9800000002",
            address: "Kathmandu",
            guardian: "Hari Karki",
            guardianContact: "9822222222"
        },

        {
            id: 3,
            fullname: "Sita Nepal",
            roll: "BCA003",
            registration: "PU-2024-003",
            gender: "Female",
            dob: "2003-10-20",
            semester: "3rd Semester",
            section: "B",
            batch: "2023",
            department: "BCA",
            email: "sita@gmail.com",
            phone: "9800000003",
            address: "Butwal",
            guardian: "Gita Nepal",
            guardianContact: "9833333333"
        }

    ]);

    const [editing, setEditing] = useState(null);

    const [search, setSearch] = useState("");

    function handleChange(e) {

        setEditing({

            ...editing,

            [e.target.name]: e.target.value

        });

    }

    function saveStudent() {

        setStudents(

            students.map(student =>

                student.id === editing.id

                    ? editing

                    : student

            )

        );

        alert("Student Updated Successfully");

        setEditing(null);

    }

    function deleteStudent(id) {

        if (window.confirm("Delete this student?")) {

            setStudents(

                students.filter(student => student.id !== id)

            );

        }

    }

    const filteredStudents = students.filter(student =>

        student.fullname.toLowerCase().includes(search.toLowerCase()) ||

        student.roll.toLowerCase().includes(search.toLowerCase()) ||

        student.registration.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <DashboardLayout
            role="teacher"
            title="Manage Students"
        >

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

                                    {

                                        filteredStudents.map(student => (

                                            <tr key={student.id}>

                                                <td>{student.id}</td>

                                                <td>{student.fullname}</td>

                                                <td>{student.roll}</td>

                                                <td>{student.registration}</td>

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

                                                        onClick={() => deleteStudent(student.id)}

                                                    >

                                                        Delete

                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    }

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

                                <input
                                    className="form-control"
                                    name="fullname"
                                    value={editing.fullname}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Roll Number</label>

                                <input
                                    className="form-control"
                                    name="roll"
                                    value={editing.roll}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Registration Number</label>

                                <input
                                    className="form-control"
                                    name="registration"
                                    value={editing.registration}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Gender</label>

                                <select
                                    className="form-control"
                                    name="gender"
                                    value={editing.gender}
                                    onChange={handleChange}
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Date of Birth</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="dob"
                                    value={editing.dob}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Semester</label>

                                <select
                                    className="form-control"
                                    name="semester"
                                    value={editing.semester}
                                    onChange={handleChange}
                                >
                                    <option>1st Semester</option>
                                    <option>2nd Semester</option>
                                    <option>3rd Semester</option>
                                    <option>4th Semester</option>
                                    <option>5th Semester</option>
                                    <option>6th Semester</option>
                                    <option>7th Semester</option>
                                    <option>8th Semester</option>
                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Section</label>

                                <select
                                    className="form-control"
                                    name="section"
                                    value={editing.section}
                                    onChange={handleChange}
                                >
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Batch</label>

                                <input
                                    className="form-control"
                                    name="batch"
                                    value={editing.batch}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Department</label>

                                <select
                                    className="form-control"
                                    name="department"
                                    value={editing.department}
                                    onChange={handleChange}
                                >
                                    <option>BCA</option>
                                    <option>BBA</option>
                                    <option>BHM</option>
                                    <option>BIT</option>
                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Email</label>

                                <input
                                    className="form-control"
                                    name="email"
                                    value={editing.email}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Phone Number</label>

                                <input
                                    className="form-control"
                                    name="phone"
                                    value={editing.phone}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Address</label>

                                <input
                                    className="form-control"
                                    name="address"
                                    value={editing.address}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Guardian Name</label>

                                <input
                                    className="form-control"
                                    name="guardian"
                                    value={editing.guardian}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Guardian Contact</label>

                                <input
                                    className="form-control"
                                    name="guardianContact"
                                    value={editing.guardianContact}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <button
                            className="btn btn-success me-2"
                            onClick={saveStudent}
                        >
                            Save Changes
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={() => setEditing(null)}
                        >
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