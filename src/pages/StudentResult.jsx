import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { jsPDF } from "jspdf";
import { getMyProfile, getMyMarks } from "../api/studentSelfApi";

function StudentResult() {

    const [profile, setProfile] = useState(null);
    const [marks, setMarks] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const [profileRes, marksRes] = await Promise.all([
                getMyProfile(),
                getMyMarks()
            ]);

            setProfile(profileRes.data);
            setMarks(marksRes.data);

            // Default to the latest graded semester
            const semesters = [...new Set(marksRes.data.map((m) => m.semester))];

            if (semesters.length > 0) {
                setSelectedSemester(semesters[semesters.length - 1]);
            }

        } catch (error) {
            console.log(error);
        }
    }

    // Unique semesters the student has actually been graded in
    const availableSemesters = [...new Set(marks.map((m) => m.semester))];

    // Marks for the currently selected semester only
    const semesterMarks = marks.filter((m) => m.semester === selectedSemester);

    const totalCreditPoints = semesterMarks.reduce(
        (sum, m) => sum + (m.grade_point * m.credit_hour), 0
    );
    const totalCredits = semesterMarks.reduce((sum, m) => sum + m.credit_hour, 0);
    const semesterGPA = totalCredits > 0 ? (totalCreditPoints / totalCredits).toFixed(2) : 0;
    const semesterResult = semesterMarks.some(m => m.grade === "NG") ? "FAIL" : "PASS";

    const downloadPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Academic Result Management System", 105, 18, { align: "center" });

        doc.setFontSize(14);
        doc.text("Pokhara University", 105, 26, { align: "center" });

        doc.line(20, 32, 190, 32);

        doc.setFontSize(11);
        let infoY = 42;

        doc.text(`Student Name : ${profile?.fullname || ""}`, 20, infoY);
        infoY += 7;
        doc.text(`Roll Number : ${profile?.roll_no || ""}`, 20, infoY);
        infoY += 7;
        doc.text(`Registration No : ${profile?.registration_no || ""}`, 20, infoY);
        infoY += 7;
        doc.text(`Date of Birth : ${profile?.dob || ""}`, 20, infoY);
        infoY += 7;
        doc.text(`Semester : ${selectedSemester}`, 20, infoY);
        infoY += 7;
        doc.text(`Course : ${profile?.department || ""}`, 20, infoY);

        let y = infoY + 12;

        doc.line(20, y, 190, y);
        y += 8;

        doc.setFontSize(11);
        doc.text("Subject", 20, y);
        doc.text("Credit Hour", 90, y);
        doc.text("Obtained Credit", 125, y);
        doc.text("Grade", 170, y);

        y += 5;
        doc.line(20, y, 190, y);
        y += 8;

        semesterMarks.forEach((m) => {

            doc.text(m.subject, 20, y);
            doc.text(String(m.credit_hour), 90, y);
            doc.text(String(m.obtained_credit), 125, y);
            doc.text(m.grade, 170, y);

            y += 9;

            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });

        doc.line(20, y, 190, y);
        y += 12;

        doc.setFontSize(13);
        doc.text(`Semester GPA : ${semesterGPA}`, 20, y);
        y += 8;
        doc.text(`Result : ${semesterResult}`, 20, y);

        doc.save(`${profile.roll_no}_${selectedSemester}_Result.pdf`);

    };

    return (

        <DashboardLayout role="student" title="Result">

            <div className="container-fluid mt-4">

                <h2 className="mb-4 text-center">Academic Result</h2>

                <div className="card shadow">

                    <div className="card-header bg-success text-white text-center">
                        <h4 className="mb-0">Academic Result Management System</h4>
                        <small>Pokhara University</small>
                    </div>

                    <div className="card-body">

                        <div className="row mb-3">

                            <div className="col-md-6">
                                <p><strong>Student Name:</strong> {profile?.fullname}</p>
                                <p><strong>Roll Number:</strong> {profile?.roll_no}</p>
                                <p><strong>Registration No:</strong> {profile?.registration_no}</p>
                                <p><strong>Date of Birth:</strong> {profile?.dob}</p>
                                <p><strong>Course:</strong> {profile?.department}</p>
                            </div>

                            <div className="col-md-6">

                                <label className="form-label"><strong>Select Semester</strong></label>

                                <select
                                    className="form-select"
                                    value={selectedSemester}
                                    onChange={(e) => setSelectedSemester(e.target.value)}
                                >
                                    {availableSemesters.length === 0 && (
                                        <option value="">No results yet</option>
                                    )}

                                    {availableSemesters.map((sem) => (
                                        <option key={sem} value={sem}>
                                            {sem} Semester
                                        </option>
                                    ))}
                                </select>

                            </div>

                        </div>

                        {semesterMarks.length === 0 ? (

                            <p className="text-muted">No marks available for this semester yet.</p>

                        ) : (

                            <>

                                <table className="table table-bordered table-hover text-center">

                                    <thead className="table-light">
                                        <tr>
                                            <th>Subject</th>
                                            <th>Credit Hour</th>
                                            <th>Obtained Credit</th>
                                            <th>Grade</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {semesterMarks.map((m) => (
                                            <tr key={m.id}>
                                                <td>{m.subject}</td>
                                                <td>{m.credit_hour}</td>
                                                <td>{m.obtained_credit}</td>
                                                <td>
                                                    <span className={m.grade === "NG" ? "badge bg-danger" : "badge bg-success"}>
                                                        {m.grade}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>

                                <div className="text-end mt-3">
                                    <button className="btn btn-danger" onClick={downloadPDF}>
                                        📄 Download Result PDF
                                    </button>
                                </div>

                            </>

                        )}

                    </div>

                </div>

                {semesterMarks.length > 0 && (

                    <div className="row mt-4">

                        <div className="col-md-6">
                            <div className="card bg-warning text-dark shadow">
                                <div className="card-body text-center">
                                    <h5>{selectedSemester} Semester GPA</h5>
                                    <h2>{semesterGPA}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card bg-info text-white shadow">
                                <div className="card-body text-center">
                                    <h5>Result</h5>
                                    <h2>{semesterResult}</h2>
                                </div>
                            </div>
                        </div>

                    </div>

                )}

            </div>

        </DashboardLayout>

    );
}

export default StudentResult;