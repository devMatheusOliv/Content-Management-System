import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Help as HelpIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 240;

const Header: React.FC = () => {
  const { state, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="search"
            sx={{ mr: 2 }}
          >
            <SearchIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Ajuda">
            <IconButton size="large" color="inherit" sx={{ mr: 1 }}>
              <HelpIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notificações">
            <IconButton size="large" color="inherit" sx={{ mr: 2 }}>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Perfil">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={state.user?.username || "Usuário"}
                src={state.user?.avatar}
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Perfil</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Configurações</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">Sair</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
