import * as Vega from 'vega';

export const DEFAULT_CONFIG: Vega.Config = {
  background: '#fff',
  arc: { fill: '#3e5c69' },
  area: { fill: '#3e5c69' },
  line: { stroke: '#3e5c69' },
  path: { stroke: '#3e5c69' },
  rect: { fill: '#3e5c69' },
  shape: { stroke: '#3e5c69' },
  symbol: { fill: '#3e5c69' },
  axis: {
    domainWidth: 0.5,
    grid: true,
    labelPadding: 2,
    tickSize: 5,
    tickWidth: 0.5,
    titleFontWeight: 'normal',
  },
  axisBand: { grid: false },
  axisX: { gridWidth: 0.2 },
  axisY: { gridDash: [3], gridWidth: 0.4 },
  legend: { labelFontSize: 11, padding: 1, symbolType: 'square' },
  range: {
    category: [
      '#3e5c69',
      '#6793a6',
      '#182429',
      '#0570b0',
      '#3690c0',
      '#74a9cf',
      '#a6bddb',
      '#e2ddf2',
    ],
  },
};
