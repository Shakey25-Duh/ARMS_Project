import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherLogin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginTeacher = (e) => {

    e.preventDefault();

    if (username === "teacher" && password === "1234") {

      navigate("/teacher-dashboard", {
        state: {
          message: "Login Successful"
        }
      });

    } else {

      alert("Invalid Username or Password");

    }

  };

  return (

    <div className="login-bg">

      <div className="container">

        <div className="row justify-content-center align-items-center vh-100">

          <div className="col-md-5">

            <div className="card shadow login-card">

              <div className="card-body p-5">

                <h2 className="text-center mb-4">

                  👨‍🏫 Teacher Login

                </h2>

                <form onSubmit={loginTeacher}>

                  <div className="mb-3">

                    <label>Username</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />

                  </div>

                  <div className="mb-4">

                    <label>Password</label>

                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                  </div>

                  <button className="btn btn-success w-100">

                    Login

                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default TeacherLogin;