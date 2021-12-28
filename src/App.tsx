// import React, { useState } from 'react';
// import './App.css';
// import { ReactComponent as ReactLogo } from './tri.svg';
// import { Polygon } from './components/learning/polygon';
// import { Tutorial2ButtonExampleComponent } from './components/learning/tutorial2';
// import { PolygonAttributes } from './types';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/custom';
import Home from './components/Home';

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </div>
  );
}

export default App;
