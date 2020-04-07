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
  const make = useFormInput('');
  const model = useFormInput('');
  let [makes, makesAPICall] = useAPIService();

  useEffect(() => {
    makesAPICall('makes', 'GET');
  }, []);

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
    </div>
  );
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange
  };
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
