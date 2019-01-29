/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import brandUrl from './BrandUrl.js';

// const puppeteer = require('puppeteer');

class UserSubmission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finalURL: '',
      make: '',
      model: '',
      zipCode: '',
      screenShotUrl: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.finalURL();
  }

  finalURL() {
    // console.log('make', this.props.make.replace(' ', ''));
    const urlFunction = brandUrl[this.props.make.replace(' ', '')];
    // console.log('url', urlFunction);
    const finalUrl = urlFunction(this.props.model, this.props.zipCode);
    // console.log('final is', finalUrl);
    this.setState({ finalURL: finalUrl });
  }

  handleClick(event) {
    this.setState({
      make: this.props.make,
      model: this.props.model,
      zipCode: this.props.zipCode,
    }, () => {
      axios({
        method: 'POST',
        url: '/screenshot',
        data: {
          make: this.props.make,
          model: this.props.model,
          zipCode: this.props.zipCode,
          finalUrl: this.state.finalURL,
        },
      })
        .then(() => {
          console.log('inside');
        })
        .catch(() => {
        });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div id='individualCar'>
        <button className="link" name={this.props.name} onClick={this.handleClick}>
        {this.props.make} {this.props.model} {this.props.zipCode}
        </button>
        <br></br>
        <a href={this.state.finalURL} target="_blank"> Manufacturer's Site </a>
      </div>
    );
  }
}

module.exports = UserSubmission;
