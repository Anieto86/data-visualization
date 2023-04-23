import { Link, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              <Link to={`SmileyFaceTweak`}>SmileyFaceTweak</Link>
            </li>
            <li>
              <Link to={`SmileyFace`}>SmileyFace</Link>
            </li>
            <li>
              <Link to={`MouseFollower`}>MouseFollower</Link>
            </li>
            <li>
              <Link to={`CssNamedColors`}>CssNamedColors</Link>
            </li>
            <li>
              <Link to={`CountryPopulation`}>CountryPopulation</Link>
            </li>
            <li>
              <Link to={`DotPlot`}>DotPlot Iris</Link>
            </li>
            <li>
              <Link to={`DotPlotSelect`}>DotPlot Select</Link>
            </li>
            <li>
              <Link to={`LineChart`}>Line Chart</Link>
            </li>
            <li>
              <Link to={`WorldMap`}>World Map</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
