import React from 'react';
import {H3} from './pages';
import {                     //It ensures routing to h3 by default.
  BrowserRouter as Router,        
  Route,
  Redirect
} from "react-router-dom";

/*
  This component is the highest component
  that wraps around pages under React Router.
*/

const App = ({ip})=>{
  return (
    <Router>
      <Route path="/h3">                  
        <H3 ip={ip}/>
      </Route>
      <Redirect to="/h3"/>
    </Router>
  );
}

export default App;
