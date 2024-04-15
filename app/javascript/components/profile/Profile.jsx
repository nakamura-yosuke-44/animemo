import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ProfileModal from './ProfileModal';
import CheckCurrentUser from '../../CheckCurrentUser';
import UserPosts from '../post/UserPosts';

function Profile({ userName = '' }) {
  const [profile, setProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`/api/profiles/${userName}`);
      setProfile(res.data.profile);
    } catch (error) {
      alert('プロフィールはありません');
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <CheckCurrentUser setCurrentUser={setCurrentUser} />
      <div className="m-4">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <div className="flex min-w-96 flex-col justify-start p-4">
            <div className="flex items-center justify-center">
              <img src={profile && profile.avatar?.url} alt="Avatar" className="size-36 rounded-full object-cover" />
            </div>
            <div className="min-w-80">
              <div className="items-cente flex-1">
                <p>名前</p>
                <p className="w-full rounded-md border border-black bg-white pl-2">{userName}</p>
              </div>
              <div className="mt-4">
                <p>自己紹介</p>
                <p className="min-h-48 rounded-md border border-black bg-white pl-2">
                  {profile && profile.bio ? profile.bio : ''}
                </p>
              </div>
              <div className="flex items-center justify-end">
                {currentUser && (currentUser.id === profile?.user_id)
                    && <ProfileModal userName={userName} setProfile={setProfile} profile={profile} />}
              </div>
            </div>
          </div>
          <UserPosts userName={userName} />
        </div>
      </div>
    </>
  );
}

Profile.propTypes = {
  userName: PropTypes.string,
};

export default Profile;
