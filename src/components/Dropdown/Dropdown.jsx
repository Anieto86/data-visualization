import * as React from 'react';

import { Select, FormControl, MenuItem, Grid, InputLabel } from '@mui/material';

import './styles.css';

const Dropdown = ({ attributes, id, onSelectValue, label, defaultValue }) => {
  const handleSelect = (e) => {
    onSelectValue(e.target.value);
  };

  return (
    <Grid sx={{ minWidth: 200 }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          name="languages"
          id={id}
          onChange={(e) => handleSelect(e)}
          defaultValue={defaultValue}
        >
          {attributes.map(({ value, label }) => (
            <MenuItem key={label} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default Dropdown;
