import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  CssBaseline,
  Drawer,
  Typography,
} from "@mui/material";
import AddButton from "../Components/AddButton";
import Search from "../Components/Search";
import FilterDropDown from "../Components/FilterDropDown";
import RolloutTable from "../Components/RolloutTable";
import CreateRollout from "../Sidebars/CreateRollout";
import ViewRollout from "../Sidebars/ViewRollout";
import EditRollout from "../Sidebars/EditRollout";
import ViewConfig from "../Sidebars/ViewConfiguration";
import CreateConfig from "../Sidebars/CreateConfiguration";
import EditConfig from "../Sidebars/EditConfiguration";
import { ReactComponent as UnacademyLogo } from "../Assets/Unacademy-logo.svg";

const useStyles = {
  width: "50vw",
  background: "white",
  height: "100%",
};

export default function Dashboard() {
  // const classes = useStyles();
  const [createRolloutOpen, setCreateRolloutOpen] = useState(false);
  const [viewRolloutOpen, setViewRolloutOpen] = useState(false);
  const [createConfigOpen, setCreateConfigOpen] = useState(false);
  const [viewConfigOpen, setViewConfigOpen] = useState(false);
  const [editRolloutOpen, setEditRolloutOpen] = useState(false);
  const [editConfigOpen, setEditConfigOpen] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  const toggleCreateRolloutSlider = () => {
    setCreateRolloutOpen(!createRolloutOpen);
  };
  const toggleViewRolloutSlider = () => {
    setViewRolloutOpen(!viewRolloutOpen);
  };

  const handleRolloutClick = (index) => {
    // TO DO - check if the configuration for this experiment exists
    // send prop to viewconfig to show the button accordingly
    if( 1 === 1) {
      setIsConfigured(true)
    }
    (index) => console.log(rows[index].name + " got clicked");
    toggleViewRolloutSlider();
  };
  const options = [
    "Live",
    "Cancelled",
    "Paused",
    "Failed",
    "Created",
    "Success",
  ];
  const [currentOption, setCurrentOption] = useState(options[0]);
  const rows = [
    {
      name: "abc",
      createdBy: "Venu",
      createdAt: "13-07-2002",
      updatedAt: "13-07-2002",
      status: "Live",
    },
    {
      name: "adsbc",
      createdBy: "Venu",
      createdAt: "13-07-2002",
      updatedAt: "13-07-2002",
      status: "Live",
    },
    {
      name: "abdsac",
      createdBy: "Venu",
      createdAt: "13-07-2002",
      updatedAt: "13-07-2002",
      status: "Cancelled",
    },
    {
      name: "abdsadc",
      createdBy: "Venu",
      createdAt: "13-07-2002",
      updatedAt: "13-07-2002",
      status: "Success",
    },
  ];
  const [searchText, setSearchText] = useState("");
  const filters = [
    {
      filterType: "status",
      filterOptions: [
        "All",
        "Live",
        "Cancelled",
        "Paused",
        "Failure",
        "Created",
      ],
    },
    { filterType: "type", filterOptions: ["All", "Feature", "Deployment"] },
    {
      filterType: "level",
      filterOptions: ["All", "Goal", "Class", "Educator", "Course"],
    },
  ];
  const [selectedFilters, setSelectedFilters] = useState({
    status: 0,
    type: 0,
    level: 0,
  });
  const onFilterApply = () => {
    console.log(selectedFilters);
  };
  return (
    <>
      <CssBaseline />
      <Box component="nav">
        <AppBar position="static" style={{ backgroundColor: "#ACCBF7" }}>
          <Toolbar>
            <UnacademyLogo
              width={182}
              height={64}
              style={{ marginLeft: "1vw" }}
            />
            <Typography
              variant="h4"
              style={{
                marginLeft: "1vw",
                color: "#2d81f7",
                fontWeight: "Bold",
              }}
            >
              Rollouts
            </Typography>
            <Search
              style={{ marginLeft: "15vw", width: "30vw" }}
              searchText={searchText}
              setSearchText={setSearchText}
              onSearch={() => console.log(searchText + " is searched.")}
            />
            <FilterDropDown
              style={{ marginLeft: "15vw" }}
              filters={filters}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              onApply={onFilterApply}
            />
            <AddButton
              style={{ marginLeft: "2vw" }}
              handleClick={toggleCreateRolloutSlider}
            />
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
              <ViewRollout
                setEditRolloutOpen={setEditRolloutOpen}
                setViewRolloutOpen={setViewRolloutOpen}
                setViewConfigOpen={setViewConfigOpen}
                isConfigured={isConfigured}
                setCreateConfigOpen={setCreateConfigOpen}
              />
            </Drawer>

            <Drawer
              open={editRolloutOpen}
              anchor="right"
              onClose={() => setEditRolloutOpen(false)}
            >
              <EditRollout setEditRolloutOpen={setEditRolloutOpen} />
            </Drawer>

            <Drawer
              open={viewConfigOpen}
              anchor="right"
              onClose={() => setViewConfigOpen(false)}
            >
              <ViewConfig
                setEditConfigOpen={setEditConfigOpen}
                setViewConfigOpen={setViewConfigOpen}
              />
            </Drawer>

            <Drawer
              open={createConfigOpen}
              anchor="right"
              onClose={() => setCreateConfigOpen(false)}
            >
              <CreateConfig />
            </Drawer>
            <Drawer
              open={editConfigOpen}
              anchor="right"
              onClose={() => setEditConfigOpen(false)}
            >
              <EditConfig />
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
      <RolloutTable
        options={options}
        rows={rows}
        onRolloutClick={(index) => handleRolloutClick(index)}
        rolloutOnChange={(index, optionIndex) =>
          console.log(rows[index].name + " got " + options[optionIndex])
        }
      />
    </>
  );
}
