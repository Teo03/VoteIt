import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import axios from 'axios';

export class Nav extends React.Component {
  constructor(){
    super();
    this.state = { 
      redirect: '/auth'
    }
  }

  componentDidMount = () => {
    return axios.get("/userLogged").then(response => {
      this.setState({ redirect: response.data });
    });
  }

  render = () => {
    return (
      <div className='container text-center'>
        <AppBar position="static" color='default'>
          <Toolbar>
            <Typography style={{ flex: 1, fontSize: 25}}>
            <a href='/'>VoteIt</a>
            </Typography>
            <a href={this.state.redirect}>
            <IconButton>
              <AccountCircle />
            </IconButton>
            </a>
          </Toolbar>
        </AppBar>  
      </div>
    );
  }
}