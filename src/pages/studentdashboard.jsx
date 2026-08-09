import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import { getMyProfile, getMySubjects, getMyMarks } from "../api/studentSelfApi";

function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [profileRes, subjectsRes, marksRes] = await Promise.all([
        getMyProfile(),
        getMySubjects(),
        getMyMarks(),
      ]);

      setProfile(profileRes.data);
      setSubjects(subjectsRes.data);
      setMarks(marksRes.data);
    } catch (error) {
      console.log(error);
    }
  }

  const pendingCount = subjects.length - marks.length;

  return (
    <DashboardLayout role="student" title="Student Dashboard">
      <div className="container-fluid mt-4">
        <h2 className="mb-4">Welcome, {profile ? profile.fullname : "..."}</h2>

        <div className="row">
          <DashboardCard
            title="My Subjects"
            value={subjects.length}
            color="primary"
          />

          <DashboardCard
            title="Marks Received"
            value={marks.length}
            color="success"
          />

          <DashboardCard
            title="Pending Marks"
            value={pendingCount > 0 ? pendingCount : 0}
            color="warning"
          />

          <DashboardCard
            title="Semester"
            value={profile ? profile.semester : "-"}
            color="danger"
          />
        </div>

        <div className="card shadow mt-3">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">My Subjects This Semester</h5>
          </div>

          <div className="card-body">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Subject</th>
                  <th>Teacher</th>
                  <th>Semester</th>
                </tr>
              </thead>

              <tbody>
                {subjects.map((s, index) => (
                  <tr key={index}>
                    <td>{s.subject}</td>
                    <td>{s.fullname}</td>
                    <td>{s.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;
