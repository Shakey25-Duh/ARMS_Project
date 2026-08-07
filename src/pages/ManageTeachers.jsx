import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getTeachers } from "../api/teacherApi";

function ManageTeachers() {

    const [teachers, setTeachers] = useState([]);

    const [editingTeacher, setEditingTeacher] = useState(null);

    useEffect(() => {
        loadTeachers();
    }, []);

    async function loadTeachers() {

        try {

            const response = await getTeachers();

            setTeachers(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    const handleChange = (e) => {

        setEditingTeacher({

            ...editingTeacher,

            [e.target.name]: e.target.value

        });

    };

    const saveChanges = () => {

        setTeachers(

            teachers.map((teacher) =>

                teacher.id === editingTeacher.id

                    ? editingTeacher

                    : teacher

            )

        );

        alert("Teacher Updated Successfully");

        setEditingTeacher(null);

    };

    const deleteTeacher = (id) => {

        if (window.confirm("Delete this teacher?")) {

            setTeachers(

                teachers.filter((teacher) => teacher.id !== id)

            );

        }

    };

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

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() =>
                                                        setEditingTeacher(teacher)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        deleteTeacher(teacher.id)
                                                    }
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

                                        <option>Computer</option>
                                        <option>BCA</option>
                                        <option>BBA</option>
                                        <option>BHM</option>

                                    </select>

                                </div>

                                <div className="mb-3">

                                    <label>Subject</label>

                                    <select
                                        className="form-control"
                                        name="subject"
                                        value={editingTeacher.subject || ""}
                                        onChange={handleChange}
                                    >

                                        <option value="">
                                            Select Subject
                                        </option>

                                        <option value="Programming Logic & Design">
                                            Programming Logic & Design
                                        </option>

                                        <option value="C Programming">
                                            C Programming
                                        </option>

                                        <option value="Java Programming">
                                            Java Programming
                                        </option>

                                        <option value="Database Management System">
                                            Database Management System
                                        </option>

                                        <option value="Web Technology">
                                            Web Technology
                                        </option>

                                    </select>

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