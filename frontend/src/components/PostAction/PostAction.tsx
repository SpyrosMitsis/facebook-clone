import React from 'react';
import './PostAction.scss'

interface PostActionProps {
  Icon: any; // Consider using a specific type instead of any for better type safety
  title: string;
  color: string;
  onActionClick?: () => void; // Optional callback function prop
}

function PostAction(props: PostActionProps): React.ReactElement {
  const { Icon, title, color, onActionClick } = props;

  // The click handler for the PostAction component
  const handleClick = () => {
    if (onActionClick) {
      onActionClick();
    }
  };

  return (
    <div className='actions' onClick={handleClick}>
      <Icon style={{ color: color }} />
      <h5>{title}</h5>
    </div>
  );
}

export default PostAction;
