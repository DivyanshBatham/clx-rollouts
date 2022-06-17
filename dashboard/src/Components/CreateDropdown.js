import * as React from 'react';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function BasicSelect(props) {
//   const [age, setAge] = React.useState('');
  
//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };

  return (
    <Box style = {props.dropdownStyle.box}>
      <FormControl fullWidth required>
        <InputLabel id="demo-simple-select-label">{props.dropdownProperty}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select"
        //   value={age}
          label={props.dropdownProperty}
        //   onChange={handleChange}
          style={props.dropdownStyle.dropdown}
        >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            {props.dropdownItems.map((item, index) => {
                return(
                    <MenuItem value = {item} key = {index}>{item}</MenuItem>
                )
            })}
        </Select>
      </FormControl>
    </Box>
  );
}
