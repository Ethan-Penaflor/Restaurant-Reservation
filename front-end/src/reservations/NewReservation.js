import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { postReservations } from "../utils/api";
import { today } from "../utils/date-time";
import ReservationForm from "./ReservationForm";

function NewReservation() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [reservationError, setReservationError] = useState([]);

  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    
    try {
      let rsvp = {
        ...formData,
        reservation_date: new Date(formData.reservation_date).toISOString().split('T')[0], // Ensure it's YYYY-MM-DD
        people: Number(formData.people),
      };
      const response = await postReservations(rsvp);
      
      // Log response for debugging
      console.log("Response from postReservations:", response);
  
      setFormData(initialFormState);
      history.push(`/dashboard?date=${rsvp.reservation_date}`);
    } catch (error) {
      setReservationError([...reservationError, error.message]);
      console.error("Error creating reservation:", error);
    }
  }

  return (
    <section>
      <div>
        <h2>Reservation</h2>
        <ErrorAlert error={reservationError} />
        <ReservationForm
          reservation={formData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
    </section>
  );
}

export default NewReservation;
