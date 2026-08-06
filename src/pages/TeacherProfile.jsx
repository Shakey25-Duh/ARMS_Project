import DashboardLayout from "../components/DashboardLayout";

function TeacherProfile() {
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

                        <img
                            src="https://via.placeholder.com/150"
                            alt="Teacher"
                            className="rounded-circle mb-3"
                        />

                        <h4>Ram Sharma</h4>

                        <p><strong>Email:</strong> ram@gmail.com</p>

                        <p><strong>Phone:</strong> 9800000000</p>

                        <p><strong>Department:</strong> BCA</p>

                        <p><strong>Designation:</strong> Lecturer</p>

                    </div>

                </div>

            </div>
        </DashboardLayout>
    );
}

export default TeacherProfile;