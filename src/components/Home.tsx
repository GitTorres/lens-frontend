import React, { useState } from 'react';
import DrawerAndAppBar from './DrawerAndAppBar';
import AutoGrid from './Grid';
// import Nav from './unused/Nav';
import Box from '@mui/material/Box';

export interface HomeComponentStateData {
  clickedItemName: string | undefined;
}
export type StateHandler<T> = Record<keyof T, (arg0: T[keyof T]) => void>;

const Home = () => {
  console.log('home rendered');

  //state
  const initialHomeState: HomeComponentStateData = {
    clickedItemName: ''
  };
  const [homeState, setHomeState] = useState<HomeComponentStateData>(initialHomeState);
  const HomeComponentStateHandler: StateHandler<HomeComponentStateData> = {
    clickedItemName: (clickedItemName) =>
      setHomeState({
        ...homeState,
        ['clickedItemName']: clickedItemName
      })
  };

  // dom
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <DrawerAndAppBar {...HomeComponentStateHandler} />
        <AutoGrid />
      </Box>
    </div>
  );
};

export default Home;
