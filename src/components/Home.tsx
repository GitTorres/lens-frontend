import React, { useState, useReducer, useEffect, useMemo, useCallback } from 'react';
import DrawerAndAppBar from '../components/DrawerAndAppBar';
import AutoGrid from '../components/Grid';
import Box from '@mui/material/Box';
import { Button, ButtonGroup } from '@mui/material';
import {
  reducerSummaryData,
  homeStateOnMount,
  approvedActivity,
  ButtonClickEvent,
  fetchSummaries
} from './HomeData';
import { FeatureSummary, GLMSummary } from '../types';

export const { approvedActions, approvedSources } = approvedActivity;

// eslint-disable-next-line max-len
// createContext requires an interface matching what will be passed to the Context Provider
type ButtonCallback = (
  { buttonId, buttonKey, purposeOfClick }: Omit<ButtonClickEvent, 'timeOfClick'>,
  event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
) => void;

// app context for drawer
interface AppContextDrawer {
  updateLastClicked: ButtonCallback;
  modelNames: string[];
}

export const AppContextDrawer = React.createContext<AppContextDrawer>({
  updateLastClicked: () => {
    return {};
  },
  modelNames: []
});

// app context for plots

interface AppContextGridPlots {
  modelDetail: GLMSummary | undefined;
}

export const AppContextGridPlots = React.createContext<AppContextGridPlots>({
  modelDetail: undefined
});

const Home = () => {
  // button click tracker
  const [buttonClickEvent, setButtonClickEvent] = useState(
    homeStateOnMount.buttonClick
  );

  // button click tracker update
  const updateLastClicked: ButtonCallback = useCallback(
    ({ buttonId, buttonKey, purposeOfClick }, event) => {
      event.preventDefault();

      console.log('home: re-render due to button click');

      setButtonClickEvent({
        buttonId: buttonId,
        buttonKey: buttonKey ? buttonKey : 'NONE', // explore other ways to set this
        purposeOfClick: purposeOfClick,
        timeOfClick: new Date().getTime()
      });
    },
    []
  );

  // async data fetch reducer
  const [summaryData, summaryDataDispatch] = useReducer(
    reducerSummaryData,
    homeStateOnMount.summaryData
  );

  // model names for drawer
  const getModelNames = useCallback((): string[] => {
    const modelSummaries = summaryData.data;
    return modelSummaries ? modelSummaries.map((model) => model.name) : [];
  }, [summaryData.data]);

  // model details
  const [modelDetail, setModelDetail] = useState<GLMSummary | undefined>(
    homeStateOnMount.modelDetail
  );

  // const getModelDetails = useCallback((): GLMSummary | undefined => {
  //   const response = summaryData?.data
  //     ?.filter((model) => model.name == buttonClickEvent.buttonKey)
  //     .pop();

  //   return response;
  // }, [buttonClickEvent.buttonKey, summaryData.data]);

  // handle effects of button clicks
  useEffect(() => {
    switch (buttonClickEvent.purposeOfClick) {
      case 'FETCH': {
        const currentTime = new Date().getTime();

        // proceed with fetch if no cooldown
        if (currentTime - summaryData.lastUpdated > 2000) {
          fetchSummaries({
            name: '',
            desc: '',
            min_explained_variance: 0,
            max_explained_variance: 1,
            features: []
          }).then((data) => {
            summaryDataDispatch({
              type: 'FETCH_SUCCESS',
              data: data,
              time: currentTime
            });
          });
          console.log('home: re-render due to status change');
        }

        return;
      }
      case 'SHOW_MODEL': {
        // update selected feature summary variable
        const getModelDetails = (modelName: string): GLMSummary | undefined => {
          const response = summaryData?.data
            ?.filter((model) => model.name == modelName)
            .pop();

          return response;
        };

        const modelName = buttonClickEvent.buttonKey;

        if (modelName != undefined && modelName != modelDetail?.name) {
          setModelDetail(getModelDetails(modelName));
          console.log('home: re-render due to model detail change');
        }

        return;
      }
    }
  }, [buttonClickEvent, modelDetail, summaryData]);

  // memoizing App Context used by Drawer component
  const appContextDrawer = useMemo(() => {
    return {
      updateLastClicked: updateLastClicked,
      modelNames: getModelNames()
    };
  }, [getModelNames, updateLastClicked]);

  // memoizing App Context used by Grid and its descendents
  const appContextGridPlots = useMemo(() => {
    return {
      modelDetail: modelDetail
    };
  }, [modelDetail]);

  // JSX
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <AppContextDrawer.Provider value={appContextDrawer}>
          <DrawerAndAppBar />
        </AppContextDrawer.Provider>
        <AppContextGridPlots.Provider value={appContextGridPlots}>
          <AutoGrid />
        </AppContextGridPlots.Provider>
      </Box>
    </div>
  );
};

export default Home;
