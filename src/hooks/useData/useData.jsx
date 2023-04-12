import { json } from 'd3';
import { useCallback, useEffect, useState } from 'react';
import { feature, mesh } from 'topojson';

export const useData = (URL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const topology = await json(URL);
      const { countries } = topology.objects;
      setData({
        countries: feature(topology, countries),
        interiors: mesh(topology, countries, (a, b) => {
          return a !== b;
        }),
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, setData };
};
