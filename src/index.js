import ReactDOM from 'react-dom';
import React from 'react';
import './style.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {App} from './components/App.js';
import {Login} from './components/Login.js';
import {Signup} from './components/Signup.js';
import {Auth} from './components/Auth.js';
import {Profile} from './components/Profile.js';
import {newPoll} from './components/newPoll.js';

ReactDOM.render(
    <Router>
      <div>
        <Route exact path='/' component={App}/>
        <Route exact path='/signupform' component={Signup}/>
        <Route exact path='/loginform' component={Login} />
        <Route exact path='/auth' component={Auth} />
        <Route exact path='/profile' component={Profile}/>
        <Route exact path='/newPoll' component={newPoll}/>
      </div>
    </Router>
   ,
  document.getElementById('app')
);
