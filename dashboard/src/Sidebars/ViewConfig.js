import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddButton from "../Components/AddButton";
import { Box, Container, Button, Stack, Divider } from "@mui/material/";
import Form from "../Components/ConfigForm";
import axios from "axios";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions(props) {
  const [expanded, setExpanded] = React.useState("panel1");
  const {
    viewConfigOpen,
    editConfigOpen,
    createConfigOpen,
    setCreateConfigOpen,
    setViewConfigOpen,
    setEditConfigOpen,
    rolloutConfigInfo,
    setRolloutConfigInfo,
    goalConfigInfo,
    setGoalConfigInfo,
  } = props;

  const [configData, setConfigData] = React.useState({});
  const [reqError, setReqError] = React.useState({
    object_uid: false,
    value: false,
  });

  React.useEffect(() => {
    console.log("goal config info", goalConfigInfo);
  }, []);

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
    width: "100%",
    marginBottom: "2%",
    // marginLeft: "10%",
  };

  const dropdownStyle = {
    box: {
      width: "100%",
      marginBottom: "2%",
      //   marginLeft: "10%",
    },
    dropdown: {
      textAlign: "left",
      paddingLeft: "1%",
    },
  };

  const propertyMapping = {
    "Object UIDs": "object_uid",
    Value: "value",
    "Rollout start range": "rolloutStartRange",
    "Rollout end range": "rolloutEndRange",
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const useStyles = {
    width: "50vw",
    background: "white",
    height: "100%",
  };

  const handleEdit = (data) => {
    // TO DO
    props.setConfigID(data.config_id);
    setRolloutConfigInfo({
      ...rolloutConfigInfo,
      object_uid: [data.object_uid],
      value: data.value,
      rolloutStartRange: data.rollout_start_range,
      rolloutEndRange: data.rollout_end_range,
    });
    props.setViewGoalConfigOpen(false);
    setTimeout(() => {
      setEditConfigOpen(true);
    }, 500);
    console.log("use data to edit the configuration");
  };

  const handleDelete = (ConfigId) => {
    axios
      .delete(`http://127.0.0.1:8000/rollout/${ConfigId}/configuration`)
      .then((res) => {
        console.log(res.data.message);
      });
    props.setViewGoalConfigOpen(false);
  };
  
  const handleCreateRollout = () => {
    setRolloutConfigInfo({
      ...rolloutConfigInfo,
      object_uid: [],
      value: "",
      rolloutStartRange: 0,
      rolloutEndRange: 0,
    });
    props.setViewGoalConfigOpen(false);
    setTimeout(() => {
      setCreateConfigOpen(true);
    }, 500);
  };

  return (
    <Box style={useStyles} component="div">
      <Container style={{ width: "80%" }}>
        <Stack
          style={{
            marginTop: "4vh"
          }}
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h4" fontWeight="600">
            Rollouts Configuration Details
          </Typography>
          <AddButton
            toolTipTitle="Add a new Configuration"
            handleClick={handleCreateRollout}
          />
        </Stack>
        <Divider />
      </Container>
      <Container style={{ width: "80%", marginTop:"4vh" }}>
        {goalConfigInfo.map((field, index) => {
          return (
            <Accordion
              expanded={expanded === field.config_id}
              onChange={handleChange(field.config_id)}
              key={field.config_id}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>{field.object_uid}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Form
                  formData={formData}
                  rolloutInfo={{
                    object_uid: [field.object_uid],
                    value: field.value,
                    rolloutStartRange: field.rollout_start_range,
                    rolloutEndRange: field.rollout_end_range,
                  }}
                  setRolloutInfo={setRolloutConfigInfo}
                  reqError={reqError}
                  setReqError={setReqError}
                  textFieldStyle={textFieldStyle}
                  dropdownStyle={dropdownStyle}
                  propertyMapping={propertyMapping}
                  disableField={props.viewGoalConfigOpen}
                  isGoalOpen={true}
                />
              </AccordionDetails>
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginLeft: "23vw",
                  marginBottom: "1vh",
                  backgroundColor: "red",
                }}
                onClick={() => handleDelete(field.config_id)}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "1vw", marginBottom: "1vh" }}
                onClick={() => handleEdit(field)}
              >
                Edit Details
              </Button>
            </Accordion>
          );
        })}
      </Container>
    </Box>
  );
}
