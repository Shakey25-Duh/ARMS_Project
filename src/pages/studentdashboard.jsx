import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";

function StudentDashboard() {

    return (

        <DashboardLayout
            role="student"
            title="Student Dashboard"
        >

            <div className="container-fluid mt-4">

                <h2 className="mb-4">
                    Welcome, Hari Sharma 👋
                </h2>

                {/* Dashboard Cards */}

                <div className="row">

                    <DashboardCard
                        title="Published Marks"
                        value="5"
                        color="success"
                    />

                    <DashboardCard
                        title="Current GPA"
                        value="3.72"
                        color="warning"
                    />

                </div>

                {/* Current Semester Subjects */}

                <div className="card shadow mb-4">

                    <div className="card-header bg-primary text-white">

                        <h5 className="mb-0">
                            Current Semester Subjects
                        </h5>

                    </div>

                    <div className="card-body">

                        <table className="table table-bordered table-hover">

                            <thead className="table-light">

                                <tr>

                                    <th>Subject Code</th>
                                    <th>Subject Name</th>
                                    <th>Credit Hour</th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr>

                                    <td>BCA401</td>
                                    <td>Database Management System</td>
                                    <td>3</td>

                                </tr>

                                <tr>

                                    <td>BCA402</td>
                                    <td>Operating System</td>
                                    <td>3</td>

                                </tr>

                                <tr>

                                    <td>BCA403</td>
                                    <td>Computer Graphics</td>
                                    <td>3</td>

                                </tr>

                                <tr>

                                    <td>BCA404</td>
                                    <td>Web Technology II</td>
                                    <td>3</td>

                                </tr>

                                <tr>

                                    <td>BCA405</td>
                                    <td>Software Engineering</td>
                                    <td>3</td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default StudentDashboard;