import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';  // Icono para el usuario normal
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/authSlice';
import { RootState } from '../store';
import Tooltip from '@mui/material/Tooltip';

const Menu = () => {
  const userData = useSelector((state: RootState) => state.authenticator);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const isLoggedin = userData.isAutenticated;

  useEffect(() => {
    if (!isLoggedin) {

      navigate('/');
    }
  }, [isLoggedin, navigate]);

  const handleGoHome = () => {
    dispatch(authActions.logout());
    navigate('/');
    console.log(userData);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography color="white">{userData.userName}</Typography>
        </div>
        <IconButton edge="end">
          {userData.userRol === 'admin' ? (
            <AdminPanelSettingsIcon /> // Icono para admin
          ) : (
            <PersonIcon /> // Icono para usuario normal
          )}
        </IconButton>
      </Toolbar>

      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <Link to={'/home'} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
            <Tooltip title="Volver a la pagina principal" disableInteractive>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
                
              </ListItemButton>
              </Tooltip>

            </ListItem>
          </Link>

          {/* Renderizar "Informes" solo si el usuario es admin */}
          {userData.userRol === 'admin' && (
            <Link to={'/Reports'} style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem disablePadding>
              <Tooltip title="Ir a la pagina de Informes" disableInteractive>
                <ListItemButton>
                  <ListItemIcon>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Informes" />
                </ListItemButton>
                </Tooltip>
              </ListItem>
            </Link>
          )}

          <Link to={'/Viera_Santana_Eduardo_UT3A1.pdf'} target='_blank' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>

              <Tooltip title="Manual de Ayuda" disableInteractive>
                <ListItemButton>

                  <ListItemIcon>
                    <HelpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ayuda" />
                </ListItemButton>
              </Tooltip>


            </ListItem>
          </Link>

          <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
            <Tooltip title="Cerrar Sesión" disableInteractive>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Salir" />
                
              </ListItemButton>
              </Tooltip>

            </ListItem>
          </Link>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Menu;
