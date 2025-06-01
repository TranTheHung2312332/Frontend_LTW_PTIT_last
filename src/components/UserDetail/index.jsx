import { useEffect, useState } from "react";
import {Box, Button, Divider, Stack, Typography} from "@mui/material";

import "./styles.css";
import { useParams} from "react-router-dom";

import { Link } from 'react-router-dom';
import { useFetchData } from "../../lib/useFetchData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const fetchData = useFetchData()

    const {userId} = useParams();    
    
    const [userInfo, setUserInfo] = useState({
        first_name: null,
        last_name: null,
        location: null,
        description: null,
        occupation: null,
        _id: null
    })

    useEffect(() => {
        fetchData({
            endpoint: `/user/${userId}`,
            option: {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            },
            success: setUserInfo,
            error: (err) => alert(err)
        })
    }, [userId])

    return (
        <>
            <Box>
                <Typography variant="h4" gutterBottom>
                    {userInfo.first_name} {userInfo.last_name}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Stack spacing={1}>
                    <Typography variant="body1">
                        <strong>First name:</strong> {userInfo.first_name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Last name:</strong> {userInfo.last_name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Location:</strong> {userInfo.location}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Description:</strong> {userInfo.description}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Occupation:</strong> {userInfo.occupation}
                    </Typography>
                </Stack>

                <Box mt={3}>
                    <Button
                        variant="contained"
                        component={Link}
                        to={`/photos/${userInfo._id}`}
                        size="large"
                    >
                        View Photos
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default UserDetail;
