import './style.css';
const Marks = ({ csvData, xScale, yScale, yValue, xValue, tickFormat }) =>
  csvData?.map((d) => {
    return (
      <g className="marks" key={yValue(d)}>
        <rect
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
