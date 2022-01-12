import React from 'react';
import Plot, { PlotParams } from 'react-plotly.js';
import { FeatureSummaryData } from '../types';

export const FeaturePlot = ({
  nameOfModel,
  nameOfFeature,
  nameOfWeight,
  nameOfTarget,
  nameOfPrediction,
  data,
  width,
  height
}: {
  nameOfModel: string;
  nameOfFeature: string;
  nameOfWeight: string;
  nameOfTarget: string;
  nameOfPrediction: string;
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
        name: nameOfTarget,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
        yaxis: 'y2'
      },
      {
        x: x,
        y: y3,
        name: nameOfPrediction,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'green' },
        yaxis: 'y2'
      },
      {
        type: 'bar',
        x: x,
        y: y,
        yaxis: 'y',
        name: nameOfWeight,
        marker: { color: 'orange' }
      }
    ],
    layout: {
      width: width * 0.95,
      height: height * 0.86,
      title: `Model Fit -- Univariate View<br>${nameOfModel}`,
      titlefont: {
        family: 'Arial, sans-serif',
        size: 18,
        color: 'grey'
      },
      xaxis: { showgrid: false, title: nameOfFeature },
      yaxis: { showgrid: true, zeroline: false, title: nameOfWeight },
      yaxis2: {
        showgrid: false,
        zeroline: false,
        title: 'Weighted Avg Target',
        side: 'right',
        overlaying: 'y'
      },
      legend: {
        x: 1,
        y: 1.25,
        traceorder: 'normal',
        font: {
          family: 'sans-serif',
          size: 14,
          color: '#000'
        },
        bgcolor: '#E2E2E2',
        bordercolor: '#FFFFFF',
        borderwidth: 2
      }
    },
    config: {
      toImageButtonOptions: {
        format: 'svg', // one of png, svg, jpeg, webp
        filename: `${nameOfModel}_feature${nameOfFeature}_model_fit_univariate_view`,
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
