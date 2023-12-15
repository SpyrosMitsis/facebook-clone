import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import './Login.scss';
import fbNameLogo from '../../assets/fbNameLogo.png';
import SignUp from '../../components/SignUp';
import { redirect, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword';


const LOGIN_URL = '/login'


function Login(): React.ReactElement {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);
    const [showForgotPass, setShowForgotPass] = useState(false);
    const navigate = useNavigate();
    const signIn = useSignIn();
    const isAuthenticated = useIsAuthenticated()

    const onSignIn = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // To include credentials
        }
      );

      console.log(response.data);

      signIn({
        token: response.data.jwt,
        expiresIn: response.data.totalMinutes,
        tokenType: 'Bearer',
        authState: response.data.user,
      })
    
    } catch (error) {
      if (error === 400) {
        console.error('Missing Username or Password');
      } else {
        console.error('Login Failed');
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  

    return (
        <>
            <div className='login'>
                <SignUp show={showSignUp} setShow={setShowSignUp} />
                <ForgotPassword show={showForgotPass} setShow={setShowForgotPass} />
                <div className='logo'>
                    <img src={fbNameLogo} alt='name logo' />
                </div>
                <div className='loginCard'>
                    <div className='card'>
                        <span className='title'>Sign In</span>
                        <p>Sign in with your account or Sign up</p>
                        <TextField className="loginField"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField className="loginField"
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button className='signIn' type='submit' onClick={onSignIn}>
                            LOG IN
                        </Button>
                        <p className='txt-forgot-pass' onClick={() => setShowForgotPass(true)}>Forgotten password?</p>
                        <div className="login-seperator"></div>
                        <Button className='signUp' type='submit' onClick={() => setShowSignUp(true)}>
                            SIGN UP
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;


