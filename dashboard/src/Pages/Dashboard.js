import React, { useState, useEffect } from "react";
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
import Rollout from "../Sidebars/Rollout";
import Config from "../Sidebars/Configuration";
import { ReactComponent as UnacademyLogo } from "../Assets/Unacademy-logo.svg";
import Pagination from "@mui/material/Pagination";
import usePagination from "../Utils/Pagination";
import axios from "axios";
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
  const count = Math.ceil(tableData.length / PER_PAGE);
  const _DATA = usePagination(tableData, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <>
      <CssBaseline />
//       <Box component="nav">
//         <AppBar position="static" style={{ backgroundColor: "#ACCBF7" }}>
//           <Toolbar>
//             <UnacademyLogo
//               width={182}
//               height={64}
//               style={{ marginLeft: "1vw" }}
//             />
//             <Typography
//               variant="h4"
//               style={{
//                 marginLeft: "1vw",
//                 color: "#2d81f7",
//                 fontWeight: "Bold",
//               }}
//             >
//               Rollouts
//             </Typography>
//             <Search
//               style={{ marginLeft: "15vw", width: "30vw" }}
//               searchText={searchText}
//               setSearchText={setSearchText}
//               onSearch={() => console.log(searchText + " is searched.")}
//             />
//             <FilterDropDown
//               style={{ marginLeft: "15vw" }}
//               filters={filters}
//               selectedFilters={selectedFilters}
//               setSelectedFilters={setSelectedFilters}
//               onApply={onFilterApply}
//             />
//             <AddButton
//               style={{ marginLeft: "2vw" }}
//               toolTipTitle="Add a new Rollout"
//               handleClick={handleCreateRollout}
//             />

//             <Drawer
//               open={viewRolloutOpen || createRolloutOpen || editRolloutOpen}
//               anchor="right"
//               onClose={() => {
//                 if (viewRolloutOpen) {
//                   setViewRolloutOpen(false);
//                 } else if (createRolloutOpen) {
//                   setCreateRolloutOpen(false);
//                 } else {
//                   setEditRolloutOpen(false);
//                 }
//               }}
//             >
//               <Rollout
//                 editRolloutOpen={editRolloutOpen}
//                 viewRolloutOpen={viewRolloutOpen}
//                 createRolloutOpen={createRolloutOpen}
//                 setEditRolloutOpen={setEditRolloutOpen}
//                 setViewRolloutOpen={setViewRolloutOpen}
//                 setCreateRolloutOpen={setCreateRolloutOpen}
//                 setViewConfigOpen={setViewConfigOpen}
//                 isConfigured={isConfigured}
//                 setCreateConfigOpen={setCreateConfigOpen}
//                 rolloutInfo={rolloutInfo}
//                 setRolloutInfo={setRolloutInfo}
//                 rolloutConfigInfo={rolloutConfigInfo}
//                 setRolloutConfigInfo={setRolloutConfigInfo}
//               />
//             </Drawer>
//             <Drawer
//               open={editConfigOpen || createConfigOpen || viewConfigOpen}
//               anchor="right"
//               onClose={() => {
//                 if (viewConfigOpen) {
//                   setViewConfigOpen(false);
//                 } else if (createConfigOpen) {
//                   setCreateConfigOpen(false);
//                 } else {
//                   setEditConfigOpen(false);
//                 }
//               }}
//             >
//               <Config
//                 rolloutConfigInfo={rolloutConfigInfo}
//                 setRolloutConfigInfo={setRolloutConfigInfo}
//                 createConfigOpen={createConfigOpen}
//                 viewConfigOpen={viewConfigOpen}
//                 editConfigOpen={editConfigOpen}
//                 setEditConfigOpen={setEditConfigOpen}
//                 setViewConfigOpen={setViewConfigOpen}
//                 setCreateConfigOpen={setCreateConfigOpen}
//               />
//             </Drawer>
//           </Toolbar>
//         </AppBar>
//       </Box>
//       <RolloutTable
//         style={{
//           marginTop: "2vh",
//           marginLeft: "1vw",
//           marginRight: "1vw",
//           border: "3px #ACCBF7 solid",
//           borderRadius: "10px",
//         }}
//         options={options}
//         rows={_DATA.currentData()}
//         onRolloutClick={(index) => handleRolloutClick(index)}
//         rolloutOnChange={(index, optionIndex) =>
//           console.log(rows[index].name + " got " + options[optionIndex])
//         }
//       />
//       <div
//         style={{
//           marginTop: "1vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Pagination
//           count={count}
//           size="large"
//           page={page}
//           variant="outlined"
//           shape="rounded"
//           onChange={handleChange}
//         />
//       </div>
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
