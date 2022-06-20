import * as React from 'react';
import TextField from "@mui/material/TextField";
import Dropdown from './CreateDropdown'
export default function FormPropsTextFields(props) {
  const {rolloutInfo, setRolloutInfo, propertyMapping} = props
  
  return (
    <div>
        {props.formData.map((field, index) => {
            return (field.dropdownItems.length === 0 ? 
            <TextField
              error = {props.reqError[propertyMapping[field.property]]}
              required = {field.isRequired}
              label={field.property}
              variant="outlined"
              style={props.textFieldStyle}
              align="center"
              key = {index}
              value = {rolloutInfo[propertyMapping[field.property]] || ''}
              onChange= {(e) => setRolloutInfo((prerolloutInfo) =>{
                return {...prerolloutInfo,  [propertyMapping[field.property]]: e.target.value}
              })}
            /> : <Dropdown 
                    key = {index} 
                    rolloutInfo={rolloutInfo}
                    setRolloutInfo = {setRolloutInfo}
                    dropdownProperty = {field.property} 
                    dropdownItems = {field.dropdownItems} 
                    dropdownStyle = {props.dropdownStyle}
                    propertyMapping = {propertyMapping}
                    reqError = {props.reqError}
            />
            )
        })}
    </div>
  );
}
