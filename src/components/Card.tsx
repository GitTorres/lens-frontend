import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '3px', transform: 'scale(1.5)' }}>
    •
  </Box>
);

// export const PlotCard = ({
//   title,
//   width,
//   height,
//   children
// }: {
//   title: string;
//   width: number;
//   height: number;
//   children: React.ReactNode;
// }) => {
//   // const { innerWidth } = window;
//   // use later when we want to dynamically resize the plot with re-renders
//   return (
//     <Card sx={{ margin: '10px', width: width, height: height }}>
//       <CardContent>
//         <Typography sx={{ fontSize: 14 }} gutterBottom>
//           {title}
//           {bull}
//           {'20YY-MM-DD HH:MM:SS'}
//         </Typography>
//         <FeaturePlot width={width} height={height} />
//       </CardContent>
//     </Card>
//   );
// };

export const PlotCard = ({
  nameOfModel,
  width,
  height,
  children
}: {
  nameOfModel: string;
  width: number;
  height: number;
  children: React.ReactNode;
}) => {
  // const { innerWidth } = window;
  // use later when we want to dynamically resize the plot with re-renders
  return (
    <Card raised={true} sx={{ margin: '10px', width: width, height: height }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} gutterBottom>
          {nameOfModel}
          {bull}
          {'20YY-MM-DD HH:MM:SS'}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};
