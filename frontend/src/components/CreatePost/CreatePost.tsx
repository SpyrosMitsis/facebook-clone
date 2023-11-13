import React, { ChangeEvent, SyntheticEvent, useState, useRef } from 'react';
import {
  InsertEmoticonOutlinedIcon,
  PhotoLibraryRoundedIcon,
  VideocamRoundedIcon,
  SendRoundedIcon
} from '../../utils/icons';

import './CreatePost.scss';
import PostAction from '../PostAction/PostAction';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

interface CreatePostProps {
  photoUrl?: string;
  username: string | null;
}

function CreatePost({ photoUrl, username }: CreatePostProps): React.ReactElement {
  const [input, setInput] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setImgUrl(imageDataUrl); // Set the thumbnail image data URL
      };

      reader.readAsDataURL(file);
    }
  };

  const handlePhotoVideoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setInput('');
    setImgUrl('');
  };

  return (
    <div className='createPost'>
      <div className='top'>
        <Avatar src={photoUrl} />
        <form className='form'>
          <input
            className='textInput'
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`What's on your mind, ${username}?`}
          />
          <IconButton className='button' type='submit' onClick={handleSubmit}>
            <SendRoundedIcon color='primary' />
          </IconButton>
        </form>
      </div>
      {imgUrl && <img  className='ImageThumbnail' src={imgUrl} alt="Thumbnail" />} {/* Display the thumbnail */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*"
      />
      <div className="bottom">
        <PostAction
          Icon={PhotoLibraryRoundedIcon}
          title="Photo/Video"
          color="green"
          onActionClick={handlePhotoVideoUpload} // Passing the callback to PostAction
        />
      </div>
    </div>

  );
}

export default CreatePost;

const bottomIcon = [
  {
    Icon: PhotoLibraryRoundedIcon,
    title: 'Photo/Video',
    color: 'green'
  },
  {
    Icon: InsertEmoticonOutlinedIcon,
    title: 'Feeling/Activity',
    color: 'orange'
  }
];
