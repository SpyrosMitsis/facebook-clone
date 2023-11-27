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
import Post from "../../components/Post/Post";

interface User {
  id: number;
  firstName: string;
  surname: string;
  profilePicName: string;
  posts:Post[]
}

interface Post {
    id: number;
    mediaFileName: string;
    description: string;
    timeStamp: string
    likes: number;
    commnets: string;
}

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
    const { userData, loading, fetchUserData , numberFriends } = useUserContext();
    const [posts, setPosts] = useState<User | null>(null);

useEffect(() => {
    if (userId !== undefined) {
        fetchUserData(userId);
    }
}, []);

 


    const photo = `http://localhost:5112/Media/ProfilePics/${userData?.profilePicName}`
    const photoUrl = `http://localhost:5112/Media/CoverPics/${userData?.bannerFileName}`
    const [showImageUploader, setShowImageUploader] = useState(false)
    const [aspectRatio, setAspectRatio] = useState(1);
    const [destinationFolder, setDestinationFolder] = useState('')

    const GET_FRIENDS_NUMBER = `/Friend/sumOfFriends/${userData?.id}`
    const GET_POSTS = `/Post/${userData?.id}`

    const profilefirstName = userData?.firstName
    const profileSurname = userData?.surname
    const bio = userData?.bio
    const profileName = `${profilefirstName} ${profileSurname}`
    
    //UpdateUserData();


    useEffect(() => {
        axios.get(GET_POSTS)
            .then(response => {
                setPosts(response.data);
                console.log(response.data)
            })
            .catch(error => {
                // Handle errors here
                console.error('Error fetching friends:', error);
            });

    }, [userData?.id])

    return (
        <>
            <ImageUploader show={showImageUploader} setShow={setShowImageUploader} imageUrl={photoUrl} aspectRatio={aspectRatio} destinationFolder={destinationFolder} />
            <Header photoUrl={photo} username={profileName} users={[]} />
            <div className="frame">
                <div className="CoverPicture">
                    <CoverPicture photoUrl={photoUrl} />
                </div>
                <div className="frame-3">
                    <Avatar className="profileAvatar1" src={photo} />
                    <div className="ProfileName"> {profileName}
                   <div className="FriendsNumber">{numberFriends} friends</div>
                    <div className="BioWrapper">
                        Bio
                    <div className="Bio">{bio}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-content">

                <div className="intro_wrapper">
                    <div className="Intro">Intro</div>
                    <Button className="button" >
                        Add bio
                    </Button>

                    <Button className="button">
                        delete Bio
                    </Button>
                </div>
                <div className="createPost_wrapper">
                    {posts?.posts.map(post => (
                        <Post 
                        profilePic={`http://localhost:5112/Media/ProfilePics/${posts.profilePicName}`}
                        username={posts.firstName} 
                        key={post.id}
                        timestamp={post.timeStamp} 
                        text={post.description} 
                        image={`http://localhost:5112/Media/postPics/${post.mediaFileName}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
export default FriendsProfile;


