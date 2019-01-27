import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// eslint-disable-next-line no-unused-vars
import List from './components/List.jsx';

// eslint-disable-next-line no-unused-vars
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          items: data,
        });
      },
      error: (err) => {
        // eslint-disable-next-line no-console
        console.log('err', err);
      },
    });
  }

  render() {
    return (
      <div>
        <h1>Item List</h1>
        <List items={this.state.items}/>
      </div>
    );
  }
}

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('app'));
