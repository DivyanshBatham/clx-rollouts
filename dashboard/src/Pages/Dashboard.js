import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  CssBaseline,
  Drawer,
} from "@mui/material"
import AddButton from "../Components/AddButton";
import Search from "../Components/Search";
import FilterDropDown from "../Components/FilterDropDown"
import RolloutTable from "../Components/RolloutTable";
import CreateRollout from "../Sidebars/CreateRollout"
import ViewRollout from "../Sidebars/ViewRollout"
const useStyles = {
    width: "50vw",
    background: "white",
    height: "100%"
  };

export default function Dashboard() {
  // const classes = useStyles();
  const [createRolloutOpen, setCreateRolloutOpen] = useState(false);
  const [viewRolloutOpen, setViewRolloutOpen] = useState(false);
  const [createConfigOpen, setCreateConfigOpen] = useState(false);
  const [viewConfigOpen, setViewConfigOpen] = useState(false);
  const [editRolloutOpen, setEditRolloutOpen] = useState(false);
  const [editConfigOpen, setEditConfigOpen] = useState(false);
  
  const toggleCreateRolloutSlider = () => {
    setCreateRolloutOpen(!createRolloutOpen);
  };
  const toggleViewRolloutSlider = () => {
    setViewRolloutOpen(!viewRolloutOpen);
  };

  const handleRolloutClick = (index) => {
    (index) => console.log(rows[index].name + " got clicked");
    toggleViewRolloutSlider();
  }
  const options = ["Live","Cancelled","Paused","Failed","Created","Success"];
  const [currentOption,setCurrentOption] = useState(options[0]);
  const rows = [
    {"name" : "abc","createdBy" : "Venu", "createdAt" : "13-07-2002","updatedAt" : "13-07-2002","status" : "Live"},
    {"name" : "adsbc","createdBy" : "Venu", "createdAt" : "13-07-2002","updatedAt" : "13-07-2002","status" : "Live"},
    {"name" : "abdsac","createdBy" : "Venu", "createdAt" : "13-07-2002","updatedAt" : "13-07-2002","status" : "Cancelled"},
    {"name" : "abdsadc","createdBy" : "Venu", "createdAt" : "13-07-2002","updatedAt" : "13-07-2002","status" : "Success"}
  ]
  const [searchText, setSearchText] = useState("");
  const filters = [{"filterType" : "status","filterOptions" : ["All","Live","Cancelled","Paused","Failure","Created"]},
                    {"filterType" : "type","filterOptions" : ["All","Feature","Deployment"]},
                    {"filterType" : "level","filterOptions" : ["All","Goal","Class","Educator","Course"]}
    ]
    const [selectedFilters,setSelectedFilters] = useState(
    {"status" : 0, "type" : 0, "level" : 0}
    );
  return (
    <>
      <CssBaseline />
      <Box component="nav">
        <AppBar position="static">
          <Toolbar>
            <Search
              style = {{width : "50%"}}
              searchText={searchText}
              setSearchText={setSearchText}
              onSearch={() => console.log(searchText + " is searched.")}
            />
            <Box m={2}>
              <FilterDropDown
              style = {{color : "#08bd80"}}
                  filters = {filters}
                  selectedFilters = {selectedFilters}
                  setSelectedFilters = {setSelectedFilters}
              />
            </Box>
            <Box m={2}>
              <AddButton 
                handleClick={toggleCreateRolloutSlider} />
            </Box>
            <Drawer
              open={createRolloutOpen}
              anchor="right"
              onClose={toggleCreateRolloutSlider}
            >
              {CreateRollout()}
            </Drawer>

            <Drawer
              open={viewRolloutOpen}
              anchor="right"
              onClose={toggleViewRolloutSlider}
            >
              <ViewRollout />
            </Drawer>

            <Drawer
              open={editRolloutOpen}
              anchor="right"
              onClose={() => setEditRolloutOpen(false)}
            >
              <ViewRollout />
            </Drawer>

            <Drawer
              open={viewRolloutOpen}
              anchor="right"
              onClose={toggleViewRolloutSlider}
            >
              <ViewRollout />
            </Drawer>

            <Drawer
              open={viewRolloutOpen}
              anchor="right"
              onClose={toggleViewRolloutSlider}
            >
              <ViewRollout />
            </Drawer>


          </Toolbar>
        </AppBar>
      </Box>
      <RolloutTable
        options = {options}
        rows = {rows}
        onRolloutClick = {(index) => handleRolloutClick(index)}
        rolloutOnChange = {(index,optionIndex) => console.log(rows[index].name + " got "+ options[optionIndex])}
      />
    </>
  );
}
