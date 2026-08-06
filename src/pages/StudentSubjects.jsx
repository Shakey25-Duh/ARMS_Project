import DashboardLayout from "../components/DashboardLayout";

function StudentSubjects() {

    const semesterSubjects = [

        {
            semester: "1st Semester",
            subjects: [
                "Programming Logic & Design",
                "Mathematics I",
                "Digital Logic",
                "English I",
                "Computer Fundamentals"
            ]
        },

        {
            semester: "2nd Semester",
            subjects: [
                "C Programming",
                "Mathematics II",
                "Statistics",
                "Microprocessor",
                "English II"
            ]
        },

        {
            semester: "3rd Semester",
            subjects: [
                "Java Programming",
                "Data Structure",
                "Probability",
                "Computer Organization",
                "Web Technology I"
            ]
        },

        {
            semester: "4th Semester",
            subjects: [
                "Database Management System",
                "Operating System",
                "Computer Graphics",
                "Software Engineering",
                "Web Technology II"
            ]
        },

        {
            semester: "5th Semester",
            subjects: [
                "Python Programming",
                "Computer Network",
                "System Analysis",
                "Artificial Intelligence",
                "Project I"
            ]
        },

        {
            semester: "6th Semester",
            subjects: [
                "Machine Learning",
                "Cloud Computing",
                "Mobile Application",
                "Cyber Security",
                "Project II"
            ]
        },

        {
            semester: "7th Semester",
            subjects: [
                "Data Mining",
                "Big Data",
                "Research Methodology",
                "Internship",
                "Elective I"
            ]
        },

        {
            semester: "8th Semester",
            subjects: [
                "Final Project",
                "Professional Ethics",
                "Seminar",
                "Elective II",
                "Industrial Training"
            ]
        }

    ];

    return (

        <DashboardLayout
            role="student"
            title="My Subjects"
        >

            <div className="container-fluid mt-4">

                <h2 className="mb-4">

                    Semester Wise Subjects

                </h2>

                {

                    semesterSubjects.map((semester, index) => (

                        <div
                            className="card shadow mb-4"
                            key={index}
                        >

                            <div className="card-header bg-primary text-white">

                                <h5 className="mb-0">

                                    {semester.semester}

                                </h5>

                            </div>

                            <div className="card-body">

                                <table className="table table-bordered table-hover">

                                    <thead className="table-light">

                                        <tr>

                                            <th width="10%">
                                                SN
                                            </th>

                                            <th>
                                                Subject Name
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            semester.subjects.map((subject, i) => (

                                                <tr key={i}>

                                                    <td>{i + 1}</td>

                                                    <td>{subject}</td>

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

export default StudentSubjects;