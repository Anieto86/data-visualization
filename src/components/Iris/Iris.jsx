import { useFetch } from '../../hooks';
import { useEffect } from 'react';
import './style.css';

const Iris = () => {
  const CSVURL = `https://gist.githubusercontent.com/Anieto86/25c944aa3804c9b498b4e4b973f11fea/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv`;

	const { data, loading, error, setData} = useFetch(CSVURL)

	if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  useEffect(() => {
    const row = (d) => {
      d.sepal_length = +d.sepal_length;
      d.sepal_width = +d.sepal_width;
      d.petal_length = +d.petal_length;
      d.petal_width = +d.petal_width;
      return d;
    };

		d3.csv(CSVURL, row).then(setData(data))
  }, [CSVURL]);



  return <div>Iris</div>;
};

export default Iris;
