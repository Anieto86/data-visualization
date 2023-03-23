import { range } from 'd3';
import React from 'react';
import './App.css';
import { CssNamedColors, SmileyFace } from './components';

const array = range(5 * 3);

function App() {
  return (
    <div className='App'>
      <CssNamedColors />
      {array.map((ele, i) => {
        return (
          <React.Fragment key={i}>
            <SmileyFace />
          </React.Fragment>
        );
      })}

      {/* <SmileyFaceTweak /> */}
    </div>
  );
}

export default App;
