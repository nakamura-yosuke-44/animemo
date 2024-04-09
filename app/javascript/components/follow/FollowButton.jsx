// FollowButton.js
import React, { useState } from 'react';
import axios from 'axios';

const FollowButton = ({ user, currentUser, reloadUser }) => {
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      if (!currentUser || !currentUser.following || !user || !user.id) {
        console.error('Error: currentUser.following or user.id is undefined');
        return;
      }
      
      await axios.post('/relationships', { followed_id: user.id });
      reloadUser(); // ユーザー情報の再読み込み
    } catch (error) {
      console.error('Error following user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setLoading(true);
    try {
      if (!currentUser || !currentUser.following || !user || !user.relationship_id) {
        console.error('Error: currentUser.following or user.relationship_id is undefined');
        return;
      }
      
      await axios.delete(`/relationships/${user.relationship_id}`);
      reloadUser(); // ユーザー情報の再読み込み
    } catch (error) {
      console.error('Error unfollowing user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button disabled={loading} onClick={currentUser && currentUser.following && user && user.id ?
        (currentUser.following.includes(user.id) ? handleUnfollow : handleFollow) : null}>
        {loading ? 'Loading...' : (currentUser && currentUser.following && user && user.id ?
          (currentUser.following.includes(user.id) ? 'Unfollow' : 'Follow') : 'Loading...')}
      </button>
    </div>
  );
};

export default FollowButton;
