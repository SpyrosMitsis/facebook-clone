import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { SearchIcon, HomeRoundedIcon, SubscriptionsRoundedIcon, SupervisedUserCircleRoundedIcon, AddRoundedIcon, NotificationsRoundedIcon, StorefrontRoundedIcon, ExitToAppRoundedIcon } from '../../utils/icons';
import fbImgLogo from '../../assets/fbImgLogo.png';
import { useSignOut } from 'react-auth-kit';
import './Header.scss';
import { useNavigate } from 'react-router';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Autocomplete, TextField } from '@mui/material';

interface HeaderProps {
    photoUrl?: string;
    username: string | null;
    users: UserData[];
}

interface UserData {
    id: number;
    fullName: string
    profilePicName: string
}

interface SearchBoxProps {
  onSearch: (term: string) => void;
}



export default function Header({ users, photoUrl, username }: HeaderProps): React.ReactElement {
    const signOut = useSignOut();
    const navigate = useNavigate()
    const location = useLocation(); // Get the current location
    const [searchTerm, setSearchTerm] = useState('');

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
      // Perform the search and redirect
        onSearch(searchTerm);
      // Redirect to the search results page or any other page you want
        }
    };
    // const filteredUsers = users.filter((user) =>
    //     `${user.firstName} ${user.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
    // );


    // <div className={location.pathname === '/' ? 'activeOption' : 'option'} onClick={() => navigate('/')}>
    //     <HomeRoundedIcon fontSize='large' className='icon' />
    // </div>
    // <div className={location.pathname === '/subscriptions' ? 'activeOption' : 'option'}>
    //     <SubscriptionsRoundedIcon fontSize='large' className='icon' />
    // </div>
    // <div className={location.pathname === '/storefront' ? 'activeOption' : 'option'}>
    //     <StorefrontRoundedIcon fontSize='large' className='icon' />
    // </div>

    return (
        <div className='header'>
            <div className='headerLeft'>
                <img src={fbImgLogo} alt='fb logo' className='logo' onClick={() => navigate('/')} />
                <div>
                    <div className='searchInput'>
                        <SearchIcon className='searchIcon' />
                        <input
                            type='text'
                            placeholder='Search'
                            className='inputBar'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className='headerCenter'>
                <div className={location.pathname === '/' ? 'activeOption' : 'option'} onClick={() => navigate('/')}>
                    <HomeRoundedIcon fontSize='large' className='icon' />
                </div>
                <div className={location.pathname === '/Friends' ? 'activeOption' : 'option'} onClick={() => navigate('/Friends')}>
                    <SupervisedUserCircleRoundedIcon fontSize='large' className='icon' />
                </div>
            </div>

            <div className='headerRight'>
                <div className='info'>
                    <Avatar src={photoUrl} />
                    <h4>{username}</h4>
                </div>
                <IconButton>
                    <AddRoundedIcon />
                </IconButton>
                <IconButton>
                    <NotificationsRoundedIcon />
                </IconButton>
                <IconButton onClick={() => signOut()}>
                    <ExitToAppRoundedIcon />
                </IconButton>
            </div>
        </div>
    );
}
function onSearch(searchTerm: string) {
    throw new Error('Function not implemented.');
}

