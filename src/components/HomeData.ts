import { QuerySummary } from '../types';
import { GLMSummary } from '../types';
import axios, { AxiosResponse } from 'axios';
import { useReducer } from 'react';

// view calculations
export const homeFetchSummaries = async (
  query: QuerySummary
): Promise<GLMSummary[]> => {
  const { data }: AxiosResponse<GLMSummary[]> = await axios.request({
    method: 'get',
    url: 'http://localhost:8000/modelsummary/regression/',
    params: query
  });

  return data;
};

// view interfaces
export interface FetchState<T> {
  status: 'none' | 'fetching' | 'success' | 'failure';
  data: T | undefined;
  error: string;
}

export type FetchAction<T> =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; data: T }
  | { type: 'FETCH_ERROR'; error: string };

export interface HomeState {
  //   summaryData: GLMSummary[] | undefined;
  summaryData: FetchState<GLMSummary[]>;
}

export const summaryDataDefault: FetchState<GLMSummary[]> = {
  status: 'none',
  data: [],
  error: ''
};

// view reducers
export const fetchSummaryData = (
  state: HomeState['summaryData'],
  action: FetchAction<GLMSummary[]>
): HomeState['data'] => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, status: 'fetching', error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, status: 'success', data: action.data, error: '' };
    case 'FETCH_ERROR':
      return { ...state, status: 'failure', error: action.error };
  }
};
