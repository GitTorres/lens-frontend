import axios, { AxiosResponse } from 'axios';
import { GLMSummary, paramsGetSummary } from '../types';
// axios.defaults.adapter = require('axios/lib/adapters/http'); // enable when testing in Quokka.js

// GET regression summary data
// export const getSummary = async (query: paramsGetSummary): Promise<GLMSummary[]> => {
//   const { data }: AxiosResponse<GLMSummary[]> = await axios.request({
//     method: 'get',
//     url: 'http://localhost:8000/modelsummary/regression/',
//     params: query
//   });

//   return data;
// };
