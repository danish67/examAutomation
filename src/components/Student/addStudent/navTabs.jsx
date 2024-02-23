import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddManually from "./addManually";
import AddExcel from "./addExcel";
import "./NavTabs.scss"; 

function LinkTab(props) {
  return (
    <Tab component={Link} to={props.href} label={props.label} {...props} />
  );
}

LinkTab.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default function NavTabs() {
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        path="/addStudent"
        className="tabs"
        aria-label="nav tabs example"
        role="navigation"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <LinkTab
          label="Add Manually"
          href="/addStudent/addManually"
          sx={{
            fontSize: "15px",
            color: "blue",
            fontFamily: "Arial, sans-serif",
          }}
        />
        <LinkTab
          label="Add Through Excel"
          href="/addStudent/addExcel"
          sx={{
            fontSize: "15px",
            color: "blue",
            fontFamily: "Arial, sans-serif",
          }}
        />
      </Tabs>
      <Routes>
        <Route path="/addStudent/addManually" element={<AddManually />} />
        <Route path="/addStudent/addExcel" element={<AddExcel />} />
      </Routes>
    </Box>
  );
}
