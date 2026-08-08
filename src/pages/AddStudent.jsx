import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { addStudent } from "../api/studentApi";

function AddStudent() {

    const [student, setStudent] = useState({
        fullname: "",
        roll_no: "",
        registration_no: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        semester: "",
        section: "",
        batch: "",
        department: "",
        address: "",
        guardian: "",
        guardian_phone: "",
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const saveStudent = async (e) => {
        e.preventDefault();

        try {

            await addStudent(student);

            alert("Student Added Successfully");

            setStudent({
                fullname: "",
                roll_no: "",
                registration_no: "",
                email: "",
                phone: "",
                gender: "",
                dob: "",
                semester: "",
                section: "",
                batch: "",
                department: "",
                address: "",
                guardian: "",
                guardian_phone: "",
                username: "",
                password: ""
            });

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Failed to Add Student!"
            );

        }
    };

    return (
        <>
            <Sidebar role="teacher" />

            <div className="main">

                <Navbar title="Add Student" />

                <div className="container mt-4">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">
                            <h3>Add Student</h3>
                        </div>

                        <div className="card-body">

                            <form onSubmit={saveStudent}>

                                <div className="row">

                                    <div className="col-md-6 mb-3">
                                        <label>Full Name</label>
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
                                        <label>Roll Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="roll_no"
                                            value={student.roll_no}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Registration Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="registration_no"
                                            value={student.registration_no}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Email</label>
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
                                        <label>Phone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={student.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Gender</label>

                                        <select
                                            className="form-select"
                                            name="gender"
                                            value={student.gender}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Gender</option>
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
                                            value={student.dob}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label>Semester</label>

                                        <select
                                            className="form-select"
                                            name="semester"
                                            value={student.semester}
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

                                    <div className="col-md-6 mb-3">
                                        <label>Section</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="section"
                                            value={student.section}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Batch</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="batch"
                                            placeholder="2023"
                                            value={student.batch}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Department</label>
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
                                            <option>BIT</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Guardian Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="guardian"
                                            value={student.guardian}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Guardian Contact</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="guardian_phone"
                                            value={student.guardian_phone}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label>Address</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            name="address"
                                            value={student.address}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <hr className="mt-2 mb-3" />

                                    <div className="col-md-6 mb-3">
                                        <label>Login Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={student.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Login Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={student.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save Student
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default AddStudent;