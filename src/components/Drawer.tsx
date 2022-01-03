import React, { useState, useEffect, useContext } from 'react';
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
import { DrawerProps, Skeleton, useThemeProps } from '@mui/material';
import { drawerWidth } from './DrawerAndAppBar';
import { getSummary } from '../api/request';
import { GLMSummary, paramsGetSummary } from '../types';
import { UpdateStateFunction } from '../types';
import { Action, HomeContext } from './Home';
import { LoadingButton } from '@mui/lab';

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
  // dispatch?: React.Dispatch<Action>;
  handleDrawerClose?: () => void;
}

const AppDrawer = React.memo((props: AppDrawerProps) => {
  // state
  const [isLoadingData, setIsLoadingData] = useState(false);

  // props destructuring
  const { variant, open, handleDrawerClose } = props;
  const { dispatch } = useContext(HomeContext);

  // applying theming
  const theme = useTheme();

  // component callbacks
  const handleClickLoadModels = () => setIsLoadingData(true);
  const handleClickShowModel = (
    event: React.MouseEvent<HTMLDivElement>,
    text: string
  ): void => {
    event.preventDefault();
  };

  // side effects
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
    };
    fetchData();
  }, []);

  // report the name of the clicked drawer item to the parent component that
  // can render the Plotting Grid
  // clickedItemName(text);

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
        <ListItemButton onClick={() => handleClickLoadModels()}>
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
          <ListItemButton
            key={text}
            onClick={(event) => handleClickShowModel(event, text)}
          >
            <ListItemIcon>
              <ShowChartIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
});

export default AppDrawer;

const Skel = () => {
  return (
    <ListItem>
      <ListItemIcon>
        <ShowChartIcon />
      </ListItemIcon>
      <Skeleton width={'100%'} animation="wave" />
    </ListItem>
  );
};
