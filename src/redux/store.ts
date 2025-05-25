import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './baseApi'
import { selectedSeatsSlice } from './selectedSeats/selectedSeatsSlice'

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        selectedSeats: selectedSeatsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch