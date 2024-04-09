import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function ProfileModal({ profile = { avatar: null, bio: null }, setProfile = () => {} }) {
  const [showModal, setShowModal] = useState(false);
  const [avatar, setAvatar] = useState(profile?.avatar);
  const [bio, setBio] = useState(profile?.bio);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('profile[avatar]', avatar);
      formData.append('profile[bio]', bio);

      const response = await axios.put(`/api/profiles/${profile.id}`, formData);
      setProfile(response.data);
      setShowModal(false);
      alert('プロフィールを更新しました');
      setAvatar('');
      setBio('');
    } catch (error) {
      console.error('エラー:', error);
      alert('入力項目が不足しています。');
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div>
      <button type="button" className=" rounded bg-blue-500 p-1 text-xs font-bold text-white hover:bg-blue-700" onClick={() => setShowModal(true)}>
        プロフィール編集
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex h-1/2 w-2/3 flex-col rounded-lg bg-white p-8">
            <button type="button" className="btn btn-circle btn-sm absolute right-0 top-0 mr-2 mt-2" onClick={() => setShowModal(false)}>✕</button>
            <form className="flex flex-1 flex-col " onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="avatar" className="mt-2 block">アバターを選択:</label>
                <input id="avatar" type="file" onChange={handleAvatarChange} className="block w-full rounded-md border border-black p-2" />
              </div>
              <div className="mb-4 ">
                <label htmlFor="bio" className="block">自己紹介</label>
                <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="block flex-1 rounded-md border border-black p-2" />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn btn-accent">更新</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

ProfileModal.propTypes = {
  setProfile: PropTypes.func,
};

export default ProfileModal;
