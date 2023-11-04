import React from 'react';
import './SideBar.scss';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

interface SideBarRowProps {
  src?: string | null;
  title: string | null;
  url?: string;
  to: string;
  Icon?: any;
}

function SideBarRow(props: SideBarRowProps): React.ReactElement {
  const { src, title, url, to, Icon } = props;

  return (
    <div className='sideBarRow'>
      <Link to ={to}> 
      <div className='row'>
        {src && <Avatar src={src} />}
        {url && <img src={url} alt='' className='image' />}
        {Icon && <Icon fontSize='large' className='rowIcon' />}
        <h4>{title}</h4>
      </div>
</Link>
    </div>
  );
}

export default SideBarRow;