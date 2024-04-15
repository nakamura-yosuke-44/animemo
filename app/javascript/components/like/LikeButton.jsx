import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const LikeButton = ({ post, currentUser, reloadPosts }) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (currentUser && currentUser.likes) {
      setLiked(currentUser.likes.some((like) => like.post_id === post.id));
    }
  }, []);
  
  const handleLike = async () => {
    try {
      if (liked) {
        await axios.delete(`/api/likes/${post.id}`);
      } else {
        await axios.post(`/api/likes`, { postId: post.id });
      }
      setLiked(!liked);
      reloadPosts();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className='flex items-center'>
      <p className='mx-1'>
        {liked ? <FcLike onClick={handleLike} /> : <FcLikePlaceholder onClick={handleLike} />}
      </p>
      <p>
        {post.likes ? post.likes.length : 0}
      </p>
    </div>
  );
};

export default LikeButton;