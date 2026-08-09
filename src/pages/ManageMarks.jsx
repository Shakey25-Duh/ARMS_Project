import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getGradableStudents } from "../api/marksApi";
import { getMyMarks, updateMarks, deleteMarks } from "../api/marksApi";

function ManageMarks() {
  const [marksList, setMarksList] = useState([]);
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const marksResponse = await getMyMarks();
      const studentsResponse = await getGradableStudents();

      setMarksList(marksResponse.data);
      setStudents(studentsResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  function studentName(studentId) {
    const student = students.find((s) => s.id === studentId);
    return student ? `${student.fullname} (${student.roll_no})` : studentId;
  }

  async function saveMarks() {
    try {
      await updateMarks(editing.id, {
        full_marks: parseInt(editing.full_marks),
        obtained_marks: parseInt(editing.obtained_marks),
      });

      alert("Marks Updated Successfully");

      setEditing(null);

      loadData();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.detail || "Failed to update marks");
    }
  }

  async function handleDeleteMarks(id) {
    if (!window.confirm("Delete these marks?")) {
      return;
    }

    try {
      await deleteMarks(id);

      alert("Marks Deleted Successfully");

      loadData();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.detail || "Failed to delete marks");
    }
  }

  return (
    <DashboardLayout role="teacher" title="Manage Marks">
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header bg-success text-white">
            <h3>Manage Marks</h3>
          </div>

          <div className="card-body">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Semester</th>
                  <th>Full Marks</th>
                  <th>Obtained Marks</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {marksList.map((m) => (
                  <tr key={m.id}>
                    <td>{studentName(m.student_id)}</td>
                    <td>{m.subject}</td>
                    <td>{m.semester}</td>
                    <td>{m.full_marks}</td>
                    <td>{m.obtained_marks}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => setEditing(m)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteMarks(m.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {editing && (
          <div className="card shadow mt-4">
            <div className="card-header bg-primary text-white">
              <h4>Edit Marks — {studentName(editing.student_id)}</h4>
            </div>

            <div className="card-body">
              <div className="mb-3">
                <label>Full Marks</label>
                <input
                  type="number"
                  className="form-control"
                  value={editing.full_marks}
                  onChange={(e) =>
                    setEditing({ ...editing, full_marks: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label>Obtained Marks</label>
                <input
                  type="number"
                  className="form-control"
                  value={editing.obtained_marks}
                  onChange={(e) =>
                    setEditing({ ...editing, obtained_marks: e.target.value })
                  }
                />
              </div>

              <button className="btn btn-success me-2" onClick={saveMarks}>
                Save Changes
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ManageMarks;
