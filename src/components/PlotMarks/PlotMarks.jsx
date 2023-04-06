import './style.css';

const PlotMarks = ({ data, xScale, yScale, yValue, xValue, tickFormat }) =>
  data?.map((d, i) => {
    console.log(d);
    return (
      <g className='marks' key={i}>
        <circle cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={10}>
          <title>{tickFormat(xValue(d))}</title>
        </circle>
      </g>
    );
  });

export default PlotMarks;
