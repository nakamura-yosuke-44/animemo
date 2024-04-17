import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function FollowButton({ userName = null, currentUser = null, reloadProfile = () => {} }) {
  const [follow, setFollow] = useState(false);
  useEffect(() => {
    if (currentUser && currentUser.followings) {
      setFollow(currentUser.followings.some((follow) => follow.name === userName));
    }
  }, []);

  const handleFollow = async () => {
    try {
      if (follow) {
        const response = await axios.delete(`/api/profiles/${userName}/relationships`);
        alert(response.data.message);
      } else {
        const response = await axios.post(`/api/profiles/${userName}/relationships`);
        alert(response.data.message);
      }
      setFollow(!follow);
      reloadProfile();
    } catch (error) {
      console.error('Error following user:', error);
      alert(error.response.data);
    }
  };

  return (
    <div className="mt-3 flex items-center">
      {follow
        ? <button type="button" className="btn btn-primary btn-sm" onClick={handleFollow}>フォロー中</button>
        : <button type="button" className="btn btn-sm" onClick={handleFollow}>フォロー</button>}
    </div>
  );
}

FollowButton.propTypes = {
  userName: PropTypes.string,
  reloadProfile: PropTypes.func,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

export default FollowButton;
