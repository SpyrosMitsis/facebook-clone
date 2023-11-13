import React from 'react'
import './Friend.scss'
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material'
import { MoreHorizontal } from '../../utils/icons'

const Friend = () => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='friend'>
      <Avatar />
      <span>John Smith</span>
      <div className="spacer"></div>
      <IconButton aria-label="Example" className='more-options'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
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
  )
}

export default Friend