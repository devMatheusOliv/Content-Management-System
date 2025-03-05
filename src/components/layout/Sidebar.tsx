import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  ListItemButton,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Article as ArticleIcon,
  Category as CategoryIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Conteúdos", icon: <ArticleIcon />, path: "/contents" },
    { text: "Categorias", icon: <CategoryIcon />, path: "/categories" },
    { text: "Usuários", icon: <PeopleIcon />, path: "/users" },
    { text: "Configurações", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1a1a2e",
          color: "#fff",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          CMS Admin
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
                my: 0.5,
                borderRadius: 1,
                mx: 1,
              }}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: "40px" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={logout}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
              my: 0.5,
              borderRadius: 1,
              mx: 1,
            }}
          >
            <ListItemIcon sx={{ color: "#fff", minWidth: "40px" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
