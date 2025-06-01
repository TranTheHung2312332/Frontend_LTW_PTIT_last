import { useEffect, useState } from 'react'
import { Box, Grid, Card, CardContent, Typography, Avatar, CardActionArea } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import fetchData from '../../lib/fetchData'
import { red } from '@mui/material/colors'

function UserDirectory() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchData({
            endpoint: '/user/list',
            option: {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            },
            success: (users) => {
                users.sort((a, b) => {
                    const userId = localStorage.getItem("userId")
                    if(a._id === userId) return -1
                    if(b._id === userId) return 1
                    return 0
                })
                setUsers(users)
            },
            error: (err) => alert(err)
        })
    }, [])

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                All Users
            </Typography>
            <Grid container spacing={2}>
                {users.map(user => (
                    <Grid item xs={12} sm={6} md={4} key={user._id}>
                        <Card>
                            <CardActionArea onClick={() => navigate(`/users/${user._id}`)}>
                                <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                                    <Avatar sx={{ width: 56, height: 56, mr: 2, bgcolor: red[500] }}>
                                        {user.first_name[0]}
                                    </Avatar>
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography variant="h6">
                                            {user.first_name} {user.last_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Click to view profile
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default UserDirectory
