import React, { SyntheticEvent, useContext, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import './Login.scss';
import fbNameLogo from '../../assets/fbNameLogo.png';
import SignUp from '../../components/SignUp';
import { redirect, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';


const LOGIN_URL = '/login'


function Login(): React.ReactElement {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);
    const navigate = useNavigate();
    const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated()

    const onSignIn = async (e: SyntheticEvent) => {
        // You can access the email and password values here and perform the login logic
        e.preventDefault()

        axios.post(LOGIN_URL, {
            email,
            password,
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true // To include credentials
        })
            .then((response) => {
                
                console.log(response.data)
                signIn(
                    {
                        token: response.data.jwt,
                        expiresIn: response.data.totalMinutes,
                        tokenType: 'Bearer',
                        authState: response.data.user
                    }
                )

            })
            .catch((error) => {
                if(error.response?.status === 400){
                    error('Missing Username or Password')
                }else {
                    error('Login Failed');
                }
            });

    };
    if(isAuthenticated()){
        navigate('/')
    }

    return (
        <>
            <div className='login'>
                <SignUp show={showSignUp} setShow={setShowSignUp} />
                <div className='logo'>
                    <img src={fbNameLogo} alt='name logo' />
                    <h3>Yellow pages.</h3>
                </div>
                <div className='loginCard'>
                    <div className='card'>frontend/src/Pages/Login/Login.tsx
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
                        <p className='txt-forgot-pass'>Forgotten password?</p>
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


