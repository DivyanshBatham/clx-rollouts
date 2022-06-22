import React, { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Stack,
  Drawer,
  Typography,
  Button,
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
import Pagination from "@mui/material/Pagination";
import usePagination from "../Utils/Pagination";
import Navbar from "../Components/Navbar";
import Filters from "../Components/Filters";

export default function Dashboard() {
  const [createRolloutOpen, setCreateRolloutOpen] = useState(false);
  const [viewRolloutOpen, setViewRolloutOpen] = useState(false);
  const [createConfigOpen, setCreateConfigOpen] = useState(false);
  const [viewConfigOpen, setViewConfigOpen] = useState(false);
  const [editRolloutOpen, setEditRolloutOpen] = useState(false);
  const [editConfigOpen, setEditConfigOpen] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  let [page, setPage] = useState(1);

  const toggleCreateRolloutSlider = () => {
    setCreateRolloutOpen(!createRolloutOpen);
  };
  const toggleViewRolloutSlider = () => {
    setViewRolloutOpen(!viewRolloutOpen);
  };

  const handleRolloutClick = (index) => {
    // TO DO - check if the configuration for this experiment exists
    // send prop to viewconfig to show the button accordingly
    console.log(rows[index].rollout_name + " got clicked");
    if (1 === 1) {
      setIsConfigured(true);
    }
    (index) => console.log(rows[index].name + " got clicked");
    toggleViewRolloutSlider();
  };
  const options = [
    "Create",
    "Go Live",
    "Mark it as Success",
    "Cancel",
    "Pause",
    "Mark it as Failure",
  ];
  const rows = [
    {
      id: 1,
      description: "Fifth",
      rollout_type: 1,
      rollout_name: "RAH",
      rollout_status: 1,
      rollout_level: 2,
      created_at: "2022-06-21T06:34:23.580759Z",
      updated_at: null,
      start_time: null,
      end_time: null,
      is_active: true,
      created_by: "venu",
    },
    {
      id: 2,
      description: "Fifth",
      rollout_type: 2,
      rollout_name: "AddBookmark",
      rollout_status: 4,
      rollout_level: 2,
      created_at: "2022-06-21T08:49:20.462872Z",
      updated_at: null,
      start_time: null,
      end_time: null,
      is_active: true,
      created_by: "venu",
    },
  ];
  const [searchText, setSearchText] = useState("");
  const filters = [
    {
      filterType: "status",
      filterOptions: [
        "All Status",
        "Live",
        "Cancelled",
        "Paused",
        "Failure",
        "Created",
      ],
    },
    {
      filterType: "type",
      filterOptions: ["All Types", "Feature", "Deployment"],
    },
    {
      filterType: "level",
      filterOptions: ["All Levels", "Goal", "Class", "Educator", "Course"],
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
  const count = Math.ceil(rows.length / PER_PAGE);
  const _DATA = usePagination(rows, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <Stack
          style={{
            marginTop: "2vh",
          }}
          direction="row"
          spacing={113}
        >
          <Typography variant="h4" fontWeight="600">
            Rollouts
          </Typography>
          <AddButton
            toolTipTitle="Add a new Rollout"
            handleClick={toggleCreateRolloutSlider}
          />
        </Stack>
        <Stack
          style={{
            marginTop: "2vh",
          }}
          direction="row"
          spacing={20}
        >
          <Search
            style={{ width: "20vw" }}
            searchText={searchText}
            setSearchText={setSearchText}
            onSearch={() => console.log(searchText + " is searched.")}
          />
          <Filters
            filters={filters}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            onApply={onFilterApply}
          />
          <Button  variant="outlined" onClick={onFilterApply}>
            APPLY
          </Button>
          {/* <FilterDropDown
            style={{ marginTop: "1vh" }}
            filters={filters}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            onApply={onFilterApply}
          /> */}
        </Stack>
        <Drawer
          open={createRolloutOpen}
          anchor="right"
          onClose={toggleCreateRolloutSlider}
        >
          <CreateRollout />
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
        <RolloutTable
          style={{
            marginTop: "2vh",
            borderRadius: "10px",
          }}
          options={options}
          rows={_DATA.currentData()}
          onRolloutClick={(index) => handleRolloutClick(index)}
          rolloutOnChange={(index, optionIndex) =>
            console.log(
              rows[index].rollout_name + " got " + options[optionIndex]
            )
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
      </Container>
    </>
  );
}
