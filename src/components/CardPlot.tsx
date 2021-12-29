import React from 'react';
import Plot, { PlotParams } from 'react-plotly.js';

const CardPlot = ({ width, height }: { width: number; height: number }) => {
  const x: number[] = [...Array(50).keys()];
  const y: number[] = [...Array(50).keys()].map((k) => 1);
  const y2: number[] = [...y.keys()].map((k) => k + 10);

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
      { type: 'bar', x: x, y: y }
    ],
    layout: {
      width: width * 0.95,
      height: height * 0.86,
      title: 'A Fancy Plot',
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

export default CardPlot;
