import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaRegCommentDots } from "react-icons/fa";
import PostComment from './PostComment';
import DeleteComment from './DeleteComment';
import CheckCurrentUser from '../../CheckCurrentUser';
import IndexReplies from '../reply/IndexReplies';


axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function IndexComments({post={}}) {
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState(null);
  const [currentUser, setCurrentUser] = useState(null)
  
  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/`, {
        params: {
          postId: post.id
        }
      });
      const { data } = response;
      const orderComments = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setComments(orderComments);
    } catch (error) {
      console.error('エラー:', error);
      alert(error.response.data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const reloadComments = () => {
    fetchComments();
  };

  return (
    <div>
      <CheckCurrentUser setCurrentUser={setCurrentUser} />
      <div className='flex ml-4'>
        <button type="button" onClick={() => setShowModal(true)}>
          <FaRegCommentDots />
        </button>
        {comments && <p className='ml-1'>{comments.length}</p>}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex h-full w-full max-w-md flex-col rounded-lg bg-white p-8">
            <button type="button" className="btn btn-circle btn-sm absolute right-0 top-0 mr-2 mt-2" onClick={() => setShowModal(false)}>✕</button>
            <div className='flex'>
              <p className='flex-none'>コメント一覧</p>
              <PostComment post={post} reloadComments={reloadComments} />
            </div>
            <div className='overflow-y-auto'>
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id}>
                    <div className="flex min-w-96 justify-start p-1">
                      <div className="flex justify-center">
                        <img src={comment.user && comment.user.profile.avatar?.url} alt="Avatar" className="size-12 rounded-full object-cover" />
                      </div>
                      <div className="min-w-72">
                        <div className="flex-1">
                          <p className="w-full pl-2"><a href={`/profiles/${comment.user.name}`}>{comment.user.name}</a></p>
                          <p className="rounded-md border border-black pl-2 max-w-72">
                            {comment.body}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-end items-center'>
                      <div className="mr-4">
                        <IndexReplies comment={comment} />
                      </div>
                      {currentUser && currentUser.id === comment.user_id && (                      
                        <div className="mr-4">
                          <DeleteComment comment={comment} reloadComments={reloadComments} />
                        </div>
                      )}
                      <p className='flex-none text-xs mr-12'>{(comment.created_at).split('T')[0]}</p>
                    </div>
                      
                  </div>
                ))
              ) : (
                "コメントはありません"
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



export default IndexComments;