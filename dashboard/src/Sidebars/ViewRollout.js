import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Form from "../Components/Create.js";

const useStyles = {
  width: "50vw",
  background: "white",
  height: "100%",
};

export default function Playground(props) {
  const { setEditRolloutOpen, setViewRolloutOpen, setViewConfigOpen, setCreateConfigOpen } = props;
  const [reqError, setReqError] = React.useState({
    rolloutName: false,
    description: false,
    rolloutType: false,
    rolloutLevel: false,
  });

  // TO Do: we will get this from the rollout information, or as prop
  const [rolloutInfo, setRolloutInfo] = React.useState({
    rolloutName: "Hand raise feature",
    description: "During live class it is useful to ask doubts",
    rolloutType: "Feature",
    rolloutLevel: "Class",
    rolloutStartRange: 0,
    rolloutEndRange: 0,
  });

  const propertyMapping = {
    "Rollout Name": "rolloutName",
    Description: "description",
    "Rollout Type": "rolloutType",
    "Rollout Level": "rolloutLevel",
    "Rollout start range": "rolloutStartRange",
    "Rollout end range": "rolloutEndRange",
  };

  function createFormData(property, dropdownItems, isRequired) {
    return { property, dropdownItems, isRequired };
  }

  const formData = [
    createFormData("Description", [], true),
    createFormData("Rollout Name", [], true),
    createFormData("Rollout Type", ["Feature", "Deployment"], true),
    createFormData(
      "Rollout Level",
      ["Goal", "Class", "Education", "Course"],
      true
    ),
    createFormData("Rollout start range", [], false),
    createFormData("Rollout end range", [], false),
  ];

  const textFieldStyle = {
    width: "80%",
    marginBottom: "2%",
    marginLeft: "10%",
  };

  const dropdownStyle = {
    box: {
      width: "80%",
      marginBottom: "2%",
      marginLeft: "10%",
    },
    dropdown: {
      textAlign: "left",
      paddingLeft: "1%",
    },
  };

  const onEditClick = () => {
    // TO DO : open Edit Rollout sidebar
    console.log("Edit button clicked");
    setViewRolloutOpen(false);
    setTimeout(() => {
      setEditRolloutOpen(true);
    }, 500);
  };

  const onConfigClick = () => {
    // TO DO : get the info from database if configuration is available
    // If config is is already created, then button is open config otherise create config
    if (props.isConfigured === true) {
      console.log("View config button clicked");
      setViewRolloutOpen(false);
      setTimeout(() => {
        setViewConfigOpen(true);
      }, 500);
    } else {
      console.log("create config button clicked");
      setViewRolloutOpen(false);
      setTimeout(() => {
        setCreateConfigOpen(true);
      }, 500);
    }
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
          Rollout Details
        </h1>
      </div>
      <Form
        isDisabled={true}
        formData={formData}
        rolloutInfo={rolloutInfo}
        setRolloutInfo={setRolloutInfo}
        reqError={reqError}
        setReqError={setReqError}
        textFieldStyle={textFieldStyle}
        dropdownStyle={dropdownStyle}
        propertyMapping={propertyMapping}
      />
      <div
        style={{ alignItems: "right", marginTop: "1.5vw", marginLeft: "25vw" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onEditClick}
          style={{
            marginRight: "2vw",
          }}
        >
          Edit Details
        </Button>
        <Button
          variant="contained"
          onClick={onConfigClick}
          style={{ backgroundColor: "grey", color: "white" }}
        >
          {props.isConfigured === true
            ? "Open Configuration"
            : "Create Configuration"}
        </Button>
      </div>
    </Box>
  );
}
