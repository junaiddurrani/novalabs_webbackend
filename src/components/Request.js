import React, { useEffect, useState } from 'react'
import Spinner from './Spinner'
import authService from '../services/auth-service';
import appointmentsService from '../services/appointments-service';
import RequestItem from './Request_Item';

const Request = () => {

  const [apptmts, setApptmts] = useState([]);

  const [loading, setloading] = useState(true);

  useEffect(() => {
    getAppointments();
    //eslint-disable-next-line
  }, []);

  const getAppointments = async () => {
    setloading(true);
    let sellerId = await authService.getCurrentUserId();
    appointmentsService.getAppointmentsBySeller(sellerId, true).then((response) => {
      setApptmts(response.data)
      setloading(false);
    });
  }

  return (
    <div className='container my-3'>
      <h1 className="text-center" style={{ marginTop: '100px', marginBottom: '40px' }}>Appointments Requests</h1>
      {loading ? <Spinner /> : <div/>}
      <div className="row">
        {
          apptmts.map((element) => {
            return <div className="col-md-3" key={element._id}>
              <RequestItem title={element.title && element.title} description={element.description && element.description} status={element.status && element.status} appointmentTime={element.atime} username={element.username && element.username} isPending = {true} appointmentId={element._id.toString()} />
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Request