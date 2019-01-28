/* eslint-disable max-len */
/* eslint-disable no-console */
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
    };

    this.handleMakeChange = this.handleMakeChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    // TODO: Validate zip code
    this.setState({ [event.target.name]: Number(event.target.value) }, () => {
      console.log('zip code', this.state.zipCode);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.selectedMake === '' || this.state.selectedModel === '' || this.state.zipCode === '') {
      // eslint-disable-next-line no-alert
      // eslint-disable-next-line no-undef
      alert('Please fill out all field!');
    } else {
      // call post request to submit user input to db
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
          console.log('User submission added.');
        })
        .catch(() => {
          console.log('User submission not added.');
        });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
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
    );
  }
}

module.exports = CarMakeSelection;
