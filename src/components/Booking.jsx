import React, { useState } from "react";
import "./Booking.css";

const Booking = () => {
  const seats = Array.from({ length: 40 });
  const [selectMovie, setSelectMovie] = useState("");
  const [selectSeat, setSelectSeat] = useState([]);
  const [book, setBook] = useState([]);

  const handleSeat = (idx) => {
    setSelectSeat((pre) =>
      pre.includes(idx) ? pre.filter((item) => item !== idx) : [...pre, idx]
    );
  };
  const handleBook = () => {
    const movieBooking = {
      movie: selectMovie,
      seat: selectSeat,
    };
    const index = book.findIndex((item) => item.movie == selectMovie);
    if (index !== -1) {
      let updatedDetails = [...book];
      updatedDetails[index].seat = [
        ...updatedDetails[index].seat,
        ...selectSeat,
      ];
      setBook(updatedDetails);
    } else {
      setBook([...book, movieBooking]);
    }
    setSelectSeat([]);
  };

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
        onChange={(e) => setSelectMovie(e.target.value)}
        className="select"
      >
        <option value={""}>Select a movie</option>
        <option value={"merryChristmas"}>Merry Christmas</option>
        <option value={"captianMiller"}>Captian Miller</option>
        <option value={"mission"}>Mission</option>
        <option value={"ayalan"}>Ayalan</option>
      </select>
      <div className="row">
        {seats.map((item, index) => {
          const updatedDetails = book.filter(
            (item) => item.movie === selectMovie
          );
          console.log(updatedDetails);
          return (
            <button
              key={index + 1}
              onClick={() => handleSeat(index + 1)}
              className={
                selectSeat.includes(index + 1)
                  ? "selectedSeat"
                  : updatedDetails[0] &&
                    updatedDetails[0].seat.includes(index + 1)
                  ? "occupied"
                  : "seats"
              }
              disabled={
                updatedDetails[0] && updatedDetails[0].seat.includes(index + 1)
              }
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <p>{selectSeat && selectSeat.length * 200}</p>
      <button className="book" onClick={handleBook}>
        Book
      </button>
    </div>
  );
};

export default Booking;
