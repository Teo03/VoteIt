import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

export class Nav extends Component {
  render() {
    return (
      <div>
      <MuiThemeProvider>
      <AppBar
        title="Voting App"
        showMenuIconButton={false}
        iconElementRight={rightButtons}
        style={{ backgroundColor: '#3cba54' }}
        />
      </MuiThemeProvider>  
      </div>
    );
  }

}

const rightButtons = (
  <div className='text-center btns'>
   <a href='/loginform'> <FlatButton label="log in" /></a>
   <a href='/signupform'> <FlatButton label="sign up" /></a>
  </div>
);