import React, { useState, useCallback, useReducer, useMemo } from 'react';
import DrawerAndAppBar from '../components/DrawerAndAppBar';
import AutoGrid from '../components/Grid';
import Box from '@mui/material/Box';
import { GLMSummary } from '../types';
import { UpdateStateFunction } from '../types';
import { Button, ButtonGroup } from '@mui/material';
import { isIdentical, isObject } from '../utils/utils';
import { fetchSummaryData, summaryDataDefault } from './HomeData';

// view hooks

const Home = () => {
  // state
  const [count, setCount] = useState(0);

  // async data fetch reducer
  const [summaryData, summaryDataDispatch] = useReducer(
    fetchSummaryData,
    summaryDataDefault
  );

  const apiContext = useMemo(() => {
    return { dispatch: apiDispatch };
  }, [apiDispatch]);

  // callbacks
  const handleClickUpdateCount = () => setCount(count + 1);

  // functions unrelated to state
  console.log(apiState);

  // JSX
  return (
    <HomeContext.Provider value={apiContext}>
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
            <Button onClick={() => apiDispatch({ type: 'FETCH_INIT' })}>Init</Button>
            <Button onClick={() => apiDispatch({ type: 'FETCH_SUCCESS', data: [] })}>
              Success
            </Button>
            <Button
              onClick={() =>
                apiDispatch({ type: 'FETCH_ERROR', error: 'failure to fetch data' })
              }
            >
              Error
            </Button>
            <Button
              onClick={() => handleClickUpdateCount()}
            >{`Increment count state`}</Button>
          </ButtonGroup>
          {/* <AutoGrid /> */}
        </Box>
      </div>
    </HomeContext.Provider>
  );
};

export default Home;
