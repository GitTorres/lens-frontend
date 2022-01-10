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
import { GLMSummary } from '../types';

export const { approvedActions, approvedSources } = approvedActivity;

// eslint-disable-next-line max-len
// createContext requires an interface matching what will be passed to the Context Provider
type ButtonCallback = (
  { buttonId, buttonKey, purposeOfClick }: Omit<ButtonClickEvent, 'timeOfClick'>,
  event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
) => void;

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

const Home = () => {
  // button click tracker
  const [buttonClickEvent, setButtonClickEvent] = useState(
    homeStateOnMount.buttonClick
  );

  // should not have any state deps
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

  const getModelNames = useCallback((): string[] => {
    const modelSummaries = summaryData.data;
    return modelSummaries ? modelSummaries.map((model) => model.name) : [];
  }, [summaryData.data]);

  const getFeatureSummaries = useCallback((): number[] => {
    const numCards = Math.ceil(Math.random() * 10);
    return [...Array(numCards).keys()];
  }, []);

  // handle effects of button clicks
  useEffect(() => {
    switch (buttonClickEvent.purposeOfClick) {
      case 'FETCH_INIT': {
        // migrate to handleFetch() callback

        const currentTime = new Date().getTime();
        if (currentTime - summaryData.lastUpdated > 2000) {
          // proceed with fetch if no cooldown
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
      // case 'SHOW_MODEL': {
      //   // filter to feature summaries and
      //   console.log(buttonClickEvent.buttonKey);
      //   const summaries = getFeatureSummaries();
      //   return;
      // }
    }
  }, [buttonClickEvent, summaryData.lastUpdated]);

  // memoizing the context
  const appContextDrawer = useMemo(() => {
    return {
      updateLastClicked: updateLastClicked,
      modelNames: getModelNames()
    };
  }, [getModelNames, updateLastClicked]);

  // JSX
  return (
    <AppContextDrawer.Provider value={appContextDrawer}>
      <div>
        <Box sx={{ display: 'flex' }}>
          <DrawerAndAppBar />
          <AutoGrid key={buttonClickEvent.buttonKey} summaries={getFeatureSummaries} />
        </Box>
      </div>
    </AppContextDrawer.Provider>
  );
};

export default Home;

// {
//   /* <ButtonGroup
//             sx={{
//               flexGrow: 1,
//               p: 3,
//               marginRight: '10px',
//               marginLeft: '10px',
//               marginTop: '60px'
//             }}
//             variant="contained"
//             aria-label="outlined primary button group"
//           >
//             <Button
//               onClick={(event) => {
//                 const buttonId = approvedSources.home.fetchInitButton;
//                 const purposeOfClick = approvedActions.fetchSummaryData;
//                 updateLastClicked({ buttonId, purposeOfClick }, event);
//               }}
//             >
//               Init
//             </Button>
//             <Button
//             // onClick={(e) => handleClicks(btnSources.home.updateCount, e)}
//             >
//               Do Nothing
//             </Button>
//           </ButtonGroup> */
// }
