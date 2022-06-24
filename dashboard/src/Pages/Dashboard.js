import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Stack,
  Drawer,
  Typography,
  Button,
  Divider,
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
import Navbar from "../Components/Navbar";
import Filters from "../Components/Filters";
import ActionPopup from "../Components/ActionPopup";
import ViewConfig from "../Sidebars/ViewConfig";

export default function Dashboard() {
  const [createRolloutOpen, setCreateRolloutOpen] = useState(false);
  const [viewRolloutOpen, setViewRolloutOpen] = useState(false);
  const [createConfigOpen, setCreateConfigOpen] = useState(false);
  const [viewConfigOpen, setViewConfigOpen] = useState(false);
  const [viewGoalConfigOpen, setViewGoalConfigOpen] = useState(false);
  const [editRolloutOpen, setEditRolloutOpen] = useState(false);
  const [editConfigOpen, setEditConfigOpen] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([]);
  const [actionPopupOpen, setActionPopupOpen] = useState(false);
  const [configID, setConfigID] = useState("");

  const [goalConfigInfo, setGoalConfigInfo] = useState({});

  const [rolloutInfo, setRolloutInfo] = React.useState({
    rolloutName: "Hand raise feature",
    description: "During live class it is useful to ask doubts",
    rolloutType: "Feature",
    rolloutLevel: "Class",
  });
  const [rolloutConfigInfo, setRolloutConfigInfo] = React.useState({
    config_ids: [],
    object_uid: ["abcd", "efgh"],
    value: "Java",
    rolloutStartRange: 5,
    rolloutEndRange: 10,
  });
  const [configData, setConfigData] = React.useState({
    config_ids: [],
    object_uid: [],
    value: "",
    rolloutStartRange: 0,
    rolloutEndRange: 0,
  });
  const [rolloutId, setRolloutId] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    status: 1,
    type: 0,
    level: 0,
  });
  const [actionPopupRolloutDetails, setActionPopupRolloutDetails] = useState({
    rolloutId: 0,
    rolloutName: "",
    toStatus: "",
    optionIndex: 0,
  });
  const [sortProperties, setSortProperties] = useState({
    property: "",
    order: "",
  });
  const [pageOffset, setPageOffset] = useState({
    limit: 8,
    offset: 0,
  });
  const STATUS_MAPPING = [
    "Created",
    "Live",
    "Success",
    "Cancelled",
    "Failure",
    "Paused",
  ];
  const TYPE_MAPPING = ["Feature", "Deployment"];
  const LEVEL_MAPPING = ["Goal", "Class", "Educator", "Course"];

  const options = [
    "Create",
    "Go Live",
    "Mark it as Success",
    "Cancel",
    "Mark it as Failure",
    "Pause",
  ];
  const filters = [
    {
      filterType: "status",
      filterOptions: [
        "Created",
        "Live",
        "Success",
        "Cancelled",
        "Failure",
        "Paused",
        "All Statuses",
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

  const fetchData = () => {
    let URL = "http://127.0.0.1:8000/rollout/filter/";
    let params = {};
    params.limit = pageOffset.limit;
    params.offset = pageOffset.offset;
    if (selectedFilters.status !== 6) params.status = selectedFilters.status;
    if (selectedFilters.type !== 0) params.type = selectedFilters.type;
    if (selectedFilters.level !== 0) params.level = selectedFilters.level;
    if (sortProperties.property.length > 0) {
      if (sortProperties.order !== "asc") params.order = "-";
      else params.order = "";
      params.order += sortProperties.property;
    }
    if (searchText.length > 0) params.search = searchText;
    axios.get(URL, { params }).then((res) => {
      console.log(res.data);
      setTableData(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [selectedFilters, sortProperties, pageOffset]);

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

  const handleRolloutClick = (ID) => {
    // TO DO - check if the configuration for this experiment exists
    // send prop to viewconfig to show the button accordingly
    setRolloutInfo({
      ...rolloutInfo,
      rolloutName: "Hand raise feature",
      description: "During live class it is useful to ask doubts",
      rolloutType: "Feature",
      rolloutLevel: "Class",
    });

    axios.get(`http://127.0.0.1:8000/rollout/${ID}`).then((res) => {
      console.log(res.data);
      setRolloutInfo({
        ...rolloutInfo,
        rolloutName: res.data["rollout_name"],
        description: res.data["description"],
        rolloutType: TYPE_MAPPING[res.data["rollout_type"] - 1],
        rolloutLevel: LEVEL_MAPPING[res.data["rollout_level"] - 1],
      });
    });
    axios
      .get(`http://127.0.0.1:8000/rollout/${ID}/configuration`)
      .then((res) => {
        console.log(res.data);
        if (res.data.length !== 0) {
          setIsConfigured(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsConfigured(false);
      });
    toggleViewRolloutSlider();
  };

  const handleSearch = () => {
    console.log(searchText + " is searched");
    fetchData();
  };
  // const PER_PAGE = 5;
  // const count = Math.ceil(tableData.length / PER_PAGE);
  // const _DATA = usePagination(tableData, PER_PAGE);

  // const handleChange = (e, p) => {
  //   setPage(p);
  //   _DATA.jump(p);
  // };

  const confirmRolloutChange = (rolloutId, rolloutName, optionIndex) => {
    setActionPopupOpen(true);
    setActionPopupRolloutDetails({
      ...actionPopupRolloutDetails,
      rolloutId: rolloutId,
      rolloutName: rolloutName,
      toStatus: STATUS_MAPPING[optionIndex],
      optionIndex: optionIndex,
    });
  };
  const onRolloutChange = (rolloutId, optionIndex) => {
    axios
      .put(`http://127.0.0.1:8000/rollout/${rolloutId}/status/${optionIndex}`)
      .then((res) => {
        console.log(res);
        console.log(res.data.message);
      });
    fetchData();
  };
  const handleSort = (order, property) => {
    setSortProperties({
      ...sortProperties,
      order: [order],
      property: [property],
    });
    console.log(sortProperties);
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
          justifyContent="space-between"
        >
          <Typography variant="h4" fontWeight="600">
            Rollouts
          </Typography>
          <AddButton
            toolTipTitle="Add a new Rollout"
            handleClick={handleCreateRollout}
          />
        </Stack>
        <Divider />
        <Stack
          style={{
            marginTop: "2vh",
          }}
          direction="row"
          spacing={3}
        >
          <Search
            style={{ width: "20vw" }}
            searchText={searchText}
            setSearchText={setSearchText}
            onSearch={handleSearch}
          />
          <Filters
            filters={filters}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
          {/* <FilterDropDown
            style={{ marginTop: "1vh" }}
            filters={filters}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            onApply={onFilterApply}
          /> */}
        </Stack>
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
            rolloutId={rolloutId}
            viewGoalConfigOpen={viewGoalConfigOpen}
            setViewGoalConfigOpen={setViewGoalConfigOpen}
            goalConfigInfo={goalConfigInfo}
            setGoalConfigInfo={setGoalConfigInfo}
            fetchData={fetchData}
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
            rolloutId={rolloutId}
            rolloutInfo={rolloutInfo}
            configID={configID}
            setConfigID={setConfigID}
            configData={configData}
            setConfigData={setConfigData}
          />
        </Drawer>

        <Drawer
          // open={editConfigOpen || createConfigOpen || viewConfigOpen}
          open={viewGoalConfigOpen}
          anchor="right"
          onClose={() => {
            if (viewGoalConfigOpen) {
              setViewGoalConfigOpen(false);
            }
            // else
            // if (createConfigOpen) {
            //   setCreateConfigOpen(false);
            // } else {
            //   setEditConfigOpen(false);
            // }
          }}
        >
          <ViewConfig
            rolloutConfigInfo={rolloutConfigInfo}
            setRolloutConfigInfo={setRolloutConfigInfo}
            createConfigOpen={createConfigOpen}
            viewConfigOpen={viewConfigOpen}
            editConfigOpen={editConfigOpen}
            setEditConfigOpen={setEditConfigOpen}
            setViewConfigOpen={setViewConfigOpen}
            setCreateConfigOpen={setCreateConfigOpen}
            rolloutId={rolloutId}
            rolloutInfo={rolloutInfo}
            goalConfigInfo={goalConfigInfo}
            viewGoalConfigOpen={viewGoalConfigOpen}
            setViewGoalConfigOpen={setViewGoalConfigOpen}
            configID={configID}
            setConfigID={setConfigID}
          />
        </Drawer>
        <RolloutTable
          style={{
            marginTop: "2vh",
            borderRadius: "10px",
          }}
          options={options}
          rows={tableData}
          onRolloutClick={(ID) => {
            handleRolloutClick(ID);
            setRolloutId(ID);
          }}
          rolloutOnChange={(rolloutId, rolloutName, optionIndex) => {
            console.log(
              "rollout with ID: " + rolloutId + " got " + options[optionIndex]
            );
            confirmRolloutChange(rolloutId, rolloutName, optionIndex);
          }}
          sortProperties={sortProperties}
          setSortProperties={setSortProperties}
          pageOffset={pageOffset}
          setPageOffset={setPageOffset}
        />
        <ActionPopup
          open={actionPopupOpen}
          setOpen={setActionPopupOpen}
          rolloutId={actionPopupRolloutDetails.rolloutId}
          rolloutName={actionPopupRolloutDetails.rolloutName}
          toStatus={actionPopupRolloutDetails.toStatus}
          optionIndex={actionPopupRolloutDetails.optionIndex}
          onRolloutChange={onRolloutChange}
          agreeText="Yes"
          disagreeText="No"
        />
        <div
          style={{
            marginTop: "1vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          /> */}
        </div>
      </Container>
    </>
  );
}
