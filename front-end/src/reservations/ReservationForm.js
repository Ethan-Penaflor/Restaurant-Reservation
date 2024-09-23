import React from "react";
import { Link } from "react-router-dom";

export default function ReservationForm({
  reservation,
  handleChange,
  handleSubmit,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">First Name</label>
          <div className="col-sm-8">
            <input
              type="text"
              name="first_name"
              className="form-control"
              id="first_name"
              placeholder="First Name"
              onChange={handleChange}
              value={reservation.first_name} // Removed template literal
              required={true}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Last Name</label>
          <div className="col-sm-8">
            <input
              type="text"
              name="last_name"
              className="form-control"
              id="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              value={reservation.last_name} // Removed template literal
              required={true}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Mobile Number</label>
          <div className="col-sm-8">
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" // Updated pattern for format
              name="mobile_number"
              className="form-control"
              id="mobile_number"
              placeholder="(800) 555-1212"
              onChange={handleChange}
              value={reservation.mobile_number} // Removed template literal
              required={true}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Date of Reservation</label>
          <div className="col-sm-8">
            <input
              type="date"
              name="reservation_date"
              className="form-control"
              id="reservation_date"
              onChange={handleChange}
              value={reservation.reservation_date} // Removed template literal
              required={true}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Time of Reservation</label>
          <div className="col-sm-8">
            <input
              type="time"
              name="reservation_time"
              className="form-control"
              id="reservation_time"
              onChange={handleChange}
              value={reservation.reservation_time} // Removed template literal
              required={true}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Party Size</label>
          <div className="col-sm-8">
            <input
              type="number"
              name="people"
              className="form-control"
              id="people"
              placeholder="Party Size"
              onChange={handleChange}
              value={reservation.people} // Removed template literal
              min="1"
              required={true}
            />
          </div>
        </div>
        <div className="text-center">
          <Link to={"/"}>
            <button type="button" className="btn btn-dark btn-lg mr-3">Cancel</button>
          </Link>
          <button className="btn btn-outline-dark btn-lg" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
