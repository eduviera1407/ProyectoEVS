import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, Drawer, AppBar, Toolbar, IconButton, Typography, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/authSlice';
import { RootState } from '../store';
import { useEffect } from 'react'
const Menu = () => {
    const userData = useSelector((state: RootState) => state.authenticator);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false)
    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open)
    }
    const isLoggedin = userData.isAutenticated;

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/')
        }
    }, [isLoggedin, navigate])

    const handleGoHome = () => {
        dispatch(authActions.logout());
        navigate('/');
        console.log(userData);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position='fixed' sx={{


        }}>
            <Toolbar>
                <IconButton edge="start" onClick={toggleDrawer(true)}>
                    <MenuIcon />

                </IconButton>
                <div style={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography color='white'> {userData.userName}</Typography>
                </div>
                <IconButton edge="end" >
                <AdminPanelSettingsIcon></AdminPanelSettingsIcon>
                </IconButton>
            </Toolbar>

            <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
                <List>
                    <Link to={'/home'} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Inicio" />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to={'/Reports'} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SummarizeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Informes" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={'/home'} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HelpIcon />
                                </ListItemIcon>
                                <ListItemText primary="Ayuda" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Salir" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>

        </AppBar>

    );
};

export default Menu;