import DashboardLayout from "../components/DashboardLayout";

function StudentMarks() {

    const semesterMarks = [

        {
            semester: "1st Semester",
            marks: [
                { subject: "Programming Logic & Design", full: 100, obtained: 82, grade: "A" },
                { subject: "Mathematics I", full: 100, obtained: 76, grade: "B+" },
                { subject: "Digital Logic", full: 100, obtained: 88, grade: "A+" },
                { subject: "English I", full: 100, obtained: 74, grade: "B+" },
                { subject: "Computer Fundamentals", full: 100, obtained: 90, grade: "A+" }
            ]
        },

        {
            semester: "2nd Semester",
            marks: [
                { subject: "C Programming", full: 100, obtained: 84, grade: "A" },
                { subject: "Mathematics II", full: 100, obtained: 73, grade: "B+" },
                { subject: "Statistics", full: 100, obtained: 81, grade: "A" },
                { subject: "Microprocessor", full: 100, obtained: 79, grade: "B+" },
                { subject: "English II", full: 100, obtained: 87, grade: "A+" }
            ]
        },

        {
            semester: "3rd Semester",
            marks: [
                { subject: "Java Programming", full: 100, obtained: 92, grade: "A+" },
                { subject: "Data Structure", full: 100, obtained: 88, grade: "A+" },
                { subject: "Probability", full: 100, obtained: 76, grade: "B+" },
                { subject: "Computer Organization", full: 100, obtained: 81, grade: "A" },
                { subject: "Web Technology I", full: 100, obtained: 85, grade: "A" }
            ]
        },

        {
            semester: "4th Semester",
            marks: [
                { subject: "Database Management System", full: 100, obtained: 90, grade: "A+" },
                { subject: "Operating System", full: 100, obtained: 84, grade: "A" },
                { subject: "Computer Graphics", full: 100, obtained: 80, grade: "A" },
                { subject: "Software Engineering", full: 100, obtained: 87, grade: "A+" },
                { subject: "Web Technology II", full: 100, obtained: 91, grade: "A+" }
            ]
        }

    ];

    return (

        <DashboardLayout
            role="student"
            title="My Marks"
        >

            <div className="container-fluid mt-4">

                <h2 className="mb-4">

                    Semester Wise Marks

                </h2>

                {

                    semesterMarks.map((semester, index) => (

                        <div
                            key={index}
                            className="card shadow mb-4"
                        >

                            <div className="card-header bg-success text-white">

                                <h5 className="mb-0">

                                    {semester.semester}

                                </h5>

                            </div>

                            <div className="card-body">

                                <table className="table table-bordered table-hover">

                                    <thead className="table-light">

                                        <tr>

                                            <th>SN</th>

                                            <th>Subject</th>

                                            <th>Full Marks</th>

                                            <th>Obtained Marks</th>

                                            <th>Grade</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            semester.marks.map((mark, i) => (

                                                <tr key={i}>

                                                    <td>{i + 1}</td>

                                                    <td>{mark.subject}</td>

                                                    <td>{mark.full}</td>

                                                    <td>{mark.obtained}</td>

                                                    <td>

                                                        <span className="badge bg-primary">

                                                            {mark.grade}

                                                        </span>

                                                    </td>

                                                </tr>

                                            ))

                                        }

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    ))

                }

            </div>

        </DashboardLayout>

    );

}

export default StudentMarks;