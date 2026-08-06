import DashboardLayout from "../components/DashboardLayout";

function StudentProfile() {

    return (

        <DashboardLayout
            role="student"
            title="My Profile"
        >

            <div className="container-fluid mt-4">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h4 className="mb-0">
                            Student Profile
                        </h4>

                    </div>

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-3 text-center">

                                <img
                                    src="https://via.placeholder.com/180"
                                    alt="Student"
                                    className="img-thumbnail rounded-circle mb-3"
                                />

                                <h4>Hari Sharma</h4>

                                <span className="badge bg-success">
                                    Active Student
                                </span>

                            </div>

                            <div className="col-md-9">

                                <table className="table table-bordered">

                                    <tbody>

                                        <tr>
                                            <th width="30%">Full Name</th>
                                            <td>Hari Sharma</td>
                                        </tr>

                                        <tr>
                                            <th>Roll Number</th>
                                            <td>BCA001</td>
                                        </tr>

                                        <tr>
                                            <th>Registration Number</th>
                                            <td>PU-BCA-2081-001</td>
                                        </tr>

                                        <tr>
                                            <th>Email</th>
                                            <td>hari@gmail.com</td>
                                        </tr>

                                        <tr>
                                            <th>Phone</th>
                                            <td>9800000001</td>
                                        </tr>

                                        <tr>
                                            <th>Gender</th>
                                            <td>Male</td>
                                        </tr>

                                        <tr>
                                            <th>Date of Birth</th>
                                            <td>15 January 2004</td>
                                        </tr>

                                        <tr>
                                            <th>Department</th>
                                            <td>BCA</td>
                                        </tr>

                                        <tr>
                                            <th>Semester</th>
                                            <td>4th Semester</td>
                                        </tr>

                                        <tr>
                                            <th>Section</th>
                                            <td>A</td>
                                        </tr>

                                        <tr>
                                            <th>Batch</th>
                                            <td>2023</td>
                                        </tr>

                                        <tr>
                                            <th>Address</th>
                                            <td>Kathmandu, Nepal</td>
                                        </tr>

                                        <tr>
                                            <th>Guardian</th>
                                            <td>Ramesh Sharma</td>
                                        </tr>

                                        <tr>
                                            <th>Guardian Contact</th>
                                            <td>9811111111</td>
                                        </tr>

                                        <tr>
                                            <th>Status</th>
                                            <td>

                                                <span className="badge bg-success">

                                                    Active

                                                </span>

                                            </td>
                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default StudentProfile;