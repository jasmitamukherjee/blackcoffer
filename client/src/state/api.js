import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = process.env.REACT_APP_BASE_URL

export const api = createApi({
  baseQuery: fetchBaseQuery({ 
baseUrl: BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: ['Data'],
  endpoints: (build) => ({
    getData: build.query({
      query: (id) => {
        // Log the id to ensure it is being passed correctly
        console.log('Fetching data for ID:', id);
        return `general/data/${id}`;
      },
      providesTags: ['Data'],
    }),
  }),
});

// Log the base URL to ensure it's being set correctly

export const { useGetDataQuery } = api;
