// import { extent, format, scaleLinear, scaleTime, timeFormat } from 'd3';
import { Link } from 'react-router-dom';
import { WorldMarks } from '../../components';
import { useData } from '../../hooks';
import './style.css';

const WorldMap = () => {
  const URL = `https://unpkg.com/world-atlas@2.0.2/countries-50m.json`;

  const { data, loading, error } = useData(URL);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const width = 1000;
  const height = 500;

  return (
    <>
      <svg width={width} height={height}>
        <WorldMarks data={data} />
      </svg>
      <Link to={'/'} className='iris-button'>
        <button className='iris-button-style'>Go Back</button>
      </Link>
    </>
  );
};

export default WorldMap;
