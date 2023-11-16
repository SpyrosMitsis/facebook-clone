import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useAuthUser } from 'react-auth-kit';
import UpdateUserData from '../../Hooks/UpdateUserData';
import SideBar from '../../components/SideBar';
import './Friends.scss'
import Friend from '../../components/Friend/Friend';
import { SearchIcon } from '../../utils/icons';
import axios from '../../api/axios';


interface Friend {
  id: number;
  profileId: number;
  friendId: number;
  status: string;
  isFriend: boolean;
}

interface User {
  id: number;
  firstName: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  dayOfJoyning: string;
  gender: string;
  profilePicName: string;
  bannerFileName: string;
  friendsOf: Friend[];
}


function Friends(): React.ReactElement {
  const currentUser = useAuthUser();
  const photo = `http://localhost:5112/Media/ProfilePics/${currentUser()?.profilePicName}`
  const profilefirstName = currentUser()?.firstName
  const profileSurname = currentUser()?.surname
  const profileName = `${profilefirstName} ${profileSurname}`
  const [friends, setFriends] = useState<User[]>([]);


  const GET_FRIENDS = `/User/Friends/${currentUser()?.id}`

  useEffect(() => {
    axios.get(GET_FRIENDS)
      .then(response => {
        setFriends(response.data);
        console.log(response.data.profilePicName)
      })
      .catch(error => {
        // Handle errors here
        console.error('Error fetching friends:', error);
      });

  }, [])


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
            {friends.map((response) => (
              <Friend
                key={response.id}  // Adding a key prop is important to fix the warning
                firstName={response.firstName}
                lastName={response.surname}
                profilePicUrl={`http://localhost:5112/Media/ProfilePics/${response.profilePicName}`} // Adjust the base URL as needed
              />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

export default Friends;