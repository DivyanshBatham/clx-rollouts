import * as React from "react";
import TextField from "@mui/material/TextField";
import Chip from "./Chip.js";
export default function FormPropsTextFields(props) {
  const { rolloutInfo, setRolloutInfo, propertyMapping } = props;

  return (
    <div>
      {props.formData.map((field, index) => {
        return field.isTextField === true ? (
          <TextField
            disabled = {props.disableField}
            error={props.reqError[propertyMapping[field.property]]}
            required={field.isRequired}
            label={field.property}
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
        ) : (
          <Chip
            disable={props.disableField}
            key={index}
            rolloutInfo={rolloutInfo}
            setRolloutInfo={setRolloutInfo}
            dropdownProperty={field.property}
            dropdownItems={field.dropdownItems}
            dropdownStyle={props.dropdownStyle}
            propertyMapping={propertyMapping}
            reqError={props.reqError}
            handleDelete = {props.handleDelete}
          />
        );
      })}
    </div>
  );
}
