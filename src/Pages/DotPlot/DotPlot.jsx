import { csv, extent, format, scaleLinear, scaleOrdinal } from 'd3';
import { useEffect } from 'react';
import { useFetch } from '../../hooks';
import AxisBottom from '../../components/AxisBottom/AxisBottom';
import AxisLeftPlot from '../../components/AxisLeftPlot/AxisLeftPlot';
import PlotMarks from '../../components/PlotMarks/PlotMarks';
import './style.css';
import { Link } from 'react-router-dom';

const DotPlot = () => {
  const CSVURL = `https://gist.githubusercontent.com/Anieto86/25c944aa3804c9b498b4e4b973f11fea/raw/iris.csv`;

  const { data, loading, error, setData } = useFetch(CSVURL);

  useEffect(() => {
    const row = (d) => {
      d.sepal_length = +d.sepal_length;
      d.sepal_width = +d.sepal_width;
      d.petal_length = +d.petal_length;
      d.petal_width = +d.petal_width;
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
  // const tickOffset =

  const yValue = (d) => d.sepal_width;
  const xValue = (d) => d.sepal_length;

  const xAxisLabel = 'Sepal length';
  const yAxisLabel = 'Sepal Width';

  const colorValue = (d) => d.species;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137B80', '#8E6C8A']);

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={format('.2s')}
            tickOffset={5}
          />
          <AxisLeftPlot
            yScale={yScale}
            innerWidth={innerWidth}
            yAxisLabel={yAxisLabel}
            tickOffset={5}
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
          <text
            className="axis-label"
            textAnchor="middle"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
          >
            {xAxisLabel}
          </text>

          <PlotMarks
            data={data}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            yValue={yValue}
            xValue={xValue}
            colorValue={colorValue}
            tickFormat={format('.2s')}
            dotToLine={false}
          />
        </g>
      </svg>
    </div>
  );
};

export default DotPlot;
