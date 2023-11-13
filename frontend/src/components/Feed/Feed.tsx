import React, { useState, useEffect } from 'react';

import AvatarEditor from 'react-avatar-editor'
import './Feed.scss';
import Post from '../Post/Post';
import CreatePost from '../CreatePost/CreatePost';
import ImageUploader from '../ImageUploader/ImageUploader';
import Button from '@mui/material/Button';

interface FeedProps {
  photoUrl: string;
  username: string | null;
}

function Feed({photoUrl, username}: FeedProps): React.ReactElement {
  const [posts, setPosts] = useState([]);
  const [showImageUploader, setShowImageUploader] = useState(false)
  const [image, setImage] = React.useState(null);


  return (
    <div className='feed'>
                <ImageUploader show={showImageUploader} setShow={setShowImageUploader} imageUrl={photoUrl} aspectRatio={4 / 3} destinationFolder={'lol'} />
              <CreatePost photoUrl={photoUrl} username={username} />
        <Post
          key={1}
          username={'spyross'}
          profilePic={'http://localhost:5112/ProfilePic/64900b40-9225-4d2c-a6f7-950b807c2f4d.png'}
          text={'Hello'}
          image={'http://localhost:5112/ProfilePic/64900b40-9225-4d2c-a6f7-950b807c2f4d.png'}
          timestamp={String(new Date().getTime())}
        />
      {posts.map(() => (
        <Post
          key={1}
          username={'spyross'}
          profilePic={'http://localhost:5112/ProfilePic/64900b40-9225-4d2c-a6f7-950b807c2f4d.png'}
          text={'Hello'}
          image={'http://localhost:5112/ProfilePic/64900b40-9225-4d2c-a6f7-950b807c2f4d.png'}
          timestamp={String(new Date().getTime())}
        />
      ))}
    </div>
  );
}

export default Feed;