import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BasicCard from './Card';

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const AutoGrid = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3, marginRight: '10px', marginLeft: '10px', marginTop: '60px' }}>
      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 4, md: 6, lg: 12 }}>
        <BasicCard title="Model 1" width={725} height={575} />
      </Grid>
    </Box>
  );
};

export default AutoGrid;
