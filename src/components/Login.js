import React from 'react';
import {Nav} from './Nav';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class Login extends React.Component {
    render() {
        return (
            <div>
            <Nav />
            <div className='text-center'>
                <h1>Welcome Back!</h1>
                <MuiThemeProvider>
                    <div>
                        <TextField hintText="Username"/>
                        <br />
                        <br />
                        <TextField hintText="Password" type="password" />
                        <br />
                        <br />
                        <RaisedButton label="login" primary={true}/>
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