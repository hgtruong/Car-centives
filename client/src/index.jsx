/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
import { CarMakeSelection } from './components/CarMakeSelection.jsx';

import axios from "axios";


// eslint-disable-next-line no-unused-vars
const App = function() {
    return (
      <div>
        <h1 id="welcome">Welcome</h1>
        <CarMakeSelection />
      </div>
    );
}

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('app'));
