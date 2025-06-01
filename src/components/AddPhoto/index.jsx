import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import fetchData from '../../lib/fetchData'

const AddPhoto = ({ open, onClose, onSuccess }) => {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false);

    const handleFileChange = e => {
        setFile(e.target.files[0])
    }

    const handleClose = e => {
        setFile(null)
        onClose()
    }

    const handleUpload = e => {
        if(!file) return

        setLoading(true)

        const formData = new FormData()
        formData.append('photo', file)
        formData.append('dateTime', new Date())

        fetchData({
            endpoint: '/photo/new',
            option: {
                method: 'post',
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: formData
            },
            success: onSuccess,
            error: (err) => alert(err)
        }).finally(() => setLoading(false))
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Upload a photo
            </DialogTitle>
            <DialogContent>
                <Box sx={{mt: 2}}>
                    <Button
                        variant='outlined'
                        component='label'
                        startIcon={<PhotoCameraIcon />}
                    >
                        Select photo
                        <input type="file" name="photo" id="" hidden accept='image/*' onChange={handleFileChange} />
                    </Button>

                    {file && (
                        <Typography variant='body2' sx={{mt:1}}>
                            Selected file: {file.name}
                        </Typography>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleUpload}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default AddPhoto