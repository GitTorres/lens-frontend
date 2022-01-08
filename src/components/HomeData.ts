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
  status: 'NONE' | 'FETCH' | 'SUCCESS' | 'FAIL';
  data: T | undefined;
  error: string;
  timeOfRequest: number;
}

export type apiFetchAction<T> =
  | { type: 'FETCH_INIT'; timeOfRequest: number }
  | { type: 'FETCH_SUCCESS'; data: T | undefined }
  | { type: 'FETCH_ERROR'; error: string };

const summaryDataOnMount: apiFetchResult<GLMSummary[]> = {
  status: 'NONE',
  data: undefined,
  error: '',
  timeOfRequest: 0
};

export const fetchActionTemplate: apiFetchAction<GLMSummary[]> = {
  type: 'FETCH_INIT',
  timeOfRequest: 0
};

// fetching model summary data
export const reducerSummaryData = (
  state: HomeState['summaryData'],
  action: apiFetchAction<GLMSummary[]>
): HomeState['summaryData'] => {
  const isTooSoonForNewRequest = new Date().getTime() - state.timeOfRequest < 1000;
  console.log(isTooSoonForNewRequest);

  if (isTooSoonForNewRequest) return state;
  else {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          timeOfRequest: action.timeOfRequest,
          status: 'FETCH'
        };
      case 'FETCH_SUCCESS':
        return { ...state, status: 'SUCCESS', data: action.data, error: '' };
      case 'FETCH_ERROR':
        return { ...state, status: 'FAIL', error: action.error };
    }
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
