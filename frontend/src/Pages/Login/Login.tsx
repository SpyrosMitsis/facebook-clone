import React, { SyntheticEvent, useContext, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import './Login.scss';
import fbNameLogo from '../../assets/fbNameLogo.png';
import SignUp from '../../components/SignUp';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import AuthContext from '../../Context/AuthProvider';


const LOGIN_URL = '/login'


function Login(): React.ReactElement {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);
    const [redirect, setRedirect] = useState(false)
    const navigate = useNavigate();

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
            
            })
            .catch((error) => {
                if(error.response?.status === 400){
                    setErrMsg('Missing Username or Password')
                }else {
                    setErrMsg('Login Failed');
                }
            });
        setRedirect(true)

    };
//   if (redirect) {
//       navigate("/home")
//   }
//
    return (
        <>
            <div className='login'>
                <SignUp show={showSignUp} setShow={setShowSignUp} />
                <div className='logo'>
                    <img src={fbNameLogo} alt='name logo' />
                    <h3>shit is hard.</h3>
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
                            SIGN IN
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

function setErrMsg(arg0: string) {
    throw new Error('Function not implemented.');
}
