import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';

//variables for the project
const IP_ADDRESS = "175.126.38.231";            //use this for another website

ReactDOM.render(
  <StrictMode>
    <App ip={IP_ADDRESS}/>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
