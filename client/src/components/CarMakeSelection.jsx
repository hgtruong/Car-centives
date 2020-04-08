/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  Select, 
  InputLabel, 
  MenuItem, 
  FormControl, 
  makeStyles,
  TextField
} from '@material-ui/core';
import { useAPIService } from '../utils/useAPIService';

function CarMakeSelection(props) {
  const classes = useStyles();
  const [make, updateMake] = useFormInput('');
  const [model, updateModel] = useFormInput('');
  const [zipCode, updateZipCode] = useFormInput('');
  const [isValid, updateIsValid] = useFormInput(false);

  const [makes, makesAPICall] = useAPIService();
  const [models, modelsAPICall] = useAPIService();
  const [zipService, zipCodeAPICall] = useAPIService();

  // Makes API Call
  useEffect(() => {
    makesAPICall('/makes', 'GET', {}, {});
  }, []);

  // Models API Call
  useEffect(() => {
    updateModel("");
    let params = {
      selectedMake: make.value
    }
    modelsAPICall('/models', 'GET', params, {});
  }, [make.value]);

  useEffect(() => {
    if(zipCode.value.length === 5 && !isNaN(zipCode.value)) {
      let params = {
        zipCode: zipCode.value
      }
      zipCodeAPICall('/validateZip', 'GET', params, {});
    } 
    updateIsValid(false);
  }, [zipCode.value]);

  useEffect(() => {
    if(zipService.data.City && zipService.data.State ) {
      updateIsValid(true);
    } else {
      updateIsValid(false);
    }
  }, [zipService.data])

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="makeLabel">
          Make
        </InputLabel>
        <Select {...make}>
          <MenuItem value=""> 
            <em> None </em> 
          </MenuItem>
          {makes.data.map((currentMake, key) => <MenuItem value={currentMake.make} key={key}>{ currentMake.make }</MenuItem>)}
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
          {models.data.map((currentModel, key) => <MenuItem value={currentModel.models} key={key}>{ currentModel.models }</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} noValidate autoComplete="on">
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export { CarMakeSelection };
