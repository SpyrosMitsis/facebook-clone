import React, { ChangeEvent, SyntheticEvent, useState, useRef } from 'react';
import {
  InsertEmoticonOutlinedIcon,
  PhotoLibraryRoundedIcon,
  VideocamRoundedIcon,
  SendRoundedIcon
} from '../../utils/icons';

import './Comment.scss';
import PostAction from '../PostAction/PostAction';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import axios from '../../api/axios';

interface CreateCommentProps {
  photoUrl?: string;
  userId: number;
  postId: number;
  updateComments: (newComment: Comment) => void; // Use the renamed type
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


function CreateComment({ photoUrl, userId, postId, updateComments }: CreateCommentProps): React.ReactElement {
  const [content, setContent] = useState<string>('');


  const POST_COMMENT = 'Post/makeComment';

  const handleCommentClick = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post(
        POST_COMMENT,
        {
          userId,
          postId,
          content,
        }
      );

      console.log('Comment posted successfully:', response.data);
      updateComments(response.data);

      setContent('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className='createComment'>
      <div className='top'>
        <Avatar src={photoUrl} />
        <form className='form'>
          <input
            className='textInput'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Make a comment`}
          />
          <IconButton className='button' type='submit' onClick={handleCommentClick}>
            <SendRoundedIcon color='primary' />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default CreateComment;