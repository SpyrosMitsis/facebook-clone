import React from 'react';
import {useAuthUser} from 'react-auth-kit'
import './Home.scss';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import Feed from '../../components/Feed/Feed';

function Home(): React.ReactElement {
  const currentUser = useAuthUser();
  const photo = `http://localhost:5112/ProfilePic/${currentUser()?.profilePicName}`
  console.log(photo)
  const user = currentUser()?.firstName ?? null;

  return (
    <>
      <Header photoUrl={photo} username={user} />
      <div className='homeBody'>
        <SideBar photoUrl={photo} username={user} />
        <Feed photoUrl={photo} username={user}/>
      </div>
    </>
  );
}

export default Home;