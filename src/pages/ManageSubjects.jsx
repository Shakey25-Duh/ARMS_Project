import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getSubjects } from "../api/subjectApi";

function ManageSubjects() {

    const [subjects, setSubjects] = useState([]);

    const [editingSubject, setEditingSubject] = useState(null);

    useEffect(() => {
        loadSubjects();
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

    const handleChange = (e) => {

        setEditingSubject({

            ...editingSubject,

            [e.target.name]: e.target.value

        });

    };

    const saveChanges = () => {

        setSubjects(

            subjects.map((subject) =>

                subject.id === editingSubject.id
                    ? editingSubject
                    : subject

            )

        );

        alert("Subject Updated Successfully ✅");

        setEditingSubject(null);

    };

    const deleteSubject = (id) => {

        if (window.confirm("Delete this subject?")) {

            setSubjects(

                subjects.filter((subject) => subject.id !== id)

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

                            <h3>Manage Subjects</h3>

                        </div>

                        <div className="card-body">

                            <table className="table table-bordered table-hover">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Subject Code</th>

                                        <th>Subject Name</th>

                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        subjects.map((subject) => (

                                            <tr key={subject.id}>

                                                <td>{subject.id}</td>

                                                <td>{subject.code}</td>

                                                <td>{subject.name}</td>

                                                <td>

                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
                                                        onClick={() =>
                                                            setEditingSubject(subject)
                                                        }
                                                    >

                                                        Edit

                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            deleteSubject(subject.id)
                                                        }
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

                        editingSubject && (

                            <div className="card shadow mt-4">

                                <div className="card-header bg-primary text-white">

                                    <h4>Edit Subject</h4>

                                </div>

                                <div className="card-body">

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Subject Code

                                        </label>

                                        <input
                                            className="form-control"
                                            name="code"
                                            value={editingSubject.code}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Subject Name

                                        </label>

                                        <input
                                            className="form-control"
                                            name="name"
                                            value={editingSubject.name}
                                            onChange={handleChange}
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
                                        onClick={() =>
                                            setEditingSubject(null)
                                        }
                                    >

                                        Cancel

                                    </button>

                                </div>

                            </div>

                        )

                    }

                </div>

            </div>

        </>

    );

}

export default ManageSubjects;