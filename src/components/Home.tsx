import React, { useState } from 'react';
import TemporaryDrawer from './LeftDrawer';
import Nav from './Nav';

const Home = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const onClickShowDrawer = () => setShowDrawer(true);

  return (
    <div>
      <Nav />
      <TemporaryDrawer />
    </div>
  );
};

export default Home;
