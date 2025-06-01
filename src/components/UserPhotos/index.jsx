import React, { useEffect, useState } from "react";
import { Box, Button, List, ListItem, Paper, Stack, Typography } from "@mui/material";

import "./styles.css";
import {Navigate, useNavigate, useParams} from "react-router-dom";

import { Link } from 'react-router-dom'
import fetchData from "../../lib/fetchData";
import UserPhotoCard from "../UserPhotoCard.jsx";

import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddPhoto from "../AddPhoto/index.jsx";

/**
 * Define UserPhotos, a React component of Project 4.
 */


function UserPhotos () {
    const {userId} = useParams();

    const currentUserId = localStorage.getItem('userId');
    const isCurrentUser = currentUserId === userId;

    const [photos, setPhotos] = useState([])
    
    useEffect(() => {
        fetchData({
            endpoint: `/photo/photosOfUser/${userId}`,
            option: {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            },
            success: setPhotos,
            error: (err) => alert(err)
        })
    }, [])

    const [openAddDialog, setOpenAddDialog] = useState(false)
    
    return (  
        <Box sx={{ width: '100%' }}>
            {isCurrentUser && <AddPhoto 
                open={openAddDialog}
                onClose={() => setOpenAddDialog(false)}
                onSuccess={json => {
                    setPhotos(old => [...old, json])
                    alert("Successfully")
                    setOpenAddDialog(false)
                }}
            />}
            {isCurrentUser && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddPhotoAlternateIcon />}
                        onClick={e => setOpenAddDialog(true)}
                    >
                        Add Photo
                    </Button>
                </Box>
            )}
            {photos.length 
                ? (
                    <Stack spacing={2}>
                        {photos && photos.map(photo => (
                            <UserPhotoCard photo={photo} />
                        ))}
                    </Stack>
                )
                : (
                    <Box
                        sx={{
                            height: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0.6,
                            color: 'text.secondary',
                        }}
                        >
                        <PhotoCameraBackIcon sx={{ fontSize: 80, mb: 2 }} />
                        <Typography variant="h5">No photos yet</Typography>
                        <Typography variant="body2">Start uploading to share your memories!</Typography>
                    </Box>
                )
            }
            
        </Box>
    );
}

export default UserPhotos;
