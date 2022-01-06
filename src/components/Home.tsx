import React, { useState, useReducer, useMemo } from 'react';
import DrawerAndAppBar from '../components/DrawerAndAppBar';
import AutoGrid from '../components/Grid';
import Box from '@mui/material/Box';
import { GLMSummary } from '../types';
import { Button, ButtonGroup } from '@mui/material';
import {
  reducerSummaryData,
  homeStateOnMount,
  btnSources,
  fetchActionTemplate
} from './HomeData';

// contexts
export const AppState = React.createContext<React.Dispatch<typeof fetchActionTemplate>>(
  () => fetchActionTemplate
);

const Home = () => {
  // button click tracker
  const [clickedBtnSource, setClickedBtnSource] = useState(
    homeStateOnMount.clickedBtnSource
  );

  // async data fetch reducer
  const [summaryData, summaryDataDispatch] = useReducer(
    reducerSummaryData,
    homeStateOnMount.summaryData
  );

  const memo = useMemo(() => {
    return { summaryDataDispatch: summaryDataDispatch };
  }, [summaryDataDispatch]);

  // callbacks
  const handleClicks = (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    setClickedBtnSource({
      ...clickedBtnSource,
      home: id
    });
  };

  // other code
  console.log(clickedBtnSource.home);
  console.log(summaryData);

  // JSX
  return (
    <AppState.Provider value={memo.summaryDataDispatch}>
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
              onClick={() =>
                memo.summaryDataDispatch({ type: 'FETCH_INIT', data: summaryData.data })
              }
            >
              Init
            </Button>
            <Button
              onClick={() =>
                memo.summaryDataDispatch({
                  type: 'FETCH_SUCCESS',
                  data: summaryData.data
                })
              }
            >
              Success
            </Button>
            <Button
              onClick={() =>
                memo.summaryDataDispatch({
                  type: 'FETCH_ERROR',
                  data: summaryData.data,
                  error: 'failure to fetch data'
                })
              }
            >
              Error
            </Button>
            <Button
              onClick={(e) => handleClicks(btnSources.home.updateCount, e)}
            >{`Increment count state`}</Button>
          </ButtonGroup>
          {/* <AutoGrid /> */}
        </Box>
      </div>
    </AppState.Provider>
  );
};

export default Home;

// // side effects
// useEffect(() => {
//   const query: paramsGetSummary = {
//     name: undefined,
//     desc: undefined,
//     min_explained_variance: undefined,
//     max_explained_variance: undefined,
//     features: undefined
//   };
//   const fetchData = async () => {
//     const data: GLMSummary[] = await getSummary(query);
//   };
//   fetchData();
// }, []);
