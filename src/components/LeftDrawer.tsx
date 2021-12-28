import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { pink } from '@mui/material/colors';
import { sizeHeight } from '@mui/system';

const TemporaryDrawer = () => {
  // const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
  //   if (
  //     event.type === 'keydown' &&
  //     ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
  //   ) {
  //     return;
  //   }

  // setShowDrawer(open);
  // };

  const list = () => (
    <Box
      sx={{ width: 250, backgroundColor: 'primary.main', color: 'inherit' }}
      role="presentation"
      // onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key={'Compare'}>
          <ListItemIcon>
            <SummarizeIcon sx={{ color: 'text.primary' }} />
          </ListItemIcon>
          <ListItemText primary={'Compare'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {[
          'short name',
          'a name of medium length',
          'extremely long name because someone is terrible at naming things',
        ].map((text, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <ShowChartIcon sx={{ color: 'text.primary' }} />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={true} onClose={() => false}>
        {list()}
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;
