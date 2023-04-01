import * as d3 from 'd3';
// import { useFetch } from '../../hooks/useFetch';
import { scaleBand, scaleLinear } from 'd3';
import { useState ,useEffect } from 'react';


const CountryPopulation = () => {
  const [data, setData] = useState()
  const CSVURL = `https://gist.githubusercontent.com/Anieto86/7e41de1aa3c479125dc9ffbf78e6e7bf/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv`;

  useEffect(() => {
    const row = (d) => {
      d.Population = +d['2020'];
      return d;
    };
    d3.csv(CSVURL, row).then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  const width = 1000;
  const height = 500;
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, height]);

  const xScale = d3.scaleLinear()
  .domain([0, d3.max(data, (d) => d.Population)])
  .range([0, width]);

  return (
    <svg width={width} height={height}>
      {data.map((d, i) => {
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
    </svg>
  );
};

export default CountryPopulation;
