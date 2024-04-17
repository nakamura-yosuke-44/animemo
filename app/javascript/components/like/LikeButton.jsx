import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import PropTypes from 'prop-types';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function LikeButton({ post = null, currentUser = null, reloadPosts = () => {} }) {
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
        await axios.post('/api/likes', { postId: post.id });
      }
      setLiked(!liked);
      reloadPosts();
    } catch (error) {
      console.error('Error handle like:', error);
      alert('更新に失敗しました。');
    }
  };

  return (
    <div className="flex items-center">
      <p className="mx-1">
        {liked ? <FcLike onClick={handleLike} /> : <FcLikePlaceholder onClick={handleLike} />}
      </p>
      <p>
        {post.likes ? post.likes.length : 0}
      </p>
    </div>
  );
}

LikeButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    shop_id: PropTypes.number.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
  }),
  reloadPosts: PropTypes.func,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default LikeButton;
