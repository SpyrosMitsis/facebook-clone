import styles from './ProfileHeader.module.scss';


import React from 'react';

interface ProfileHeaderProps {
  username: string;
  profilePicture: string;
  coverPhoto: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, profilePicture, coverPhoto }) => {
  return (
    <div>
      <img src={coverPhoto} alt="Cover" />
      <img src={profilePicture} alt={username} />
      <h1>{username}</h1>
    </div>
  );
};

export default ProfileHeader;