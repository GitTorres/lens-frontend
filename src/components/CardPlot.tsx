import React, { useContext } from 'react';
import Plot, { PlotParams } from 'react-plotly.js';
import { FeatureSummaryData } from '../types';

export const FeaturePlot = ({
  name,
  data,
  width,
  height
}: {
  name: string;
  data: FeatureSummaryData;
  width: number;
  height: number;
}) => {
  const x: number[] = data.bin_edge_right;
  const y: number[] = data.sum_weight;
  const y2: number[] = data.wtd_avg_target;
  const y3: number[] = data.wtd_avg_prediction;

  const univariatePlot: PlotParams = {
    data: [
      {
        x: x,
        y: y2,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
        yaxis: 'y2'
      },
      {
        x: x,
        y: y3,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'green' },
        yaxis: 'y2'
      },
      { type: 'bar', x: x, y: y, marker: { color: 'orange' } }
    ],
    layout: {
      width: width * 0.95,
      height: height * 0.86,
      title: name,
      yaxis: { title: 'primary axis' },
      yaxis2: { title: 'secondary axis', side: 'right', overlaying: 'y' }
    },
    config: {
      toImageButtonOptions: {
        format: 'svg', // one of png, svg, jpeg, webp
        filename: 'custom_image',
        height: 500,
        width: 700,
        scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
      }
    }
  };

  return (
    <div>
      <Plot {...univariatePlot} />
    </div>
  );
};
