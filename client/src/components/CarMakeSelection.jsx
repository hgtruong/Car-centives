/* eslint-disable max-len */
/* eslint-disable no-console */
import axios from "axios";
import React, { useState, useEffect } from 'react';
import {Select, InputLabel, MenuItem, FormControl, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function CarMakeSelection(props) {
  const classes = useStyles();
  const [makeValue, setMake] = useState('');

  function handleMakeChange(event) {
    setMake(event.target.value);
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink id="makesLabel">
        Make*
      </InputLabel>

      <Select 
        value={makeValue} 
        onChange={handleMakeChange}>
        <MenuItem value=""> 
          <em> None </em> 
        </MenuItem>
        {props.makes.map((currentMake, key) => <MenuItem value={currentMake.make} key={key}>{ currentMake.make }</MenuItem>)}
      </Select>
    </FormControl>  
  );
}

export { CarMakeSelection };
