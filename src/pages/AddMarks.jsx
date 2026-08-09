import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getGradableStudents, addMarks } from "../api/marksApi";

function AddMarks() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [fullMarks, setFullMarks] = useState(100);
  const [obtainedMarks, setObtainedMarks] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const response = await getGradableStudents();
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function saveMarks(e) {
    e.preventDefault();

    if (!selectedStudent) {
      alert("Please select a student");
      return;
    }

    try {
      await addMarks({
        student_id: parseInt(selectedStudent),
        full_marks: parseInt(fullMarks),
        obtained_marks: parseInt(obtainedMarks),
      });

      alert("Marks Added Successfully");

      setSelectedStudent("");
      setObtainedMarks("");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.detail || "Failed to add marks!");
    }
  }

  return (
    <DashboardLayout role="teacher" title="Add Marks">
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h3>Add Marks</h3>
          </div>

          <div className="card-body">
            <form onSubmit={saveMarks}>
              <div className="mb-3">
                <label className="form-label">Student</label>

                <select
                  className="form-control"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  required
                >
                  <option value="">Select Student</option>

                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.fullname} ({student.roll_no})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Full Marks</label>

                <input
                  type="number"
                  className="form-control"
                  value={fullMarks}
                  onChange={(e) => setFullMarks(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Obtained Marks</label>

                <input
                  type="number"
                  className="form-control"
                  value={obtainedMarks}
                  onChange={(e) => setObtainedMarks(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-success">
                Save Marks
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddMarks;
