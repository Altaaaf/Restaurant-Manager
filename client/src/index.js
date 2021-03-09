import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './containers/Login';

const myfirstelement = <h1>Hello React!</h1>

ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Login />
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );