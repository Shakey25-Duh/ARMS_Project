import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    /* =========================
       STUDENTS
    ========================== */

    const [students, setStudents] = useState([

        {
            id: 1,
            roll: "BCA001",
            name: "Hari Sharma",
            email: "hari@gmail.com",
            phone: "9800000001",
            semester: "1st",
            department: "BCA"
        },

        {
            id: 2,
            roll: "BCA002",
            name: "Ram Karki",
            email: "ram@gmail.com",
            phone: "9800000002",
            semester: "2nd",
            department: "BCA"
        },

        {
            id: 3,
            roll: "BCA003",
            name: "Sita Nepal",
            email: "sita@gmail.com",
            phone: "9800000003",
            semester: "3rd",
            department: "BCA"
        }

    ]);

    /* =========================
       SUBJECTS
    ========================== */

    const [subjects] = useState([

        {
            id: 1,
            name: "Programming Logic & Design",
            semester: "1st"
        },

        {
            id: 2,
            name: "C Programming",
            semester: "2nd"
        },

        {
            id: 3,
            name: "Java",
            semester: "3rd"
        },

        {
            id: 4,
            name: "Web Technology",
            semester: "4th"
        }

    ]);

    /* =========================
       MARKS
    ========================== */

    const [marks] = useState([

        {
            id: 1,
            student: "Hari Sharma",
            subject: "Programming Logic & Design",
            total: 82,
            status: "Submitted"
        },

        {
            id: 2,
            student: "Ram Karki",
            subject: "Java",
            total: 78,
            status: "Submitted"
        },

        {
            id: 3,
            student: "Sita Nepal",
            subject: "Web Technology",
            total: "",
            status: "Pending"
        }

    ]);

    /* =========================
       NOTIFICATIONS
    ========================== */

    const [notifications] = useState([

        "Hari Sharma added successfully",

        "Programming Logic & Design marks submitted",

        "Java subject assigned",

        "Semester Result Published"

    ]);

    /* ========================= */

    return (

        <AppContext.Provider
            value={{
                students,
                setStudents,

                subjects,

                marks,

                notifications
            }}
        >

            {children}

        </AppContext.Provider>

    );

};