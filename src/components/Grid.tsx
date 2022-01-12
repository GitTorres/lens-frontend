import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { PlotCard } from './Card';
import { GLMSummary } from '../types';
import { AppContextGridPlots } from './Home';
import { FeaturePlot } from './CardPlot';

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const AutoGrid = React.memo(() => {
  const { modelDetail } = useContext(AppContextGridPlots);

  console.log('grid: re-render');

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        marginRight: '10px',
        marginLeft: '10px',
        marginTop: '60px'
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 4, md: 6, lg: 12 }}
      >
        {modelDetail?.feature_summary.map((feature, index) => (
          <PlotCard key={index} title={`${feature.name}`} width={725} height={575}>
            <FeaturePlot
              name={feature.name}
              data={feature.data}
              width={725}
              height={575}
            />
          </PlotCard>
        ))}
      </Grid>
    </Box>
  );
});

export default AutoGrid;
