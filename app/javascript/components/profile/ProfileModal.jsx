import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function ProfileModal({ userName = '', profile = { avatar: null, bio: null }, setProfile = () => {} }) {
  const [showModal, setShowModal] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState(profile.bio);
  const [preview, setPreview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('profile[bio]', bio);
      if (avatar) {
        formData.append('profile[avatar]', avatar);
      }
      const response = await axios.put(`/api/profiles/${userName}`, formData);
      console.log(response)
      setProfile(response.data.profile);
      alert(response.data.message);
      setShowModal(false);
    } catch (error) {
      console.error('Error update profile:', error);
      alert(error.response.data);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const adjustTextareaHeight = () => {
    const textarea = document.getElementById('bio');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="mt-2">
      <button type="button" className="ml-3 rounded bg-blue-500 p-1 text-xs font-bold text-white hover:bg-blue-700" onClick={() => setShowModal(true)}>
        プロフィール編集
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex max-h-full max-w-sm flex-col rounded-lg bg-white p-8">
            <button type="button" className="btn btn-circle btn-sm absolute right-0 top-0 mr-2 mt-2" onClick={() => setShowModal(false)}>✕</button>
            <form className="flex flex-1 flex-col " onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="bio" className="block">自己紹介</label>
                <textarea id="bio" value={bio} onChange={(e) => { e.target.value ? setBio(e.target.value) : setBio(''); adjustTextareaHeight(); }} className="block w-full resize-none rounded-md border border-black p-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="avatar" className="mt-2 block">アバターを選択:</label>
                <input id="avatar" type="file" onChange={handleAvatarChange} className="block w-full rounded-md border border-black p-2" />
              </div>
              <div className="max-w-sm">
                {preview && <img src={preview} alt="画像プレビュー" className="size-36 rounded-full object-cover" />}
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
  userName: PropTypes.string,
  profile: PropTypes.shape({
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
    bio: PropTypes.string,
  }),
};

export default ProfileModal;
