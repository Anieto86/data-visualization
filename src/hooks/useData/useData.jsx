import{json} from 'd3';
import { useCallback, useEffect, useState } from 'react';
import { feature } from 'topojson';


export const useData = (URL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchData = useCallback(async () => {
    try {
      const response = await json(URL);
      const topoJSONData = await feature(response, response.objects.countries);
      setData(topoJSONData);
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