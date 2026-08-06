import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function MySubjects() {

    const [subjects] = useState([

        {
            id: 1,
            semester: "1st Semester",
            code: "BCA101",
            subject: "Programming Logic & Design",
            department: "BCA"
        },

        {
            id: 2,
            semester: "2nd Semester",
            code: "BCA201",
            subject: "C Programming",
            department: "BCA"
        },

        {
            id: 3,
            semester: "3rd Semester",
            code: "BCA301",
            subject: "Java Programming",
            department: "BCA"
        },

        {
            id: 4,
            semester: "4th Semester",
            code: "BCA401",
            subject: "Database Management System",
            department: "BCA"
        }

    ]);

    return (

        <DashboardLayout
            role="teacher"
            title="My Subjects"
        >

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h3>My Assigned Subjects</h3>

                    </div>

                    <div className="card-body">

                        <table className="table table-bordered table-hover">

                            <thead className="table-dark">

                                <tr>

                                    <th>ID</th>
                                    <th>Semester</th>
                                    <th>Subject Code</th>
                                    <th>Subject Name</th>
                                    <th>Department</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    subjects.map(subject => (

                                        <tr key={subject.id}>

                                            <td>{subject.id}</td>
                                            <td>{subject.semester}</td>
                                            <td>{subject.code}</td>
                                            <td>{subject.subject}</td>
                                            <td>{subject.department}</td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default MySubjects;