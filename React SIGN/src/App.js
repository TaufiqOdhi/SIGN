import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Tables from './Assets/table';
import Detail from './Assets/tableDetail';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/detail">
            <Detail/>
          </Route>
          <Route path="/">
            <Tables/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
