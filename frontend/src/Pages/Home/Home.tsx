import React from 'react';
import {useAuthUser} from 'react-auth-kit'
import './Home.scss';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import Feed from '../../components/Feed/Feed';

function Home(): React.ReactElement {
  const currentUser = useAuthUser();
  const photo = `http://localhost:5112/Media/ProfilePics/${currentUser()?.profilePicName}`
  const user = currentUser()?.firstName ?? null;

  document.title = `Home | Facebook`

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