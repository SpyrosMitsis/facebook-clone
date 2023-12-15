import React, { useEffect, useState } from "react";
import { CoverPicture } from "../../components/CoverPicture/CoverPicture";
import "./FriendsProfile.scss";
import Header from "../../components/Header";
import { Avatar, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { useUserContext } from "../../Hooks/UserContext";
import Post from "../../components/Post/Post";
import { useAuthUser } from "react-auth-kit";


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


export const FriendsProfile = (): React.ReactElement => {
    const { userId } = useParams();
    const { userData, fetchUserData, numberFriends } = useUserContext();
    const [posts, setPosts] = useState<Post[]>();
    const [friendshipStatus, setFriendshipStatus] = useState<boolean>(false);


    const currentUser = useAuthUser();
    const currentPhoto = `http://localhost:5112/Media/ProfilePics/${currentUser()?.profilePicName}`
    const currentProfilefirstName = currentUser()?.firstName
    const currentProfileSurname = currentUser()?.surname
    const currentProfileName = `${currentProfilefirstName} ${currentProfileSurname}`

    const fetchData = async () => {
        try {
            if (userId !== undefined) {
                // Fetch user data
                await fetchUserData(userId);
                // Fetch posts
                const response = await axios.get(`/Post/${userId}`);
                setPosts(response.data);
                // Fetch user data
                const friendshipResponse = await axios.get(`/Friend/getFriendship/${currentUser()?.id}?friendId=${userId}`);
                // Assuming the response contains a boolean value indicating friendship status
                setFriendshipStatus(friendshipResponse.data);
                console.log(friendshipResponse.data);

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

    if (!userData) {
        return <div>Loading...</div>;
    }





    const photo = `http://localhost:5112/Media/ProfilePics/${userData?.profilePicName}`
    const photoUrl = `http://localhost:5112/Media/CoverPics/${userData?.bannerFileName}`


    const profilefirstName = userData?.firstName
    const profileSurname = userData?.surname
    const profileName = `${profilefirstName} ${profileSurname}`
    const bio = userData?.bio






    return (
        <>
            <Header photoUrl={currentPhoto} username={currentProfileName} users={[]} />
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

            <div className="createPost_wrapper1">
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
        </>
    );
}
export default FriendsProfile