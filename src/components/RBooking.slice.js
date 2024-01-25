import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const URI = "http://localhost:3001";

// export const fetchSeats = createAsyncThunk("book/getSeats", async () => {
//   const data = await axios.get(URI);
//   // return data.data;
// });
// export const bookSeats = createAsyncThunk("book/Bookseats", async (value) => {
//   const res = value
//   const data = await axios.post(URI, res);
//   // return data.data;
// });

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    movie: "",
    seats: [],
    bookedSeats: [],
  },
  reducers: {
    selectMovie: (state, action) => {
      state.movie = action.payload;
    },
    selectSeat: (state, action) => {
      const payload = action.payload;
      const index = state.seats.findIndex((item) => item === payload);
      if (index !== -1) {
        state.seats.splice(index, 1);
      } else {
        state.seats = [...state.seats, payload];
      }
    },
    handleBooked: (state, action) => {
      const booking = {
        movie: state.movie,
        seats: state.seats,
      };
      const index = state.bookedSeats.findIndex(
        (item) => item.movie === state.movie
      );
      if (index !== -1) {
        state.bookedSeats[index].seats = [
          ...state.bookedSeats[index].seats,
          ...state.seats,
        ];
      } else {
        state.bookedSeats = [...state.bookedSeats, booking];
      }
      state.seats = [];
    },
  },
});

export const movie = (state) => state.booking.movie;
export const seats = (state) => state.booking.seats;
export const booked = (state) => state.booking.bookedSeats;
export const { selectMovie, selectSeat, handleBooked } = bookingSlice.actions;
export default bookingSlice.reducer;
