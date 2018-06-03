import ReactDOM from 'react-dom';
import React from 'react';
import './style.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {App} from './components/App.js';
import {Login} from './components/Login.js';
import {Signup} from './components/Signup.js';

ReactDOM.render(
    <Router>
      <div>
        <Route exact path='/' component={App}/>
        <Route exact path='/signupform' component={Signup}/>
        <Route exact path='/loginform' component={Login} />
      </div>
    </Router>
   ,
  document.getElementById('app')
);
