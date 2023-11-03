import React, { useState, useEffect } from 'react';

import './Feed.scss';
import Post from '../Post/Post';

interface FeedProps {
  photoUrl?: string;
  username: string | null;
}

function Feed({photoUrl, username}: FeedProps): React.ReactElement {
  const [posts, setPosts] = useState([]);


  return (
    <div className='feed'>
        <Post
          key={1}
          username={'spyross'}
          profilePic={'http://localhost:5112/ProfilePic/64900b40-9225-4d2c-a6f7-950b807c2f4d.png'}
          text={'Hello'}
          image={'http://localhost:5112/ProfilePic/64900b40-9225-4d2c-a6f7-950b807c2f4d.png'}
          timestamp={String(new Date().getTime())}
        />
    </div>
  );
}

export default Feed;