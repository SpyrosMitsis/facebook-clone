import React, { useEffect, useState } from "react";
import { CoverPicture } from "../../components/CoverPicture/CoverPicture";
import "./Profile.scss";
import Header from "../../components/Header";
import { Avatar, Button } from "@mui/material";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import CreatePost from "../../components/CreatePost/CreatePost";
import UpdateUserData from "../../Hooks/UpdateUserData";
import { useAuthUser } from "react-auth-kit";
import axios from "../../api/axios";
import AddBio from "../../components/Bio/Bio";
import Post from "../../components/Post/Post";


interface Props {
    photoUrl: string
}

interface User {
    firstName: string;
    surname: string;
    profilePicName: string;
}

interface Post {
    id: number;
    mediaFileName: string;
    description: string;
    timeStamp: string
    likes: number;
    commnets: string;
    user: User
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
    const [showBioAdder, setShowBioAdder] = useState(false)
    const [aspectRatio, setAspectRatio] = useState(1);
    const [destinationFolder, setDestinationFolder] = useState('')

    const profilefirstName = currentUser()?.firstName
    const profileSurname = currentUser()?.surname
    const profileName = `${profilefirstName} ${profileSurname}`
    const bio = currentUser()?.bio
    const [friends, setFriends] = useState(Number)
    const [posts, setPosts] = useState<Post[]>();

    UpdateUserData();

    const GET_FRIENDS_NUMBER = `/Friend/sumOfFriends/${currentUser()?.id}`
    const DELETE_BIO = `/User/DeleteBio/${currentUser()?.id}`
    const GET_POSTS = `/Post/${currentUser()?.id}`



    const handleAvatarClick = () => {
        setShowImageUploader(true);
        setAspectRatio(1)
        setDestinationFolder('uploadProfilePic')
    };

    const handleCoverPictureClick = () => {
        setShowImageUploader(true);
        setAspectRatio(90 / 25)
        setDestinationFolder('UploadCoverPic')
    };

    const handleDeleteBioClick = () => {
        const fetchData = async () => {
            try {
                const response = await axios.patch(DELETE_BIO, {});
                console.log('Patch request successful', response.data);
                // You may want to update your component state or perform other actions here
            } catch (error) {
                console.error('Error making patch request', error);
            }
        };
        fetchData();
    };

    useEffect(() => {
        axios.get(GET_FRIENDS_NUMBER)
            .then(response => {
                setFriends(response.data);
            })
            .catch(error => {
                // Handle errors here
                console.error('Error fetching friends:', error);
            });

    }, [])

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

    }, [])


    return (
        <>
            <ImageUploader show={showImageUploader} setShow={setShowImageUploader} imageUrl={photoUrl} aspectRatio={aspectRatio} destinationFolder={destinationFolder} />
            <AddBio show={showBioAdder} setShow={setShowBioAdder} userId={currentUser()?.id} />

            <Header photoUrl={photo} username={profileName} users={[]} />
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
                    <div className="ProfileName"> {profileName}
                        <div className="FriendsNumber">{friends} friends</div>
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
                    <Button className="button" onClick={() => setShowBioAdder(true)}>
                        Add bio
                    </Button>

                    <Button className="button" onClick={handleDeleteBioClick}>
                        delete Bio
                    </Button>
                </div>
                <div className="createPost_wrapper">
                    <CreatePost photoUrl={photo} username={profileName} />
                    {posts?.map(post => (
                        <Post
                            key={post.id}
                            profilePic={`http://localhost:5112/Media/ProfilePics/${post.user.profilePicName}`}
                            username={post.user.firstName + " " + post.user.surname}
                            text={post.description}
                            timestamp={post.timeStamp}
                            image={`http://localhost:5112/Media/postPics/${post.mediaFileName}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
    ;

export default Profile;

