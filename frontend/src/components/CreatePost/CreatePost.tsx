import React, { ChangeEvent, useState, useRef } from 'react';
import { SendRounded as SendRoundedIcon, PhotoLibraryRounded as PhotoLibraryRoundedIcon } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import './CreatePost.scss';
import PostAction from '../PostAction/PostAction';
import axios from '../../api/axios';

interface CreatePostProps {
  photoUrl?: string;
  username: string | null;
  userId: number | null;
}

function CreatePost({ photoUrl, username, userId }: CreatePostProps): React.ReactElement {
  const [input, setInput] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData();

    if (fileInputRef.current?.files?.length) {
      formData.append('file', fileInputRef.current.files[0]);
    }

    formData.append('userId', userId?.toString() ?? '');
    formData.append('description', input);

    // Make Axios POST request
    try {
      const response = await axios.post('Post/makePost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='createPost'>
      <div className='top'>
        <Avatar src={photoUrl} />
        <form className='form' onSubmit={handleSubmit}>
          <input
            className='textInput'
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`What's on your mind, ${username}?`}
          />
          <IconButton className='button' type='submit'>
            <SendRoundedIcon color='primary' />
          </IconButton>
        </form>
      </div>
      {imgUrl && <img className='ImageThumbnail' src={imgUrl} alt="Thumbnail" />} {/* Display the thumbnail */}
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
