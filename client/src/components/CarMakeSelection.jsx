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
  let [makes, makesAPICall] = useAPIService();
  let [models, modelsAPICall] = useAPIService();

  // Makes API Call
  useEffect(() => {
    makesAPICall('makes', 'GET', {}, {});
  }, []);

  // Models API Call
  useEffect(() => {
    updateModel("");
    let params = {
      selectedMake: make.value
    }
    modelsAPICall('models', 'GET', params, {});
  }, [make.value]);


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

  return [{value,onChange: handleChange}, updateValue];
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
