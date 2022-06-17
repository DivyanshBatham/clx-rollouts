import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Dropdown from './CreateDropdown'
export default function FormPropsTextFields(props) {
  const [checkText, setCheckText] = React.useState("")
  const changeText = (e) => {
    setCheckText(e.target.value)
  }
  return (
    <div>
        {/* <h1> Create a new Rollout </h1>
        <p style = {{color: 'grey', fontSize: '20px'}}> Fill the following details to create a new Rollout </p> */}
        
        {props.formData.map((field, index) => {
            return (field.dropdownItems.length === 0 ? 
            <TextField
              required
              label={field.property}
              variant="outlined"
              style={props.textFieldStyle}
              align="center"
              key = {index}
              value = {checkText}
              onChange={changeText}
            /> : <Dropdown 
                    key = {index} 
                    dropdownProperty = {field.property} 
                    dropdownItems = {field.dropdownItems} 
                    dropdownStyle = {props.dropdownStyle}
            />
            )
        })}
    </div>
  );
}
