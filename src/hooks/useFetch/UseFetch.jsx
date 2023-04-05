import { useCallback, useEffect, useState } from 'react';
import * as d3 from 'd3';

export const useFetch = (URL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      // const response = await fetch(URL);
      // const parseData = await response.text()
      // const csvData = d3.csvParse(parseData);
      // setData(csvData);

      const response = await d3.csv(URL);
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error , setData };
};

//     fetch(URL)
//       .then((res) => res.text())
//       .then((data) => setData(data))
//       .catch((err) => setError(err))
// 			.finally(()=> setLoading(false))
//   }, []);

// 	return {data, loading, error}
// }
