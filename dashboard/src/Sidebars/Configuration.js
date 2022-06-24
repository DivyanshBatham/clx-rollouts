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
    configData,
    setConfigData
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
        // request to backend to update the rollout configuration
        console.log("rolloutConfigInfo: ", rolloutConfigInfo);
        if (props.rolloutInfo.rolloutLevel === "Goal") {
          const createInfo = {
            object_uid: rolloutConfigInfo["object_uid"][0],
            value: rolloutConfigInfo["value"],
            rollout_start_range: parseInt(
              rolloutConfigInfo["rolloutStartRange"]
            ),
            rollout_end_range: parseInt(rolloutConfigInfo["rolloutEndRange"]),
          };
          console.log("before click :", createInfo);
          axios
            .put(
              `http://127.0.0.1:8000/rollout/${props.configID}/configuration`,
              createInfo
            )
            .then((res) => {
              console.log(res);
              console.log(res.data.message);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // Newly added
          console.log("Rollout Config data: ", rolloutConfigInfo);
          console.log("Old Config data: ", configData);
          for (let i = 0; i < rolloutConfigInfo["object_uid"].length; i++) {
            if (
              configData["object_uid"].indexOf(
                rolloutConfigInfo["object_uid"][i]
              ) == -1
            ) {
              // Create config
              const createInfo = {
                object_uid: rolloutConfigInfo["object_uid"][i],
                value: rolloutConfigInfo["value"],
                rollout_start_range: parseInt(
                  rolloutConfigInfo["rolloutStartRange"]
                ),
                rollout_end_range: parseInt(
                  rolloutConfigInfo["rolloutEndRange"]
                ),
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
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }

          // Delete
          for (let i = 0; i < configData["object_uid"].length; i++) {
            if (
              rolloutConfigInfo["object_uid"].indexOf(
                configData["object_uid"][i]
              ) == -1
            ) {
              axios
                .delete(
                  `http://127.0.0.1:8000/rollout/${configData["config_ids"][i]}/configuration`
                )
                .then((res) => {
                  console.log(res.data.message);
                });
            }

            // Update
            if (rolloutConfigInfo["value"] !== configData["value"]) {
              for (let i = 0; i < configData["object_uid"].length; i++) {
                if (
                  rolloutConfigInfo["object_uid"].indexOf(
                    configData["object_uid"][i]
                  ) >= 0
                ) {
                  // Create config
                  const createInfo = {
                    object_uid: configData["object_uid"][i],
                    value: configData["value"],
                    rollout_start_range: parseInt(
                      configData["rolloutStartRange"]
                    ),
                    rollout_end_range: parseInt(configData["rolloutEndRange"]),
                  };
                  axios
                    .put(
                      `http://127.0.0.1:8000/rollout/${configData["config_ids"][i]}/configuration`,
                      createInfo
                    )
                    .then((res) => {
                      console.log(res);
                      console.log(res.data.message);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }
            }
          }
        }
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
        if (props.rolloutInfo.rolloutLevel === "Goal") {
          const createInfo = {
            object_uid: rolloutConfigInfo["object_uid"][0],
            value: rolloutConfigInfo["value"],
            rollout_start_range: parseInt(
              rolloutConfigInfo["rolloutStartRange"]
            ),
            rollout_end_range: parseInt(rolloutConfigInfo["rolloutEndRange"]),
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
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // request to backend to create new  rollout configuration

          console.log("New Rollout Configuration created sucessfully");
          for (let i = 0; i < rolloutConfigInfo["object_uid"].length; i++) {
            const createInfo = {
              object_uid: rolloutConfigInfo["object_uid"][i],
              value: rolloutConfigInfo["value"],
              rollout_start_range: parseInt(
                rolloutConfigInfo["rolloutStartRange"]
              ),
              rollout_end_range: parseInt(rolloutConfigInfo["rolloutEndRange"]),
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
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
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
      setConfigData({
        ...configData,
        config_ids: rolloutConfigInfo.config_ids,
        object_uid: rolloutConfigInfo.object_uid,
        value: rolloutConfigInfo.value,
        rolloutStartRange: rolloutConfigInfo.rolloutStartRange,
        rolloutEndRange: rolloutConfigInfo.rolloutEndRange,
      });
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
          {viewConfigOpen
            ? "Rollout Configuration Details"
            : createConfigOpen
            ? "Create Rollout Configuration"
            : "Edit Rollout Configuration"}
        </h1>
      </div>
      <Form
        formData={
          props.rolloutInfo["rolloutLevel"] == "Goal"
            ? formData
            : formData.slice(0, 2)
        }
        rolloutInfo={rolloutConfigInfo}
        setRolloutInfo={setRolloutConfigInfo}
        reqError={reqError}
        setReqError={setReqError}
        textFieldStyle={textFieldStyle}
        dropdownStyle={dropdownStyle}
        propertyMapping={propertyMapping}
        disableField={viewConfigOpen}
        isChipDisabled={
          props.rolloutInfo.rolloutLevel === "Goal" && editConfigOpen
        }
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
