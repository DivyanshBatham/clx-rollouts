import { Autocomplete, TextField } from "@mui/material";
import Chip from "@mui/material/Chip";
import React, { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";

export default function ChipComponent(props) {
  return (
    <div>
      <InputLabel
        id="demo-simple-select-label"
        required
        style={{ marginLeft: props.isGoalOpen ? "0" : "10%" }}
      >
        {props.dropdownProperty}
      </InputLabel>
      <Autocomplete
        disabled={props.disable}
        style={props.dropdownStyle}
        multiple
        id="tags-filled"
        options={[]}
        defaultValue={
          props.rolloutInfo[props.propertyMapping[props.dropdownProperty]]
        }
        freeSolo
        onChange={(e, value) =>
          props.setRolloutInfo((preRolloutInfo) => {
            return {
              ...preRolloutInfo,
              [props.propertyMapping[props.dropdownProperty]]: value,
            };
          })
        }
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            return (
              <Chip
                size="medium"
                key={index}
                variant="outlined"
                label={option}
                onDelete={() => {
                  console.log("delete clicked");
                }}
                {...getTagProps({ index })}
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            // label={props.dropdownProperty}
            placeholder="Add an object uid by pressing enter"
          />
        )}
      />
    </div>
  );
}
