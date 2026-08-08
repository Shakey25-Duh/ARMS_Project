import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
    getDepartments,
    updateDepartment,
    deleteDepartment
} from "../api/departmentApi";

function ManageDepartments() {

    const [departments, setDepartments] = useState([]);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        loadDepartments();
    }, []);

    async function loadDepartments() {
        try {
            const response = await getDepartments();
            setDepartments(response.data);
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

    async function save() {
        try {

            await updateDepartment(editing.id, {
                name: editing.name,
                faculty: editing.faculty
            });

            alert("Department Updated Successfully");

            setEditing(null);

            loadDepartments();

        } catch (error) {

            console.log(error);

            alert("Failed to update department");

        }
    }

    async function remove(id) {

        if (!window.confirm("Delete this department?")) {
            return;
        }

        try {

            await deleteDepartment(id);

            alert("Department Deleted Successfully");

            loadDepartments();

        } catch (error) {

            console.log(error);

            alert("Failed to delete department");

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
                            <h3>Manage Departments</h3>
                        </div>

                        <div className="card-body">

                            <table className="table table-bordered table-hover">

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Department Name</th>
                                        <th>Faculty</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {departments.map((dep) => (
                                        <tr key={dep.id}>
                                            <td>{dep.id}</td>
                                            <td>{dep.name}</td>
                                            <td>{dep.faculty}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => setEditing(dep)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => remove(dep.id)}
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

                    {editing && (

                        <div className="card shadow mt-4">

                            <div className="card-header bg-primary text-white">
                                <h4>Edit Department</h4>
                            </div>

                            <div className="card-body">

                                <div className="mb-3">
                                    <label>Department Name</label>
                                    <input
                                        className="form-control"
                                        name="name"
                                        value={editing.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Faculty</label>
                                    <select
                                        className="form-control"
                                        name="faculty"
                                        value={editing.faculty}
                                        onChange={handleChange}
                                    >
                                        <option>Management</option>
                                        <option>Science & Technology</option>
                                        <option>Humanities</option>
                                        <option>Education</option>
                                    </select>
                                </div>

                                <button className="btn btn-success me-2" onClick={save}>
                                    Save
                                </button>

                                <button className="btn btn-secondary" onClick={() => setEditing(null)}>
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

export default ManageDepartments;