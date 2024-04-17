import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function FollowButton({ userName=null, currentUser=null, reloadProfile= () => {} }) {
  const [follow, setFollow] = useState(false)
  useEffect(() => {
    if (currentUser && currentUser.followings) {
      setFollow(currentUser.followings.some((follow) => follow.name === userName));
    }
  }, []);

  const handleFollow = async () => {
    try {
      if (follow) {
        const response = await axios.delete(`/api/profiles/${userName}/relationships`);
        alert(response.data.message)
      } else {
        const response = await axios.post(`/api/profiles/${userName}/relationships`);
        alert(response.data.message)
      }
      setFollow(!follow);
      reloadProfile();
    } catch (error) {
      console.error('Error following user:', error);
      alert(error.response.data);
    } 
  };

  return (
    <div className="flex items-center mt-3">
      {follow ? 
        <button className="btn btn-sm btn-primary" onClick={handleFollow} >フォロー中</button> 
        : 
        <button className="btn btn-sm" onClick={handleFollow} >フォロー</button> 
      }
    </div>
  );
}

export default FollowButton;
