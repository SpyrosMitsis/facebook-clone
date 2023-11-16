import React, { useState } from "react";
import { CoverPicture } from "../../components/CoverPicture/CoverPicture";
import "./Profile.scss";
import Header from "../../components/Header";
import { Avatar, Button } from "@mui/material";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import CreatePost from "../../components/CreatePost/CreatePost";
import UpdateUserData from "../../Hooks/UpdateUserData";
import { useAuthUser } from "react-auth-kit";


interface Props {
    photoUrl: string
}
export const FacebookPost = ({ photoUrl }: Props): JSX.Element => {
    return (
        <div className="ProfilePicture">
            <img src={photoUrl} alt="Cover" />
        </div>
    );
};

export const FacebookProfile = ({ photoUrl }: Props): JSX.Element => {
    return (
        <div className="ProfilePicture">
            <img src={photoUrl} alt="Cover" />
        </div>
    );
};


export const Profile = (): React.ReactElement => {
    const currentUser = useAuthUser();
    const photo = `http://localhost:5112/Media/ProfilePics/${currentUser()?.profilePicName}`
    const photoUrl = `http://localhost:5112/Media/CoverPics/${currentUser()?.bannerFileName}`
    const [showImageUploader, setShowImageUploader] = useState(false)
    const [aspectRatio, setAspectRatio] = useState(1);
    const [destinationFolder, setDestinationFolder] = useState('')

    const profilefirstName= currentUser()?.firstName
    const profileSurname = currentUser()?.surname
    const profileName = `${profilefirstName} ${profileSurname}`    
    UpdateUserData();
    

    const handleAvatarClick = () => {
        setShowImageUploader(true);
        setAspectRatio(1)
        setDestinationFolder('uploadProfilePic')
        console.log('i am here')
    };

    const handleCoverPictureClick = () => {
        setShowImageUploader(true);
        setAspectRatio(90 / 25)
        setDestinationFolder('UploadCoverPic')
    };


    return (
        <>
            <ImageUploader show={showImageUploader} setShow={setShowImageUploader} imageUrl={photoUrl} aspectRatio={aspectRatio} destinationFolder={destinationFolder} />
            <Header photoUrl={photo} username={profileName} />
            <div className="frame">
                <div className="coverPicture-wrapper" onClick={handleCoverPictureClick}>
                    <div className="CoverPicture">
                        <CoverPicture photoUrl={photoUrl} />
                    </div>
                    <span className="upload-text">Upload Cover</span>
                </div>
                <div className="frame-3">
                    <div className="avatar-wrapper" onClick={handleAvatarClick}>
                        <Avatar className="profileAvatar" src={photo} />
                        <span className="upload-text">Upload Profile</span>
                    </div>
                    <div className="ProfileName"> {profileName}</div>
                    <div className="FriendsNumber">1K friends</div>
                    <Button className="edit_profile">
                        edit profile
                    </Button>
                    <Button className="add_story">
                        Add to story
                    </Button>
                </div>
            </div>
            <div className="main-content">
                <div className="frame-15">
                    <div className="Intro">Intro</div>
                    <Button className="button">
                        Add bio
                    </Button>

                    <Button className="button">
                        Edit details
                    </Button>

                    <Button className="button">
                        Eat
                    </Button>

                    <Button className="button">
                        Add hobbies
                    </Button>

                    <Button className="button">
                        Add featured
                    </Button>
                </div>
                <div className="createPost_wrapper">
                    <CreatePost photoUrl={photo} username={profileName} />
                </div>
            </div>
        </>
    );
}
    ;

export default Profile;

