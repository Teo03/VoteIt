import React, { Component } from 'react';
import { Nav } from './Nav';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export class Profile extends Component {
  constructor(){
    super();
    this.state = {
      name: ''
    }
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    axios.get("/logout").then(() => {
        this.props.history.push('/auth');
    });
  }

  componentDidMount = () => {
    axios.get("/userLogged").then(response => {
        this.props.history.push(response.data);
    });
    return axios.get("/info").then(response => {
     this.setState({name: response.data.username});
    });
  }

  render = () => {
    return (
      <div className='container'>
        <Nav />
        <h1 className='text-center'>Welcome {this.state.name}!</h1> <br />
        <Button variant='raised' color='default' size="large" style={{fontSize: 15}} onClick={() => this.props.history.push('/newPoll')}>CREATE A NEW POLL</Button> <br /> <br />
        <Button variant='raised' color='primary' size="large" style={{fontSize: 15}} onClick={() => this.props.history.push('/')}>VOTE ON OTHER POLLS</Button> <br /> <br />
        <Button variant='raised' color='secondary' size="large" style={{fontSize: 15}} onClick={this.logout}>LOGOUT</Button>
      </div>
    );
  }
}