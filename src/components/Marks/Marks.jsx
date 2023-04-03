import './style.css';
const Marks = ({ csvData, xScale, yScale, yValue, xValue }) =>
  csvData?.map((d) => {
    return (
      <rect
        className='marks'
        key={yValue(d)}
        x={0}
        y={yScale(yValue(d))}
        width={xScale(xValue(d))}
        height={yScale.bandwidth()}
      >
        <title>{xValue(d)}</title>
      </rect>
    );
  });

export default Marks;
