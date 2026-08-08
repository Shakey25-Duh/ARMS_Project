import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                setError(
                    data.detail || "Invalid Email or Password"
                );

                return;
            }

            // Save JWT token
            localStorage.setItem(
                "access_token",
                data.access_token
            );

            // Save user information
            localStorage.setItem(
                "username",
                data.username
            );

            localStorage.setItem(
                "role",
                data.role
            );

            // Redirect based on role
            if (data.role === "admin") {

                navigate("/admin-dashboard");

            } else if (data.role === "teacher") {

                navigate("/teacher-dashboard");

            } else if (data.role === "student") {

                navigate("/student-dashboard");

            }

        } catch (error) {

            console.error(error);

            setError("Cannot connect to backend");

        }
    };

    return (

        <div className="login-bg">

            <div className="container">

                <div className="row justify-content-center align-items-center vh-100">

                    <div className="col-md-5">

                        <div className="card shadow-lg border-0">

                            <div className="card-body p-5">

                                <div className="text-center mb-4">

                                    <h1 className="fw-bold">
                                         ARMS
                                    </h1>

                                    <h4>
                                        Academic Result Management System
                                    </h4>

                                    <p className="text-muted">
                                        Pokhara University
                                    </p>

                                </div>

                                <form onSubmit={handleLogin}>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter Email"
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

                                    {error && (
                                        <div className="alert alert-danger">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        className="btn btn-primary w-100"
                                        type="submit"
                                    >
                                        Login
                                    </button>

                                </form>

                                <hr />

                                <div className="text-center">

                                    <small>
                                        Login using your assigned college credentials.
                                    </small>

                                </div>

                            </div>

                        </div>

                        <div className="text-center text-white mt-4">

                            <small>

                                © 2026 Academic Result Management System

                                <br />

                                Pokhara University

                            </small>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Home;