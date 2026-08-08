import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function login() {

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
            setError(data.detail || "Invalid email or password");
            return;
        }

        // Save JWT
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

        // Login successful
        navigate("/admin-dashboard");

     } catch (error) {

        console.error(error);

        setError("Cannot connect to backend");

     }
    }

    return (

        <div className="login-bg">

            <div className="container">

                <div className="row justify-content-center align-items-center vh-100">

                    <div className="col-md-5">

                        <div className="card login-card shadow-lg">

                            <div className="card-body p-5">

                                <h2 className="text-center">
                                    Admin Login
                                </h2>

                                <hr />

                                <input
                                    type="email"
                                    className="form-control mb-3"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />

                                <input
                                    type="password"
                                    className="form-control mb-3"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                                <button
                                    className="btn btn-primary w-100"
                                    onClick={login}
                                >
                                    Login
                                </button>

                                {error && (
                                    <p className="text-danger mt-3">
                                        {error}
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default AdminLogin;