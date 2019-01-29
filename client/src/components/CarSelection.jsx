/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-console */

import UserSubmission from './UserSubmission.jsx';

const axios = require('axios');
const React = require('react');

class CarMakeSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      selectedMake: '',
      models: [],
      selectedModel: '',
      zipCode: '',
      UserSubmission: [],
    };

    this.handleMakeChange = this.handleMakeChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getUserSubmission();
  }

  retrieveModels() {
    axios({
      method: 'GET',
      url: '/models',
      params: {
        selectedMake: this.state.selectedMake,
      },
    })
      .then((result) => {
        console.log('Retrieved all models.', result.data);
        this.setState({ models: result.data });
      })
      .catch(() => {
        console.log('Error retrieving models.');
      });
  }

  handleMakeChange(event) {
    this.setState({ selectedMake: event.target.value }, () => {
      this.retrieveModels();
    });
  }

  handleModelChange(event) {
    this.setState({ selectedModel: event.target.value });
  }

  handleZipCodeChange(event) {
    this.setState({ [event.target.name]: Number(event.target.value) });
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmit(event) {
    event.preventDefault();
    const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zipCode);
    if (this.state.selectedMake === '' || this.state.selectedModel === '' || this.state.zipCode === '') {
      alert('Please fill out all fields!');
    } else if (!isValidZip) {
      alert('Please enter a valid zip code!');
    } else {
      axios({
        method: 'POST',
        url: '/userSubmit',
        data: {
          make: this.state.selectedMake,
          model: this.state.selectedModel,
          zipCode: this.state.zipCode,
        },
      })
        .then(() => {
          console.log('User submission added');
          this.setState({
            selectedMake: '',
            selectedModel: '',
            zipCode: '',
          });
          this.getUserSubmission();
        })
        .catch(() => {
          console.log('User submission not added.');
        });
    }
  }

  getUserSubmission() {
    axios({
      method: 'GET',
      url: '/userSubmit',
    })
      .then((result) => {
        console.log('Retrieved all user submissions.');
        this.setState({ UserSubmission: result.data });
      })
      .catch((err) => {
        console.log('Error retrieving user submissions.', err);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <label id="makesLabel">
            Make:
            <select value={this.state.selectedMake} onChange={this.handleMakeChange}>
              <option> </option>
              {this.props.makes.map((currentMake, key) => <option value={currentMake.make} key={key}>{ currentMake.make }</option>)}
            </select>
          </label>

          <label id="modelsLabel">
            Models:
            <select value={this.state.selectedModel} onChange={this.handleModelChange}>
              <option> </option>
              {this.state.models.map((currentModel, key) => <option value={currentModel.models} key={key}>{ currentModel.models }</option>)}
            </select>
          </label>

          <label>
            Zip Code:
            <input type="text" name='zipCode' value={this.state.zipCode} onChange={this.handleZipCodeChange}></input>
          </label>

          <input type="submit" value="Submit"></input>

          </form>

        <div id='userSubmissionAndScreenShots'>
          <div id='userSubmission'>
            {this.state.UserSubmission.map((element, key) => <UserSubmission make={element.make} model={element.model} zipCode={element.zipCode} key={element.id} />)}
          </div>

          <div id='screenShots'> screenshot
          </div>
        </div>

      </div>
    );
  }
}

module.exports = CarMakeSelection;
