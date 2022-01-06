import { QuerySummary } from '../types';
import { GLMSummary } from '../types';
import axios, { AxiosResponse } from 'axios';
import { useReducer } from 'react';

// view calculations
export const fetchSummaries = async (query: QuerySummary): Promise<GLMSummary[]> => {
  const { data }: AxiosResponse<GLMSummary[]> = await axios.request({
    method: 'get',
    url: 'http://localhost:8000/modelsummary/regression/',
    params: query
  });

  return data;
};

export interface apiFetchResult<T> {
  status: 'NONE' | 'FETCH' | 'SUCCESS' | 'FAIL';
  data: T | undefined;
  error: string;
  timeOfRequest: number;
}

export type apiFetchAction<T> =
  | { type: 'FETCH_INIT'; data: T | undefined; timeOfRequest: number }
  | { type: 'FETCH_SUCCESS'; data: T | undefined }
  | { type: 'FETCH_ERROR'; data: T | undefined; error: string };

const summaryDataOnMount: apiFetchResult<GLMSummary[]> = {
  status: 'NONE',
  data: [],
  error: '',
  timeOfRequest: 0
};

export const fetchActionTemplate: apiFetchAction<GLMSummary[]> = {
  type: 'FETCH_INIT',
  data: [],
  timeOfRequest: 0
};

// fetching model summary data
export const reducerSummaryData = (
  state: HomeState['summaryData'],
  action: apiFetchAction<GLMSummary[]>
): HomeState['summaryData'] => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        timeOfRequest: action.timeOfRequest,
        status: 'FETCH',
        data: action.data,
        error: ''
      };
    case 'FETCH_SUCCESS':
      return { ...state, status: 'SUCCESS', data: action.data, error: '' };
    case 'FETCH_ERROR':
      return { ...state, status: 'FAIL', data: action.data, error: action.error };
  }
};

// view interfaces

// mention of iterating through union types @ shorturl.at/jwxWY
// type ButtonSources =
//   | 'NONE'
//   | 'DRAWER.MODEL_IMPORT'
//   | 'HOME.FETCH_INIT'
//   | 'HOME.FETCH_SUCCESS'
//   | 'HOME.FETCH_ERROR';

// specified as an object instead of a type to allow autocomplete inside JSX
export const btnSources = {
  drawer: {
    modelImport: 'DRAWER.MODEL_IMPORT'
  },
  home: {
    fetchInit: 'HOME.FETCH_INIT',
    fetchSuccess: 'HOME.FETCH_SUCCESS',
    fetchError: 'HOME.FETCH_ERROR',
    updateCount: 'HOME.UPDATE_COUNT'
  }
};

export interface HomeState {
  //   summaryData: GLMSummary[] | undefined;
  summaryData: apiFetchResult<GLMSummary[]>;
  clickedBtnSource: {
    drawer: string; // be more specific later on
    home: string; // be more specific later on
  };
}

export const homeStateOnMount: HomeState = {
  summaryData: summaryDataOnMount,
  clickedBtnSource: {
    drawer: 'NONE',
    home: 'NONE'
  }
};

// view reducers
