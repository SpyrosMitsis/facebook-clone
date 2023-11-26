
import Button from '@mui/material/Button';
import React, { SyntheticEvent, useState } from 'react'
import closeIcon from "../../assets/close-icon.png"
import './Bio.scss'
import axios from '../../api/axios';


type Props = {
    show: boolean,
    setShow: (show: boolean) => void
    userId: number
}


const AddBio = (props: Props) => {

    const [bio , setBio] = useState('')
    const ADD_BIO = `/User/updateBio/${props.userId}`

    const submit = async (e: SyntheticEvent) => {
        try {
            const response = await axios.patch(ADD_BIO, {
                bio: bio
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
                            <h1>Add a new bio</h1>
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
                                    <textarea className="input"  placeholder='Enter Bio' required
                                        onChange={e => setBio(e.target.value)}
                                    />
                                </div>

                            </div>
                            <Button variant='outlined' className='reset-btn' type='submit'>
                               Update Bio 
                            </Button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddBio 