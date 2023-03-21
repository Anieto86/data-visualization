import { range } from 'd3';
import React from 'react';
import './App.css';
import { SmileyFace } from './components';

const array = range(6 * 3);

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

      {/* <SmileyFaceTweak /> */}
    </div>
  );
}

export default App;
