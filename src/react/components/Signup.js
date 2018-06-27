import React from 'react';
import {Nav} from './Nav';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';

export class Signup extends React.Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            show: 'password',
            error: false,
            open: false,
            message: ''
        }
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }


    handleChange1 = (e) => {
        this.setState({
            username: e.target.value,
            error: false
        });
    }

    handleChange2 = (e) => {
        this.setState({
            password: e.target.value,
            error: false
        });
    }

    handleClose = () => {
        this.setState({open: false});
    }

    submitForm = () => {
        var {username, password} = this.state

        if(username === '' || password === ''){
            this.setState({open: true, message: 'Please enter a new username and password.'});
        } else {
            axios.post('/localsignup', {
                username: username,
                password: password
            })
            .then(res => {
                   if(res.data === 'success'){
                        this.props.history.push('/loginform');
                        this.setState({error: false});
                   } else if(res.data === 'logged'){
                        this.props.history.push('/');
                        this.setState({error: false});
                   } else {
                        this.setState({error: true, open: true, message: res.data});
                   }
            });
        }
    }

    render = () => {
        return (
            <div>
                <Nav />
                <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={4000} 
                onClose={this.handleClose}
                message={<h4>{this.state.message}</h4>}/>
                <div className='text-center'>
                    <h1>Sign up</h1>
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
                        <Button variant='raised' color='default' size="large" onClick={this.submitForm}  style={{fontSize: 15}} >REGISTER</Button>
                    </div>
                </div>
            </div>
        );
    }
}
