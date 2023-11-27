import React, { useEffect, useState } from 'react';
import {useAuthHeader, useAuthUser, useSignIn} from 'react-auth-kit'
import './Home.scss';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import Feed from '../../components/Feed/Feed';
import axios from '../../api/axios';
import UpdateUserData from '../../Hooks/UpdateUserData';

interface UserData {
  id: number;
  firstName: string;
  surname: string;
  profilePicName: string
}

function Home(): React.ReactElement {
  const currentUser = useAuthUser();
  const photo = `http://localhost:5112/Media/ProfilePics/${currentUser()?.profilePicName}`
  const profilefirstName= currentUser()?.firstName
  const profileSurname = currentUser()?.surname
  const profileName = `${profilefirstName} ${profileSurname}`
  const [users, setUsers] = useState<UserData[]>([]);
  const GET_ALL_USERS =  `/User/Users`;

  useEffect(() => {
    axios.get(GET_ALL_USERS)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching friends:', error);
      });

  }, []);
  

  UpdateUserData();
  
  return (
    <>
      <Header photoUrl={photo} username={profileName} users={users} />
      <div className='homeBody'>
        <SideBar photoUrl={photo} username={profileName} />
        <Feed photoUrl={photo} username={profileName}/>
      </div>
    </>
  );
}

export default Home;