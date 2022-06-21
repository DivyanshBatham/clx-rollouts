import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Dropdown from "./CreateDropdown";
import InputLabel from "@mui/material/InputLabel";

export default function FormPropsTextFields(props) {
  const { rolloutInfo, setRolloutInfo, propertyMapping } = props;
  // const textFieldColor = "black"
  // const textFieldSX = {
  //   input: {
  //     "-webkit-text-fill-color": `${textFieldColor} !important`,
  //     color: `${textFieldColor} !important`,
  //   },
  // };

  return (
    <div>
      {props.formData.map((field, index) => {
        return field.dropdownItems.length === 0 ? (
          <div key={index}>
            <InputLabel
              required={field.isRequired}
              id="demo-simple-select-label"
              style={{ ...props.textFieldStyle, marginBottom: "0%" }}
            >
              {field.property}
            </InputLabel>
            <OutlinedInput
              // sx = {textFieldSX}
              disabled={props.isDisabled}
              error={props.reqError[propertyMapping[field.property]]}
              variant="outlined"
              placeholder={field.property}
              style={props.textFieldStyle}
              align="center"
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
          <Dropdown
            disabled={props.isDisabled || props.editRolloutOpen}
            key={index}
            rolloutInfo={rolloutInfo}
            setRolloutInfo={setRolloutInfo}
            dropdownProperty={field.property}
            dropdownItems={field.dropdownItems}
            dropdownStyle={props.dropdownStyle}
            propertyMapping={propertyMapping}
            reqError={props.reqError}
          />
        );
      })}
    </div>
  );
}
