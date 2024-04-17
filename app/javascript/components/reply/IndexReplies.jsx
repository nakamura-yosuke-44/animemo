import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaReply } from 'react-icons/fa';
import DeleteReply from './DeleteReply';
import PostReply from './PostReply';
import CheckCurrentUser from '../../CheckCurrentUser';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function IndexReplies({ comment = {} }) {
  const [showModal, setShowModal] = useState(false);
  const [replies, setReplies] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchReplies = async () => {
    try {
      const response = await axios.get(`/api/comments/${comment.id}/replies`);
      const { data } = response;
      setReplies(data);
    } catch (error) {
      console.error('Error fetching replies:', error);
      alert(error.response.data);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  const reloadReplies = () => {
    fetchReplies();
  };

  return (
    <div>
      <CheckCurrentUser setCurrentUser={setCurrentUser} />
      <div className="ml-4 flex">
        <button type="button" onClick={() => setShowModal(true)}>
          <FaReply />
        </button>
        {replies && <p className="ml-1">{replies.length}</p>}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex size-full max-w-md flex-col rounded-lg bg-white p-8">
            <button type="button" className="btn btn-circle btn-sm absolute right-0 top-0 mr-2 mt-2" onClick={() => setShowModal(false)}>✕</button>
            <div className="flex">
              <p className="flex-none">返信一覧</p>
              <PostReply comment={comment} reloadReplies={reloadReplies} />
            </div>
            <div className="overflow-y-auto">
              {replies && replies.length > 0 ? (
                replies.map((reply) => (
                  <div key={reply.id}>
                    <div className="flex min-w-96 justify-start p-1">
                      <div className="flex justify-center">
                        <img src={reply.user && reply.user.profile.avatar?.url} alt="Avatar" className="size-12 rounded-full object-cover" />
                      </div>
                      <div className="min-w-72">
                        <div className="flex-1">
                          <p className="w-full pl-2"><a href={`/profiles/${reply.user.name}`}>{reply.user.name}</a></p>
                          {currentUser.id === reply.user_id ? (
                            <p className="max-w-72 rounded-md  bg-yellow-300 pl-2">
                              {reply.body}
                            </p>
                          ) : (
                            <p className="max-w-72 rounded-md  bg-green-300 pl-2">
                              {reply.body}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end">
                      {currentUser && currentUser.id === reply.user_id && (
                        <div className="mr-4">
                          <DeleteReply reply={reply} reloadReplies={reloadReplies} />
                        </div>
                      )}
                      <p className="mr-12 flex-none text-xs">{(reply.created_at).split('T')[0]}</p>
                    </div>

                  </div>
                ))
              ) : (
                '返信はありません'
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

IndexReplies.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string,
    user_id: PropTypes.number.isRequired,
    post_id: PropTypes.number.isRequired,
  }),
};

export default IndexReplies;
