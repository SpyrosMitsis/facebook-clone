import React, { useEffect } from 'react'
import { useAuthHeader, useAuthUser, useSignIn } from 'react-auth-kit';
import axios from '../api/axios';


const UpdateUserData = () => {

  const currentUser = useAuthUser();
  const signIn = useSignIn();
  const authHeader = useAuthHeader();
  const [tokenType, token] = authHeader().split(" ");
  const GET_USER = `/User/${currentUser()?.id}`


    useEffect(() => {
        if (tokenType && token) {
            axios.get(GET_USER)
                .then((response) => {
                    signIn({
                        token: token,
                        tokenType: tokenType,
                        expiresIn: 1080,
                        authState: response.data,
                    });
                })
                .catch(function (error) {
                    console.error('Error:', error);
                });
        }
    }, []); 
}

export default UpdateUserData