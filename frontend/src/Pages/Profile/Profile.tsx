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

export const FacebookImagePost = (): JSX.Element => {
    return <div className={`facebook-image-post}`} />;
};
export const DivWrapper = (): JSX.Element => {
    return <div className={`div-wrapper`} />;
};

export const FacebookImagePostWrapper = (): JSX.Element => {
    return <div className={`facebook-image-post-wrapper`} />;
};




export const Profile = (): JSX.Element => {
    const currentUser = useAuthUser();
    const photo = `http://localhost:5112/Media/ProfilePics/${currentUser()?.profilePicName}`
    const profileName = currentUser()?.firstName

    return (
        <>
            <Header photoUrl={photo} username={profileName} />
            <div className="mockup-facebook">
                <div className="div">
                    <div className="frame">
                        <div className="cover-picture-wrapper">
                            <CoverPicture photoUrl={photoUrl} />
                        </div>
                        <div className="frame-2">
                            <div className="frame-3">
                                <div className="group">
                                    <img src={photo} className="profileAvatar" />
                                </div>
                                <div className="frame-4">
                                    <div className="frame-5">
                                        <div className="ProfileName"> {profileName}</div>
                                        <div className="FriendsNumber">1K friends</div>
                                    </div>
                                    <div className="frame-6">
                                        <div className="frame-7">
                                            <img className="img" alt="Icon facebook edit" src="edit-24.svg" />
                                            <div className="text-wrapper-3">Edit profile</div>
                                        </div>
                                        <div className="frame-8">
                                            <img className="img" alt="Icon facebook edit" src="image.svg" />
                                            <div className="text-wrapper-4">Add to story</div>
                                        </div>
                                        <img className="img-2" alt="Frame" src="frame-44.svg" />
                                    </div>
                                </div>
                            </div>
                            <div className="frame-9">
                                <div className="frame-10">
                                    <div className="frame-11">
                                        <div className="text-wrapper-5">Posts</div>
                                        <div className="rectangle" />
                                    </div>
                                    <div className="frame-11">
                                        <div className="text-wrapper-6">About</div>
                                    </div>
                                    <div className="frame-11">
                                        <div className="text-wrapper-6">Friends</div>
                                    </div>
                                    <div className="frame-11">
                                        <div className="text-wrapper-6">Photos</div>
                                    </div>
                                    <div className="frame-11">
                                        <div className="text-wrapper-6">Videos</div>
                                    </div>
                                    <div className="frame-11">
                                        <div className="text-wrapper-6">Check-ins</div>
                                    </div>
                                    <div className="frame-12">
                                        <div className="text-wrapper-6">More</div>
                                        <img className="frame-13" alt="Frame" src="frame-51.svg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="frame-14">
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
                        <div className="frame-15">
                            <div className="frame-22">
                                <div className="Intro">Photos</div>
                                <div className="SeeMore">See all photos</div>
                            </div>
                            <div className="frame-23">
                                <div className="placeholderImage" />
                                <div className="placeholderImage" />
                                <div className="placeholderImage" />
                                <div className="placeholderImage" />
                                <div className="placeholderImage" />
                                <div className="placeholderImage" />
                                <div className="placeholderImage" />
                            </div>
                        </div>
                        <div className="frame-25">
                            <div className="frame-26">
                                <div className="frame-22">
                                    <div className="Intro">Friends</div>
                                    <div className="SeeMore">See all friends</div>
                                </div>
                                <div className="FriendsNumber">1 friend</div>
                            </div>
                            <div className="frame-27">
                                <div className="facebook-profile-wrapper">
                                    <FacebookProfile photoUrl={photo} />
                                </div>
                                <div className="UserName ">{currentUser()?.firstName} {currentUser()?.surname}</div>
                            </div>
                        </div>
                    </div>
                    <div className="Posts">
                        <div className="card">
                                <div>
                                    Profile Picture
                                </div>
                                <div className='searchInput'>
                                    <SearchIcon className='searchIcon' />
                                    <input type='text' placeholder="What's on your mind?" className='inputBar' />
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
                                <div className="frame-42">
                                    <div className="text-wrapper-21">Write a comment...</div>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    );
};

export default Profile;