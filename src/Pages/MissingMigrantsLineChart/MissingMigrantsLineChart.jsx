import {
  bin,
  csv,
  extent,
  format,
  max,
  scaleLinear,
  scaleTime,
  sum,
  timeFormat,
  timeMonths,
} from 'd3';
import { useEffect } from 'react';
import AxisBottom from '../../components/AxisBottom/AxisBottom';
import AxisLeftPlot from '../../components/AxisLeftPlot/AxisLeftPlot';
import BinMarks from '../../components/BinMarks/BinMarks';
import { useFetch } from '../../hooks';

const width = 1000;
const height = 500;
const margin = { top: 20, right: 30, bottom: 90, left: 90 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const xAxisLabelOffset = 70;
const yAxisLabelOffset = 40;

const LineChart = () => {
  const CSVURL = `https://gist.githubusercontent.com/Anieto86/5d0d0b7f243b7f55fd9b5ff6ba483664/raw/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv`;

  const { data, loading, error, setData } = useFetch(CSVURL);

  useEffect(() => {
    const row = (d) => {
      d['Total Dead and Missing'] = +d['Total Dead and Missing'];
      d['Reported Date'] = new Date(d['Reported Date']);
      return d;
    };

    csv(CSVURL, row).then(setData);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const xValue = (d) => d['Reported Date'];
  const xAxisLabel = 'Time';

  const yValue = (d) => d['Total Dead and Missing'];
  const yAxisLabel = 'Total Dead and Missing';

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1,
    }));

  const yScale = scaleLinear()
    .domain(extent([0, max(binnedData, (d) => d.y)]))
    .range([innerHeight, 0])
    .nice();

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={timeFormat('%m/%d/%Y')}
            tickOffset={9}
          />

          <text
            className="axis-label"
            textAnchor="middle"
            transform={` translate(${-yAxisLabelOffset}, ${
              innerHeight / 2
            })rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <AxisLeftPlot
            yScale={yScale}
            innerWidth={innerWidth}
            yAxisLabel={yAxisLabel}
            tickOffset={5}
          />
          <text
            className="axis-label"
            textAnchor="middle"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
          >
            {xAxisLabel}
          </text>
          <BinMarks
            binnedData={binnedData}
            xScale={xScale}
            yScale={yScale}
            tickFormat={format('.2s')}
            innerHeight={innerHeight}
            toolTipFormat={(d) => d}
          />
        </g>
      </svg>
    </div>
  );
};

export default LineChart;
