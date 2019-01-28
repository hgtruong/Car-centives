/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
import CarMakeSelection from './components/CarMakeSelection.jsx';

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
    this.retrieveMakes();
  }

  // eslint-disable-next-line class-methods-use-this
  retrieveMakes() {
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
        <h1 id="welcome">Welcome</h1>
        <CarMakeSelection makes={this.state.makes}/>
      </div>
    );
  }
}

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('app'));
