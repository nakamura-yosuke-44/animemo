import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiFillEdit } from 'react-icons/ai';
import axios from 'axios';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function PostUpdateItem({ post = null, setUserPosts = () => {} }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('post[shop_id]', post.shop_id);
      formData.append('post[title]', title);
      formData.append('post[body]', body);
      if (image) {
        formData.append('post[image]', image);
      }

      await axios.put(`/api/posts/${post.id}`, formData);
      const response = await axios.get(`/api/shops/${post.shop_id}`);
      const orderPosts = response.data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setUserPosts(orderPosts);
      setShowModal(false);
      alert('更新しました');
    } catch (error) {
      console.error('エラー:', error);
      alert(error.response.data);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const adjustTextareaHeight = () => {
    const textarea = document.getElementById('body');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div>
      <AiFillEdit onClick={() => setShowModal(true)} />
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex max-h-full max-w-sm flex-col rounded-lg bg-white p-8">
            <button type="button" className="btn btn-circle btn-sm absolute right-0 top-0 mr-2 mt-2" onClick={() => setShowModal(false)}>✕</button>
            <form className="flex flex-1 flex-col" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block">タイトル</label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full rounded-md border border-black p-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="body" className="block">内容</label>
                <textarea id="body" value={body} onChange={(e) => { setBody(e.target.value); adjustTextareaHeight(); }} className="block w-full resize-none rounded-md border border-black p-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="mt-2 block">画像を選択:</label>
                <input id="image" type="file" onChange={handleImageChange} className="block w-full rounded-md border border-black p-2" />
              </div>
              <div className="max-w-sm">
                {preview && <img src={preview} alt="画像プレビュー" />}
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

PostUpdateItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    shop_id: PropTypes.number.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }).isRequired,
  }).isRequired,
  setUserPosts: PropTypes.func.isRequired,
};

export default PostUpdateItem;
