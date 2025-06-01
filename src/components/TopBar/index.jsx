import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";

import HomeIcon from '@mui/icons-material/Home';

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
    const { currentPage, setCurrentPage } = useGlobalContext()

    const navigate = useNavigate()

    const location = useLocation()
    
    useEffect(() => {
        if(location.pathname.endsWith('/users') || location.pathname.endsWith('/users/')){
            setCurrentPage('Users');
        }
        else if(!location.pathname || location.pathname === '/'){
            setCurrentPage('Home')
        }

    }, [location.pathname])
    

    return (
        <AppBar position="fixed" sx={{p: 2}}>
            <Toolbar variant="div" sx={{display: "flex", justifyContent: "space-between"}}>
                <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} onClick={e => navigate('/')}>
                    <HomeIcon display="inline-block" />    
                    <Typography variant="h5" color="inherit" display="inline-block" sx={{ ml:1 }}>
                        Trần Thế Hưng
                    </Typography>
                </Box>
                <Typography variant="h5" color="inherit">
                    {currentPage}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
