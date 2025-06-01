import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Backdrop, CircularProgress } from "@mui/material";
import fetchData from "../../lib/fetchData";

function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        fetchData({
            endpoint: '/admin/logout',
            option: {
                credentials: 'include',
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            },
            success: () => {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("userId")
                navigate('/login')
            },
            error: err => alert(err)
        })
    }, [])

    return (
        <Backdrop
            open={true}
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Logout