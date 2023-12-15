
import Button from '@mui/material/Button';
import React, { SyntheticEvent, useState } from 'react'
import closeIcon from "../../assets/close-icon.png"
import './Unfriend.scss'
import axios from '../../api/axios';
import { Avatar } from '@mui/material';


type Props = {
    show: boolean,
    setShow: (show: boolean) => void
    userId: number
    friendId: number
    friendFirstName: string
    friendLastName: string
}


const Unfriend = (props: Props) => {

    const DELETE_FRIEND = `/Friend/unfriend/${props.userId}?friendId=${props.friendId}`;


    const submit = async (e: SyntheticEvent) => {
        try {
            const response = await axios.delete(DELETE_FRIEND, {
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
                            <h2>Do you really want to unfriend  {props.friendFirstName} {props.friendLastName}?</h2>
                        </div>
                        <img src={closeIcon} alt="close icon" id="close-icon"
                            onClick={() => props.setShow(false)}

                        />
                    </div>

                    <div className="signup-seperator"></div>

                    <form onSubmit={submit}>
                        <div className="signup-fields">

                            <div className="signup-inputs">

                            </div>
                            <Button variant='outlined' className='reset-btn' type='submit'>
                                Unfriend 
                            </Button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Unfriend;