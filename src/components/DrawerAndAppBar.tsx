import React, { useCallback } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppDrawer from './Drawer';
import { UpdateStateFunction } from '../types';
import { Action } from './Home';
// import { HomeComponentStateData, StateHandler } from './Home';

export const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

interface Props {
  dispatch?: React.Dispatch<Action>;
}
const DrawerAndAppBar = ({ dispatch }: Props) => {
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" elevation={4} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            Lens v.1
          </Typography>
        </Toolbar>
      </AppBar>
      <AppDrawer
        // dispatch={dispatch}
        variant="permanent"
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
    </React.Fragment>
  );
};

export default DrawerAndAppBar;
