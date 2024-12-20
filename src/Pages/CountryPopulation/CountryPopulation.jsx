import * as d3 from 'd3';
import { useFetch } from '../../hooks';
import AxisBottom from '../../components/AxisBottom/AxisBottom';
import AxisLeft from '../../components/AxisLeft/AxisLeft';
import Marks from '../../components/Marks/Marks';
import './styles.css';
import { useEffect } from 'react';

const CountryPopulation = () => {
  const CSVURL = `https://gist.githubusercontent.com/Anieto86/7e41de1aa3c479125dc9ffbf78e6e7bf/raw/UN_Population_2019.csv`;

  const { data, loading, error, setData } = useFetch(CSVURL);

  useEffect(() => {
    const row = (d) => {
      d.Population = +d['2020'] * 1000;
      return d;
    };

    d3.csv(CSVURL, row).then(setData);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const topTenCountries = data.slice(0, 10);

  const width = 1000;
  const height = 500;
  const margin = { top: 20, right: 30, bottom: 60, left: 220 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const axisBottomOffset = 50;

  const yValue = (d) => d.Country;
  const xValue = (d) => d.Population;

  const yScale = d3
    .scaleBand()
    .domain(topTenCountries.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.2);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(topTenCountries, xValue)])
    .range([0, innerWidth]);

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={d3.format('.2s')}
          />
          <AxisLeft yScale={yScale} />
          <text
            className="axis-label"
            textAnchor="middle"
            x={innerWidth / 2}
            y={innerHeight + axisBottomOffset}
          >
            Top 10 Countries Population
          </text>
          <Marks
            csvData={topTenCountries}
            xScale={xScale}
            yScale={yScale}
            yValue={yValue}
            xValue={xValue}
            tickFormat={d3.format('.2s')}
          />
        </g>
      </svg>
    </>
  );
};

export default CountryPopulation;
