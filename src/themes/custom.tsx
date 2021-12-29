import * as React from 'react';
import ReactDOM from 'react-dom';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    background: {
      paper: red[300]
    },
    primary: {
      main: red[300]
    },
    text: {
      primary: '#ffffff',
      secondary: '#000000'
    }
    // mode: 'dark'
  }
});

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
