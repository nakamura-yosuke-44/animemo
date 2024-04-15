import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileModal from './ProfileModal';
import CheckCurrentUser from '../../CheckCurrentUser';
import UserPosts from '../post/UserPosts';
import PostUpdateItem from '../post/PostUpdateItem';
import PostDeleteItem from '../post/PostDeleteItem';


function Profile({userName=''}) {
  useEffect(() => {
    fetchProfile();
  }, []);
  const [profile, setProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`/api/profiles/${userName}`);
      const profile = res.data.profile;
      console.log(res.data)
      setProfile(profile);
      const response = await axios.get(`/api/profiles/${userName}/posts`);
    } catch (error) {
      alert('プロフィール情報を確認できませんでした')
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <>
      <CheckCurrentUser setCurrentUser={setCurrentUser} />
      <div className="m-4">
        <div className="container mx-auto flex flex-col justify-center items-center">
            <div className='p-4 flex flex-col justify-start min-w-96'>
              <div className='flex justify-center items-center'>
                <img src={profile && profile.avatar.url } alt="Avatar" className="object-cover w-36 h-36 rounded-full" />
              </div>
              <div className='min-w-80'>
                <div className='flex-1 items-cente'>
                  <p>名前</p>
                  <p className='bg-white w-full border border-black rounded-md pl-2'>{userName}</p>
                </div>
                <div className='mt-4'>
                  <p>自己紹介</p>
                  <p className='bg-white min-h-48 border border-black rounded-md pl-2'>{profile && profile.bio || ''}</p>
                </div>
                <div className='flex justify-end items-center'>
                  {currentUser && currentUser.id === profile?.user_id &&
                    <ProfileModal userName={userName} setProfile={setProfile} profile={profile} />
                  }
                </div>
              </div>
            </div>
            <UserPosts userName={userName} />
        </div>
      </div>
    </>
  );
}

export default Profile;