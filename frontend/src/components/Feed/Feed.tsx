import React, { useState, useEffect } from 'react';

import AvatarEditor from 'react-avatar-editor'
import './Feed.scss';
import Post from '../Post/Post';
import CreatePost from '../CreatePost/CreatePost';
import ImageUploader from '../ImageUploader/ImageUploader';
import Button from '@mui/material/Button';
import axios from '../../api/axios';

interface FeedProps {
  photoUrl: string;
  username: string | null;
  profileId: number;
}

interface User {
    id: number;
    firstName: string;
    surname: string;
    profilePicName: string;
    posts: Post[]
}

interface Post {
    id: number;
    mediaFileName: string;
    description: string;
    timeStamp: string
    likes: number;
    commnets: string;
}

function Feed({ photoUrl, username, profileId}: FeedProps): React.ReactElement {
  const [posts, setPosts] = useState([]);
  const [showImageUploader, setShowImageUploader] = useState(false)
  const [image, setImage] = React.useState(null);

  const GET_POSTS = `/Post/Home/${profileId}`

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

  }, [profileId])


  return (
    <div className='feed'>
      <ImageUploader show={showImageUploader} setShow={setShowImageUploader} imageUrl={photoUrl} aspectRatio={4 / 3} destinationFolder={'lol'} />
      <CreatePost photoUrl={photoUrl} username={username} />
      {posts?.map((post) => (
        <Post
          key={post.id}
          username={posts.firstName}
          profilePic={`http://localhost:5112/Media/ProfilePics/${posts.profilePicName}`}
          text={post.}
          image={`http://localhost:5112/Media/postPics/${post.mediaFileName}`}
          timestamp={String(new Date().getTime())}
        />
      ))}
    </div>
  );
}

export default Feed;