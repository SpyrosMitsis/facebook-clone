import React, { useEffect, useState } from "react";
import { CoverPicture } from "../../components/CoverPicture/CoverPicture";
import "./FriendsProfile.scss";
import Header from "../../components/Header";
import { Avatar, Button } from "@mui/material";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import UpdateUserData from "../../Hooks/UpdateUserData";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { useUserContext } from "../../Hooks/UserContext";


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


export const FriendsProfile = (): React.ReactElement => {

    const { userId } = useParams();
    const GET_USER = `/User/${userId}`
    const { userData, loading, fetchUserData } = useUserContext();

useEffect(() => {
    if (userId !== undefined) {
        fetchUserData(userId);
    }
}, [userId, fetchUserData]);


    const photo = `http://localhost:5112/Media/ProfilePics/${userData?.profilePicName}`
    const photoUrl = `http://localhost:5112/Media/CoverPics/${userData?.bannerFileName}`
    const [showImageUploader, setShowImageUploader] = useState(false)
    const [aspectRatio, setAspectRatio] = useState(1);
    const [destinationFolder, setDestinationFolder] = useState('')

    const profilefirstName = userData?.firstName
    //const profilefirstName = 'hehe'
    const profileSurname = userData?.surname
    const profileName = `${profilefirstName} ${profileSurname}`
    UpdateUserData();


    return (
        <>
            <ImageUploader show={showImageUploader} setShow={setShowImageUploader} imageUrl={photoUrl} aspectRatio={aspectRatio} destinationFolder={destinationFolder} />
            <Header photoUrl={photo} username={profileName} />
            <div className="frame">
                <div className="CoverPicture">
                    <CoverPicture photoUrl={photoUrl} />
                </div>
                <div className="frame-3">
                    <Avatar className="profileAvatar1" src={photo} />
                    <div className="ProfileName"> {profileName}
                   <div className="FriendsNumber">1K friends</div>
                    </div>
                </div>
            </div>
            <div className="main-content">
            </div>
        </>
    );
}
export default FriendsProfile;


