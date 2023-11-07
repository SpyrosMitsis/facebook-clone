import Button from '@mui/material/Button';
import React, { SyntheticEvent, useState } from 'react'
import closeIcon from "../../assets/close-icon.png"
import './ForgotPassword.scss'
import axios from '../../api/axios';


type Props = {
    show: boolean,
    setShow: (show: boolean) => void
}

const LOGIN_URL = '/forgotPassword'

const ForgotPassword = (props: Props) => {

    const [email, setEmail] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');

    const submit = async (e: SyntheticEvent) => {
        try {
            const response = await axios.patch(LOGIN_URL, {
                email: email,
                password1: pass1,
                password2: pass2
            });
            const content = response.data;
            console.log(response)
        } catch (error) {

            console.error("There was an error!", error);
        }
    }

    return (
        <div style={{
            display: props.show ? "flex" : "none"
        }}>
            <div className="overlay-signup"></div>
            <div className="signup">
                <div className="signup-container">
                    <div className="signup-header">
                        <div>
                            <h1>Forgot Password?</h1>
                            <p>No problem.</p>
                        </div>
                        <img src={closeIcon} alt="close icon" id="close-icon"
                            onClick={() => props.setShow(false)}

                        />
                    </div>

                    <div className="signup-seperator"></div>

                    <form onSubmit={submit}>
                        <div className="signup-fields">

                            <div className="signup-inputs">
                                <div>
                                    <input className="default-input" type="text" placeholder='Enter email address' required
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <input className="default-input" type="password" placeholder='Enter password' required
                                        onChange={e => setPass1(e.target.value)}
                                    />
                                    <input className="default-input" type="password" placeholder='Enter password again' required
                                        onChange={e => setPass2(e.target.value)}
                                    />
                                </div>

                            </div>
                            <Button variant='outlined' className='reset-btn' type='submit'>
                                Reset Password
                            </Button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword