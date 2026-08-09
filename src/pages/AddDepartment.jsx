import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { addDepartment } from "../api/departmentApi";

function AddDepartment() {
  const [department, setDepartment] = useState({
    name: "",
    faculty: "",
  });

  function handleChange(e) {
    setDepartment({
      ...department,
      [e.target.name]: e.target.value,
    });
  }

  async function saveDepartment(e) {
    e.preventDefault();

    try {
      await addDepartment(department);

      alert("Department Added Successfully");

      setDepartment({
        name: "",
        faculty: "",
      });
    } catch (error) {
      console.log(error);

      alert("Failed to add department.");
    }
  }
  return (
    <>
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="container mt-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3>Add Department</h3>
            </div>

            <div className="card-body">
              <form onSubmit={saveDepartment}>
                <div className="mb-3">
                  <label>Department Name</label>

                  <input
                    className="form-control"
                    name="name"
                    value={department.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Faculty</label>

                  <select
                    className="form-control"
                    name="faculty"
                    value={department.faculty}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Faculty</option>
                    <option>Management</option>
                    <option>Science & Technology</option>
                    <option>Humanities</option>
                    <option>Education</option>
                  </select>
                </div>

                <button className="btn btn-success">Save Department</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddDepartment;
