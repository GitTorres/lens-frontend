import React, { useState, useCallback } from 'react';
import DrawerAndAppBar from '../components/DrawerAndAppBar';
import AutoGrid from '../components/Grid';
import Box from '@mui/material/Box';
import { GLMSummary } from '../types';
import { UpdateStateFunction } from '../types';
import { Button } from '@mui/material';
import { isIdentical, isObject } from '../utils/utils';

export interface HomeComponentStateData {
  clickedItemName: string;
  modelSummaryData: GLMSummary[];
}

const Home = () => {
  //state
  const initialHomeState: HomeComponentStateData = {
    clickedItemName: '',
    modelSummaryData: []
  };
  const [homeState, setHomeState] = useState<HomeComponentStateData>(initialHomeState);

  // state handler to pass down
  const updateHomeState: UpdateStateFunction<HomeComponentStateData> = (
    key,
    newVal
  ) => {
    // add check to see if data changed before overwriting state --> do later
    setHomeState({ ...homeState, [key]: newVal });
  };

  // callbacks

  // functions unrelated to state
  console.log('re-render home');
  // dom
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <DrawerAndAppBar {...{ updateHomeState }} />
        {/* <AutoGrid /> */}
      </Box>
    </div>
  );
};

export default Home;
