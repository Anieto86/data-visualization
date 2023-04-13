import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';
import './style.css';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

const WorldMarks = ({ data }) => {
  const { countries, interiors } = data || {};
  return (
    <g className='marks-world'>
      <path className='sphere' d={path({ type: 'Sphere' })} />
      <path className='graticules' d={path(graticule())} />
      {countries.features?.map((feature, i) => (
        <g key={i}>
          <path className='land ' d={path(feature)} />
          <title>{feature.properties.name}</title>
        </g>
      ))}
      <path className='interiors' d={path(interiors)} />
    </g>
  );
};

export default WorldMarks;
