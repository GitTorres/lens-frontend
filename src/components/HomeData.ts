import { QuerySummary } from '../types';
import { GLMSummary } from '../types';
import axios, { AxiosResponse } from 'axios';

////////////////////////
////////////// API Data
////////////////////////

export const fetchSummaries = async (query: QuerySummary): Promise<GLMSummary[]> => {
  const { data }: AxiosResponse<GLMSummary[]> = await axios.request({
    method: 'get',
    url: 'http://api.lensview.io/modelsummary/regression/',
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

//////////////////////////////////////
////////////// Selected Model Details
/////////////////////////////////////

const modelDetailOnMount: GLMSummary = {
  name: '',
  desc: '',
  target: '',
  prediction: '',
  var_weights: '',
  link_function: '',
  error_dist: '',
  explained_variance: 0,
  feature_summary: []
};

//////////////////////////
///////////////// App Context
/////////////////////////

// app context for drawer
export interface AppContextDrawer {
  updateLastClicked: ButtonCallback;
  modelNames: string[];
}

////////////////////////
////////////// Button Events
////////////////////////

// eslint-disable-next-line max-len
// createContext requires an interface matching what will be passed to the Context Provider
export type ButtonCallback = (
  { buttonId, buttonKey, purposeOfClick }: Omit<ButtonClickEvent, 'timeOfClick'>,
  event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
) => void;

export type ApprovedButtonSources = 'NONE' | 'DRAWER.MODEL_IMPORT' | 'DRAWER.MODEL_NAME';
export type ApprovedButtonActions = 'NONE' | 'FETCH' | 'SHOW_MODEL';

export interface ButtonClickEvent {
  buttonId: ApprovedButtonSources;
  buttonKey?: string | undefined;
  purposeOfClick: ApprovedButtonActions;
  timeOfClick: number;
}

export const buttonClickEventOnMount: ButtonClickEvent = {
  buttonId: 'NONE',
  purposeOfClick: 'NONE',
  timeOfClick: 0
};

// add checks later for approved actions (relying on typing to catch issue for now)
interface ApprovedActivity {
  approvedSources: {
    drawer: {
      modelImportButton: 'DRAWER.MODEL_IMPORT';
      modelNameButton: 'DRAWER.MODEL_NAME';
    };
  };
  approvedActions: {
    fetchSummaryData: 'FETCH';
    showModelDetails: 'SHOW_MODEL';
  };
}

// for autocompletion
export const approvedActivity: ApprovedActivity = {
  approvedSources: {
    drawer: {
      modelImportButton: 'DRAWER.MODEL_IMPORT',
      modelNameButton: 'DRAWER.MODEL_NAME'
    }
  },
  approvedActions: {
    fetchSummaryData: 'FETCH',
    showModelDetails: 'SHOW_MODEL'
  }
};

export interface HomeState {
  //   summaryData: GLMSummary[] | undefined;
  summaryData: apiFetchResult<GLMSummary[]>;
  buttonClick: ButtonClickEvent;
  modelDetail: GLMSummary;
}

export const homeStateOnMount: HomeState = {
  summaryData: summaryDataOnMount,
  buttonClick: buttonClickEventOnMount,
  modelDetail: modelDetailOnMount
};
