export const ColorLegend = ({ colorScale }) => {
  return colorScale.domain().map((domainValue) => {
    return (
      <g>
        <circle fill={colorScale(domainValue)}></circle>
        <text dy="0.32em">{domainValue}</text>
      </g>
    );
  });
};
