import React from 'react';
import {Nav} from './Nav';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

export class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
        this.login = this.login.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    login(){
        var {username, password} = this.state
        if(username === '' || password === ''){
            alert('Please enter your username and password.');
        } else {
            axios.post('/locallogin', {
                username: username,
                password: password
            })
            .then(res => {
                if(res.data === 'logged'){
                    this.props.history.push('/');
                } else {
                    alert(res.data);
                }
            });
        }
    }  

    handleChange1(e){
        this.setState({
			username: e.target.value
        });
    }

    handleChange2(e){
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return (
            <div>
            <Nav />
            <div className='text-center'>
                <h1>Login</h1>
                <MuiThemeProvider>
                    <div>
                        <TextField hintText="Username"  value={this.state.username} onChange={this.handleChange1}/>
                        <br />
                        <br />
                        <TextField hintText="Password" type="password" value={this.state.password} onChange={this.handleChange2}/>
                        <br />
                        <br />
                        <RaisedButton label="login" primary={true} onClick={this.login}/>
                        <br />
                        <h4>or</h4>
                        <RaisedButton className='authbtn1' label="continue with google" backgroundColor='#D50000' />
                        <br />
                        <RaisedButton className='authbtn2' label="continue with facebook" backgroundColor='#42A5F5' />
                    </div>
                </MuiThemeProvider>
            </div>
        </div>
        );
    }
}