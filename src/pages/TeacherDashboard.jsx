import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import NotificationCard from "../components/NotificationCard";
import SystemStatus from "../components/SystemStatus";

function TeacherDashboard() {

    return (

        <DashboardLayout
            role="teacher"
            title="Teacher Dashboard"
        >

            <div className="container-fluid mt-4">

                <h2 className="mb-4">

                    Welcome, Ram Sharma 👋

                </h2>

                {/* Dashboard Cards */}

                <div className="row">

                    <DashboardCard
                        title="Total Students"
                        value="120"
                        color="primary"
                    />

                    <DashboardCard
                        title="My Subjects"
                        value="4"
                        color="success"
                    />

                    <DashboardCard
                        title="Marks Submitted"
                        value="80"
                        color="warning"
                    />

                    <DashboardCard
                        title="Pending Marks"
                        value="20"
                        color="danger"
                    />

                </div>

                {/* Notifications & Teacher Status */}

                <div className="row">

                    <div className="col-md-6 mb-4">

                        <NotificationCard

                            notifications={[

                                "📘 PLD marks submitted successfully",

                                "📘 Java class scheduled tomorrow",

                                "📘 New student added to Semester 2",

                                "📘 DBMS internal marks pending"

                            ]}

                        />

                    </div>

                    <div className="col-md-6 mb-4">

                        <SystemStatus

                            status={[

                                {
                                    title: "Teacher",
                                    value: "Ram Sharma"
                                },

                                {
                                    title: "Department",
                                    value: "BCA"
                                },

                                {
                                    title: "Subjects",
                                    value: "4"
                                },

                                {
                                    title: "Semester",
                                    value: "1st, 2nd, 3rd, 4th"
                                },

                                {
                                    title: "Status",
                                    value: "🟢 Active"
                                }

                            ]}

                        />

                    </div>

                </div>

                {/* My Subjects */}

                <div className="card shadow mb-4">

                    <div className="card-header bg-success text-white">

                        <h5 className="mb-0">

                            My Subjects

                        </h5>

                    </div>

                    <div className="card-body">

                        <table className="table table-bordered table-hover">

                            <thead className="table-light">

                                <tr>

                                    <th>Semester</th>

                                    <th>Subject Code</th>

                                    <th>Subject Name</th>

                                    <th>Department</th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr>

                                    <td>1st</td>

                                    <td>BCA101</td>

                                    <td>Programming Logic & Design</td>

                                    <td>BCA</td>

                                </tr>

                                <tr>

                                    <td>2nd</td>

                                    <td>BCA201</td>

                                    <td>C Programming</td>

                                    <td>BCA</td>

                                </tr>

                                <tr>

                                    <td>3rd</td>

                                    <td>BCA301</td>

                                    <td>Java Programming</td>

                                    <td>BCA</td>

                                </tr>

                                <tr>

                                    <td>4th</td>

                                    <td>BCA401</td>

                                    <td>Database Management System</td>

                                    <td>BCA</td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* Recent Students */}

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h5 className="mb-0">

                            Recently Added Students

                        </h5>

                    </div>

                    <div className="card-body">

                        <table className="table table-striped">

                            <thead>

                                <tr>

                                    <th>Roll</th>

                                    <th>Name</th>

                                    <th>Semester</th>

                                    <th>Department</th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr>

                                    <td>001</td>

                                    <td>Hari Sharma</td>

                                    <td>1st</td>

                                    <td>BCA</td>

                                </tr>

                                <tr>

                                    <td>002</td>

                                    <td>Ram Karki</td>

                                    <td>2nd</td>

                                    <td>BCA</td>

                                </tr>

                                <tr>

                                    <td>003</td>

                                    <td>Sita Nepal</td>

                                    <td>3rd</td>

                                    <td>BCA</td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default TeacherDashboard;