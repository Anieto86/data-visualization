import { csv, extent, format, scaleLinear, scaleOrdinal } from 'd3';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import {
  AxisBottom,
  AxisLeftPlot,
  Dropdown,
  PlotMarks,
  ColorLegend,
} from '../../components';
import { useFetch } from '../../hooks';
import './style.css';

const width = 1000;
const menuHight = 75;
const height = 500 - menuHight;
const margin = { top: 20, right: 200, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

const CSVURL = `https://gist.githubusercontent.com/Anieto86/25c944aa3804c9b498b4e4b973f11fea/raw/iris.csv`;

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
  const [hoverValue, setSelectHover] = useState(null);

  const initialXAttribute = 'petal_length';
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const initialYAttribute = 'sepal_width';
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  const colorValue = (d) => d.species;
  const colorLegendLabel = 'Species';
  const circleRadius = 8;

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

  const filterData = data.filter((d) => hoverValue === colorValue(d));

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice();

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137B80', '#8E6C8A']);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={6}
      sx={{ minWidth: 120 }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ my: 5 }}
      >
        <Grid item sx={{ mx: 3 }}>
          <Dropdown
            defaultValue={initialYAttribute}
            label={'Y Axis'}
            attributes={attributes}
            id="y-select"
            selectValue={yAttribute}
            onSelectValue={setYAttribute}
          />
        </Grid>
        <Grid item sx={{ mx: 3 }}>
          <Dropdown
            defaultValue={initialXAttribute}
            label={'X Axis'}
            attributes={attributes}
            id="x-select"
            selectValue={xAttribute}
            onSelectValue={setXAttribute}
          />
        </Grid>
      </Grid>
      <Grid item>
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
            <g opacity={hoverValue ? 0.5 : 1}>
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
                colorDots
              />
            </g>
            <PlotMarks
              data={filterData}
              xScale={xScale}
              yScale={yScale}
              colorScale={colorScale}
              yValue={yValue}
              xValue={xValue}
              colorValue={colorValue}
              tickFormat={format('.2s')}
              dotToLine={false}
              colorDots
            />
            <g transform={`translate(${innerWidth + 60}, 60)`}>
              <text x={35} y={-25} className="axis-label" textAnchor="middle">
                {colorLegendLabel}
              </text>
              <ColorLegend
                tickSpacing={22}
                tickTextOffset={12}
                tickSize={circleRadius}
                colorScale={colorScale}
                hoverLabel={hoverValue}
                onSelectHover={setSelectHover}
              />
            </g>
          </g>
        </svg>
      </Grid>
    </Grid>
  );
};

export default DotPlotSelect;
