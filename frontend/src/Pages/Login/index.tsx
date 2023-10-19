import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import './Login.scss';
import fbNameLogo from '../../assets/fbNameLogo.png';

function Login(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = async () => {
    // You can access the email and password values here and perform the login logic
    console.log('Email:', email);
    console.log('Password:', password);
  };

    return (
        <div className='login'>
        <div className='logo'>
            <img src={fbNameLogo} alt='name logo' />
            <h3>shit is hard.</h3>
        </div>
        <div className='loginCard'>
            <div className='card'>
            <span className='title'>Sign In</span>
            <p>Sign in with your account or Sign up</p>
            <TextField className="textField" 
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField className="textField" 
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button className='button' type='submit' onClick={onSignIn}>
                SIGN IN
            </Button>
            </div>
        </div>
        </div>
    );
}

export default Login;
