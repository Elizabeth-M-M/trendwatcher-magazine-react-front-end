import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Form responsible for login
const Login = ({ handleUser }) => {
  const navigator = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [loginFormData, setFormData] = useState({
    username: "",
    password: "",
  });
  // Monitors change in form input and sets them to state under the variable loginFormData
  function handleInputs(event) {
    setIsChecked(event.target.checked);
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...loginFormData,
      [name]: value,
    });
  }
  // This POST request looks for a user in the database with matching username and password and logs in a user to the program
  function handleSubmit(event) {
    event.preventDefault();
    let userSession;
    // The checkbox distinguishes a  user logging in or an editor logging in
    if (isChecked == true) {
      userSession = "editor";
    } else {
      userSession = "user";
    }
    // console.log(userSession);

    fetch(`https://trial1-cksf.onrender.com/login/${userSession}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginFormData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => handleUser(user));
        setFormData({
          username: "",
          email: "",
          password: "",
          password_confirmation: "",
        });
        navigator("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="text-center form-body">
      <div className="container ">
        <div className="py-5"></div>
        <div className="col-md-6 col-10 m-auto">
          <form
            className="row g-3 needs-validation faded-bg-light theme-light-mellow-color"
            onSubmit={handleSubmit}
            novalidate
          >
            <div className="col-md-6">
              <label htmlFor="username" className="form-label fw-bold">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                onChange={handleInputs}
                name="username"
                value={loginFormData.username}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={handleInputs}
                name="password"
                value={loginFormData.password}
                required
              />
            </div>
            <div className="col-6 m-auto pt-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                  onChange={handleInputs}
                />
                <label className="form-check-label fw-bold" for="gridCheck">
                  Sign in as Editor
                </label>
              </div>
            </div>
            <Link to="/signup">Don't have an account?</Link>
            <div className="col-12">
              <button type="submit" className="btn-style">
                Log in
              </button>
            </div>
            <ul>
              {errors.length > 0
                ? errors.map((err) => (
                    <li key={err} className="error-list">
                      {err}
                    </li>
                  ))
                : null}
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
