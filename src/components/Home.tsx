import React, { useState, useReducer, useEffect, useMemo, useCallback } from 'react';
import DrawerAndAppBar from '../components/DrawerAndAppBar';
import AutoGrid from '../components/Grid';
import Box from '@mui/material/Box';
import {
  reducerSummaryData,
  homeStateOnMount,
  ButtonCallback,
  AppContextDrawer,
  fetchSummaries
} from './HomeData';
import { GLMSummary, QuerySummary } from '../types';

// context used to pass props to children directly -- do not want parents to re-render
export const DrawerContext = React.createContext<AppContextDrawer>({
  updateLastClicked: () => {
    return {};
  },
  modelNames: []
});

const Home = () => {
  // stores button click information that initiates some action
  const [buttonClickEvent, setButtonClickEvent] = useState(homeStateOnMount.buttonClick);

  // store model summary data
  // thought -- switch to useState hook?
  const [summaryData, summaryDataDispatch] = useReducer(
    reducerSummaryData,
    homeStateOnMount.summaryData
  );

  // store model details
  const [modelDetail, setModelDetail] = useState<GLMSummary | undefined>(
    homeStateOnMount.modelDetail
  );

  // callback when buttons are clicks
  // tells us the source of the button component and the action requested
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

  // callback when FETCH action is received from a button click
  // we fetch model summaries so we can plot as needed
  const handleActionFetch = useCallback(() => {
    // compute the fetch cooldown
    const currentTime = new Date().getTime();
    const proceed = currentTime - summaryData.lastUpdated > 2000;

    // proceed with fetch if no cooldown
    if (proceed) {
      const query: QuerySummary = {
        name: '',
        desc: '',
        min_explained_variance: 0,
        max_explained_variance: 1,
        features: []
      };

      // returns a promise
      const apiResponse = fetchSummaries(query);

      apiResponse.then((data) => {
        summaryDataDispatch({
          type: 'FETCH_SUCCESS',
          data: data,
          time: currentTime
        });
      });
      console.log('home: re-render due to status change');
    }

    return;
  }, [summaryData]);

  // callback when SHOW_MODEL action is received from a button click
  // we filter to selected model to show its details
  const handleActionShowModel = useCallback(() => {
    const getModelDetails = (modelName: string): GLMSummary | undefined => {
      return summaryData?.data?.filter((model) => model.name == modelName).pop();
    };

    const modelName = buttonClickEvent.buttonKey;
    if (modelName != undefined && modelName != modelDetail?.name) {
      setModelDetail(getModelDetails(modelName));
      console.log('home: re-render due to model detail change');
    }
  }, [summaryData, modelDetail, buttonClickEvent]);

  // handle effects of button clicks
  useEffect(() => {
    switch (buttonClickEvent.purposeOfClick) {
      case 'FETCH': {
        handleActionFetch();
        return;
      }
      case 'SHOW_MODEL': {
        // update selected feature summary variable
        handleActionShowModel();

        return;
      }
    }
  }, [buttonClickEvent, handleActionShowModel, handleActionFetch]);

  // constructing the context object for the Drawer component
  // probably overkill to use context, but WORTH IT
  const drawerContext = useMemo(() => {
    return {
      updateLastClicked: updateLastClicked,
      modelNames: ((): string[] => {
        return summaryData.data ? summaryData.data.map((model) => model.name) : [];
      })()
    };
  }, [updateLastClicked, summaryData]);

  // JSX
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <DrawerContext.Provider value={drawerContext}>
          <DrawerAndAppBar />
        </DrawerContext.Provider>
        <AutoGrid modelDetail={modelDetail} />
      </Box>
    </div>
  );
};

export default Home;
