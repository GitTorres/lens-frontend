import React, { useState, useReducer, useMemo, useEffect, useCallback } from 'react';
import DrawerAndAppBar from '../components/DrawerAndAppBar';
import AutoGrid from '../components/Grid';
import Box from '@mui/material/Box';
import { GLMSummary, QuerySummary } from '../types';
import { Button, ButtonGroup } from '@mui/material';
import {
  reducerSummaryData,
  homeStateOnMount,
  fetchActionTemplate,
  approvedActivity,
  ApprovedButtonActions,
  ApprovedButtonSources,
  ButtonClickEvent,
  fetchSummaries
} from './HomeData';

export const { approvedActions, approvedSources } = approvedActivity;

// eslint-disable-next-line max-len
// createContext requires an interface matching what will be passed to the Context Provider
type ButtonCallback = (
  { buttonId, purposeOfClick }: Omit<ButtonClickEvent, 'timeOfClick'>,
  event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
) => void;

export const AppState = React.createContext<ButtonCallback>(() => {
  return {};
});

const Home = () => {
  // button click tracker
  const [buttonClickEvent, setButtonClickEvent] = useState(
    homeStateOnMount.buttonClick
  );

  const updateLastClicked: ButtonCallback = useCallback(
    ({ buttonId, purposeOfClick }, event) => {
      event.preventDefault();

      // setButtonClickEvent({
      //   buttonId: buttonId,
      //   purposeOfClick: purposeOfClick,
      //   timeOfClick: 0
      // });

      setButtonClickEvent({
        buttonId: buttonId,
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

  // handle API requests with side effects
  useEffect(() => {
    switch (buttonClickEvent.purposeOfClick) {
      case 'FETCH_INIT': {
        // set to fetching...
        summaryDataDispatch({
          type: 'FETCH_INIT',
          timeOfRequest: new Date().getTime()
        });

        // api fetch action
        fetchSummaries({
          name: '',
          desc: '',
          min_explained_variance: 0,
          max_explained_variance: 1,
          features: []
        }).then((data) => {
          summaryDataDispatch({
            type: 'FETCH_SUCCESS',
            data: data
          });
        });
      }
    }
  }, [buttonClickEvent.purposeOfClick, buttonClickEvent.timeOfClick]);

  // other code
  // console.log(
  //   `id: ${buttonClickEvent.buttonId} | purpose: ${buttonClickEvent.purposeOfClick}`
  // );

  console.log(buttonClickEvent);
  console.log(summaryData);

  // JSX
  return (
    <AppState.Provider value={updateLastClicked}>
      <div>
        <Box sx={{ display: 'flex' }}>
          <DrawerAndAppBar />
          <ButtonGroup
            sx={{
              flexGrow: 1,
              p: 3,
              marginRight: '10px',
              marginLeft: '10px',
              marginTop: '60px'
            }}
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={(event) => {
                const buttonId = approvedSources.home.fetchInitButton;
                const purposeOfClick = approvedActions.fetchSummaryData;
                updateLastClicked({ buttonId, purposeOfClick }, event);
              }}
            >
              Init
            </Button>
            <Button
            // onClick={(e) => handleClicks(btnSources.home.updateCount, e)}
            >
              Do Nothing
            </Button>
          </ButtonGroup>
          {/* <AutoGrid /> */}
        </Box>
      </div>
    </AppState.Provider>
  );
};

export default Home;
