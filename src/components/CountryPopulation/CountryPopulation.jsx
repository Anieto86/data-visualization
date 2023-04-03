import * as d3 from 'd3';
import { useData } from '../../hooks';
import AxisBottom from '../AxisBottom/AxisBottom';
import AxisLeft from '../AxisLeft/AxisLeft';
import Marks from '../Marks/Marks';

const CountryPopulation = () => {
  const CSVURL = `https://gist.githubusercontent.com/Anieto86/7e41de1aa3c479125dc9ffbf78e6e7bf/raw/UN_Population_2019.csv`;

  const { csvData } = useData(CSVURL);

  if (!csvData) return <div>Loading...</div>;

  const width = 1000;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 20, left: 200 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const yValue = (d) => d.Country;
  const xValue = (d) => d.Population;

  const yScale = d3
    .scaleBand()
    .domain(csvData.map(yValue))
    .range([0, innerHeight]);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(csvData, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} />
        <Marks
          csvData={csvData}
          xScale={xScale}
          yScale={yScale}
          yValue={yValue}
          xValue={xValue}
        />
      </g>
    </svg>
  );
};

export default CountryPopulation;
