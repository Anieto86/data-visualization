import React from 'react';
import { BackgroundCircle } from '../../components/BackgroundCircle/BackgroundCircle';
import { Eyes } from '../../components/Eyes/Eyes';
import { Mouth } from '../../components/Mouth/Mouth';
import { Link } from 'react-router-dom';

const SmileyFace = () => {
  const width = 250;
  const height = 250;
  const centerX = width / 2;
  const centerY = height / 2;
  const strokeWidth = 5 + Math.random() * 3;
  const radius = height / 2 - strokeWidth / 2;
  const eyesOffsetX = 45 + Math.random() * 9;
  const eyesOffsetY = 50 + Math.random() * 10;
  const eyesRadius = 22.5 + Math.random() * 9;
  const mouthWidth = 10 + Math.random() * 9;
  const mouthRadius = 70 + Math.random() * 10;

  return (
    <>
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
    </>
  );
};

export default SmileyFace;
