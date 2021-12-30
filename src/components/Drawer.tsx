import React, { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { DrawerProps } from '@mui/material';
import { drawerWidth } from './DrawerAndAppBar';
import { HomeComponentStateData, StateHandler } from './Home';
import { getSummary } from '../api/request';
import { GLMSummary, paramsGetSummary } from '../types';
import { equals } from '../utils/utils';

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`
  }
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

interface AppDrawerProps
  extends Partial<DrawerProps>,
    StateHandler<HomeComponentStateData> {
  handleDrawerClose: () => void;
}
export interface AppDrawerComponentStateData {
  modelNames: string[];
}

const AppDrawer = (props: AppDrawerProps) => {
  // props destructuring
  const { clickedItemName, variant, open, handleDrawerClose } = props;
  const theme = useTheme();

  // component state (used for re-renders)
  const initialAppDrawerState: AppDrawerComponentStateData = {
    modelNames: []
  };

  const [appDrawerState, setAppDrawerState] =
    useState<AppDrawerComponentStateData>(initialAppDrawerState);

  const appDrawerComponentStateHandler: StateHandler<AppDrawerComponentStateData> = {
    modelNames: (modelNames) =>
      setAppDrawerState({
        ...appDrawerState,
        ['modelNames']: modelNames
      })
  };

  // component callbacks
  const onClickImportModels = () => {
    const query: paramsGetSummary = {
      name: undefined,
      desc: undefined,
      min_explained_variance: undefined,
      max_explained_variance: undefined,
      features: undefined
    };

    getSummary(query).then((data) => {
      const names = data.map((item) => item.name);

      if (!equals(appDrawerState.modelNames, names)) {
        appDrawerComponentStateHandler.modelNames(names);
      }
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, text: string): void => {
    event.preventDefault();

    // report the name of the clicked drawer item to the parent component that can render the Plotting Grid
    clickedItemName(text);
  };

  return (
    <Drawer variant={variant} open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon sx={{ color: 'text.primary' }} />
          ) : (
            <ChevronLeftIcon sx={{ color: 'text.primary' }} />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem button onClick={() => onClickImportModels()}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Import Models" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SummarizeIcon />
          </ListItemIcon>
          <ListItemText primary="Compare" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {appDrawerState.modelNames?.map((text, index) => (
          <ListItem button key={text} onClick={(event) => handleClick(event, text)}>
            <ListItemIcon>
              <ShowChartIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AppDrawer;
