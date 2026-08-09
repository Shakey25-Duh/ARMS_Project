import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import { getMyTeacherProfile } from "../api/teacherSelfApi";
import { getGradableStudents, getMyMarks } from "../api/marksApi";

function TeacherDashboard() {

    const [teacher, setTeacher] = useState(null);

    const [totalStudents, setTotalStudents] = useState(0);

    const [marksSubmitted, setMarksSubmitted] = useState(0);


    useEffect(() => {

        loadData();

    }, []);


    async function loadData() {

        try {

            const [
                teacherRes,
                studentsRes,
                marksRes
            ] = await Promise.all([

                getMyTeacherProfile(),

                getGradableStudents(),

                getMyMarks()

            ]);


            setTeacher(teacherRes.data);

            setTotalStudents(
                studentsRes.data.length
            );

            setMarksSubmitted(
                marksRes.data.length
            );


        } catch (error) {

            console.log(error);

        }

    }


    const pendingMarks =
        totalStudents - marksSubmitted;


    return (

        <DashboardLayout
            role="teacher"
            title="Teacher Dashboard"
        >

            <div className="container-fluid mt-4">


                {/* Welcome */}

                <h2 className="mb-4">

                    Welcome,{" "}

                    {teacher
                        ? teacher.fullname
                        : "..."} !

                </h2>


                {/* ================= DASHBOARD CARDS ================= */}

                <div className="row">


                    {/* Total Students */}

                    <DashboardCard
                        title="Total Students"
                        value={totalStudents}
                        color="primary"
                        link="/manage-students"
                    />


                    {/* Marks Submitted */}

                    <DashboardCard
                        title="Marks Submitted"
                        value={marksSubmitted}
                        color="success"
                        link="/manage-marks"
                    />


                    {/* Pending Marks */}

                    <DashboardCard
                        title="Pending Marks"
                        value={
                            pendingMarks > 0
                                ? pendingMarks
                                : 0
                        }
                        color="danger"
                        link="/manage-marks"
                    />



                </div>


                {/* ================= MY SUBJECT ================= */}

                <div className="card shadow mt-3">


                    <div className="card-header bg-success text-white">

                        <h5 className="mb-0">

                            My Subject

                        </h5>

                    </div>


                    <div className="card-body">


                        <div className="table-responsive">

                            <table className="table table-bordered table-hover">


                                <thead className="table-light">

                                    <tr>

                                        <th>
                                            Semester
                                        </th>

                                        <th>
                                            Subject Name
                                        </th>

                                        <th>
                                            Department
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {teacher && (

                                        <tr>

                                            <td>
                                                {teacher.semester}
                                            </td>

                                            <td>
                                                {teacher.subject}
                                            </td>

                                            <td>
                                                {teacher.department}
                                            </td>

                                        </tr>

                                    )}


                                    {!teacher && (

                                        <tr>

                                            <td
                                                colSpan="3"
                                                className="text-center"
                                            >

                                                Loading...

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

export default TeacherDashboard;