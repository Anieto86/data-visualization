import { arc } from "d3";

const SmileyFaceTweak = () => {
  const width = 500;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;
  const strokeWidth = 10;
  const radius = height / 2 - strokeWidth / 2;
  const eyesOffsetX = 90;
  const eyesOffsetY = 100;
  const eyesRadius = 45;
  const mouthWidth = 20;
  const mouthRadius = 140;

  const mouthArc = arc()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius + mouthWidth)
    .startAngle(Math.PI / 2)
    .endAngle((Math.PI * 3) / 2);

  //svg elipse, line, rects , grafient

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${centerX}, ${centerY})`}>
          <circle
            r={radius}
            fill="yellow"
            stroke="black"
            stroke-width={strokeWidth}
          />
          {/* <rect width='100%' height='100%' fill='red' stroke-width="5"/> */}
          <ellipse
            cx="75"
            cy="75"
            rx="20"
            ry="5"
            stroke="red"
            fill="red"
            stroke-width="5"
          />

          <circle cx={-eyesOffsetX} cy={-eyesOffsetY} r={eyesRadius} />

          <circle cx={+eyesOffsetX} cy={-eyesOffsetY} r={eyesRadius} />
          <path d={mouthArc()} />
        </g>
      </svg>
    </>
  );
};

export default SmileyFaceTweak;
