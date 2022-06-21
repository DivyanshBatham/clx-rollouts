import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Form from "../Components/Create.js";
import axios from 'axios'

export default function Playground(props) {
  const {
    editRolloutOpen,
    createRolloutOpen,
    viewRolloutOpen,
    setEditRolloutOpen,
    setViewRolloutOpen,
    setCreateRolloutOpen,
    setViewConfigOpen,
    setCreateConfigOpen,
    rolloutInfo,
    setRolloutInfo,
    rolloutConfigInfo,
    setRolloutConfigInfo
  } = props;

  const [reqError, setReqError] = React.useState({
    rolloutName: false,
    description: false,
    rolloutType: false,
    rolloutLevel: false,
  });
  
  
  
  const TYPE_MAPPING = {
    Feature: 1,
    Deployment: 2,
  };

  const LEVEL_MAPPING = {
    Goal: 1,
    Class: 2,
    Educator: 3,
    Course: 4,
  };

  const useStyles = {
    width: "50vw",
    background: "white",
    height: "100%",
  };

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
    createFormData("Rollout Name", [], true),
    createFormData("Description", [], true),
    createFormData("Rollout Type", ["Feature", "Deployment"], true),
    createFormData(
      "Rollout Level",
      ["Goal", "Class", "Educator", "Course"],
      true
    ),
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

  const handleClick = () => {
    if (editRolloutOpen) {
      if (
        rolloutInfo.rolloutName === "" ||
        rolloutInfo.description === "" ||
        rolloutInfo.rolloutType === "" ||
        rolloutInfo.rolloutLevel === ""
      ) {
        // Error : Fill required information
        console.log("Error : Fill required information");
        if (rolloutInfo.rolloutName === "") {
          setReqError({ ...reqError, rolloutName: true });
        }
        if (rolloutInfo.description === "") {
          setReqError({ ...reqError, description: true });
        }
        if (rolloutInfo.rolloutType === "") {
          setReqError({ ...reqError, rolloutType: true });
        }
        if (rolloutInfo.rolloutLevel === "") {
          setReqError({ ...reqError, rolloutLevel: true });
        }
      } else {
        // request to backend to create new  rollout
        console.log("Changes saved sucessfully");
        setEditRolloutOpen(false);
        setRolloutInfo({
          ...rolloutInfo,
          rolloutName: "",
          description: "",
          rolloutType: "",
          rolloutLevel: ""
        });
        setReqError({
          ...reqError,
          rolloutName: false,
          description: false,
          rolloutType: false,
          rolloutLevel: false,
        });
      }
    } else if (createRolloutOpen) {
      if (
        rolloutInfo.rolloutName === "" ||
        rolloutInfo.description === "" ||
        rolloutInfo.rolloutType === "" ||
        rolloutInfo.rolloutLevel === ""
      ) {
        // Error : Fill required information
        console.log("Error : Fill required information");
        if (rolloutInfo.rolloutName === "") {
          setReqError({ ...reqError, rolloutName: true });
        }
        if (rolloutInfo.description === "") {
          setReqError({ ...reqError, description: true });
        }
        if (rolloutInfo.rolloutType === "") {
          setReqError({ ...reqError, rolloutType: true });
        }
        if (rolloutInfo.rolloutLevel === "") {
          setReqError({ ...reqError, rolloutLevel: true });
        }
      } else {
        // request to backend to create new  rollout
        const createInfo = {
          description: rolloutInfo.description,
          rollout_name: rolloutInfo.rolloutName,
          rollout_type: TYPE_MAPPING[rolloutInfo.rolloutType],
          rollout_level: LEVEL_MAPPING[rolloutInfo.rolloutLevel],
        };
        console.log(createInfo);
        console.log("New Rollout created sucessfully");
        axios
          .post(`http://127.0.0.1:8000/rollout`, createInfo)
          .then((res) => {
            console.log(res);
            console.log(res.message);
          });
        setCreateRolloutOpen(false);
        setRolloutInfo({
          ...rolloutInfo,
          rolloutName: "",
          description: "",
          rolloutType: "",
          rolloutLevel: ""
        });
        setReqError({
          ...reqError,
          rolloutName: false,
          description: false,
          rolloutType: false,
          rolloutLevel: false,
        });
      }
    } else {
      // TO DO : open Edit Rollout sidebar
      console.log("Edit button clicked");
      setViewRolloutOpen(false);
      setTimeout(() => {
        setEditRolloutOpen(true);
      }, 500);
    }
  };

  const onConfigClick = () => {
    // TO DO : get the info from database if configuration is available
    // If config is is already created, then button is open config otherise create config
    if (props.isConfigured === true) {
      console.log("View config button clicked");
      // get configuration info and set in the state
      setViewRolloutOpen(false);
      setTimeout(() => {
        setViewConfigOpen(true);
      }, 500);
    } else {
      console.log("create config button clicked");
      // make the state empty
      setRolloutConfigInfo({
        ...rolloutConfigInfo,
        object_uid: [],
        value: "",
        rolloutStartRange: 0,
        rolloutEndRange: 0,
      });
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
          {viewRolloutOpen
            ? "Rollout Details"
            : createRolloutOpen
            ? "Create Rollout"
            : "Edit Rollout"}
        </h1>
      </div>
      <Form
        isDisabled={viewRolloutOpen}
        editRolloutOpen={editRolloutOpen}
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
        style={{
          alignItems: "right",
          marginTop: "1.5vw",
          marginLeft: viewRolloutOpen
            ? "25vw"
            : editRolloutOpen
            ? "37vw"
            : "40vw",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          style={{
            marginRight: "2vw",
          }}
        >
          {viewRolloutOpen
            ? "Edit Details"
            : createRolloutOpen
            ? "Create"
            : "Save Changes"}
        </Button>
        {viewRolloutOpen && (
          <Button
            variant="contained"
            onClick={onConfigClick}
            style={{ backgroundColor: "grey", color: "white" }}
          >
            {props.isConfigured === true
              ? "Open Configuration"
              : "Create Configuration"}
          </Button>
        )}
      </div>
    </Box>
  );
}
