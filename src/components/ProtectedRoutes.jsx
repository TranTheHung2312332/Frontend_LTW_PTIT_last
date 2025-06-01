import { Navigate, Outlet, useLocation } from "react-router-dom"

const ProtectedRoutes = (props) => {
    const authenticated = !!localStorage.getItem('accessToken')

    const location = useLocation()
    
    if(!authenticated){
        return <Navigate
            to="/login"
            state={{ from: location.pathname }}
            replace
        />
    }

    else{
        return <Outlet />
    }

}

export default ProtectedRoutes