import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Backdrop, CircularProgress } from "@mui/material";
import { useFetchData } from "../../lib/useFetchData";

function Logout() {
    const navigate = useNavigate()

    const fetchData = useFetchData()

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
        />
        
    )
}

export default Logout