import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { addSubject } from "../api/subjectApi";
import { getDepartments } from "../api/departmentApi";

function AddSubject() {

    const [subject, setSubject] = useState({
    code: "",
    name: "",
    semester: "",
    department: "",
    credit_hour: ""
});

    const [departments, setDepartments] = useState([]);

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

        setSubject({
            ...subject,
            [e.target.name]: e.target.value
        });

    }

    async function saveSubject(e) {

        e.preventDefault();

        try {

            await addSubject(subject);

            alert("Subject Added Successfully");
setSubject({
    code: "",
    name: "",
    semester: "",
    department: "",
    credit_hour: ""
});

        } catch (error) {

            console.error(error);

            alert("Failed to Add Subject");

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

                                <div className="mb-3">

                                    <label className="form-label">
                                        Department
                                    </label>

                                    <select
                                        className="form-control"
                                        name="department"
                                        value={subject.department}
                                        onChange={handleChange}
                                        required
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

                                    <label className="form-label">
                                        Semester
                                    </label>

                                    <select
                                        className="form-control"
                                        name="semester"
                                        value={subject.semester}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Semester</option>
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
        value={subject.credit_hour}
        onChange={handleChange}
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