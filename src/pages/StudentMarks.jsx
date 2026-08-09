import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getMyMarks } from "../api/studentSelfApi";

function StudentMarks() {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    loadMarks();
  }, []);

  async function loadMarks() {
    try {
      const response = await getMyMarks();
      setMarks(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DashboardLayout role="student" title="My Marks">
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h3>My Marks</h3>
          </div>

          <div className="card-body">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-light">
                <tr>
                  <th>Subject</th>
                  <th>Semester</th>
                  <th>Full Marks</th>
                  <th>Obtained Marks</th>
                  <th>Percentage</th>
                  <th>Result</th>
                </tr>
              </thead>

              <tbody>
                {marks.map((m) => {
                  const percentage = (
                    (m.obtained_marks / m.full_marks) *
                    100
                  ).toFixed(1);
                  const passed = percentage >= 40;

                  return (
                    <tr key={m.id}>
                      <td>{m.subject}</td>
                      <td>{m.semester}</td>
                      <td>{m.full_marks}</td>
                      <td>{m.obtained_marks}</td>
                      <td>{percentage}%</td>
                      <td>
                        <span
                          className={
                            passed ? "badge bg-success" : "badge bg-danger"
                          }
                        >
                          {passed ? "PASS" : "FAIL"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentMarks;
