import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect(props) {
  const {
    rolloutInfo,
    setRolloutInfo,
    dropdownProperty,
    dropdownItems,
    dropdownStyle,
    propertyMapping,
  } = props;

  return (
    <Box style={dropdownStyle.box}>
      <InputLabel id="demo-simple-select-label" required>
        {dropdownProperty}
      </InputLabel>
      <FormControl
        disabled={props.disabled}
        fullWidth
        required
        error={props.reqError[propertyMapping[dropdownProperty]]}
      >
        <Select
          // sx={textFieldSX}
          placeholder={dropdownProperty}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select"
          value={rolloutInfo[propertyMapping[dropdownProperty]]}
          onChange={(e) =>
            setRolloutInfo({
              ...rolloutInfo,
              [propertyMapping[dropdownProperty]]: e.target.value,
            })
          }
          style={dropdownStyle.dropdown}
        >
          {dropdownItems.map((item, index) => {
            return (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
