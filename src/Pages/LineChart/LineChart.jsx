import { csv, extent, format, scaleLinear, scaleTime , timeFormat} from 'd3';
import { useEffect } from 'react';
import { useFetch } from '../../hooks';
import AxisBottom from '../../components/AxisBottom/AxisBottom';
import AxisLeftPlot from '../../components/AxisLeftPlot/AxisLeftPlot';
import PlotMarks from '../../components/PlotMarks/PlotMarks';
import './style.css';
import { Link } from 'react-router-dom';

const LineChart = () => {
  const CSVURL = `https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv`;

  const { data, loading, error, setData } = useFetch(CSVURL);

  useEffect(() => {
    const row = (d) => {
      d.temperature = +d.temperature;
      d.timestamp = new Date(d.timestamp);
      return d;
    };

    csv(CSVURL, row).then(setData);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const width = 1000;
  const height = 500;
  const margin = { top: 20, right: 30, bottom: 60, left: 90 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = 40;

  const xValue = d => d.timestamp;
  const xAxisLabel = 'Time';

  const yValue = d => d.temperature;
  const yAxisLabel = 'Temperature';

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

    const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={timeFormat('%a')}
            tickOffset={9}
          />
       
          <text
            className='axis-label'
            textAnchor='middle'
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
            className='axis-label'
            textAnchor='middle'
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
          >
            {xAxisLabel}
          </text>
          <PlotMarks
            data={data}
            xScale={xScale}
            yScale={yScale}
            yValue={yValue}
            xValue={xValue}
            tickFormat={format('.2s')}
            dotToLine
          />
        </g>
      </svg>
      <Link to={'/'} className='iris-button'>
        <button className='iris-button-style'>Go Back</button>
      </Link>
    </div>
  );
};

export default LineChart;
