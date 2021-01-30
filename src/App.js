import React from 'react';
import {H3} from './pages';
import {                                 //for routing to h3
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

const App = ({apiKey, ip})=>{
  return (
    <Router>
      <Route path="/h3">                  
        <H3 apiKey={apiKey} ip={ip}/>
      </Route>
      <Redirect to="/h3"/>
    </Router>
  );
}

export default App;
