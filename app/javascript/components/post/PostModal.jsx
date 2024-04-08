import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function PostModal({ shopId = '', setUserPosts }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('post[shop_id]', shopId);
      formData.append('post[title]', title);
      formData.append('post[body]', body);
      if (image) {
        formData.append('post[image]', image);
      }

      await axios.post('/api/posts', formData);
      const response = await axios.get(`/api/shops/${shopId}`);
      const orderPosts = response.data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setUserPosts(orderPosts);
      setShowModal(false);
      alert('投稿しました');
      setTitle('');
      setBody('');
      setImage('');
    } catch (error) {
      console.error('エラー:', error);
      alert('入力項目が不足しています。');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div>
      <button type="button" className="ml-3 rounded bg-blue-500 p-1 text-xs font-bold text-white hover:bg-blue-700" onClick={() => setShowModal(true)}>
        投稿する
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex h-1/2 w-2/3 flex-col rounded-lg bg-white p-8">
            <button type="button" className="btn btn-circle btn-sm absolute right-0 top-0 mr-2 mt-2" onClick={() => setShowModal(false)}>✕</button>
            <form className="flex flex-1 flex-col " onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block">タイトル</label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full rounded-md border border-black p-2" />
              </div>
              <div className="flex flex-1 flex-col">
                <label htmlFor="body" className="block">内容</label>
                <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} className="block flex-1 rounded-md border border-black p-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="mt-2 block">画像を選択:</label>
                <input id="image" type="file" onChange={handleImageChange} className="block w-full rounded-md border border-black p-2" />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn btn-accent">投稿</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

PostModal.propTypes = {
  shopId: PropTypes.string,
  setUserPosts: PropTypes.func,
};

export default PostModal;
