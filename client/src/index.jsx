/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import CarSelection from './components/CarSelection.jsx';
import UserSubmission from './components/UserSubmission.jsx';

const axios = require('axios');

// eslint-disable-next-line no-unused-vars
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      makes: [],
      models: [],
    };
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    this.getMakes();
  }

  // eslint-disable-next-line class-methods-use-this
  getMakes() {
    axios({
      method: 'GET',
      url: '/makes',
    })
      .then((result) => {
        console.log('Retrieved all makes.', result.data);
        this.setState({ makes: result.data });
      })
      .catch(() => {
        console.log('Error retrieving makes.');
      });
  }

  render() {
    return (
      <div>
        <h1 id="welcome">Welcome to Carcentives</h1>
        <div id='carSelection'>
          <CarSelection makes={this.state.makes}/>
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('app'));
