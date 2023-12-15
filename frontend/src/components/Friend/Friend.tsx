import React, { useEffect } from 'react';
import './Friend.scss';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreHorizontal } from '../../utils/icons';
import axios from '../../api/axios';
import { useAuthUser } from 'react-auth-kit';

interface Props {
  id: number,
  friendid: number;
  firstName: string;
  lastName: string;
  profilePicUrl: string;
}

const Friend = (props: Props): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const currentUser = useAuthUser();

  const DELETE_FRIEND= `/Friends/${props.id}?friendId=${props.friendid}`;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOnClick = () => {
    useEffect(() => {
      const deleteFriend = async () => {
        try {
          // Make the DELETE request using Axios
          const response = await axios.delete(DELETE_FRIEND);

          // Handle the response as needed
          console.log('Friend deleted successfully', response.data);

          // Update your state or perform any additional actions
        } catch (error) {
          // Handle errors
          console.error('Error deleting friend:', error);
        }
      };
      deleteFriend();
    }, [props.id]);
    setAnchorEl(null);
  }

  const profileLink = `http://localhost:5173/Profile/${props.friendid}`;

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
        <MoreHorizontal/>
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
        <MenuItem onClick={handleOnClick}>Remove Friend</MenuItem>
      </Menu>
    </div>
  );
};

export default Friend;
