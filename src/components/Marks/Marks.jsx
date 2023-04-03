const Marks = ({ csvData, xScale, yScale ,yValue ,xValue}) =>
  csvData?.map((d) => {
    return (
      <rect
        key={yValue(d)}
        x={0}
        y={yScale(yValue(d))}
        width={xScale(xValue(d))}
        height={yScale.bandwidth()}
      />
    );
  });

export default Marks;
