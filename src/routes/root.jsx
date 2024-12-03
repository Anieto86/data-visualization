import { Grid } from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              <NavLink to={`SmileyFaceTweak`}>Smiley Face Tweak</NavLink>
            </li>
            <li>
              <NavLink to={`SmileyFace`}>Smiley Face</NavLink>
            </li>
            <li>
              <NavLink to={`MouseFollower`}>MouseFollower</NavLink>
            </li>
            <li>
              <NavLink to={`CssNamedColors`}>Css Named Colors</NavLink>
            </li>
            <li>
              <NavLink to={`WorldMap`}>World Map</NavLink>
            </li>
            <li>
              <NavLink to={`CountryPopulation`}>Country Population</NavLink>
            </li>
            <li>
              <NavLink to={`DotPlot`}>Dot Plot</NavLink>
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
