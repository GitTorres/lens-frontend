import React, { useState, useEffect } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { DrawerProps, useThemeProps } from '@mui/material';
import { drawerWidth } from './DrawerAndAppBar';
import { HomeComponentStateData } from './Home';
import { getSummary } from '../api/request';
import { GLMSummary, paramsGetSummary } from '../types';
import { UpdateStateFunction } from '../types';

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
  display: 'flex', // we can use flow, grid, or flex layouts
  alignItems: 'center',
  justifyContent: 'right',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

interface AppDrawerProps extends Partial<DrawerProps> {
  updateHomeState: UpdateStateFunction<HomeComponentStateData>;
  handleDrawerClose?: () => void;
}

const AppDrawer = (props: AppDrawerProps) => {
  // props destructuring
  const { updateHomeState, variant, open, handleDrawerClose } = props;

  // applying theming
  const theme = useTheme();

  // component callbacks
  const onClickImportModels = () => console.log('clickerooni');

  useEffect(() => {
    const query: paramsGetSummary = {
      name: undefined,
      desc: undefined,
      min_explained_variance: undefined,
      max_explained_variance: undefined,
      features: undefined
    };
    const fetchData = async () => {
      const data: GLMSummary[] = await getSummary(query);
      updateHomeState('modelSummaryData', data);
    };
    fetchData();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, text: string): void => {
    event.preventDefault();

    // report the name of the clicked drawer item to the parent component that
    // can render the Plotting Grid
    // clickedItemName(text);
  };

  console.log('re-render drawer');

  return (
    <Drawer variant={variant} open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon sx={{ color: 'text.secondary' }} />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List dense={true}>
        <ListItemButton onClick={() => onClickImportModels()}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Import Models" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <SummarizeIcon />
          </ListItemIcon>
          <ListItemText primary="Compare" />
        </ListItemButton>
        <Divider />
        {['billy', 'joe', 'ray'].map((text, index) => (
          <ListItemButton key={text} onClick={(event) => handleClick(event, text)}>
            <ListItemIcon>
              <ShowChartIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default AppDrawer;
