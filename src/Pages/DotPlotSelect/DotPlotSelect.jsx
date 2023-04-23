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

const width = 1000;
const menuHight = 75;
const height = 500 - menuHight;
const margin = { top: 20, right: 30, bottom: 60, left: 90 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;
// const tickOffset =

const attributes = [
  { value: 'sepal_length', label: 'Sepal Length' },
  { value: 'sepal_width', label: 'Sepal Width' },
  { value: 'petal_length', label: 'Petal Length' },
  { value: 'petal_width', label: 'Petal Width' },
  { value: 'species', label: 'Species' },
];

const getLabel = (value) => {
  const result = attributes.find((ele) => ele.value === value);
  return result.label;
};

const DotPlotSelect = () => {
  const initialXAttribute = 'petal_length';
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const initialYAttribute = 'sepal_width';
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

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

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice();

  return (
    <>
      <div>
        <label htmlFor="x-select">X:</label>
        <Dropdown
          attributes={attributes}
          id="x-select"
          selectValue={xAttribute}
          onSelectValue={setXAttribute}
        />
      </div>
      <div>
        <label htmlFor="x-select">Y:</label>
        <Dropdown
          attributes={attributes}
          id="y-select"
          selectValue={yAttribute}
          onSelectValue={setYAttribute}
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
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset}, ${
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
            yValue={yValue}
            xValue={xValue}
            tickFormat={format('.2s')}
            dotToLine={false}
          />
        </g>
      </svg>
    </>
  );
};

export default DotPlotSelect;
