/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  Select, 
  InputLabel, 
  MenuItem, 
  FormControl, 
  makeStyles,
  TextField,
  Button
} from '@material-ui/core';
import { useAPIService } from '../utils/useAPIService';
import { DialogSpinner } from '../utils/dialogSpinner.jsx';

function CarMakeSelection(props) {
  const classes = useStyles();
  const [make, updateMake] = useFormInput('');
  const [model, updateModel] = useFormInput('');
  const [zipCode, updateZipCode] = useFormInput('');
  const [isValid, updateIsValid] = useFormInput(false);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [dialogMessage, setDialogMessage] = useState("Setting up");
  const [isDisable, setIsDisable] = useState(true);

  const [makeService, makeServiceAPICall] = useAPIService();
  const [modelService, modelServiceAPICall] = useAPIService();
  const [zipService, zipServiceAPICall] = useAPIService();

  // Makes API Call
  useEffect(() => {
    setDialogMessage(`Retrieving makes`);
    makeServiceAPICall('/makes', 'GET', {}, {});
  }, []);

  // Models API Call
  useEffect(() => {
    if(make.value !== "") {
      updateModel("");
      let params = {
        selectedMake: make.value
      }
      setDialogMessage(`Retrieving models for ${make.value}`);
      modelServiceAPICall('/models', 'GET', params, {});
    }
  }, [make.value]);

  // Zip Validation
  useEffect(() => {
    if(zipCode.value.length === 5 && !isNaN(zipCode.value)) {
      let params = {
        zipCode: zipCode.value
      }
      setDialogMessage(`Validating Zip Code`);
      zipServiceAPICall('/validateZip', 'GET', params, {});
    } 
    updateIsValid(false);
  }, [zipCode.value]);

  useEffect(() => {
    if(zipService.data.City && zipService.data.State ) {
      updateIsValid(true);
    } else {
      updateIsValid(false);
    }
  }, [zipService.data]);

  useEffect(() => {
    if( makeService.isLoading === true ||
        modelService.isLoading === true ||
        zipService.isLoading === true
      ) {
        setDialogOpen(true);
      } else {
        setDialogOpen(false);
      }
  }, [makeService.isLoading, modelService.isLoading, zipService.isLoading]);

  useEffect(() => {
    if(isValid.value && zipCode.value.length === 5 && make.value.length > 0 && model.value.length > 0) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [zipCode.value, isValid.value, make.value, model.value]);

  return (
    <div className="car-make-selection">

      <DialogSpinner dialogOpen={dialogOpen} message={dialogMessage}/>

      <div className="make-model-zip-form" className={classes.formContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel id="makeLabel">
            Make
          </InputLabel>
          <Select {...make}>
            <MenuItem value="">
              <em> None </em>
            </MenuItem>
            {makeService.data.map((currentMake, key) => <MenuItem value={currentMake.make} key={key}>{ currentMake.make }</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="modelLabel">
            Model
          </InputLabel>
          <Select {...model}>
            <MenuItem value="">
              <em> None </em>
            </MenuItem>
            {modelService.data.map((currentModel, key) => <MenuItem value={currentModel.models} key={key}>{ currentModel.models }</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            error={!isValid.value || zipCode.value.length < 5}
            onChange={zipCode.onChange}
            helperText={isValid.value ? "" : "Invalid Zip Code"}
            required id="standard-error"
            label="Zip Code"
            inputProps={{maxLength: 5}}
          />
        </FormControl>
      </div>

      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          disabled={isDisable}
          color="primary"
          variant="contained"
          >Submit
        </Button>
      </div>
    </div>
  );
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function updateValue(newValue) {
    setValue(newValue);
  }

  return [{value, onChange: handleChange}, updateValue];
}

const useStyles = makeStyles((theme) => ({
  formContainer: {
    textAlign: "center"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  buttonContainer: {
    '& > *': {
      margin: theme.spacing(2),
    },
    textAlign: "center",
  },
  button: {
    size: "large"
  }
}));

export { CarMakeSelection };
