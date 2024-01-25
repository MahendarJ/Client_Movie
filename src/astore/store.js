import { configureStore } from "@reduxjs/toolkit";
import  bookingSlice  from "../components/RBooking.slice";

export const store = configureStore({
    reducer:{
        booking:bookingSlice
    }
})