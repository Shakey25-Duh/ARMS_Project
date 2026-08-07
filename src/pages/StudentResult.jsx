import DashboardLayout from "../components/DashboardLayout";
import { jsPDF } from "jspdf";

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

    const downloadPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("Academic Result Management System", 35, 20);

        doc.setFontSize(16);
        doc.text("Pokhara University", 65, 30);

        doc.setFontSize(12);

        doc.text("Student Name : Hari Sharma", 20, 45);
        doc.text("Roll Number : BCA001", 20, 53);
        doc.text("Registration No : PU-2024-001", 20, 61);

        doc.line(20, 68, 190, 68);

        let y = 78;

        doc.text("Semester", 20, y);
        doc.text("Total", 80, y);
        doc.text("%", 115, y);
        doc.text("GPA", 140, y);
        doc.text("Result", 165, y);

        y += 5;

        doc.line(20, y, 190, y);

        y += 8;

        results.forEach((item) => {

            doc.text(item.semester, 20, y);
            doc.text(String(item.total), 80, y);
            doc.text(item.percentage, 115, y);
            doc.text(item.gpa, 140, y);
            doc.text(item.result, 165, y);

            y += 10;

        });

        doc.line(20, y, 190, y);

        y += 15;

        doc.setFontSize(14);

        doc.text("Overall GPA : 3.68", 20, y);

        y += 10;

        doc.text("Overall Percentage : 83.4%", 20, y);

        y += 10;

        doc.text("Final Result : PASS", 20, y);

        doc.save("Student_Result.pdf");

    };

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

                        <div className="text-end mt-3">

                            <button
                                className="btn btn-danger"
                                onClick={downloadPDF}
                            >

                                📄 Download Result PDF

                            </button>

                        </div>

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