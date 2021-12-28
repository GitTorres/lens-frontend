import React from 'react';
import Plot from 'react-plotly.js';

const CardPlot = () => {
  const x: number[] = [...Array(50).keys()];
  const y: number[] = [...Array(50).keys()].map(k => 1);
  const y2: number[] = [...y.keys()].map(k => k + 10);

  return (
    <div>
      <Plot
        data={[
          {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
          { type: 'bar', x: x, y: y2, yaxis: 'y2' },
        ]}
        layout={{
          width: 600,
          height: 400,
          title: 'A Fancy Plot',
          yaxis: { title: 'primary axis' },
          yaxis2: { title: 'secondary axis', side: 'right', overlaying: 'y' },
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default CardPlot;
