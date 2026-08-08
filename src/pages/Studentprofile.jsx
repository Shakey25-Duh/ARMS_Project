import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getMyProfile } from "../api/studentSelfApi";

function StudentProfile() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            const response = await getMyProfile();
            setProfile(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    if (!profile) {
        return (
            <DashboardLayout role="student" title="My Profile">
                <div className="container mt-4">Loading...</div>
            </DashboardLayout>
        );
    }

    return (

        <DashboardLayout role="student" title="My Profile">

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">
                        <h3>My Profile</h3>
                    </div>

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <strong>Full Name:</strong> {profile.fullname}
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Roll Number:</strong> {profile.roll_no}
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Registration Number:</strong> {profile.registration_no}
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Gender:</strong> {profile.gender}
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Date of Birth:</strong> {profile.dob}
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Semester:</strong> {profile.semester}
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Section:</strong> {profile.section}
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Batch:</strong> {profile.batch}
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Department:</strong> {profile.department}
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Email:</strong> {profile.email}
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Phone:</strong> {profile.phone}
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Address:</strong> {profile.address}
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Guardian Name:</strong> {profile.guardian}
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Guardian Contact:</strong> {profile.guardian_phone}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );
}

export default StudentProfile;