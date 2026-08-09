import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";

import {
    getMyProfile,
    getMySubjects,
    getMyMarks
} from "../api/studentSelfApi";


function StudentDashboard() {

    const [profile, setProfile] = useState(null);

    const [subjects, setSubjects] = useState([]);

    const [marks, setMarks] = useState([]);


    /* ================= LOAD DATA ================= */

    useEffect(() => {

        loadData();

    }, []);


    async function loadData() {

        try {

            const [
                profileRes,
                subjectsRes,
                marksRes
            ] = await Promise.all([

                getMyProfile(),

                getMySubjects(),

                getMyMarks()

            ]);


            setProfile(profileRes.data);

            setSubjects(subjectsRes.data || []);

            setMarks(marksRes.data || []);


        } catch (error) {

            console.error(
                "Failed to load student dashboard:",
                error
            );

        }

    }


    /* ================= PENDING MARKS ================= */

    const pendingCount = Math.max(
        subjects.length - marks.length,
        0
    );


    return (

        <DashboardLayout
            role="student"
            title="Student Dashboard"
        >

            <div className="container-fluid mt-4">


                {/* ================= WELCOME ================= */}

                <h2 className="mb-4">

                    Welcome,{" "}

                    {profile
                        ? profile.fullname
                        : "..."} 

                </h2>


                {/* ================= DASHBOARD CARDS ================= */}

                <div className="row">


                    {/* ================= MY SUBJECTS ================= */}

                    <DashboardCard
                        title="My Subjects This Semester"
                        value={subjects.length}
                        color="primary"
                        link="/student-subjects"
                    />


                    {/* ================= OBTAIN MARKS ================= */}

                    <DashboardCard
                        title="Obtain Marks"
                        value={marks.length}
                        color="success"
                        link="/student-marks"
                    />


                    {/* ================= OBTAIN MARKS ================= */}

                    <DashboardCard
                        title="Obtain Marks"
                        value={pendingCount}
                        color="warning"
                        link="/student-marks"
                    />


                    {/* ================= RESULT ================= */}

                    <DashboardCard
                        title="Result"
                        value={
                            profile
                                ? profile.semester
                                : "-"
                        }
                        color="danger"
                        link="/student-result"
                    />

                </div>


                {/* ================= SUBJECTS ================= */}

                <div className="card shadow mt-3">


                    <div className="card-header bg-success text-white">

                        <h5 className="mb-0">

                            Semester Information

                        </h5>

                    </div>


                    <div className="card-body">


                        <div className="table-responsive">

                            <table className="table table-bordered table-hover">


                                <thead className="table-light">

                                    <tr>

                                        <th>
                                            Subject
                                        </th>

                                        <th>
                                            Teacher
                                        </th>

                                        <th>
                                            Semester
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>


                                    {subjects.length > 0 ? (

                                        subjects.map(
                                            (s, index) => (

                                                <tr
                                                    key={
                                                        s.id || index
                                                    }
                                                >

                                                    <td>
                                                        {s.subject}
                                                    </td>

                                                    <td>
                                                        {s.fullname}
                                                    </td>

                                                    <td>
                                                        {s.semester}
                                                    </td>

                                                </tr>

                                            )
                                        )

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="3"
                                                className="text-center text-muted"
                                            >

                                                No subjects found.

                                            </td>

                                        </tr>

                                    )}


                                </tbody>


                            </table>

                        </div>


                    </div>

                </div>


            </div>

        </DashboardLayout>

    );

}


export default StudentDashboard;