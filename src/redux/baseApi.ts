import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://10.0.60.168:5000/api/v1' }),
    baseQuery: fetchBaseQuery({ baseUrl: 'https://real-time-ticket-booking-server.onrender.com/api/v1' }),
    endpoints: (builder) => ({
        getAllUnavailableSeats: builder.query({
            query: (id) => ({
                url: `/book/${id}`,
                method: "GET",
            }),
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: "/users/create-user",
                method: "POST",
                body: data,
            }),
        }),

        logIn: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
        }),
    }),
})

export const { useGetAllUnavailableSeatsQuery, useRegisterUserMutation, useLogInMutation } = baseApi