import * as d3 from 'd3';
import { useEffect, useState } from 'react';

export const useData = (CSVURL) => {
  const [csvData, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.Population = +d['2020'] * 1000;
      return d;
    };
    d3.csv(CSVURL, row).then((data) => setData(data.slice(0, 10)));
  }, []);

  return { csvData };
};