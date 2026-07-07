import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Shared RTK Query base for browser-to-BFF calls.
 * Domain APIs inject their endpoints into this base and never call a backend
 * microservice directly.
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: [],
  endpoints: () => ({}),
});
