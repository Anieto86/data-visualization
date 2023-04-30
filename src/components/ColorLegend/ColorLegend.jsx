import './style.css';

export const ColorLegend = ({
  colorScale,
  tickSpacing = 20,
  tickSize = 10,
  tickTextOffset = 20,
  onSelectHover,
}) => {
  const handleHover = (dom) => {
    onSelectHover(dom);
  };

  return colorScale.domain().map((domainValue, i) => (
    <g
      key={i}
      className="tick"
      transform={`translate(0,${i * tickSpacing})`}
      onMouseEnter={() => handleHover(domainValue)}
      onMouseOut={() => handleHover()}
    >
      <circle
        fill={colorScale(domainValue)}
        r={tickSize}
        transform="translate(-30, 0)"
      />
      <text x={tickTextOffset} dy=".32em">
        {domainValue}
      </text>
    </g>
  ));
};
