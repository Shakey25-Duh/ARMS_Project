import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getSubjects, updateSubject, deleteSubject } from "../api/subjectApi";
import { getDepartments } from "../api/departmentApi";

function ManageSubjects() {

    const [subjects, setSubjects] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [editingSubject, setEditingSubject] = useState(null);

    useEffect(() => {
        loadSubjects();
        loadDepartments();
    }, []);

    async function loadSubjects() {
        try {
            const response = await getSubjects();
            setSubjects(response.data);
        } catch (error) {
            console.log(error);
            alert("Failed to load subjects.");
        }
    }

    async function loadDepartments() {
        try {
            const response = await getDepartments();
            setDepartments(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setEditingSubject({
            ...editingSubject,
            [e.target.name]: e.target.value
        });
    };

    async function saveChanges() {
        try {

            await updateSubject(editingSubject.id, {
                code: editingSubject.code,
                name: editingSubject.name,
                semester: editingSubject.semester,
                department: editingSubject.department,
                credit_hour: editingSubject.credit_hour
            });

            alert("Subject Updated Successfully");

            setEditingSubject(null);

            loadSubjects();

        } catch (error) {

            console.log(error);

            alert("Failed to update subject");

        }
    }

    async function handleDeleteSubject(id) {

        if (!window.confirm("Delete this subject?")) {
            return;
        }

        try {

            await deleteSubject(id);

            alert("Subject Deleted Successfully");

            loadSubjects();

        } catch (error) {

            console.log(error);

            alert("Failed to delete subject");

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
                            <h3>Manage Subjects</h3>
                        </div>

                        <div className="card-body">

                            <table className="table table-bordered table-hover">

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Department</th>
                                        <th>Semester</th>
                                        <th>Credit Hour</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {subjects.map((subject) => (
                                        <tr key={subject.id}>
                                            <td>{subject.id}</td>
                                            <td>{subject.code}</td>
                                            <td>{subject.name}</td>
                                            <td>{subject.department}</td>
                                            <td>{subject.semester}</td>
                                            <td>{subject.credit_hour}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => setEditingSubject(subject)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteSubject(subject.id)}
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

                    {editingSubject && (

                        <div className="card shadow mt-4">

                            <div className="card-header bg-primary text-white">
                                <h4>Edit Subject</h4>
                            </div>

                            <div className="card-body">

                                <div className="mb-3">
                                    <label className="form-label">Subject Code</label>
                                    <input
                                        className="form-control"
                                        name="code"
                                        value={editingSubject.code}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Subject Name</label>
                                    <input
                                        className="form-control"
                                        name="name"
                                        value={editingSubject.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">

                                    <label className="form-label">Department</label>

                                    <select
                                        className="form-control"
                                        name="department"
                                        value={editingSubject.department}
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

                                    <label className="form-label">Semester</label>

                                    <select
                                        className="form-control"
                                        name="semester"
                                        value={editingSubject.semester}
                                        onChange={handleChange}
                                    >
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

                                <div className="mb-3">
                                    <label className="form-label">Credit Hour</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="credit_hour"
                                        value={editingSubject.credit_hour}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button className="btn btn-success me-2" onClick={saveChanges}>
                                    Save
                                </button>

                                <button className="btn btn-secondary" onClick={() => setEditingSubject(null)}>
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

export default ManageSubjects;