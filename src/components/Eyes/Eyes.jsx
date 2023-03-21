import React from 'react';

export const Eyes = ({eyesOffsetX, eyesOffsetY ,eyesRadius }) => {
	return (
		<>
			<circle cx={-eyesOffsetX} cy={-eyesOffsetY} r={eyesRadius} />
			<circle cx={+eyesOffsetX} cy={-eyesOffsetY} r={eyesRadius} />
		</>
	);
};

