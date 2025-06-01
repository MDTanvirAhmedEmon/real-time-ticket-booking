import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Seat {
    seat: string;
    date: string; // Store the date as an ISO string
}

interface SeatsState {
    seats: Seat[];
}

const initialState: SeatsState = {
    seats: [],
};

export const selectedSeatsSlice = createSlice({
    name: 'seats',
    initialState,
    reducers: {
        selectedSeatsRedux: (state, action: PayloadAction<string>) => {
            const seatId = action.payload;
            const seatFound = state.seats.find((s) => s.seat === seatId);

            if (seatFound) {
                // If the seat exists, remove it
                state.seats = state.seats.filter((s) => s.seat !== seatId);
            } else {
                // If the seat does not exist, add it with the current time as an ISO string
                state.seats.push({
                    seat: seatId,
                    date: new Date().toISOString(), // Store the date as a string (ISO format)
                });
            }
        },
        removeSeats: (state, action: PayloadAction<Seat>) => {
            // Remove the seat based on the seat id passed in the payload
            state.seats = state.seats.filter((s) => s.seat !== action.payload.seat);
        },
        removeSeatById: (state, action: PayloadAction<string>) => {
            state.seats = state.seats.filter((s) => s.seat !== action.payload);
        }

    },
});

export const { selectedSeatsRedux, removeSeats, removeSeatById } = selectedSeatsSlice.actions;

export default selectedSeatsSlice.reducer;
