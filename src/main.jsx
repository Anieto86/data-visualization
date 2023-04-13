import { range } from 'd3';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import {
  CountryPopulation,
  CssNamedColors,
  DotPlot,
  MouseFollower,
  SmileyFace,
  SmileyFaceTweak,
  LineChart,
  WorldMap,
  DotPlotSelect,
} from './Pages';
import Root from './routes/root';

const array = range(5 * 3);

const router = createBrowserRouter([
  { path: '/', element: <Root /> },
  {
    path: '/SmileyFace',
    element: [
      <SmileyFaceTweak />,
      <div>
        {array.map((ele, i) => (
          <SmileyFace key={i} />
        ))}
      </div>,
    ],
  },
  { path: '/MouseFollower', element: <MouseFollower /> },
  { path: '/CssNamedColors', element: <CssNamedColors /> },
  { path: '/CountryPopulation', element: <CountryPopulation /> },
  { path: '/DotPlot', element: <DotPlot /> },
  { path: '/DotPlotSelect', element: <DotPlotSelect /> },
  { path: '/LineChart', element: <LineChart /> },
  { path: '/WorldMap', element: <WorldMap /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
