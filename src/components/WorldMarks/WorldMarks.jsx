import { geoEqualEarth, geoPath } from 'd3';
import './style.css';

const projection = geoEqualEarth();
const path = geoPath(projection);

const WorldMarks = ({ data }) => {
  return (
    <g className='marks-world'>
      {data.features?.map((feature, i) => (
        <path d={path(feature)} key={i} />
      ))}
    </g>
  );
};

export default WorldMarks;
