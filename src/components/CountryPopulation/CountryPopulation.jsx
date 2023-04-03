import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch/useFetch';

const CountryPopulation = () => {
  const CSVURL = `https://gist.githubusercontent.com/Anieto86/7e41de1aa3c479125dc9ffbf78e6e7bf/raw/UN_Population_2019.csv`;
  const { data, loading, error } = useFetch(CSVURL);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const row = (d) => {
      d.Population = +d['2020'];
      return d;
    };

    if (data) {
      const parsedData = d3.csvParse(data, row);
      setCsvData(parsedData.slice(0, 10));
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const width = 1000;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 20, left: 200 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const yScale = d3
    .scaleBand()
    .domain(csvData.map((d) => d.Country))
    .range([0, innerHeight]);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(csvData, (d) => d.Population)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {xScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
            <line y2={innerHeight} stroke='black' />
            <text
              style={{ textAnchor: 'middle' }}
              dy='.71em'
              y={innerHeight + 3}
            >
              {tickValue}
            </text>
          </g>
        ))}
        {yScale.domain().map((tickValue) => (
          <text
            key={tickValue}
            style={{ textAnchor: 'end' }}
            dy='.32em'
            x='-9'
            y={yScale(tickValue) + yScale.bandwidth() / 2}
          >
            {tickValue}
          </text>
        ))}
        {csvData?.map((d, i) => {
          return (
            <rect
              key={d.Country}
              x={0}
              y={yScale(d.Country)}
              width={xScale(d.Population)}
              height={yScale.bandwidth()}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default CountryPopulation;
