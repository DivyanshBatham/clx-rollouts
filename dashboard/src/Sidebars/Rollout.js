import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Form from "../Components/Create.js";
import axios from "axios";

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
    setRolloutConfigInfo,
    viewGoalConfigOpen,
    setViewGoalConfigOpen,
  } = props;

  const [reqError, setReqError] = React.useState({
    rolloutName: false,
    description: false,
    rolloutType: false,
    rolloutLevel: false,
  });

  const TYPE_MAPPING = {
    Frontend: 1,
    Backend: 2,
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
    createFormData("Rollout Type", ["Frontend", "Backend"], true),
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
      /**
       * Validation
       */
      if (
        rolloutInfo.rolloutName === "" ||
        rolloutInfo.description === "" ||
        rolloutInfo.rolloutType === "" ||
        rolloutInfo.rolloutLevel === "" ||
        rolloutInfo.rolloutName.split(" ").length > 1
      ) {
        // Error : Fill required information
        console.log("Error : Fill required information");
        if (
          rolloutInfo.rolloutName === "" ||
          rolloutInfo.rolloutName.split(" ").length > 1
        ) {
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
        const editedInfo = {
          description: rolloutInfo.description,
          rollout_name: rolloutInfo.rolloutName,
          rollout_type: TYPE_MAPPING[rolloutInfo.rolloutType],
          rollout_level: LEVEL_MAPPING[rolloutInfo.rolloutLevel],
        };

        axios
          .put(
            `${process.env.REACT_APP_API_HOST}/rollout/${props.rolloutId}`,
            editedInfo
          )
          .then((res) => {
            console.log(res);
            console.log(res.data.message);
          });
        console.log("Changes saved sucessfully");
        setEditRolloutOpen(false);
        setRolloutInfo({
          ...rolloutInfo,
          rolloutName: "",
          description: "",
          rolloutType: "",
          rolloutLevel: "",
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
      /**
       * Validation
       */
      if (
        rolloutInfo.rolloutName === "" ||
        rolloutInfo.description === "" ||
        rolloutInfo.rolloutType === "" ||
        rolloutInfo.rolloutLevel === "" ||
        rolloutInfo.rolloutName.split(" ").length > 1
      ) {
        // Error : Fill required information
        console.log("Error : Fill required information");
        if (
          rolloutInfo.rolloutName === "" ||
          rolloutInfo.rolloutName.split(" ").length > 1
        ) {
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
          rollout_name: rolloutInfo.rolloutName.toUpperCase(),
          rollout_type: TYPE_MAPPING[rolloutInfo.rolloutType],
          rollout_level: LEVEL_MAPPING[rolloutInfo.rolloutLevel],
        };
        console.log(createInfo);
        console.log("New Rollout created sucessfully");
        axios
          .post(`${process.env.REACT_APP_API_HOST}/rollout`, createInfo)
          .then((res) => {
            console.log(res);
            console.log(res.data.message);
          });
        props.fetchData();
        setCreateRolloutOpen(false);
        setRolloutInfo({
          ...rolloutInfo,
          rolloutName: "",
          description: "",
          rolloutType: "",
          rolloutLevel: "",
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
      if (rolloutInfo.rolloutLevel === "Goal") {
        axios
          .get(
            `${process.env.REACT_APP_API_HOST}/rollout/${props.rolloutId}/configuration`
          )
          .then((res) => {
            console.log(res);
            props.setGoalConfigInfo(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("View config button clicked");
        // get configuration info and set in the state
        axios
          .get(
            `${process.env.REACT_APP_API_HOST}/rollout/${props.rolloutId}/configuration`
          )
          .then((res) => {
            console.log(res);

            const uids = res.data.map((obj) => {
              return obj.object_uid;
            });

            const config_ids = res.data.map((obj) => {
              return obj.config_id;
            });

            console.log(uids);
            setRolloutConfigInfo({
              ...rolloutConfigInfo,
              config_ids: config_ids,
              object_uid: uids,
              value: res.data[0]["value"],
              rolloutStartRange: res.data[0]["rollout_start_range"],
              rolloutEndRange: res.data[0]["rollout_end_range"],
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setViewRolloutOpen(false);
      setTimeout(() => {
        if (rolloutInfo.rolloutLevel === "Goal") {
          setViewGoalConfigOpen(true);
        } else {
          setViewConfigOpen(true);
        }
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
        // if (rolloutInfo.rolloutLevel === "Goal") {
        //   setViewGoalConfigOpen(true);
        // } else {
        //   setCreateConfigOpen(true);
        // }
        setCreateConfigOpen(true);
      }, 500);
    }
  };

  return (
    <Box style={useStyles} component="div">
      <div
        style={{
          backgroundColor: "rgb(225, 229, 234)",
          marginTop: "0px",
        }}
      >
        <h1
          style={{
            color: "black",
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
