import { Grid } from '@mui/material';
import { Outlet, NavLink } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              <NavLink to={`SmileyFaceTweak`}>SmileyFaceTweak</NavLink>
            </li>
            <li>
              <NavLink to={`SmileyFace`}>SmileyFace</NavLink>
            </li>
            <li>
              <NavLink to={`MouseFollower`}>MouseFollower</NavLink>
            </li>
            <li>
              <NavLink to={`CssNamedColors`}>CssNamedColors</NavLink>
            </li>
            <li>
              <NavLink to={`WorldMap`}>World Map</NavLink>
            </li>
            <li>
              <NavLink to={`CountryPopulation`}>CountryPopulation</NavLink>
            </li>
            <li>
              <NavLink to={`DotPlot`}>DotPlot</NavLink>
            </li>
            <li>
              <NavLink to={`DotPlotSelect`}>DotPlot with Select</NavLink>
            </li>
            <li>
              <NavLink to={`LineChart`}>Line Chart</NavLink>
            </li>
            <li>
              <NavLink to={`Histogram`}>Histogram</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Grid container direction="row" justifyContent="center" sx={{ p: 4 }}>
        <Grid item>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
