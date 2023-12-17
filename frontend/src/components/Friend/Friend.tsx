import React, { SyntheticEvent, useEffect } from 'react';
import './Friend.scss';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreHorizontal } from '../../utils/icons';
import axios from '../../api/axios';
import { useAuthUser } from 'react-auth-kit';
import Unfriend from '../Unfriend/Unfriend';

interface Props {
  id: number,
  friendId: number;
  firstName: string;
  lastName: string;
  profilePicUrl: string;
}

const Friend = (props: Props): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const currentUser = useAuthUser();

  const DELETE_FRIEND = `/Friend/unfriend/${props.id}?friendId=${props.friendId}`;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const submit = async (e: SyntheticEvent) => {
    try {
      const response = await axios.delete(DELETE_FRIEND, {
      });

      const content = response.data;
      console.log(response)
    } catch (error) {

      console.error("There was an error!", error);
    }
  }

  const profileLink = `http://localhost:5173/Profile/${props.friendId}`;

  return (
    <>
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
          <MenuItem onClick={submit}>Remove Friend</MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default Friend;
