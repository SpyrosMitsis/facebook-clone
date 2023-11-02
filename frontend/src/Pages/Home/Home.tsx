import React from 'react';
import {useAuthUser} from 'react-auth-kit'
import './Home.scss';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';

function Home(): React.ReactElement {
  const currentUser = useAuthUser();
  const photo = 'https://images.unsplash.com/photo-1682687218904-de46ed992b58?auto=format&fit=crop&q=80&w=1886&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  const user = currentUser()?.firstName ?? null;

  return (
    <>
      <Header photoUrl={photo} username={user} />
      <div className='homeBody'>
        <SideBar photoUrl={photo} username={user} />
      </div>
    </>
  );
}

export default Home;