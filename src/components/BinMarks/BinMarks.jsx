const BinMarks = ({
  binnedData,
  xScale,
  yScale,
  toolTipFormat,
  innerHeight,
}) => (
  <>
    {binnedData?.map((d, i) => (
      <rect
        key={i}
        x={xScale(d.x0)}
        y={yScale(d.y)}
        fill={'red'}
        width={xScale(d.x1) - xScale(d.x0)}
        height={innerHeight - yScale(d.y)}
      >
        <title>{toolTipFormat(d.y)}</title>
      </rect>
    ))}
  </>
);

export default BinMarks;
