import { range } from 'd3';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import {
  CountryPopulation,
  CssNamedColors,
  Iris,
  MouseFollower,
  SmileyFace,
  SmileyFaceTweak,
  LineChart
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
  { path: '/Iris', element: <Iris /> },
  { path: '/LineChart', element: <LineChart /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
