import React, { useEffect } from 'react';
import {useAuthHeader, useAuthUser, useSignIn} from 'react-auth-kit'
import './Home.scss';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import Feed from '../../components/Feed/Feed';
import axios from '../../api/axios';
import UpdateUserData from '../../Hooks/UpdateUserData';

function Home(): React.ReactElement {
  const currentUser = useAuthUser();
  const photo = `http://localhost:5112/Media/ProfilePics/${currentUser()?.profilePicName}`
  const profilefirstName= currentUser()?.firstName
  const profileSurname = currentUser()?.surname
  const profileName = `${profilefirstName} ${profileSurname}`    

  UpdateUserData();
  
  return (
    <>
      <Header photoUrl={photo} username={profileName} />
      <div className='homeBody'>
        <SideBar photoUrl={photo} username={profileName} />
        <Feed photoUrl={photo} username={profileName}/>
      </div>
    </>
  );
}

export default Home;