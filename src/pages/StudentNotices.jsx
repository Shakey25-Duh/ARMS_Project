import DashboardLayout from "../components/DashboardLayout";

function StudentNotices() {

    const notices = [

        {
            id: 1,
            title: "Semester Final Examination Routine Published",
            date: "2026-08-15",
            category: "Exam"
        },

        {
            id: 2,
            title: "Assignment Submission Deadline Extended",
            date: "2026-08-18",
            category: "Assignment"
        },

        {
            id: 3,
            title: "Holiday on Janai Purnima",
            date: "2026-08-20",
            category: "Holiday"
        },

        {
            id: 4,
            title: "Internal Assessment Marks Published",
            date: "2026-08-24",
            category: "Result"
        },

        {
            id: 5,
            title: "Project Viva Schedule",
            date: "2026-08-28",
            category: "Project"
        }

    ];

    return (

        <DashboardLayout
            role="student"
            title="Student Notices"
        >

            <div className="container-fluid mt-4">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h4 className="mb-0">

                            College Notices

                        </h4>

                    </div>

                    <div className="card-body">

                        <table className="table table-bordered table-hover">

                            <thead className="table-light">

                                <tr>

                                    <th>SN</th>

                                    <th>Notice</th>

                                    <th>Category</th>

                                    <th>Date</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    notices.map((notice, index) => (

                                        <tr key={notice.id}>

                                            <td>{index + 1}</td>

                                            <td>{notice.title}</td>

                                            <td>

                                                <span className="badge bg-info">

                                                    {notice.category}

                                                </span>

                                            </td>

                                            <td>{notice.date}</td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default StudentNotices;