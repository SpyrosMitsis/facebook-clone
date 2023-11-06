import React from "react";
import { CoverPicture } from "../../components/CoverPicture/CoverPicture";
import "./Profile.scss";
import { useAuthUser } from "react-auth-kit";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import { SearchIcon } from "../../utils/icons";

const photoUrl = 'https://images.unsplash.com/photo-1695982206757-a9643cb6cee5?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'


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




export const Profile = (): JSX.Element => {
    const currentUser = useAuthUser();
    const photo = `http://localhost:5112/Media/ProfilePics/${currentUser()?.profilePicName}`
    const profileName = currentUser()?.firstName

    return (
        <>
            <Header photoUrl={photo} username={profileName} />
            <div className="frame">
                <CoverPicture photoUrl={photoUrl} />
                <div className="frame-3">
                    <img src={photo} className="profileAvatar" />
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
                        Eat Ass
                    </Button>

                    <Button className="button">
                        Add hobbies
                    </Button>

                    <Button className="button">
                        Add featured
                    </Button>
                </div>
                <div className="Posts">
                    <div className="card">
                        <div>
                            Profile Picture
                        </div>
                        <div className='searchInput1'>
                            <SearchIcon className='searchIcon1' />
                            <input type='text' placeholder="What's on your mind?" className='inputBar1' />
                        </div>
                        <div className="frame-31">
                            <div className="frame-32">
                                <div className="rectangle-3" />
                                <div className="text-wrapper-14">Live video</div>
                            </div>
                            <div className="frame-32">
                                <div className="rectangle-3" />
                                <div className="text-wrapper-14">Photo/video</div>
                            </div>
                            <div className="frame-32">
                                <div className="rectangle-3" />
                                <div className="text-wrapper-14">Feeling/activity</div>
                            </div>
                        </div>
                    </div>
                <div className="frame-33">
                    <div className="text-wrapper-15">Posts</div>
                    <div className="frame-34">
                        <img className="img" alt="Frame" src="frame-88.svg" />
                        <div className="text-wrapper-16">Filters</div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}
;

export default Profile;