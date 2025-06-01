import './App.css';

import { BrowserRouter as Router } from "react-router-dom";

import AppLayout from './components/AppLayout';

const App = (props) => {

  return (
      <Router>
        <AppLayout />
      </Router>
  );
}

export default App;
