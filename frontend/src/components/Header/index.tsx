import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { SearchIcon, HomeRoundedIcon, SubscriptionsRoundedIcon, SupervisedUserCircleRoundedIcon, AddRoundedIcon, NotificationsRoundedIcon, StorefrontRoundedIcon, ExitToAppRoundedIcon } from '../../utils/icons';
import fbImgLogo from '../../assets/fbImgLogo.png';
import { useSignOut } from 'react-auth-kit';
import './Header.scss';
import { useNavigate } from 'react-router';

interface HeaderProps {
    photoUrl?: string;
    username: string | null;
}

export default function Header({ photoUrl, username }: HeaderProps): React.ReactElement {
    const signOut = useSignOut();
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    return (
        <div className='header'>
            <div className='headerLeft'>
                <img src={fbImgLogo} alt='fb logo' className='logo' onClick={() => navigate('/')} />
                <div className='searchInput'>
                    <SearchIcon className='searchIcon' />
                    <input type='text' placeholder='Search' className='inputBar' />
                </div>
            </div>

            <div className='headerCenter'>
                <div className={location.pathname === '/' ? 'activeOption' : 'option'} onClick={() => navigate('/')}>
                    <HomeRoundedIcon fontSize='large' className='icon' />
                </div>
                <div className={location.pathname === '/subscriptions' ? 'activeOption' : 'option'}>
                    <SubscriptionsRoundedIcon fontSize='large' className='icon' />
                </div>
                <div className={location.pathname === '/storefront' ? 'activeOption' : 'option'}>
                    <StorefrontRoundedIcon fontSize='large' className='icon' />
                </div>
                <div className={location.pathname === '/ProfilePage' ? 'activeOption' : 'option'} onClick={() => navigate('/ProfilePage')}>
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
