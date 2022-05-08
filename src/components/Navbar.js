import React from 'react'
import {
  Link
} from "react-router-dom";
import AuthService from "../services/auth-service";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to={props.currentUser ? "/" : "/login"}>NovaLabs</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {
              props.currentUser &&
              (
                <>
                  <div className='navbar-nav mr-auto'>
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="/">Appointments</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="/request">Requests</Link>
                    </li>
                  </div>
                </>
              )
            }
          </ul>
          {
            !props.currentUser &&
            (
              (
                <div className='navbar-nav ml-auto'>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/signup">Sign Up</Link>
                  </li>
                </div>
              )
            )
          }
          {
            props.currentUser &&
            (
              <div className='navbar-nav ml-auto mx-3'>
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={() => { AuthService.logout(); navigate("/login"); window.location.reload(); }}>Logout</button>
                </li>
              </div>
            )
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar