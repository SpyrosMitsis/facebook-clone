import React, { SyntheticEvent, useEffect, useState } from 'react';
import { ChatBubbleOutlineRounded as ChatBubbleOutlineRoundedIcon, NearMeRounded as NearMeRoundedIcon, ThumbUpRounded as ThumbUpRoundedIcon } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';

import './Post.scss';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import axios from '../../api/axios';
import PostAction from '../PostAction/PostAction';
import CreateComment from '../Comment/Comment';

interface PostProps {
  id: number;
  profilePic: string;
  username: string;
  userId: number;
  text: string;
  timestamp: string;
  image: string;
  currentUserProfilePic: string;
  currentUserId: number;
}

interface Comment {
  id: number;
  content: string;
  timestamp: string;
  user: {
    id: number;
    firstName: string;
    surname: string;
    profilePicName: string;
  }
}

interface Like {
  id: number;
  userId: number;
  postId: number;
  timeStamp: string;
}

function Post(props: PostProps): React.ReactElement {
  const { profilePic, username, text, timestamp, image } = props;

  const [showCommentSection, setShowCommentSection] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);




  const GET_COMMENTS = `Post/comment/${props.id}/`;
  const POST_COMMENT = 'Post/makeComment';
  const GET_LIKES = `Post/likes/${props.id}`

  const handleCommentClick = async (e: SyntheticEvent) => {

    setShowCommentSection(!showCommentSection);
    if (!showCommentSection) {
      try {
        const response = await axios.get(GET_COMMENTS, {
        });
        setComments(response.data);
        console.log(response.data)
      } catch (error) {

        console.error("There was an error!", error);
      }
    }
  }
  const handleLikeClick = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'timestamp': new Date().toISOString(),
        },
      };

      const payload = {
        timeStamp: new Date().toISOString(),
        postId: props.id,
        userId: props.currentUserId,
      };

      if (isLiked) {
        // Unlike (DELETE request)
        await axios.delete(`Post/deleteLike/${props.currentUserId}?PostId=${props.id}`);
        setLikes((prevLikes) => Math.max(0, prevLikes - 1));
      } else {
        // Like (POST request)
        await axios.post(`Post/makeLike`, payload, config);
        setLikes((prevLikes) => prevLikes + 1);
      }

      // Toggle the like status
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };




  const updateComments = (newComment: Comment) => {
    // Update the comments state with the new comment
    setComments((prevComments) => [...prevComments, newComment]);
  };

  useEffect(() => {
    axios.get(GET_LIKES)
      .then(response => {
        setLikes(response.data.length)
        response.data.forEach((like: Like) => {
          if (like.userId === props.currentUserId) {
            setIsLiked(true)
          }
        });
      })
      .catch(error => {
        // Handle errors here
        console.error('Error fetching friends:', error);
      });

  }, [])

  return (
    <div className='post'>
      <div className='top'>
        <Avatar src={profilePic} />
        <div className='info'>
          <a href={`http://localhost:5173/Profile/${props.userId}`} style={{ color: 'black', textDecoration: 'none' }}>
            {username}
          </a>
          <span> {timestamp}</span>
        </div>
      </div>
      {text && (
        <div className='text'>
          <p>{text}</p>
        </div>
      )}
      {image && (
        <div className='image'>
          <img src={image} alt='Post Image' />
        </div>
      )}
      <div className='bottomAction'>
        <div className='likeCount'> {likes} Likes </div>
        <div className={`action ${isLiked ? 'liked' : ''}`} onClick={handleLikeClick}>
          <ThumbUpRoundedIcon className={`postAction ${isLiked ? 'blue' : ''}`} />
          <h4 style={{ color: isLiked ? '#2d88ff' : '' }}>Like</h4>
        </div>

        <div className={`action ${showCommentSection ? 'blue' : ''}`} onClick={handleCommentClick}>
          <ChatBubbleOutlineRoundedIcon className={`postAction ${showCommentSection ? 'blue' : ''}`} />
          <h4 style={{ color: showCommentSection ? '#2d88ff' : '' }}>Comment</h4>
        </div>
      </div>
      {showCommentSection && (
        <div className='commentSection'>
          <List>
            {comments.map((comment) => (
              <ListItem key={comment.id}>
                <ListItemAvatar>
                  {comment.user && comment.user.profilePicName ? (
                    <Avatar src={`http://localhost:5112/Media/ProfilePics/${comment.user.profilePicName}`} />
                  ) : (
                    <Avatar />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={comment.user?.firstName && comment.user?.surname ? `${comment.user.firstName} ${comment.user.surname}` : 'Unknown User'}
                  secondary={comment.content}
                />
              </ListItem>
            ))}
          </List>
          <div>
            <CreateComment
              photoUrl={props.currentUserProfilePic}
              userId={props.currentUserId}
              postId={props.id}
              updateComments={updateComments}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
