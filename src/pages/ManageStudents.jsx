import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function ManageStudents() {

    const [students, setStudents] = useState([

        {
            id: 1,
            fullname: "Hari Sharma",
            roll: "BCA001",
            semester: "1st Semester",
            department: "BCA",
            email: "hari@gmail.com",
            phone: "9800000001"
        },

        {
            id: 2,
            fullname: "Ram Karki",
            roll: "BCA002",
            semester: "2nd Semester",
            department: "BCA",
            email: "ram@gmail.com",
            phone: "9800000002"
        },

        {
            id: 3,
            fullname: "Sita Nepal",
            roll: "BCA003",
            semester: "3rd Semester",
            department: "BCA",
            email: "sita@gmail.com",
            phone: "9800000003"
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

                student.id === editing.id ? editing : student

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

        student.roll.toLowerCase().includes(search.toLowerCase())

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

                            placeholder="Search by Name or Roll Number"

                            value={search}

                            onChange={(e) => setSearch(e.target.value)}

                        />

                        <table className="table table-bordered table-hover">

                            <thead className="table-dark">

                                <tr>

                                    <th>ID</th>

                                    <th>Name</th>

                                    <th>Roll</th>

                                    <th>Semester</th>

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

                                            <td>{student.semester}</td>

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

                {

                    editing &&

                    <div className="card shadow mt-4">

                        <div className="card-header bg-primary text-white">

                            <h4>Edit Student</h4>

                        </div>

                        <div className="card-body">

                            <input

                                className="form-control mb-3"

                                name="fullname"

                                value={editing.fullname}

                                onChange={handleChange}

                            />

                            <input

                                className="form-control mb-3"

                                name="roll"

                                value={editing.roll}

                                onChange={handleChange}

                            />

                            <input

                                className="form-control mb-3"

                                name="semester"

                                value={editing.semester}

                                onChange={handleChange}

                            />

                            <input

                                className="form-control mb-3"

                                name="department"

                                value={editing.department}

                                onChange={handleChange}

                            />

                            <input

                                className="form-control mb-3"

                                name="email"

                                value={editing.email}

                                onChange={handleChange}

                            />

                            <input

                                className="form-control mb-3"

                                name="phone"

                                value={editing.phone}

                                onChange={handleChange}

                            />

                            <button

                                className="btn btn-success me-2"

                                onClick={saveStudent}

                            >

                                Save

                            </button>

                            <button

                                className="btn btn-secondary"

                                onClick={() => setEditing(null)}

                            >

                                Cancel

                            </button>

                        </div>

                    </div>

                }

            </div>

        </DashboardLayout>

    );

}

export default ManageStudents;