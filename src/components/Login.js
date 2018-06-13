import React from 'react';
import {Nav} from './Nav';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import axios from 'axios';

export class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            error: false
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
                    this.setState({error: false});
                    this.props.history.push('/');
                } else {
                    this.setState({error: true});
                    alert(res.data);
                }
            });
        }
    }  

    handleChange1(e){
        this.setState({
            username: e.target.value,
            error: false
        });
    }

    handleChange2(e){
        this.setState({
            password: e.target.value,
            error: false
        });
    }

    render() {
        return (
            <div>
                <Nav />
                <div className='text-center'>
                    <h1>Login</h1>
                    <div className='container'>
                        <Input
                        placeholder="Username"
                        value={this.state.username} onChange={this.handleChange1}  style={{fontSize: 20}} error={this.state.error}
                        />
                        <br />
                        <br />
                        <br />
                        <Input
                        placeholder="Password"
                        value={this.state.password} onChange={this.handleChange2} type='password' style={{fontSize: 20}} error={this.state.error}
                        />
                        <br />
                        <br />
                        <Button variant="raised" size="large" color="default"  style={{fontSize: 15}} onClick={this.login}>
                        <h4>Login</h4>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}