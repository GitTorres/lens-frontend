import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import CardPlot from './CardPlot';

const BasicCard = ({ title }: { title: string }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          {title}
          <Divider />
        </Typography>
        {/* Plotly component here */}
        <CardPlot />
      </CardContent>
      {/* <CardActions>
        <Button>Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

export default BasicCard;
