
import React from "react";
import { AppBar, Box, CssBaseline, Drawer, Toolbar, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const leftSpace = 100;

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h4" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/admin">
              <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/admin/manage-flats">
            <ListItemText primary="Manage Flats" />
          </ListItem>
          <ListItem button component={Link} to="/admin/manage-users">
            <ListItemText primary="Manage Users" />
          </ListItem>
          <ListItem button component={Link} to="/admin/manage-bookings">
            <ListItemText primary="Manage Bookings" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${leftSpace}px`, mt: "64px" }}>
        {children}
      </Box>
    </Box>
  );
}
