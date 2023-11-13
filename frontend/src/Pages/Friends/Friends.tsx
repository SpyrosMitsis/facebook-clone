import React from 'react'
import Header from '../../components/Header'
import { useAuthUser } from 'react-auth-kit';
import UpdateUserData from '../../Hooks/UpdateUserData';
import SideBar from '../../components/SideBar';
import './Friends.scss'
import Friend from '../../components/Friend/Friend';
import { SearchIcon } from '../../utils/icons';

function Friends(): React.ReactElement {
  const currentUser = useAuthUser();
  const photo = `http://localhost:5112/Media/ProfilePics/${currentUser()?.profilePicName}`
  const profilefirstName = currentUser()?.firstName
  const profileSurname = currentUser()?.surname
  const profileName = `${profilefirstName} ${profileSurname}`

  UpdateUserData();

  return (
    <>
      <Header photoUrl={photo} username={profileName} />
      <div className='homeBody'>
        <SideBar photoUrl={photo} username={profileName} />
        <div className='Friends-list'>
          <div className='search-wrapper'>
            <div className='searchInput'>
              <SearchIcon className='searchIcon' />
              <input type='text' placeholder='Find your friends' className='inputBar1' />
            </div>
          </div>
          <div className='friends-text'>
            Friends List
          </div>
          <div className='friends-list'>
            <Friend />
          </div>
        </div>

      </div>
    </>
  );
}

export default Friends;