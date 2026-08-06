import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {

        e.preventDefault();

        // Demo Login
        if (
            email === "student@arms.com" &&
            password === "student123"
        ) {

            navigate("/student-dashboard");

        } else {

            setError("Invalid Email or Password");

        }

    };

    return (

        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "#f4f6f9"
            }}
        >

            <div
                className="card shadow p-4"
                style={{
                    width: "420px",
                    borderRadius: "15px"
                }}
            >

                <div className="text-center mb-4">

                    <h2 className="text-primary">

                        Student Login

                    </h2>

                    <p className="text-muted">

                        Academic Result Management System

                    </p>

                </div>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label className="form-label">

                            College Email

                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="student@arms.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Password

                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    {

                        error && (

                            <div className="alert alert-danger py-2">

                                {error}

                            </div>

                        )

                    }

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >

                        Login

                    </button>

                </form>

                <hr />

                <div className="text-center">

                    <small className="text-muted">

                        Demo Login

                    </small>

                    <br />

                    <small>

                        Email :

                        <b> student@arms.com </b>

                    </small>

                    <br />

                    <small>

                        Password :

                        <b> student123 </b>

                    </small>

                </div>

            </div>

        </div>

    );

}

export default StudentLogin;