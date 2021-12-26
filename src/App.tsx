// import React, { useState } from 'react';
// import './App.css';
// import { ReactComponent as ReactLogo } from './tri.svg';
// import { Polygon } from './components/learning/polygon';
// import { Tutorial2ButtonExampleComponent } from './components/learning/tutorial2';
// import { PolygonAttributes } from './types';

import React, { useState } from 'react';
import './App.css';
import { Sidebar } from './components/learning/sidebar';
import { Form } from './components/learning/myFirstComponent';
import Home from './components/learning/home';

function App() {
  const [selectedMode, setSelectedMode] = useState('open'); // we use inference here when we can

  return (
    <div className="app">
      <Form></Form>
      {/* <Sidebar setSelectedMode={setSelectedMode} /> */}
      {/* <Home selectedMode={selectedMode} /> */}
    </div>
  );
}

export default App;

// Form Component
// props
//    none
// state
//    switch (true/false from button press).  Track.
//    query parameters.   Do not Track.
// effect
//    model formulas.  handle bad requests.
// ui
//  one input box per query parameter

// Objectives
// Stretch 2 -> add to UI a table with formulas, where we create each row via a .map() expression
// Stretch 3 -> refactor state to use a single object for the component state
