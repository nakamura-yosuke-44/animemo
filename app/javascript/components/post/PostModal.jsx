import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function PostModal({ shopId = '', reloadPosts=() => {} }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('')

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
      reloadPosts();
      setShowModal(false);
      alert('投稿しました');
      setTitle('');
      setBody('');
      setImage('');
    } catch (error) {
      console.error('エラー:', error);
      alert(error.response.data);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file))
  };

  const adjustTextareaHeight = () => {
    const textarea = document.getElementById('body');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div>
      <button type="button" className="ml-3 rounded bg-blue-500 p-1 text-xs font-bold text-white hover:bg-blue-700" onClick={() => setShowModal(true)}>
        投稿する
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex max-h-full max-w-sm flex-col rounded-lg bg-white p-8">
            <button type="button" className="btn btn-circle btn-sm absolute right-0 top-0 mr-2 mt-2" onClick={() => setShowModal(false)}>✕</button>
            <form className="flex flex-1 flex-col " onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block">タイトル</label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full rounded-md border border-black p-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="body" className="block">内容</label>
                <textarea id="body" value={body} onChange={(e) => { setBody(e.target.value); adjustTextareaHeight(); }} className="block w-full rounded-md border border-black p-2 resize-none" />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="mt-2 block">画像を選択:</label>
                <input id="image" type="file" onChange={handleImageChange} className="block w-full rounded-md border border-black p-2" />
              </div>
              <div className='max-w-sm'>
                {preview && <img src={preview} alt="画像プレビュー" />}
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
