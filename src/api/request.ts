import axios, { Method, AxiosResponse, AxiosInstance } from 'axios';
// axios.defaults.adapter = require('axios/lib/adapters/http'); // enable when testing in Quokka.js

const api: AxiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_HOST_BACKEND,
  baseURL: 'http://localhost:8000/',
});

export const request = <T>(method: Method, url: string, params: unknown): Promise<AxiosResponse<T, unknown>> => {
  return api.request<T>({
    method,
    url,
    params,
  });
};
