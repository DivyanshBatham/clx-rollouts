import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Form from "../Components/Create.js";

const useStyles = {
  width: "50vw",
  background: "white",
  height: "100%",
};

export default function CreateRollout() {
  const [reqError, setReqError] = React.useState({
    rolloutName: false,
    description: false,
    rolloutType: false,
    rolloutLevel: false,
  });

  const [rolloutInfo, setRolloutInfo] = React.useState({
    rolloutName: "",
    description: "",
    rolloutType: "",
    rolloutLevel: "",
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

  const onCreateClick = () => {
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
      console.log("New Rollout created sucessfully");
      setOpen(false);
      setRolloutInfo({
        ...rolloutInfo,
        rolloutName: "",
        description: "",
        rolloutType: "",
        rolloutLevel: "",
        rolloutStartRange: 0,
        rolloutEndRange: 0,
      });
      setReqError({
        ...reqError,
        rolloutName: false,
        description: false,
        rolloutType: false,
        rolloutLevel: false,
      });
    }
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
          {" "}
          Create a new Rollout
        </h1>
      </div>
      <Form
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
        style={{ alignItems: "right", marginTop: "1.5vw", marginLeft: "40vw" }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={onCreateClick}
          style={{
            marginRight: "2vw",
          }}
        >
          Create
        </Button>
      </div>
    </Box>
  );
}
