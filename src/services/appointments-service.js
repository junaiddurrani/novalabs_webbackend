import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:5000/api/appointments";

const getAppointmentsBySeller = (sellerId, isPending) => {
  return isPending ? axios.get(
      API_URL + '/getpendingappointments/' + sellerId,
      {
          headers: authHeader()
      }
  ) : axios.get(
      API_URL + '/getappointments/' + sellerId,
      {
          headers: authHeader()
      }
  );
};

const updateAppointmentBySeller = (status, appointmentId) => {
  return axios.post(
      API_URL + '/updateappointment/' + appointmentId, {status: status},
      {
          headers: authHeader()
      }
    );
};

const appointmentsService = {
  getAppointmentsBySeller,
  updateAppointmentBySeller,
};

export default appointmentsService;