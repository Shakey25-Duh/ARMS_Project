import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { addTeacher } from "../api/teacherApi";
import { getDepartments } from "../api/departmentApi";
import { getSubjects } from "../api/subjectApi";

function AddTeacher() {

    const [teacher, setTeacher] = useState({
        fullname: "",
        email: "",
        phone: "",
        department: "",
        subject: "",
        semester: "",
        credit_hour: "",
        username: "",
        password: ""
    });

    const [departments, setDepartments] = useState([]);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        loadDropdownData();
    }, []);

    async function loadDropdownData() {
        try {
            const [deptRes, subjRes] = await Promise.all([
                getDepartments(),
                getSubjects()
            ]);

            setDepartments(deptRes.data);
            setSubjects(subjRes.data);

        } catch (error) {
            console.log(error);
        }
    }

    const filteredSubjects = subjects.filter(
        (s) => s.department === teacher.department
    );

    function handleChange(e) {

        if (e.target.name === "department") {

            setTeacher({
                ...teacher,
                department: e.target.value,
                subject: "",
                semester: "",
            });

            return;
        }

        if (e.target.name === "subject") {

            const selectedSubject = subjects.find(
                (s) => s.name === e.target.value
            );

            setTeacher({
                ...teacher,
                subject: e.target.value,
                semester: selectedSubject ? selectedSubject.semester : "",
                credit_hour: selectedSubject ? selectedSubject.credit_hour : ""
            });

            return;
        }

        setTeacher({
            ...teacher,
            [e.target.name]: e.target.value
        });

    }

    async function saveTeacher(e) {

        e.preventDefault();

        try {

            await addTeacher(teacher);

            alert("Teacher Added Successfully");

            setTeacher({
                fullname: "",
                email: "",
                phone: "",
                department: "",
                subject: "",
                semester: "",
                username: "",
                password: ""
            });

        } catch (error) {

            console.error(error);

            alert("Failed to Add Teacher");

        }

    }

    return (

        <>

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="container mt-4">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <h3>Add Teacher</h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={saveTeacher}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fullname"
                                        value={teacher.fullname}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={teacher.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={teacher.phone}
                                        onChange={handleChange}
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
                                        value={teacher.department}
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
                                        Subject
                                    </label>

                                    <select
                                        className="form-control"
                                        name="subject"
                                        value={teacher.subject}
                                        onChange={handleChange}
                                        required
                                        disabled={!teacher.department}
                                    >

                                        <option value="">
                                            {teacher.department ? "Select Subject" : "Select Department First"}
                                        </option>

                                        {filteredSubjects.map((s) => (
                                            <option key={s.id} value={s.name}>
                                                {s.name}
                                            </option>
                                        ))}

                                    </select>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Semester
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="semester"
                                        value={teacher.semester}
                                        readOnly
                                    />

                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Login Username
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={teacher.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Login Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={teacher.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Save Teacher
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default AddTeacher;