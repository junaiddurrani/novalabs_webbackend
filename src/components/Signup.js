import React from 'react'
import { useState } from 'react';
import AuthService from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import { components } from "react-select";
import Select from "react-select";
import { timeOptions } from './timeoptions';

const Signup = () => {

  const [timeSlot, setTimeSlot] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const navigate = useNavigate();

  const takeAppointmentInput = async (value) => {
    setTimeSlots(value);
  }

  const validateAndSubmit = async () => {
    let myArray = [];
    for (let index = 0; index < timeSlots.length; index++) {
      myArray.push({'timeslot': timeSlots[index].label}); 
    }
    try {
      await AuthService.signup(email, password, name, designation, myArray).then(
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
          <div className="col-6 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5">

                <div className="mb-1 mt-30 pb-0">

                  <div className="container">
                    <div className="row">
                      <div className="col text-center">
                        <h2 className="fw-bold mb-2">NovaLabs Test</h2>
                        <p className="text-white-50 mb-5">Please enter your signup credentials!</p>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input type="text" value={name} onChange={evt => { setName(evt.target.value) }} className="mt-2 form-control form-control-lg" placeholder="Name" aria-label="Name" />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input type="email" value={email} onChange={evt => { setEmail(evt.target.value) }} className="mt-2 form-control form-control-lg" placeholder="Email" aria-label="Email" />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input type="password" value={password} onChange={evt => { setPassword(evt.target.value) }} className="mt-2 form-control form-control-lg" placeholder="Password" aria-label="Password" />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input type="text" value={designation} onChange={evt => { setDesignation(evt.target.value) }} className="mt-2 form-control form-control-lg" placeholder="Designation" aria-label="Designation" />
                  </div>

                  {/* <div className="form-outline form-white mb-4">
                    <div className="input-group mb-3">
                      <input type="text" value={timeSlot} onChange={evt => { setTimeSlot(evt.target.value) }} className="form-control form-control-lg" placeholder="Appointment Time Slot" aria-label="Appointment Time Slot" />
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary" style={{ height: 50 }} onClick={() => takeAppointmentInput()} type='submit' >Add</button>
                      </div>
                    </div>
                  </div> */}

                  <div className="form-outline form-white mb-4">
                    <Select
                      options={timeOptions}
                      components={{
                        Option
                      }}
                      placeholder='Select Appointment Times'
                      isMulti
                      onChange={event => {
                        if (event !== timeSlots) {
                          takeAppointmentInput(event)
                        }
                      }
                      }
                    />
                  </div>

                  <div className="container">
                    <div className="row">
                      <div className="col text-center">
                        <button className="btn btn-outline-light btn-lg px-5 w-70" onClick={() => { validateAndSubmit() }} type="submit">Create Account</button>
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

export default Signup

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <label style={{ color: 'black' }}>{props.label}</label>
      </components.Option>
    </div>
  );
};