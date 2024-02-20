import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//Créez un objet (cryptoApiHeaders) contenant les en-têtes requis pour effectuer des requêtes à l'API Coinranking.
const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'fdf5c7a72dmsh0b7ae1cc719fcecp19f3a0jsnf3d42c8095c7',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
};
const createRequest = (url) => ({ url:'https://coinranking1.p.rapidapi.com/coins', headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl:'https://coinranking1.p.rapidapi.com/coins'}),
  //We specify what kind of data we want from the external service. For example, we want a list of cryptocurrencies or historical data of a specific cryptocurrency.
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) =>  createRequest('/coins',count),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),
  
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
