import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { SearchIcon, HomeRoundedIcon, SubscriptionsRoundedIcon, SupervisedUserCircleRoundedIcon, AddRoundedIcon, NotificationsRoundedIcon, StorefrontRoundedIcon, ExitToAppRoundedIcon, PersonAddAltRoundedIcon } from '../../utils/icons';
import fbImgLogo from '../../assets/fbImgLogo.png';
import { useSignOut } from 'react-auth-kit';
import './Header.scss';
import { useNavigate } from 'react-router';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Autocomplete, Badge, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, TextField } from '@mui/material';
import axios from '../../api/axios';

interface HeaderProps {
    userId: number;
    photoUrl?: string;
    username: string | null;
    users: UserData[];
}

interface UserData {
    id: number;
    firstName: string;
    surname: string;
    profilePicName: string
}

interface SearchBoxProps {
    onSearch: (term: string) => void;
}



export default function Header({ users, photoUrl, username, userId }: HeaderProps): React.ReactElement {
    const signOut = useSignOut();
    const navigate = useNavigate()
    const location = useLocation(); // Get the current location
    const [searchTerm, setSearchTerm] = useState('');
    const [pendingFriendRequests, setPendingFriendRequests] = useState<UserData[]>([])
    const [showList, setShowList] = useState(false);


    const GET_PENDING_FRIENDS = `/Friend/pendingFriendRequests/${userId}`

    useEffect(() => {
        axios.get(GET_PENDING_FRIENDS)
            .then(response => {
                setPendingFriendRequests(response.data)
                console.log(response.data)
            })
            .catch(error => {
                // Handle errors here
                console.error('Error fetching friends:', error);
            });

    }, [])

    const handleSearchChange = (newSearchTerm: string) => {
        // Navigate to the People component with the search term in the URL
        navigate(`/people?search=${newSearchTerm}`);
    };

    const badgeNumber = pendingFriendRequests.length

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
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    window.location.href = `/people?search=${searchTerm}`;
                                }
                            }}
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
                    <Badge badgeContent={badgeNumber} color='error'>
                        <PersonAddAltRoundedIcon onClick={() => setShowList(!showList)} />
                    </Badge>
                </IconButton>
                {showList && (
                    <div className='notifications'>
                        <div className='listContainer'>
                            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {pendingFriendRequests.map((user) => (
                                    <ListItem key={user.id}>
                                        <ListItemButton onClick={() => navigate(`/Profile/${user.id}`)}>
                                            <ListItemAvatar>
                                                <Avatar src={`http://localhost:5112/Media/ProfilePics/${user.profilePicName}`} />
                                            </ListItemAvatar>
                                            <ListItemText primary={`${user.firstName} ${user.surname}`} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </div>
                )}

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

