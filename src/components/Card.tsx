import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import CardPlot from './CardPlot';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '3px', transform: 'scale(1.5)' }}
  >
    •
  </Box>
);

const BasicCard = ({
  title,
  width,
  height
}: {
  title: string;
  width: number;
  height: number;
}) => {
  // const { innerWidth } = window;
  // use later when we want to dynamically resize the plot with re-renders
  return (
    <Card sx={{ margin: '10px', width: width, height: height }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          {title}
          {bull}
          {'2021-01-04 04:33:25pm'}
        </Typography>
        <CardPlot width={width} height={height} />
      </CardContent>
    </Card>
  );
};

export default BasicCard;
