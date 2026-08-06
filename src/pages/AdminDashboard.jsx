import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import NotificationCard from "../components/NotificationCard";
import SystemStatus from "../components/SystemStatus";

function AdminDashboard() {

    return (

        <DashboardLayout
            role="admin"
            title="Admin Dashboard"
        >

            <div className="container-fluid mt-4">

                <h2 className="mb-4">
                    Welcome, Admin 👋
                </h2>

                {/* Statistics */}

                <div className="row">

                    <div className="col-md-4 mb-4">

                        <Link
                            to="/manage-teachers"
                            className="text-decoration-none"
                        >

                            <div className="card shadow top-card bg-primary text-white">

                                <div className="card-body text-center">

                                    <h5>Total Teachers</h5>

                                    <h1>20</h1>

                                    <small>Click to View</small>

                                </div>

                            </div>

                        </Link>

                    </div>

                    <div className="col-md-4 mb-4">

                        <Link
                            to="/manage-subjects"
                            className="text-decoration-none"
                        >

                            <div className="card shadow top-card bg-success text-white">

                                <div className="card-body text-center">

                                    <h5>Total Subjects</h5>

                                    <h1>12</h1>

                                    <small>Click to View</small>

                                </div>

                            </div>

                        </Link>

                    </div>

                    <div className="col-md-4 mb-4">

                        <Link
                            to="/manage-departments"
                            className="text-decoration-none"
                        >

                            <div className="card shadow top-card bg-warning">

                                <div className="card-body text-center">

                                    <h5>Departments</h5>

                                    <h1>5</h1>

                                    <small>Click to View</small>

                                </div>

                            </div>

                        </Link>

                    </div>

                </div>

                <div className="row">

                    <div className="col-md-4 mb-4">

                        <Link
                            to="/students"
                            className="text-decoration-none"
                        >

                            <div className="card shadow top-card bg-info text-white">

                                <div className="card-body text-center">

                                    <h5>Total Students</h5>

                                    <h1>120</h1>

                                    <small>Click to View</small>

                                </div>

                            </div>

                        </Link>

                    </div>

                    <div className="col-md-4 mb-4">

                        <Link
                            to="/reports"
                            className="text-decoration-none"
                        >

                            <div className="card shadow top-card bg-danger text-white">

                                <div className="card-body text-center">

                                    <h5>Pending Results</h5>

                                    <h1>18</h1>

                                    <small>Click to View</small>

                                </div>

                            </div>

                        </Link>

                    </div>

                    <div className="col-md-4 mb-4">

                        <Link
                            to="/reports"
                            className="text-decoration-none"
                        >

                            <div className="card shadow top-card bg-dark text-white">

                                <div className="card-body text-center">

                                    <h5>Published Results</h5>

                                    <h1>102</h1>

                                    <small>Click to View</small>

                                </div>

                            </div>

                        </Link>

                    </div>

                </div>

                {/* Notification & Status */}

                <div className="row">

                    <div className="col-md-6 mb-4">

                        <NotificationCard

                            notifications={[

                                "✅ Teacher Ram Sharma added successfully",

                                "✅ Database Management Subject Updated",

                                "✅ Department BCA Created",

                                "✅ Semester Result Published"

                            ]}

                        />

                    </div>

                    <div className="col-md-6 mb-4">

                        <SystemStatus

                            status={[

                                {
                                    title: "Database",
                                    value: "🟢 Connected"
                                },

                                {
                                    title: "Server",
                                    value: "🟢 Running"
                                },

                                {
                                    title: "Academic Year",
                                    value: "2026"
                                },

                                {
                                    title: "Semester",
                                    value: "Spring"
                                },

                                {
                                    title: "Version",
                                    value: "ARMS v1.0"
                                }

                            ]}

                        />

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default AdminDashboard;