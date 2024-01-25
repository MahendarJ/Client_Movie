import React from "react";
import "./Booking.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMovie,
  selectSeat,
  handleBooked,
  movie,
  seats,
  booked,
  bookSeats,
} from "./RBooking.slice";

const RBooking = () => {
  const dispatch = useDispatch();
  const seatsState = useSelector(seats);
  const movieState = useSelector(movie);
  const bookedState = useSelector(booked);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <select
        onChange={(e) => dispatch(selectMovie(e.target.value))}
        className="select"
      >
        <option value={""}>Select option</option>
        <option value={"bahubali"}>Bahubali</option>
        <option value={"ko"}>Ko</option>
        <option value={"kaithi"}>kaithi</option>
        <option value={"dheeran"}>Dheeran</option>
      </select>
      <div className="row">
        {Array.from({ length: 40 }, (_, index) => {
          const idx = index + 1;
          const occupiedMovie = bookedState.filter(
            (item) => item.movie === movieState
          );
          return (
            <button
              key={idx}
              className={
                seatsState.includes(idx)
                  ? "selectedSeat"
                  : occupiedMovie[0] && occupiedMovie[0].seats.includes(idx)
                  ? "occupied"
                  : "seats"
              }
              onClick={() => dispatch(selectSeat(idx))}
              disabled={
                occupiedMovie[0] && occupiedMovie[0].seats.includes(idx)
              }
            >
              {idx}
            </button>
          );
        })}
      </div>
      <p>{seatsState.length * 200}</p>
      <button className="book" onClick={() => dispatch(handleBooked())}>Book</button>
      {/* <button
        className="book"
        onClick={() => dispatch(bookSeats({ movieState, seatsState }))}
      >
        Book
      </button> */}
    </div>
  );
};

export default RBooking;
