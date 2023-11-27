import React from 'react';
import './Friend.scss';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreHorizontal } from '../../utils/icons';
import axios from '../../api/axios';
import { useAuthUser } from 'react-auth-kit';

interface Props {
  id: number; 
  firstName: string;
  lastName: string;
  profilePicUrl: string;
}

const Friend = (props: Props): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const currentUser = useAuthUser();

  const GET_FRIENDS = `/User/Friends/${currentUser()?.id}`;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const profileLink = `http://localhost:5173/Profile/${props.id}`;

  return (
    <div className='friend'>
      <a href={profileLink} className='friend-link'>
        <Avatar src={props.profilePicUrl} />
        <span>{props.firstName} {props.lastName}</span>
      </a>
      <div className="spacer"></div>
      <IconButton
        aria-label="Example"
        className='more-options'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizontal />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Remove Friend</MenuItem>
      </Menu>
    </div>
  );
};

export default Friend;
