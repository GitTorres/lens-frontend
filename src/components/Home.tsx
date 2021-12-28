import React, { useState } from 'react';
import TemporaryDrawer from './LeftDrawer';
import DrawerAndAppBar from './DrawerAndAppBar';
import AutoGrid from './Grid';
import Nav from './Nav';
import Box from '@mui/material/Box';

const Home = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const onClickShowDrawer = () => setShowDrawer(!showDrawer);

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <DrawerAndAppBar />
        <AutoGrid />
      </Box>
    </div>
  );
};

export default Home;
