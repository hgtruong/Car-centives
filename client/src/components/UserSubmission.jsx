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
      screenShotDiv: '',
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
      screenShotDiv: '',
      screenShotUrl: '',
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
        .then((result) => {
          this.setState({ screenShotUrl: result.data.filePath }, () => {
            console.log('new url', this.state.screenShotUrl);
          });
        })
        .catch(() => {
          console.log('Error in screenshot');
        });
    });
  }

  renderScreenShot() {
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div id="userSubmissionAndScreenShots">
        <div id='individualCar'>
          <button className="link" name={this.props.name} onClick={this.handleClick}>
          {this.props.make} {this.props.model} {this.props.zipCode}
          </button>
          <br></br>
          <a href={this.state.finalURL} target="_blank"> Manufacturer's Site </a>

          <div id="screenShots" >
            <img src={`${this.state.screenShotUrl}`} />
          </div>
        </div>


      </div>


    );
  }
}

module.exports = UserSubmission;
