import React from 'react';
import SideBarRow from './SideBarRow';
import {
  StorefrontRoundedIcon,
  LocalHospitalRoundedIcon,
  GroupRoundedIcon,
  ChatRoundedIcon,
  VideoLibraryRoundedIcon,
  FlagRoundedIcon
} from '../../utils/icons';

import './SideBar.scss';
import ProfilePage from '../../Pages/Profile/Profile';

interface SideBarProps {
  photoUrl?: string;
  username: string | null;
}

function SideBar({ photoUrl, username }: SideBarProps): React.ReactElement {
  return (
    <div className='sideBar'>
      <SideBarRow src={photoUrl} title={username} to={'/ProfilePage'} />

      {rowIconList.map(({ Icon, title , to}, index) => (
        <SideBarRow key={index} title={title} Icon={Icon} to={to} />
      ))}
    </div>
  );
}

const rowIconList = [
  {
    Icon: LocalHospitalRoundedIcon,
    title: 'COVID-19 Information Center',
    to: '/Loog'
  },
  {
    Icon: FlagRoundedIcon,
    title: 'Pages',
    to: '/Pages'
  },
  {
    Icon: GroupRoundedIcon,
    title: 'Friends',
    to: '/Friends'
  },
  {
    Icon: ChatRoundedIcon,
    title: 'Messenger',
    to: '/Friends'
  },
  {
    Icon: StorefrontRoundedIcon,
    title: 'Marketplace',
    to: '/Friends'
  },
  {
    Icon: VideoLibraryRoundedIcon,
    title: 'Videos',
    to: '/Friends'
  }
];

export default SideBar;