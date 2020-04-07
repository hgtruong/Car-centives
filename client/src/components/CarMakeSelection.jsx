/* eslint-disable max-len */
/* eslint-disable no-console */
import axios from "axios";
import React, { useState, useEffect } from 'react';
import {
  Select, 
  InputLabel, 
  MenuItem, 
  FormControl, 
  makeStyles,
  TextField
} from '@material-ui/core';

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

function useAPIService() {
  const [data, setData]  = useState([]);
  const [isLoading, setIsLoading]  = useState(false);
  const [error, setError]  = useState(false);

  function init() {
    setData([]);
    setIsLoading(false);
    setError(false);
  }

  const serviceCall = async (url, method, payLoad) => {
    init();
    setIsLoading(true);

    try {
      const result = await axios({
        method: `${method}`,
        url: `${url}`,
      });
      setData(result.data);
    } catch (error) {
      console.log(`Error with ${method} API call for url: ${url}`);
      setError(true);
    }
    setIsLoading(false);
  }

  return [{ data, isLoading, error}, serviceCall ];
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
