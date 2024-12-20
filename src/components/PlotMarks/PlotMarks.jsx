import React from 'react';
import { line, curveNatural } from 'd3';
import './style.css';

const PlotMarks = ({
  data,
  xScale,
  yScale,
  yValue,
  xValue,
  tickFormat,
  dotToLine,
  colorScale,
  colorValue,
  colorDots,
}) => (
  <React.Fragment>
    {dotToLine ? (
      <g className="marks">
        <path
          d={line()
            .x((d) => xScale(xValue(d)))
            .y((d) => yScale(yValue(d)))
            .curve(curveNatural)(data)}
        />
      </g>
    ) : (
      <g className="marks">
        {data?.map((d, i) => (
          <circle
            key={i}
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={5}
            fill={colorDots ? colorScale(colorValue(d)) : 'red'}
          >
            <title>{tickFormat(xValue(d))}</title>
          </circle>
        ))}
      </g>
    )}
  </React.Fragment>
);

export default PlotMarks;
