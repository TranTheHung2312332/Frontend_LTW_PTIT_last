import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Stack, Typography, Divider, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material"
import { Link } from "react-router-dom";
import { Link as MuiLink } from '@mui/material';
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import { useFetchData } from "../../lib/useFetchData";


const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dateTimeFormat = (datetime) => {
    const dateObj = new Date(datetime);

    const vnDateStr = dateObj.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });    

    const [datePart, timePart] = vnDateStr.split(', ');

    const [month, day, year] = datePart.split('/');

    const formattedDate = `${monthNames[Number(month) - 1]} ${day}, ${year}`;

    return `${formattedDate} - ${timePart}`;
}

const UserPhotoCard = ({photo}) => {  
    const fetchData = useFetchData()
    
    const [open, setOpen] = useState(false)
    const [newComment, setNewComment] = useState('')  
    const [comments, setComments] = useState(photo.comments)

    const handleOpen = e => {
        setOpen(true)
    }

    const handleClose = e => {
        setOpen(false)
    }    

    const handlePostComment = e=> {
        if(!newComment.trim()){
            return
        }
        fetchData({
            endpoint: `/comment/commentsOfPhoto/${photo._id.toString()}`,
            option: {
                method: 'post',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    comment: newComment,
                    dateTime: new Date()
                })
            },
            success: (json) => {
                setNewComment('')
                setComments(old => [...old, json])
            },
            error: err => alert(err)
        })
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Link to={`/users/${photo.user._id.toString()}`} style={{ textDecoration: 'none' }}>
                    <Avatar aria-label="recipe" sx={{ bgcolor: red[500] }}>
                        {photo.user.first_name[0]}
                    </Avatar>
                    </Link>
                }
                title={
                    <Link to={`/users/${photo.user._id.toString()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {photo.user.first_name + ' ' + photo.user.last_name}
                    </Link>
                }
                subheader={dateTimeFormat(photo.date_time)}
            />
                
            <CardMedia
                component="img"
                height="400"
                image={`${process.env.REACT_APP_BASE_URL}/${photo.file_name}`}
                alt="User upload"
            />

            <CardContent flexDirection="column">
                <Box sx={{mb: 1}}>
                    <CommentIcon color="primary" />
                    <Typography display="inline-block" variant="h8" color="primary">{comments.length}</Typography>
                </Box>
                <Button variant="outlined" onClick={handleOpen}>
                    View Comments
                </Button>
            </CardContent>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Comments</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        {comments && comments.length > 0 ? (
                        comments.map((comment) => (
                            <Box key={comment._id}>
                                <MuiLink
                                    component={Link}
                                    to={`/users/${comment.user._id}`}
                                    underline="hover"
                                    color="primary"
                                >
                                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: -1 }}>
                                        {`${comment.user.first_name} ${comment.user.last_name}`}
                                    </Typography>
                                </MuiLink>
                                <Typography variant="caption" color="text.secondary">
                                    {dateTimeFormat(comment.date_time)}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>{comment.comment}</Typography>
                                <Divider sx={{ mt: 1 }} />
                            </Box>
                        ))) : (
                            <Typography variant="body2" color="text.secondary">
                                No comments yet.
                            </Typography>
                        )}
                    </Stack>
                </DialogContent>

                <DialogActions
                    sx={{
                        flexDirection: 'row',
                        alignItems: "flex-end"
                    }}
                >
                    <TextField
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        multiline
                        minRows={2}
                        fullWidth
                    />
                    <SendIcon  
                        sx={{
                            color: newComment.trim() ? "primary.main" : "#ccc",
                            transition: "0.25s",
                            '&:hover': newComment.trim() ? {
                                color: "primary.dark",
                                transform: "scale(1.1)",
                                cursor: "pointer"
                            } : {}
                        }}
                        onClick={handlePostComment}
                    />
                </DialogActions>

            </Dialog>

        </Card>
    )

}

export default UserPhotoCard