import React from 'react';
import {Nav} from './Nav';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

export class Signup extends React.Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            show: 'password'
        }
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.showPass = this.showPass.bind(this);
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

    submitForm(){
        var {username, password} = this.state

        if(username === '' || password === ''){
            alert('Please enter a new username and password.');
        } else {
            axios.post('/localsignup', {
                username: username,
                password: password
            })
            .then(res => {
                   if(res.data === 'success'){
                    this.props.history.push('/loginform');
                   } else if(res.data === 'logged'){
                    this.props.history.push('/');
                   } else {
                    alert(res.data);
                   }
            });
        }
    }

    showPass(){
        this.setState({
            show: this.state.show === 'input' ? 'password' : 'input'
        })
    }

    render() {
        return (
            <div>
            <Nav />
            <div className='text-center'>
                <h1>Sign up</h1>
                <MuiThemeProvider>
                    <div>
                        <TextField hintText="Username" value={this.state.username} onChange={this.handleChange1}/>
                        <br />
                        <br />
                        <TextField hintText="Password" type={this.state.show} style={{ marginBottom: '15px' }} value={this.state.password} onChange={this.handleChange2}/>
                        <RaisedButton onClick={this.showPass} size='small' label='SHOW' />
                        <br />
                        <br />
                        <RaisedButton label="register" primary={true} onClick={this.submitForm} />
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