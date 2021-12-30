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
  //state
  const initialHomeState: HomeComponentStateData = {
    clickedItemName: ''
  };
  const [homeState, setHomeState] = useState<HomeComponentStateData>(initialHomeState);
  const homeComponentStateHandler: StateHandler<HomeComponentStateData> = {
    clickedItemName: (clickedItemName) =>
      setHomeState({
        ...homeState,
        ['clickedItemName']: clickedItemName
      })
  };

  // functions unrelated to state

  // dom
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <DrawerAndAppBar {...homeComponentStateHandler} />
        <AutoGrid />
      </Box>
    </div>
  );
};

export default Home;
