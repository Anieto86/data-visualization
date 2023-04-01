import { useCallback, useEffect, useState } from 'react';
import * as d3 from 'd3';

export const useFetchCSV = (URL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDataCSV = useCallback(async () => {
    try {
      const response = await fetch(URL);
     
      // const data = await response.text();
      
      const dataCSV =  response.csv(URL).then();
      console.log(dataCSV);
      

     
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [URL]);

  useEffect(() => {
    fetchDataCSV();
  }, [fetchDataCSV]);

  return { data, loading, error };
};
