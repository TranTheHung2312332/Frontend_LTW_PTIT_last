import { Navigate, Outlet, useLocation } from "react-router-dom"
import Login from "./Login";

const ProtectedRoutes = (props) => {
    const authenticated = !!localStorage.getItem('accessToken')

    const location = useLocation()

    console.log(location.pathname);
    

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