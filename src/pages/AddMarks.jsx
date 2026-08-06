import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function AddMarks() {

    const [subject, setSubject] = useState("");

    const [semester, setSemester] = useState("");

    const [students, setStudents] = useState([

        {
            id:1,
            roll:"BCA001",
            name:"Hari Sharma",
            internal:"",
            external:""
        },

        {
            id:2,
            roll:"BCA002",
            name:"Ram Karki",
            internal:"",
            external:""
        },

        {
            id:3,
            roll:"BCA003",
            name:"Sita Nepal",
            internal:"",
            external:""
        }

    ]);

    function handleMarks(index, field, value){

        const updated=[...students];

        updated[index][field]=value;

        setStudents(updated);

    }

    function saveMarks(){

        console.log({

            subject,

            semester,

            students

        });

        alert("Marks Saved Successfully");

    }

    return(

        <DashboardLayout
            role="teacher"
            title="Add Marks"
        >

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-success text-white">

                        <h3>Add Student Marks</h3>

                    </div>

                    <div className="card-body">

                        <div className="row mb-4">

                            <div className="col-md-6">

                                <label className="form-label">

                                    Select Subject

                                </label>

                                <select
                                    className="form-select"
                                    value={subject}
                                    onChange={(e)=>setSubject(e.target.value)}
                                >

                                    <option value="">Choose Subject</option>

                                    <option>
                                        Programming Logic & Design
                                    </option>

                                    <option>
                                        C Programming
                                    </option>

                                    <option>
                                        Java Programming
                                    </option>

                                    <option>
                                        Database Management System
                                    </option>

                                </select>

                            </div>

                            <div className="col-md-6">

                                <label className="form-label">

                                    Semester

                                </label>

                                <select
                                    className="form-select"
                                    value={semester}
                                    onChange={(e)=>setSemester(e.target.value)}
                                >

                                    <option value="">Choose Semester</option>

                                    <option>1st Semester</option>
                                    <option>2nd Semester</option>
                                    <option>3rd Semester</option>
                                    <option>4th Semester</option>

                                </select>

                            </div>

                        </div>

                        <table className="table table-bordered table-hover">

                            <thead className="table-dark">

                                <tr>

                                    <th>Roll</th>

                                    <th>Student</th>

                                    <th>Internal (40)</th>

                                    <th>External (60)</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    students.map((student,index)=>(

                                        <tr key={student.id}>

                                            <td>

                                                {student.roll}

                                            </td>

                                            <td>

                                                {student.name}

                                            </td>

                                            <td>

                                                <input

                                                    type="number"

                                                    className="form-control"

                                                    min="0"

                                                    max="40"

                                                    value={student.internal}

                                                    onChange={(e)=>

                                                        handleMarks(

                                                            index,

                                                            "internal",

                                                            e.target.value

                                                        )

                                                    }

                                                />

                                            </td>

                                            <td>

                                                <input

                                                    type="number"

                                                    className="form-control"

                                                    min="0"

                                                    max="60"

                                                    value={student.external}

                                                    onChange={(e)=>

                                                        handleMarks(

                                                            index,

                                                            "external",

                                                            e.target.value

                                                        )

                                                    }

                                                />

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                        <button

                            className="btn btn-success"

                            onClick={saveMarks}

                        >

                            Save Marks

                        </button>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default AddMarks;