import React from "react";
import appointmentsService from '../services/appointments-service';

const RequestItem = (props) => {

    let { title, description, status, appointmentTime, username, isPending, appointmentId } = props;

    const updateAppointment = async (myStatus) => {
        appointmentsService.updateAppointmentBySeller(myStatus, appointmentId).then((response) => {
            window.location.reload(false)
        })
    }

    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-header">
                {username}
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Title: </strong>{title}</li>
                <li className="list-group-item"><strong>Description: </strong>{description}</li>
                <li className="list-group-item"><strong>Appointment Date: </strong>{appointmentTime}</li>
                {
                    isPending ?
                        <div className="container my-2">
                            <div className="row">
                                <button className="btn btn-success col-sm mx-2" onClick={() => updateAppointment('Accepted')}>Accept</button>
                                <button className="btn btn-danger col-sm mx-2" onClick={() => updateAppointment('Rejected')}>Reject</button>
                            </div>
                        </div>
                        :
                        <li className="list-group-item"><strong>Status: </strong>{status}</li>
                }
            </ul>
        </div>
    );
}
export default RequestItem;