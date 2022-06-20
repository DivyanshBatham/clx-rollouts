import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Form from "../Components/ConfigForm";

const useStyles = {
  width: "50vw",
  background: "white",
  height: "100%",
};

export default function EditConfiguration() {
  const [open, setOpen] = React.useState(false);
  const [reqError, setReqError] = React.useState({
    object_uid: false,
    value: false,
  });

  const [rolloutConfigInfo, setRolloutConfigInfo] = React.useState({
    object_uid: ['abcd', 'efgh'],
    value: "Java",
    rolloutStartRange: 5,
    rolloutEndRange: 10,
  });

  const propertyMapping = {
    "Object Uid": "object_uid",
    Value: "value",
    "Rollout start range": "rolloutStartRange",
    "Rollout end range": "rolloutEndRange",
  };

  /**
   * Callback whenever any object deleted from configuration
   */
  const handleDelete = () => {
    console.log("Delete the object uid.");
    // ask for confirmation using validation popup
    // TO DO: make api call to delete the object
  };
  
  const onSaveClick = () => {
    if (rolloutConfigInfo.object_uid === [] || rolloutConfigInfo.value === "") {
      // Error : Fill required information
      console.log("Error : Fill required information");
      if (rolloutConfigInfo.object_uid === []) {
        setReqError({ ...reqError, object_uid: true });
      }
      if (rolloutConfigInfo.value === "") {
        setReqError({ ...reqError, value: true });
      }
    } else {
      // request to backend to create new  rollout configuration
      console.log("Rollout configuration updated sucessfully");
      setOpen(false);
      setRolloutConfigInfo({
        ...rolloutConfigInfo,
        object_uid: [],
        value: "",
        rolloutStartRange: 0,
        rolloutEndRange: 0,
      });
      setReqError({
        ...reqError,
        object_uid: false,
        value: false,
      });
    }
  };
  function createFormData(property, isTextField, isRequired) {
    return { property, isTextField, isRequired };
  }

  const formData = [
    createFormData("Object Uid", false, true),
    createFormData("Value", true, true),
    createFormData("Rollout start range", true, false),
    createFormData("Rollout end range", true, false),
  ];

  const textFieldStyle = {
    width: "80%",
    marginBottom: "2%",
    marginLeft: "10%",
  };

  const dropdownStyle = {
    width: "80%",
    marginBottom: "2%",
    marginLeft: "10%",
  };

  const toggleSlider = () => {
    setOpen(!open);
  };

  return (
    <Box style={useStyles} component="div">
      <div
        style={{
          backgroundColor: "#1650E8",
          marginTop: "0px",
        }}
      >
        <h1
          style={{
            color: "white",
            textAlign: "center",
            paddingTop: "1vw",
            paddingBottom: "1vw",
          }}
        >
          Edit Rollout Configuration
        </h1>
      </div>
      <Form
        formData={formData}
        rolloutInfo={rolloutConfigInfo}
        setRolloutInfo={setRolloutConfigInfo}
        reqError={reqError}
        setReqError={setReqError}
        textFieldStyle={textFieldStyle}
        dropdownStyle={dropdownStyle}
        propertyMapping={propertyMapping}
        handleDelete={handleDelete}
        disableField={false}
      />
      <div
        style={{ alignItems: "right", marginTop: "1.5vw", marginLeft: "37vw" }}
      >
        <Button
          variant="contained"
          onClick={onSaveClick}
          style={{
            backgroundColor: "blue",
            color: "white",
            marginRight: "2vw",
          }}
        >
          Save Changes
        </Button>
      </div>
    </Box>
  );
}
