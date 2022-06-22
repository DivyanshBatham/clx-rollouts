import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Form from "../Components/ConfigForm";
import axios from "axios";

export default function EditConfiguration(props) {
  const {
    viewConfigOpen,
    editConfigOpen,
    createConfigOpen,
    setCreateConfigOpen,
    setViewConfigOpen,
    setEditConfigOpen,
    rolloutConfigInfo,
    setRolloutConfigInfo,
  } = props;
  
  const [reqError, setReqError] = React.useState({
    object_uid: false,
    value: false,
  });

  const useStyles = {
    width: "50vw",
    background: "white",
    height: "100%",
  };

  const propertyMapping = {
    "Object UIDs": "object_uid",
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

  const handleClick = () => {
    if (editConfigOpen) {
      if (
        rolloutConfigInfo.object_uid === [] ||
        rolloutConfigInfo.value === ""
      ) {
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
        setEditConfigOpen(false);
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
    } else if (createConfigOpen) {
      if (
        rolloutConfigInfo.object_uid === [] ||
        rolloutConfigInfo.value === ""
      ) {
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
        console.log("New Rollout Configuration created sucessfully");
        const createInfo = {
          object_uid:
            rolloutConfigInfo["object_uid"][
              rolloutConfigInfo["object_uid"].length - 1
            ],
          values: rolloutConfigInfo["value"],
          rollout_start_range: rolloutConfigInfo["rolloutStartRange"],
          rollout_end_range: rolloutConfigInfo["rolloutEndRange"],
        };
        console.log("before click :", createInfo);
        axios
          .post(
            `http://127.0.0.1:8000/rollout/${props.rolloutId}/configuration`,
            createInfo
          )
          .then((res) => {
            console.log(res);
            console.log(res.data.message);
          });
        setCreateConfigOpen(false);
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
    } else {
      // TO DO : open the edit sidebar
      console.log("Edit config button clicked");
      setViewConfigOpen(false);
      setTimeout(() => {
        setEditConfigOpen(true);
      }, 500);
    }
  };

  function createFormData(property, isTextField, isRequired) {
    return { property, isTextField, isRequired };
  }

  const formData = [
    createFormData("Object UIDs", false, true),
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
          {viewConfigOpen
            ? "Rollout Configuration Details"
            : createConfigOpen
            ? "Create Rollout Configuration"
            : "Edit Rollout Configuration"}
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
        disableField={viewConfigOpen}
      />
      <div
        style={{
          alignItems: "right",
          marginTop: "1.5vw",
          marginLeft: viewConfigOpen
            ? "38vw"
            : editConfigOpen
            ? "37vw"
            : "40vw",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={handleClick}
          style={{
            marginRight: "2vw",
          }}
        >
          {viewConfigOpen
            ? "Edit Details"
            : createConfigOpen
            ? "Create"
            : "Save Changes"}
        </Button>
      </div>
    </Box>
  );
}
