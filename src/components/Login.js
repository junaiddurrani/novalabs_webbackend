import React from 'react'
import { useState } from 'react';
import AuthService from "../services/auth-service";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateAndSubmit = async (e) => {
    try {
      await AuthService.login(email, password).then(
        (response) => {
          console.log(response);
          navigate("/");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5">

                <div className="mb-md-5 mt-md-4 pb-5">

                  <div className="container">
                    <div className="row">
                      <div className="col text-center">
                        <h2 className="fw-bold mb-2">NovaLabs Test</h2>
                        <p className="text-white-50 mb-5">Please enter your login credentials!</p>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input type="email" value={email} onChange={evt => { setEmail(evt.target.value) }} className="form-control form-control-lg" />
                    <label className="form-label mt-2 mx-2" htmlFor="typeEmailX">Email</label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input type="password" value={password} onChange={evt => { setPassword(evt.target.value) }} className="form-control form-control-lg" />
                    <label className="form-label mt-2 mx-2" htmlFor="typePasswordX">Password</label>
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col text-center">
                        <button className="btn btn-outline-light btn-lg px-5 w-50" onClick={() => { validateAndSubmit() }} type="submit">Login</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login