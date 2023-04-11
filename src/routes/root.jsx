import { Outlet, Link } from 'react-router-dom';
export default function Root() {
  return (
    <>
      <div id='sidebar'>
        {/* other elements */}

        <nav>
          <ul>
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
              <Link to={`Iris`}>Iris</Link>
            </li>
            <li>
              <Link to={`LineChart`}>Line Chart</Link>
            </li>
            <li>
              <Link to={`WorldMap`}>World Map</Link>
            </li>
          </ul>
        </nav>

        {/* other elements */}
      </div>
    </>
  );
}
