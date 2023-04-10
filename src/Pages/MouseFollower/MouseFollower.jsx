import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const width = 1000;
const height = 1000;
const initialPosition = {
  x: width / 2,
  y: height / 2,
};

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState(initialPosition);
  const radius = 30;

  const handleMouseMove = useCallback(
    (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ ...mousePosition, x: clientX, y: clientY });
    },
    [setMousePosition]
  );

  return (
    <React.Fragment>
      <svg
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        style={{ background: 'pink' }}
      >
        <circle cx={mousePosition.x} cy={mousePosition.y} r={radius} />
      </svg>
      <Link to={'/'} className='iris-button'>
        <button className='iris-button-style'>Go Back</button>
      </Link>
    </React.Fragment>
  );
};

export default MouseFollower;
