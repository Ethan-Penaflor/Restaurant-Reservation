import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

export default function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  
  const initialFormData = useRef({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  const [formData, setFormData] = useState(initialFormData.current);
  const [errorArray, setErrorArray] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const loadReservation = async () => {
      try {
        let recallReservation = await readReservation(
          reservation_id,
          abortController.signal
        );
        recallReservation.reservation_date = 
          recallReservation.reservation_date.split("T")[0];

        initialFormData.current = {
          first_name: recallReservation.first_name,
          last_name: recallReservation.last_name,
          mobile_number: recallReservation.mobile_number,
          reservation_date: recallReservation.reservation_date, // Ensure format is YYYY-MM-DD
          reservation_time: recallReservation.reservation_time,
          people: recallReservation.people,
        };
        
        setFormData(initialFormData.current);
      } catch (error) {
        setErrorArray([error.message]);
      }
    };

    loadReservation();
    return () => abortController.abort();
  }, [reservation_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    formData.people = Number(formData.people); // Convert people to a number

    try {
      // Ensure reservation_date is in the correct format (YYYY-MM-DD)
      const updatedReservation = {
        ...formData,
        reservation_date: new Date(formData.reservation_date).toISOString().split('T')[0],
      };
      
      await updateReservation(updatedReservation, reservation_id, abortController.signal);
      history.push(`/dashboard?date=${updatedReservation.reservation_date}`);
    } catch (error) {
      setErrorArray([error.message]);
    }
  };

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <div>
      <h1>Edit Reservation</h1>
      <div>
        <ErrorAlert error={errorArray} />
      </div>
      <div>
        <ReservationForm
          handleChange={handleChange}
          reservation={formData}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
