import React, { useState } from "react";
import { Box } from "@mui/material";
import List from "../Components/List.js"
import Button from "@mui/material/Button";

const useStyles = {
    width: "50vw",
    background: "white",
    height: "100%"
  };

export default function ViewRollout() {
  function createData(property, detail) {
    return { property, detail };
  }
  
  
  // TO DO: will get data using API call
  const dummyDetails = [
    createData("Descripton" ,"Run AB testing on raise hand feature"),
    createData("Rollout Name", "hand raise"),
    createData("Rollout Level", "Educator"),
    createData("Rollout Type", "Feature"),
    createData("Rollout Status", "Live"),
    createData("Created By", "Dummy user"),
    createData("Created At", "17/06/2022 16:04:00"),
    createData("Updated At", "17/06/2022 16:04:00")
  ]
  
  const propertyStyle = { 
    fontFamily: "sans-serif", 
    width:'50%', 
    fontSize:"1vw",
  }
  
  const detailStyle = { 
    fontFamily: "sans-serif", 
    width:'50%', 
    fontSize:"1vw", 
  }
  
  const [open, setOpen] = useState(false);
  
  const onEditClick = () => {
    console.log("Edit button clicked");
    setOpen(false);
  }
  
  const onConfigClick = () => {
    // TO DO : get the info from database if configuration is available
    // If config is is already created, then button is open config otherise create config
    console.log("View config button clicked");
    setOpen(false);
  }
  
  const toggleSlider = () => {
    setOpen(!open);
  };

  return (
    <Box style = {useStyles} component="div">
      <div
        style={{
          backgroundColor: "#1650E8",
          marginTop: '0px'
        }}
      >
        <h1 style = {{color: "white", textAlign: "center", paddingTop:'1vw', paddingBottom:'1vw'}}> Rollout Details</h1>
      </div>
        <List
            dummyDetails = {dummyDetails} 
            detailStyle = {detailStyle}
            propertyStyle = {propertyStyle}
        />
        <div style ={{alignItems: "right", marginTop: '1.5vw', marginLeft:'27vw'}}>
        <Button 
            variant="contained" 
            onClick={onEditClick} 
            style ={{backgroundColor:"blue" ,color: "white", marginRight: "2vw"}}
        >
            Edit Details
        </Button>
        <Button 
            variant="contained" 
            onClick={onConfigClick} 
            style ={{backgroundColor:"grey" ,color: "white"}}
        >
            Open Configuration
        </Button>
        </div>
    </Box>
  );
}
