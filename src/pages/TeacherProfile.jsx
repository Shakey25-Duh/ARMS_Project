import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getMyTeacherProfile } from "../api/teacherSelfApi";

function TeacherProfile() {

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

    if (!teacher) {
        return (
            <DashboardLayout role="teacher" title="Teacher Profile">
                <div className="container mt-4">Loading...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            role="teacher"
            title="Teacher Profile"
        >
            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h3>Teacher Profile</h3>

                    </div>

                    <div className="card-body text-center">

                        <h4>{teacher.fullname}</h4>

                        <p><strong>Email:</strong> {teacher.email}</p>

                        <p><strong>Phone:</strong> {teacher.phone}</p>

                        <p><strong>Department:</strong> {teacher.department}</p>

                        <p><strong>Subject:</strong> {teacher.subject}</p>

                        <p><strong>Semester:</strong> {teacher.semester}</p>


                    </div>

                </div>

            </div>
        </DashboardLayout>
    );
}

export default TeacherProfile;