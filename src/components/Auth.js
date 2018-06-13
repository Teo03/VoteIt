import React from 'react';
import Button from '@material-ui/core/Button';
import {Nav} from './Nav';

export class Auth extends React.Component {
  render() {
    return (
      <div>
        <Nav />
          <div className="container text-center authform">
              <div className='auth'>
                <h2>Login to an existing account or create a new one.</h2>
                <div className='login'>
                    <Button variant="raised" size="large" color="default" onClick={() =>
                      this.props.history.push('/loginform')}>
                      <h4>Login</h4>
                    </Button>
                </div>
                <div className='signup'>
                    <Button variant="raised" size="large" color="default" onClick={() =>
                      this.props.history.push('/signupform')}>
                      <h4>Signup</h4>
                    </Button>
                </div>
              </div>
              <div className='auth2'>
                <h2>or</h2>
                <div className='fb'>
                    <Button variant="raised" size="large" color="primary">
                      <h4>CONTINUE WITH FACEBOOK</h4>
                    </Button>
                </div>
                <div className='g'>
                    <Button variant="raised" size="large" color="secondary" >
                      <h4>CONTINUE WITH GOOGLE</h4>
                    </Button>
                </div>
              </div>
          </div>
        </div>
    );
  }
}