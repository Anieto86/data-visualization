import { BackgroundCircle } from '../BackgroundCircle/BackgroundCircle';
import { Eyes } from '../Eyes/Eyes';
import { Mouth } from '../Mouth/Mouth';


const SmileyFace = () => {
  const width = 500;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;
  const strokeWidth = 10 + Math.random() * 3;
  const radius = height / 2 - strokeWidth / 2;
  const eyesOffsetX = 90 + Math.random() * 9;
  const eyesOffsetY = 100 + Math.random() * 10;
  const eyesRadius = 45 + Math.random() * 3;
  const mouthWidth = 20 + Math.random() * 9;
  const mouthRadius = 140 + Math.random() * 10;

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        <BackgroundCircle radius={radius} strokeWidth={strokeWidth} />
        <Eyes
          eyesOffsetY={eyesOffsetY}
          eyesRadius={eyesRadius}
          eyesOffsetX={eyesOffsetX}
        />
        <Mouth mouthWidth={mouthWidth} mouthRadius={mouthRadius} />
      </g>
    </svg>
  );
};

export default SmileyFace;
