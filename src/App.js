import './App.css';

import { BrowserRouter as Router } from "react-router-dom";

import AppLayout from './components/AppLayout';
import { useGlobalContext } from './GlobalContext';
import { Backdrop, CircularProgress } from '@mui/material';

const App = (props) => {

  const {loading} = useGlobalContext()  

  return (
      <Router>
        <AppLayout />
        {loading && 
          <Backdrop
            open={true}
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        }
      </Router>
  );
}

export default App;
