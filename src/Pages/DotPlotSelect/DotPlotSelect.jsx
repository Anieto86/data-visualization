import { csv, extent, format, scaleLinear } from 'd3';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AxisBottom,
  AxisLeftPlot,
  PlotMarks,
  Dropdown,
} from '../../components';
import { useFetch } from '../../hooks';
import './style.css';

const options = [
  {
    value: 'javascript',
    label: 'JavaScript',
  },
  {
    value: 'PHP',
    label: 'PHP',
  },
  {
    value: 'java',
    label: 'Java',
  },
  {
    value: 'golang',
    label: 'Golang',
  },
  {
    value: 'python',
    label: 'Python',
  },
  {
    value: 'C#',
    label: 'C#',
  },
  {
    value: 'C++',
    label: 'C++',
  },
  {
    value: 'erlang',
    label: 'Erlang',
  },
];

const DotPlotSelect = () => {
  const initialXAttribute = 'petal_length';

  const [xAttribute, setXAttribute] = useState(initialXAttribute);

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

  console.log(data.columns);

  const xValue = (d) => d[xAttribute];
  const xAxisLabel = 'Sepal length';

  const yValue = (d) => d.sepal_width;
  const yAxisLabel = 'Sepal Width';

  const width = 1000;
  const height = 500;
  const margin = { top: 20, right: 30, bottom: 60, left: 90 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = 40;
  // const tickOffset =

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <>
      <div>
        <label htmlFor='x-select'>X:</label>
        <Dropdown
          options={options}
          id='x-select'
          selectValue={xAttribute}
          onSelectValue={setXAttribute}
        />
      </div>
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
            className='axis-label'
            textAnchor='middle'
            transform={`translate(${-yAxisLabelOffset}, ${
              innerHeight / 2
            })rotate(-90)`}
          >
            {yAxisLabel}
          </text>
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
            dotToLine={false}
          />
        </g>
      </svg>
      <Link to={'/'} className='iris-button'>
        <button className='iris-button-style'>Go Back</button>
      </Link>
    </>
  );
};

export default DotPlotSelect;
