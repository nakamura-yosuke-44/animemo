import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CheckCurrentUser from '../../CheckCurrentUser';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function PostReply({comment={}, reloadReplies = () => {}}) {
  const [showModal, setShowModal] = useState(false);
  const [body, setBody] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('reply[post_id]', comment.post_id);
      formData.append('reply[parent_id]', comment.id);
      formData.append('reply[body]', body);
      await axios.post(`/api/comments/${comment.id}/replies`, formData);
      reloadReplies();
      setShowModal(false);
      alert('リプライしました');
      setBody('');
    } catch (error) {
      console.error('エラー:', error);
      alert(error.response.data.error);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = document.getElementById('body');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <>
      <CheckCurrentUser setCurrentUser={setCurrentUser} />
      {currentUser && ( 
        <div>
          <button type="button" className="ml-3 rounded bg-blue-500 p-1 text-xs font-bold text-white hover:bg-blue-700" onClick={() => setShowModal(true)}>
            返信する
          </button>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative flex w-96 max-h-full max-w-sm flex-col rounded-lg bg-white p-8 border-4">
                <button type="button" className="btn btn-circle btn-sm absolute right-0 top-0 mr-2 mt-2" onClick={() => setShowModal(false)}>✕</button>
                <form className="flex flex-1 flex-col " onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <textarea id="body" value={body} onChange={(e) => { setBody(e.target.value); adjustTextareaHeight(); }} className="block w-full resize-none rounded-md border border-black p-2" />
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="btn btn-accent">送信</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default PostReply;