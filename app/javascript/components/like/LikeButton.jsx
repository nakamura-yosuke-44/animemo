import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const LikeButton = ({ postId, currentUser, reloadPosts }) => {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.likes) {
      setLiked(currentUser.likes.includes(postId));
    }
  }, [currentUser, postId]);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (liked) {
        await axios.delete(`/api/likes/${postId}`);
      } else {
        await axios.post(`/api/likes`, { post_id: postId });
      }
      setLiked(!liked);
      reloadPosts(); // ポストの再読み込み
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {liked ? <FcLikePlaceholder onClick={handleLike} /> : <FcLike onClick={handleLike} />}
  </>
  );
};

export default LikeButton;