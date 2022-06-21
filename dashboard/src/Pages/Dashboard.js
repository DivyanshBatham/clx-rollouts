import React, { useState, useEffect } from "react";
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
import Rollout from "../Sidebars/Rollout";
import Config from "../Sidebars/Configuration";
import { ReactComponent as UnacademyLogo } from "../Assets/Unacademy-logo.svg";
import Pagination from "@mui/material/Pagination";
import usePagination from "../Utils/Pagination";
import axios from "axios";

export default function Dashboard() {
  const [createRolloutOpen, setCreateRolloutOpen] = useState(false);
  const [viewRolloutOpen, setViewRolloutOpen] = useState(false);
  const [createConfigOpen, setCreateConfigOpen] = useState(false);
  const [viewConfigOpen, setViewConfigOpen] = useState(false);
  const [editRolloutOpen, setEditRolloutOpen] = useState(false);
  const [editConfigOpen, setEditConfigOpen] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([]);
  const [rolloutInfo, setRolloutInfo] = React.useState({
    rolloutName: "Hand raise feature",
    description: "During live class it is useful to ask doubts",
    rolloutType: "Feature",
    rolloutLevel: "Class",
  });
  const [rolloutConfigInfo, setRolloutConfigInfo] = React.useState({
    object_uid: ["abcd", "efgh"],
    value: "Java",
    rolloutStartRange: 5,
    rolloutEndRange: 10,
  });

  const TYPE_MAPPING = ["Feature", "Deployment"];

  const LEVEL_MAPPING = ["Goal", "Class", "Educator", "Course"];

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/rollout/filter/?limit=100&offset=0&status=1`)
      .then((res) => {
        console.log(res.data);
        setTableData(res.data);
      });
  }, []);

  const handleCreateRollout = () => {
    setRolloutInfo({
      ...rolloutInfo,
      rolloutName: "",
      description: "",
      rolloutType: "",
      rolloutLevel: "",
    });
    setCreateRolloutOpen(!createRolloutOpen);
  };
  const toggleViewRolloutSlider = () => {
    setViewRolloutOpen(!viewRolloutOpen);
  };

  const handleRolloutClick = (index) => {
    // TO DO - check if the configuration for this experiment exists
    // send prop to viewconfig to show the button accordingly
    setRolloutInfo({
      ...rolloutInfo,
      rolloutName: "Hand raise feature",
      description: "During live class it is useful to ask doubts",
      rolloutType: "Feature",
      rolloutLevel: "Class",
    });

    axios.get(`http://127.0.0.1:8000/rollout/${index}`).then((res) => {
      console.log(res.data);
      setRolloutInfo({
        ...rolloutInfo,
        rolloutName: res.data["rollout_name"],
        description: res.data["description"],
        rolloutType: TYPE_MAPPING[res.data["rollout_type"] - 1],
        rolloutLevel: LEVEL_MAPPING[res.data["rollout_level"] - 1],
      });
    });
    if (1 === 2) {
      setIsConfigured(true);
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
    {
      name: "sadc",
      createdBy: "Venu",
      createdAt: "13-07-2002",
      updatedAt: "13-07-2002",
      status: "Success",
    },
    {
      name: "abdshwbehwbadc",
      createdBy: "Venu",
      createdAt: "13-07-2002",
      updatedAt: "13-07-2002",
      status: "Success",
    },
    {
      name: "awbadc",
      createdBy: "Venu",
      createdAt: "13-07-2002",
      updatedAt: "13-07-2002",
      status: "Success",
    },
    {
      name: "abehwbadc",
      createdBy: "Venu",
      createdAt: "13-07-2002",
      updatedAt: "13-07-2002",
      status: "Success",
    },
  ];
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

  const PER_PAGE = 5;
  const count = Math.ceil(tableData.length / PER_PAGE);
  const _DATA = usePagination(tableData, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
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
              toolTipTitle="Add a new Rollout"
              handleClick={handleCreateRollout}
            />

            <Drawer
              open={viewRolloutOpen || createRolloutOpen || editRolloutOpen}
              anchor="right"
              onClose={() => {
                if (viewRolloutOpen) {
                  setViewRolloutOpen(false);
                } else if (createRolloutOpen) {
                  setCreateRolloutOpen(false);
                } else {
                  setEditRolloutOpen(false);
                }
              }}
            >
              <Rollout
                editRolloutOpen={editRolloutOpen}
                viewRolloutOpen={viewRolloutOpen}
                createRolloutOpen={createRolloutOpen}
                setEditRolloutOpen={setEditRolloutOpen}
                setViewRolloutOpen={setViewRolloutOpen}
                setCreateRolloutOpen={setCreateRolloutOpen}
                setViewConfigOpen={setViewConfigOpen}
                isConfigured={isConfigured}
                setCreateConfigOpen={setCreateConfigOpen}
                rolloutInfo={rolloutInfo}
                setRolloutInfo={setRolloutInfo}
                rolloutConfigInfo={rolloutConfigInfo}
                setRolloutConfigInfo={setRolloutConfigInfo}
              />
            </Drawer>
            <Drawer
              open={editConfigOpen || createConfigOpen || viewConfigOpen}
              anchor="right"
              onClose={() => {
                if (viewConfigOpen) {
                  setViewConfigOpen(false);
                } else if (createConfigOpen) {
                  setCreateConfigOpen(false);
                } else {
                  setEditConfigOpen(false);
                }
              }}
            >
              <Config
                rolloutConfigInfo={rolloutConfigInfo}
                setRolloutConfigInfo={setRolloutConfigInfo}
                createConfigOpen={createConfigOpen}
                viewConfigOpen={viewConfigOpen}
                editConfigOpen={editConfigOpen}
                setEditConfigOpen={setEditConfigOpen}
                setViewConfigOpen={setViewConfigOpen}
                setCreateConfigOpen={setCreateConfigOpen}
              />
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
      <RolloutTable
        style={{
          marginTop: "2vh",
          marginLeft: "1vw",
          marginRight: "1vw",
          border: "3px #ACCBF7 solid",
          borderRadius: "10px",
        }}
        options={options}
        rows={_DATA.currentData()}
        onRolloutClick={(index) => handleRolloutClick(index)}
        rolloutOnChange={(index, optionIndex) =>
          console.log(rows[index].name + " got " + options[optionIndex])
        }
      />
      <div
        style={{
          marginTop: "1vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </>
  );
}
