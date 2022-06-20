import React, { useState } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Form from "../Components/ConfigForm";

const useStyles = {
  width: "50vw",
  background: "white",
  height: "100%",
};

export default function ViewConfiguration(props) {
  const {setViewConfigOpen, setEditConfigOpen} = props
  const [reqError, setReqError] = React.useState({
    object_uid: false,
    value: false,
  });

  // TO DO: Get info using API calls
  const [rolloutConfigInfo, setRolloutConfigInfo] = React.useState({
    object_uid: ["abcd", "efgh"],
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

  const onEditClick = () => {
    // TO DO : open the edit sidebar 
    console.log('Edit config button clicked');
    setViewConfigOpen(false);
    setTimeout(() => {
      setEditConfigOpen(true);
    }, 500);
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

  return (
    <Box style={useStyles} component="div">
      <div
        style={{
          backgroundColor: "#ACCBF7",
          marginTop: "0px",
        }}
      >
        <h1
          style={{
            color: "#2d81f7",
            textAlign: "center",
            paddingTop: "1vw",
            paddingBottom: "1vw",
          }}
        >
          Rollout Configuration Details
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
        disableField={true}
      />
      <div style={{ alignItems: "right", marginLeft: "34.5vw" }}>
        <Button
          color="primary"
          variant="contained"
          onClick={onEditClick}
          style={{
            marginRight: "2vw",
          }}
        >
          Edit Configuration
        </Button>
      </div>
    </Box>
  );
}
