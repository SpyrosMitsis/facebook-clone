import React, { useState, useEffect } from 'react';
import './Feed.scss';
import Post from '../Post/Post';
import CreatePost from '../CreatePost/CreatePost';
import ImageUploader from '../ImageUploader/ImageUploader';
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

function Feed({ photoUrl, username, profileId }: FeedProps): React.ReactElement {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showImageUploader, setShowImageUploader] = useState(false)

  const GET_POSTS = `/Post/Home/${profileId}`
  console.log(GET_POSTS)

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
      <CreatePost photoUrl={photoUrl} username={username} userId={profileId} />
      {posts?.map(post => (
        <Post
          key={post.id}
          id={post.id}
          text={post.description}
          timestamp={post.timeStamp}
          image={`http://localhost:5112/Media/postPics/${post.mediaFileName}`}
          profilePic={`http://localhost:5112/Media/profilePics/${post.user.profilePicName}`}
          username={post.user.firstName + ' ' + post.user.surname}
          userId={post.user.id}
          currentUserProfilePic={photoUrl} 
          currentUserId={profileId}
          />
      ))}
    </div>
  );
}

export default Feed;