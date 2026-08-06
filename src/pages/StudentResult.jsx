import DashboardLayout from "../components/DashboardLayout";

function StudentResult() {

    const results = [

        {
            semester: "1st Semester",
            total: 410,
            percentage: "82%",
            gpa: "3.62",
            result: "PASS"
        },

        {
            semester: "2nd Semester",
            total: 404,
            percentage: "80.8%",
            gpa: "3.55",
            result: "PASS"
        },

        {
            semester: "3rd Semester",
            total: 422,
            percentage: "84.4%",
            gpa: "3.74",
            result: "PASS"
        },

        {
            semester: "4th Semester",
            total: 432,
            percentage: "86.4%",
            gpa: "3.82",
            result: "PASS"
        }

    ];

    return (

        <DashboardLayout
            role="student"
            title="Result"
        >

            <div className="container-fluid mt-4">

                <h2 className="mb-4">

                    Semester Wise Result

                </h2>

                <div className="card shadow">

                    <div className="card-header bg-success text-white">

                        <h4 className="mb-0">

                            Academic Result

                        </h4>

                    </div>

                    <div className="card-body">

                        <table className="table table-bordered table-hover text-center">

                            <thead className="table-light">

                                <tr>

                                    <th>Semester</th>

                                    <th>Total Marks</th>

                                    <th>Percentage</th>

                                    <th>GPA</th>

                                    <th>Result</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    results.map((item, index) => (

                                        <tr key={index}>

                                            <td>{item.semester}</td>

                                            <td>{item.total}</td>

                                            <td>{item.percentage}</td>

                                            <td>{item.gpa}</td>

                                            <td>

                                                <span
                                                    className={
                                                        item.result === "PASS"
                                                            ? "badge bg-success"
                                                            : "badge bg-danger"
                                                    }
                                                >

                                                    {item.result}

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* Overall Summary */}

                <div className="row mt-4">

                    <div className="col-md-3">

                        <div className="card bg-primary text-white shadow">

                            <div className="card-body text-center">

                                <h5>Total Semesters</h5>

                                <h2>4</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card bg-success text-white shadow">

                            <div className="card-body text-center">

                                <h5>Overall GPA</h5>

                                <h2>3.68</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card bg-warning text-dark shadow">

                            <div className="card-body text-center">

                                <h5>Average %</h5>

                                <h2>83.4%</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card bg-info text-white shadow">

                            <div className="card-body text-center">

                                <h5>Status</h5>

                                <h2>PASS</h2>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default StudentResult;