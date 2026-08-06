import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function ManageMarks() {

    const [marks, setMarks] = useState([

        {
            id: 1,
            roll: "BCA001",
            student: "Hari Sharma",
            semester: "1st Semester",
            subject: "Programming Logic & Design",
            internal: 30,
            practical: 18,
            external: 45
        },

        {
            id: 2,
            roll: "BCA002",
            student: "Ram Karki",
            semester: "1st Semester",
            subject: "Programming Logic & Design",
            internal: 28,
            practical: 17,
            external: 42
        },

        {
            id: 3,
            roll: "BCA003",
            student: "Sita Nepal",
            semester: "1st Semester",
            subject: "Programming Logic & Design",
            internal: 35,
            practical: 20,
            external: 48
        }

    ]);

    const [editing, setEditing] = useState(null);

    const [search, setSearch] = useState("");

    function total(internal, practical, external) {

        return Number(internal) + Number(practical) + Number(external);

    }

    function grade(totalMarks) {

        if (totalMarks >= 90) return "A+";
        if (totalMarks >= 80) return "A";
        if (totalMarks >= 70) return "B+";
        if (totalMarks >= 60) return "B";
        if (totalMarks >= 50) return "C";
        return "F";

    }

    function deleteMarks(id) {

        if (window.confirm("Delete Marks?")) {

            setMarks(

                marks.filter(mark => mark.id !== id)

            );

        }

    }

    function handleChange(e) {

        setEditing({

            ...editing,

            [e.target.name]: e.target.value

        });

    }

    const filteredMarks = marks.filter(mark =>

        mark.student.toLowerCase().includes(search.toLowerCase()) ||

        mark.roll.toLowerCase().includes(search.toLowerCase()) ||

        mark.subject.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <DashboardLayout
            role="teacher"
            title="Manage Marks"
        >

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h3>Manage Student Marks</h3>

                    </div>

                    <div className="card-body">

                        <input

                            type="text"

                            className="form-control mb-3"

                            placeholder="Search Student / Roll / Subject"

                            value={search}

                            onChange={(e) => setSearch(e.target.value)}

                        />

                        <table className="table table-bordered table-hover">

                            <thead className="table-dark">

                                <tr>

                                    <th>Roll</th>

                                    <th>Student</th>

                                    <th>Semester</th>

                                    <th>Subject</th>

                                    <th>Internal</th>

                                    <th>Practical</th>

                                    <th>External</th>

                                    <th>Total</th>

                                    <th>Grade</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredMarks.map(mark => (

                                        <tr key={mark.id}>

                                            <td>{mark.roll}</td>

                                            <td>{mark.student}</td>

                                            <td>{mark.semester}</td>

                                            <td>{mark.subject}</td>

                                            <td>{mark.internal}</td>

                                            <td>{mark.practical}</td>

                                            <td>{mark.external}</td>

                                            <td>

                                                {

                                                    total(

                                                        mark.internal,

                                                        mark.practical,

                                                        mark.external

                                                    )

                                                }

                                            </td>

                                            <td>

                                                {

                                                    grade(

                                                        total(

                                                            mark.internal,

                                                            mark.practical,

                                                            mark.external

                                                        )

                                                    )

                                                }

                                            </td>

                                            <td>

                                                <button

                                                    className="btn btn-warning btn-sm me-2"

                                                    onClick={() => setEditing(mark)}

                                                >

                                                    Edit

                                                </button>

                                                <button

                                                    className="btn btn-danger btn-sm"

                                                    onClick={() => deleteMarks(mark.id)}

                                                >

                                                    Delete

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>
                                {

                    editing &&

                    <div className="card shadow mt-4">

                        <div className="card-header bg-success text-white">

                            <h4>Edit Student Marks</h4>

                        </div>

                        <div className="card-body">

                            <div className="mb-3">

                                <label className="form-label">

                                    Student

                                </label>

                                <input

                                    className="form-control"

                                    value={editing.student}

                                    disabled

                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Subject

                                </label>

                                <input

                                    className="form-control"

                                    value={editing.subject}

                                    disabled

                                />

                            </div>

                            <div className="row">

                                <div className="col-md-4">

                                    <label className="form-label">

                                        Internal Marks

                                    </label>

                                    <input

                                        type="number"

                                        className="form-control"

                                        name="internal"

                                        min="0"

                                        max="40"

                                        value={editing.internal}

                                        onChange={handleChange}

                                    />

                                </div>

                                <div className="col-md-4">

                                    <label className="form-label">

                                        Practical Marks

                                    </label>

                                    <input

                                        type="number"

                                        className="form-control"

                                        name="practical"

                                        min="0"

                                        max="20"

                                        value={editing.practical}

                                        onChange={handleChange}

                                    />

                                </div>

                                <div className="col-md-4">

                                    <label className="form-label">

                                        External Marks

                                    </label>

                                    <input

                                        type="number"

                                        className="form-control"

                                        name="external"

                                        min="0"

                                        max="60"

                                        value={editing.external}

                                        onChange={handleChange}

                                    />

                                </div>

                            </div>

                            <div className="mt-4">

                                <h5>

                                    Total :

                                    {

                                        total(

                                            editing.internal,

                                            editing.practical,

                                            editing.external

                                        )

                                    }

                                </h5>

                                <h5>

                                    Grade :

                                    {

                                        grade(

                                            total(

                                                editing.internal,

                                                editing.practical,

                                                editing.external

                                            )

                                        )

                                    }

                                </h5>

                            </div>

                            <button

                                className="btn btn-success mt-3 me-2"

                                onClick={() => {

                                    setMarks(

                                        marks.map(mark =>

                                            mark.id === editing.id

                                                ? editing

                                                : mark

                                        )

                                    );

                                    alert("Marks Updated Successfully");

                                    setEditing(null);

                                }}

                            >

                                Save

                            </button>

                            <button

                                className="btn btn-secondary mt-3"

                                onClick={() => setEditing(null)}

                            >

                                Cancel

                            </button>

                        </div>

                    </div>

                }

            </div>

        </DashboardLayout>

    );

}

export default ManageMarks;