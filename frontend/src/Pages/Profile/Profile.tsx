import React, { useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import './Profile.scss';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import Feed from '../../components/Feed/Feed';
import Banner from '../../components/Banner/Banner';
import Dialog from '@mui/material/Dialog';
import ProfileSidebar from '../../components/ProfileSideBar/ProfileSideBar';

function Profile(): React.ReactElement {
  const currentUser = useAuthUser();
  const profilePic = `http://localhost:5112/Media/ProfilePics/${currentUser()?.profilePicName}`;
  const bannerPic = 'https://images.unsplash.com/photo-1698681889353-d39a24b78bac?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageURL] = useState('');
  const [progress, setProgress] = useState(0);
  const [bio, setBio] = useState('');
  const [bioVisible, setBioVisible] = useState<boolean>(false);

  const user = currentUser()?.firstName ?? '';

  document.title = `${user} | Facebook`;

  const handleClose = () => {
    setOpen(false);
    setImageURL("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageURL(URL.createObjectURL(file)); // Assuming you want to preview the file
      // setProgress and other logic related to file upload goes here
    }
  };

  const bioSet = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setBio(newValue);
    
    // Here, we would update the state to re-render instead of direct DOM manipulation.
    // For example, use a state to manage button disabled status and style.
  };

  const collapseBio = () => {
    setBioVisible(false);
  };

      return (
        <div className="profile">
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                className="dialog2"
            >
                <div className="makeStyles-paper-1">
                    <div className="profileHead2">
                        <p>Are you sure you want to change your profile picture ? Changes cannot be reverted </p>
                        <progress value={progress} max="100" style={{ display: 'none' }} className="progress" />
                        <div className="buttons">
                            <button onClick={handleClose}>No</button>
                        </div>
                    </div>
                </div>
            </Dialog>
            <div className="profile__topSection">
                <div className="profile__coverPhoto">
                    <img src={profilePic} className="profileAvatar" />
                    <input onChange={handleChange} type="file" accept="image/*" className='inputImage' />
                </div>

                <h1 id="documentUsername">{user}</h1>
                <p className="bioText"></p>
                <p  className="bio">Add Bio</p>
                <div className="bioFields">
                    <textarea value={bio} placeholder="Describe who you are" onChange={bioSet} className="bioInput" />
                    <p>{`${101 - bio.length} characters remaining`}</p>
                    <div className="cancelAndSaveButtons">
                        <button onClick={collapseBio} >Cancel</button>
                        <button className="saveButton">Save</button>
                    </div>
                </div>

                <div className="hr4" />

                <div className="profileHeader__options">
                    <div className="profileHeader__left">
                        <ul>
                            <li className="selected">Timeline</li>
                            <li>About</li>
                            <li>Friends</li>
                            <li>Photos</li>
                            <li>Archive</li>
                            <li>More</li>
                            <li className="rect editProfile"><img src="https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tmaz0VO75BB.png" /><p>Edit Profile</p></li>
                            <li className="rect addFriend"><img src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/33EToHSZ94f.png" /><p>Add Friend</p></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="postsAndIntro">
                <ProfileSidebar  />
            </div>
        </div >
    )
}



export default Profile;