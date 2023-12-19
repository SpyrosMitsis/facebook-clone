import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useAuthUser } from 'react-auth-kit';
import SideBar from '../../components/SideBar';
import './People.scss';
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

interface Props {
    searchString?: string
}

function People(): React.ReactElement {
    const currentUser = useAuthUser();
    const photo = `http://localhost:5112/Media/ProfilePics/${currentUser()?.profilePicName}`;
    const profilefirstName = currentUser()?.firstName;
    const profileSurname = currentUser()?.surname;
    const profileName = `${profilefirstName} ${profileSurname}`;
    const [friends, setFriends] = useState<User[]>([]);
    const queryParams = new URLSearchParams(window.location.search);
    const searchString = queryParams.get('search');
    const [searchTerm, setSearchTerm] = useState('');

    const GET_USERS = `User/Users?searchString=${searchString}`;

    if (searchString != null) {
        useEffect(() => {
            axios.get(GET_USERS)
                .then(response => {
                    console.log(response.data);
                    console.log(GET_USERS)
                    setFriends(response.data);
                })
                .catch(error => {
                    console.error('Error fetching friends:', error);
                });

        }, []);
    }



    const filteredFriends = friends.filter(friend =>
        `${friend.firstName} ${friend.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header photoUrl={photo} username={profileName} users={[]} userId={currentUser()?.id} />
            <div className='homeBody'>
                <SideBar photoUrl={photo} username={profileName} />
                <div className='Friends-list'>
                    <div className='search-wrapper'>
                        <div className='searchInput'>
                            <SearchIcon className='searchIcon' />
                            <input
                                type='text'
                                placeholder='Find users'
                                className='inputBar1'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        window.location.href = `/people?search=${searchTerm}`;
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className='friends-text'>
                        User List
                    </div>
                    <div className='friends-list'>
                        {filteredFriends.map((friend) => (
                            <Friend
                                key={friend.id}
                                id={currentUser()?.id}
                                firstName={friend.firstName}
                                lastName={friend.surname}
                                profilePicUrl={`http://localhost:5112/Media/ProfilePics/${friend.profilePicName}`}
                                friendId={friend.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default People;
