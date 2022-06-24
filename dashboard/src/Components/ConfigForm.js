import * as React from "react";
import TextField from "@mui/material/TextField";
import Chip from "./Chip.js";
import InputLabel from "@mui/material/InputLabel";
export default function FormPropsTextFields(props) {
  const { rolloutInfo, setRolloutInfo, propertyMapping } = props;

  return (
    <div>
      {props.formData.map((field, index) => {
        return field.isTextField === true ? (
          <div key={index}>
            <InputLabel
              required={field.isRequired}
              id="demo-simple-select-label"
              style={{ ...props.textFieldStyle, marginBottom: "0%" }}
            >
              {field.property}
            </InputLabel>
            <TextField
              disabled={props.disableField}
              placeholder={field.property}
              error={props.reqError[propertyMapping[field.property]]}
              required={field.isRequired}
              // label={field.property}
              variant="outlined"
              style={props.textFieldStyle}
              align="center"
              key={index}
              value={rolloutInfo[propertyMapping[field.property]] || ""}
              onChange={(e) =>
                setRolloutInfo((prerolloutInfo) => {
                  return {
                    ...prerolloutInfo,
                    [propertyMapping[field.property]]: e.target.value,
                  };
                })
              }
            />
          </div>
        ) : (
          <Chip
            disable={props.disableField || props.isChipDisabled}
            key={index}
            rolloutInfo={rolloutInfo}
            setRolloutInfo={setRolloutInfo}
            dropdownProperty={field.property}
            dropdownItems={field.dropdownItems}
            dropdownStyle={props.dropdownStyle}
            propertyMapping={propertyMapping}
            reqError={props.reqError}
            isGoalOpen = {props.isGoalOpen}
          />
        );
      })}
    </div>
  );
}
