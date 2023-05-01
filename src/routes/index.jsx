import { createBrowserRouter } from 'react-router-dom';
import {
  CountryPopulation,
  CssNamedColors,
  DotPlot,
  DotPlotSelect,
  LineChart,
  MouseFollower,
  SmileyFace,
  SmileyFaceTweak,
  WorldMap,
  Histogram,
} from '../Pages';
import ErrorPage from './ErrorPage';
import Root from '../routes/root';
import { range } from 'd3';

const array = range(5 * 3);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/SmileyFaceTweak',
        element: <SmileyFaceTweak />,
      },
      {
        path: '/SmileyFace',
        element: [
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
      {
        path: '/Histogram',
        element: <Histogram />,
      },
    ],
  },
]);
