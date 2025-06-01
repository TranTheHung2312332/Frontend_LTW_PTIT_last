import TopBar from "./TopBar";
import UserDetail from "./UserDetail";
import UserList from "./UserList";
import UserPhotos from "./UserPhotos";
import Login from './Login';

import { Grid, Paper, Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Register from "./Register";
import ProtectedRoutes from "./ProtectedRoutes";
import NoMatch from "./NoMatch";
import Logout from "./Logout";
import UserDirectory from "./UserDirectory/index.jsx";

const AppLayout = () => {
    const location = useLocation();

    if (location.pathname === "/login" || location.pathname === "/register") {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        );
    }

    return (
        <>
          <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100 }}>
            {localStorage.getItem('accessToken') && <TopBar />}
          </Box>

          <Box sx={{ mt: '70px', px: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Paper sx={{ height: 'calc(100vh - 85px)', p: 2, overflowY: 'auto' }}>
                  {localStorage.getItem('accessToken') && <UserList />}
                </Paper>
              </Grid>

              <Grid item xs={12} sm={9}>
                <Paper sx={{ height: 'calc(100vh - 85px)', p: 2, overflowY: 'auto' }}>
                  <Routes>
                    <Route element={<ProtectedRoutes />}>
                      <Route path="/" element={<UserDirectory />} index />
                      <Route path="/users/:userId" element={<UserDetail />} />
                      <Route path="/photos/:userId" element={<UserPhotos />} />
                      <Route path="/logout" element={<Logout />} />
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                  </Routes>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </>
    )
}

export default AppLayout