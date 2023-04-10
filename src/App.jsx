import { range } from 'd3';
import React from 'react';
import './App.css';
import {
  CountryPopulation,
  CssNamedColors,
  Iris,
  MouseFollower,
  SmileyFace,
} from './Pages';

const array = range(5 * 3);

function App() {
  return (
    <div className='App'>
      {array.map((ele, i) => {
        return (
          <React.Fragment key={i}>
            <SmileyFace />
          </React.Fragment>
        );
      })}
      <SmileyFaceTweak />
      <MouseFollower />
      <CssNamedColors />
      <CountryPopulation />
      <Iris/>
    </div>
  );
}

export default App;
