import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getMyTeacherProfile } from "../api/teacherSelfApi";

function MySubjects() {

    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            const response = await getMyTeacherProfile();
            setTeacher(response.data);
        } catch (error) {
            console.log(error);
        }
    }

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

                                    <th>Semester</th>
                                    <th>Subject Name</th>
                                    <th>Department</th>
                                    <th>Credit Hour</th>

                                </tr>

                            </thead>

                            <tbody>

                                {teacher && (

                                    <tr>

                                        <td>{teacher.semester}</td>
                                        <td>{teacher.subject}</td>
                                        <td>{teacher.department}</td>
                                        <td>{teacher.credit_hour}</td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default MySubjects;