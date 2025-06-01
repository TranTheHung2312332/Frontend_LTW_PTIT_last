import React, { useEffect, useState } from "react"
import {
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
    Box,
    ListItemButton
} from "@mui/material"

import LogoutIcon from '@mui/icons-material/Logout'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import "./styles.css"
import { red } from "@mui/material/colors"
import { useGlobalContext } from "../../GlobalContext"
import { useFetchData } from "../../lib/useFetchData"

/**
 * Define UserList, a React component of Project 4.
 */

function UserList() {
    const fetchData = useFetchData()

    const { setCurrentPage } = useGlobalContext()

    const navigate = useNavigate()
    const location = useLocation()
    const [users, setUsers] = useState([])

    const match = location.pathname.match(/\/(users|photos)\/([^/]+)/)
    const currentUserId = match?.[2]

    if(users.length && currentUserId){                
        const currentUser = users.find(item => item._id.toString() === currentUserId)
        const currentName = currentUser.first_name + ' ' + currentUser.last_name
        setCurrentPage(location.pathname.match(/\/(photos)\/([^/]+)/) ? `Photos of ${currentName}` : currentName)
    }

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
            <List component="nav">
                {users.map((item) => {
                    const isActive = item._id?.toString() === currentUserId
                    const isYou = localStorage.getItem("userId") === item._id

                    return (
                        <ListItemButton
                            key={item._id}
                            component={Link}
                            to={`/users/${item._id}`}
                            sx={{
                                bgcolor: isActive ? 'primary.main' : 'transparent',
                                color: isActive ? 'primary.contrastText' : '#111',
                                '&:hover': {
                                    bgcolor: isActive ? 'primary.dark' : 'primary.light',
                                    color: isActive ? 'primary.contrastText' : '#000',
                                }
                            }}
                        >
                            <Box>
                                <ListItemText
                                    primary={item.first_name + ' ' + item.last_name}
                                    primaryTypographyProps={{
                                        sx: {
                                            display: "inline-block",
                                            fontWeight: isActive ? 'bold' : 'normal'
                                        }
                                    }}
                                    secondary={isYou ? "(You)" : ""}
                                    secondaryTypographyProps={{
                                        sx: {
                                            display: "inline-block",
                                            ml: 1,
                                            color: isActive ? 'white' : '#666'
                                        }
                                    }}
                                />

                                {isYou && 
                                    <Box
                                        onClick={e => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            navigate('/logout')
                                        }}
                                        color={isActive ? "white" : "primary.main"}
                                        sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                transition: "0.25s",
                                                '&:hover': {
                                                    color: red[500],
                                                    transform: "scale(1.1)"
                                                }
                                            }}
                                    >
                                        <Typography variant="h6" display="inline-block">Logout</Typography>
                                        <LogoutIcon 
                                            display="inline-block" 
                                            sx={{
                                                fontSize: "17px",
                                                ml: 1
                                            }}
                                        />
                                    </Box>
                                }
                            </Box>

                        </ListItemButton>
                    )
                })}
            </List>
        </Box>
    )
}

export default UserList
