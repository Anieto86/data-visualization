import { arc, pie } from 'd3';
import { useFetch } from '../../hooks/useFetch/useFetch';
import React from 'react';
import { Link } from 'react-router-dom';

const CssNamedColors = () => {
  const CSVURL = `https://gist.githubusercontent.com/Anieto86/fdb1f57cb2f7436074b5daf574fa868e/raw/CSS%2520named%2520colors%2520-%2520Hoja%25201.csv`;
  const { data, loading, error } = useFetch(CSVURL);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const width = 1000;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;
  const pieRadius = 0;
  const pieArc = arc().innerRadius(pieRadius).outerRadius(width);
  const colorPie = pie().value(1);

  const message = `Number of rows: ${data.length}, Number of columns: ${
    data.columns.length
  },
   Data size ${Math.round(data?.length / 1024) + ' KB'}`;

  return (
    <React.Fragment>
      <h2>Css Named Colors Render data with React and D3</h2>
      <pre id="message-container">{message}</pre>
      <svg width={width} height={height}>
        <g transform={`translate(${centerX}, ${centerY})`}>
          {colorPie(data).map((d, i) => {
            return (
              <g key={i}>
                <path key={i} fill={d.data['RGB hex value']} d={pieArc(d)} />
                <title>{d.data['Keyword']}</title>
              </g>
            );
          })}
        </g>
      </svg>
    </React.Fragment>
  );
};

export default CssNamedColors;

//Note this form to create the arc, not using d3.pie()
// {parseData.map((d, i) => {
//   return (
//     <path
//       key={d['RGB hex value']}
//       fill={d['RGB hex value']}
//       d={pieArc({
//         startAngle: i / parseData.length * 2 * Math.PI,
//         endAngle:( ( i+1) / parseData.length) * 2 * Math.PI
//       })}
//     />
//   );
// })}
