import './style.css';
const Marks = ({ csvData, xScale, yScale, yValue, xValue ,tickFormat }) =>
  csvData?.map((d) => {
    return (
      <g className='marks'>
      <rect
        key={yValue(d)}
        x={0}
        y={yScale(yValue(d))}
        width={xScale(xValue(d))}
        height={yScale.bandwidth()}
      >
        <title>{tickFormat(xValue(d))}</title>
      </rect>
      </g>
    );
  });

export default Marks;
