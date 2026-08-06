import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function AddStudent() {

    const [student, setStudent] = useState({
        fullname: "",
        roll: "",
        semester: "",
        department: "",
        email: "",
        phone: ""
    });

    function handleChange(e) {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    }

    function saveStudent(e) {

        e.preventDefault();

        console.log(student);

        alert("Student Added Successfully");

        setStudent({

            fullname: "",
            roll: "",
            semester: "",
            department: "",
            email: "",
            phone: ""

        });

    }

    return (

        <DashboardLayout
            role="teacher"
            title="Add Student"
        >

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h3>Add Student</h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={saveStudent}>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Full Name

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fullname"
                                        value={student.fullname}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Roll Number

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="roll"
                                        value={student.roll}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Semester

                                    </label>

                                    <select
                                        className="form-select"
                                        name="semester"
                                        value={student.semester}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">Select Semester</option>

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

                                    <label className="form-label">

                                        Department

                                    </label>

                                    <select
                                        className="form-select"
                                        name="department"
                                        value={student.department}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">Select Department</option>

                                        <option>BCA</option>
                                        <option>BBA</option>
                                        <option>BHM</option>
                                        <option>BBS</option>

                                    </select>

                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Email

                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={student.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Phone Number

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={student.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-success"
                            >

                                Save Student

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default AddStudent;