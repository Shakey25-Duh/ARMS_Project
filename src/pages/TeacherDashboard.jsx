import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";

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

                {/* My Subjects */}

                <div className="card shadow mt-3">

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

                                </tr>

                            </thead>

                            <tbody>

                                <tr>

                                    <td>1st</td>
                                    <td>BCA101</td>
                                    <td>Programming Logic & Design</td>

                                </tr>

                                <tr>

                                    <td>2nd</td>
                                    <td>BCA201</td>
                                    <td>C Programming</td>

                                </tr>

                                <tr>

                                    <td>3rd</td>
                                    <td>BCA301</td>
                                    <td>Java Programming</td>

                                </tr>

                                <tr>

                                    <td>4th</td>
                                    <td>BCA401</td>
                                    <td>Database Management System</td>

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