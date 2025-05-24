import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://10.0.60.168:5000/api/v1' }),
    endpoints: (builder) => ({
        getAllUnavailableSeats: builder.query({
            query: (id) => ({
                url: `/book/${id}`,
                method: "GET",
            }),
        }),
    }),
})

export const { useGetAllUnavailableSeatsQuery } = baseApi