import * as React from 'react';
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
const AppDrawer = (props: AppDrawerProps) => {
  const { clickedItemName, variant, open, handleDrawerClose } = props;
  const theme = useTheme();

  //callbacks
  const onClickImportModels = () => {
    console.log('drawer click');
    clickedItemName('test');
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
        {['model name one', 'model name 2', 'longer model name 3'].map(
          (text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <ShowChartIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </Drawer>
  );
};

export default AppDrawer;
