import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { addSubject } from "../api/subjectApi";

function AddSubject() {

    const [subject, setSubject] = useState({
        code: "",
        name: ""
    });

    function handleChange(e) {

        setSubject({
            ...subject,
            [e.target.name]: e.target.value
        });

    }

    async function saveSubject(e) {

        e.preventDefault();

        try {

            await addSubject(subject);

            alert("Subject Added Successfully ✅");

            setSubject({
                code: "",
                name: ""
            });

        } catch (error) {

            console.error(error);

            alert("Failed to Add Subject ❌");

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

                            <h3>Add Subject</h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={saveSubject}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Subject Code
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="code"
                                        value={subject.code}
                                        onChange={handleChange}
                                        placeholder="BCA401"
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Subject Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={subject.name}
                                        onChange={handleChange}
                                        placeholder="Database Management System"
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Save Subject
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default AddSubject;