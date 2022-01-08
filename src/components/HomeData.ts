import { QuerySummary } from '../types';
import { GLMSummary } from '../types';
import axios, { AxiosResponse } from 'axios';
import { useReducer } from 'react';

////////////////////////
////////////// API Data
////////////////////////

export const fetchSummaries = async (query: QuerySummary): Promise<GLMSummary[]> => {
  const { data }: AxiosResponse<GLMSummary[]> = await axios.request({
    method: 'get',
    url: 'http://localhost:8000/modelsummary/regression/',
    params: query
  });

  return data;
};

// somewhat loose with the unions here
// so that this interface can be used more places
export interface apiFetchResult<T> {
  status: 'NONE' | 'SUCCESS' | 'FAIL';
  data: T | undefined;
  error: string;
  lastUpdated: number;
}

export type apiFetchAction<T> =
  | { type: 'NONE' }
  | { type: 'FETCH_SUCCESS'; data: T | undefined; time: number }
  | { type: 'FETCH_ERROR'; error: string; time: number };

const summaryDataOnMount: apiFetchResult<GLMSummary[]> = {
  status: 'NONE',
  data: undefined,
  error: '',
  lastUpdated: 0
};

export const fetchActionTemplate: apiFetchAction<GLMSummary[]> = {
  type: 'NONE'
};

// fetching model summary data
export const reducerSummaryData = (
  state: HomeState['summaryData'],
  action: apiFetchAction<GLMSummary[]>
): HomeState['summaryData'] => {
  switch (action.type) {
    case 'NONE':
      return state;
    case 'FETCH_SUCCESS':
      return {
        ...state,
        status: 'SUCCESS',
        data: action.data,
        error: '',
        lastUpdated: action.time
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        status: 'FAIL',
        error: action.error,
        lastUpdated: action.time
      };
  }
};

////////////////////////
////////////// Button Events
////////////////////////

export type ApprovedButtonSources =
  | 'NONE'
  | 'DRAWER.MODEL_IMPORT'
  | 'HOME.FETCH_INIT'
  | 'HOME.FETCH_SUCCESS'
  | 'HOME.FETCH_ERROR';
export type ApprovedButtonActions = 'NONE' | 'FETCH_INIT';

export interface ButtonClickEvent {
  buttonId: ApprovedButtonSources;
  purposeOfClick: ApprovedButtonActions;
  timeOfClick: number;
}

export const buttonClickEventTemplate: ButtonClickEvent = {
  buttonId: 'NONE',
  purposeOfClick: 'NONE',
  timeOfClick: 0
};

// add checks later for approved actions (relying on typing to catch issue for now)
interface ApprovedActivity {
  approvedSources: {
    drawer: {
      modelImportButton: 'DRAWER.MODEL_IMPORT';
    };
    home: {
      fetchInitButton: 'HOME.FETCH_INIT';
      fetchSuccessButton: 'HOME.FETCH_SUCCESS';
      fetchErrorButton: 'HOME.FETCH_ERROR';
    };
  };
  approvedActions: {
    fetchSummaryData: 'FETCH_INIT';
  };
}

// for autocompletion
export const approvedActivity: ApprovedActivity = {
  approvedSources: {
    drawer: {
      modelImportButton: 'DRAWER.MODEL_IMPORT'
    },
    home: {
      fetchInitButton: 'HOME.FETCH_INIT',
      fetchSuccessButton: 'HOME.FETCH_SUCCESS',
      fetchErrorButton: 'HOME.FETCH_ERROR'
    }
  },
  approvedActions: {
    fetchSummaryData: 'FETCH_INIT'
  }
};

export interface HomeState {
  //   summaryData: GLMSummary[] | undefined;
  summaryData: apiFetchResult<GLMSummary[]>;
  buttonClick: ButtonClickEvent;
}

export const homeStateOnMount: HomeState = {
  summaryData: summaryDataOnMount,
  buttonClick: {
    buttonId: 'NONE',
    purposeOfClick: 'NONE',
    timeOfClick: 0
  }
};
