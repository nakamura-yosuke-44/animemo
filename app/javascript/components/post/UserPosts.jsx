import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CheckCurrentUser from '../../CheckCurrentUser';
import PostUpdateItem from './PostUpdateItem';
import PostDeleteItem from './PostDeleteItem';
import LikeButton from '../like/LikeButton';
import PostBodyModal from './PostBodyModal';
import IndexComments from '../comment/IndexComments';

function UserPosts({ userName = '' }) {
  const [posts, setPosts] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/profiles/${userName}/posts`);
      const { data } = response;
      const orderPosts = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setPosts(orderPosts);
    } catch (error) {
      alert('投稿情報を取得できませんでした');
      console.error('Error fetching userposts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const reloadPosts = () => {
    fetchPosts();
  };

  return (
    <>
      <CheckCurrentUser setCurrentUser={setCurrentUser} />
      {posts && posts.length > 0 ? (
        <>
          <p className="mt-4 text-xl">
            {userName}
            さんの投稿：
            {posts.length}
            件
          </p>
          <div className="mx-auto mb-3 mt-10 max-w-screen-lg">
            <div className="mx-2 mt-12 ">
              <div className="flex w-full">
                <div className="grid flex-auto grid-cols-1 place-items-center gap-6 sm:grid-cols-3">
                  {posts.map((post) => (
                    <div className="card max-w-xs bg-base-100 sm:max-w-sm" key={post.id}>
                      <figure><img src={post.image.url} alt="投稿写真" /></figure>
                      <div className="card-body">
                        <div className="py-2 text-center text-blue-900 hover:underline"><a href={`/shops/${post.shop?.id}`}>{post.shop?.name}</a></div>
                        <div className="card-title">{post.title}</div>
                        <PostBodyModal post={post} />
                        <p>{(post.created_at).split('T')[0]}</p>
                        <div className="flex items-center justify-end">
                          { currentUser && currentUser.id === post.user_id && (
                            <>
                              <div className="mx-4">
                                <PostUpdateItem post={post} setUserPosts={setPosts} />
                              </div>
                              <div className="mx-4">
                                <PostDeleteItem post={post} reloadPosts={reloadPosts} />
                              </div>
                            </>
                          )}
                          {
                            currentUser && (
                              <div>
                                <LikeButton post={post} currentUser={currentUser} reloadPosts={reloadPosts} />
                              </div>
                            )
                          }
                          <IndexComments post={post} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>投稿はありません</p>
      )}
    </>
  );
}

UserPosts.propTypes = {
  userName: PropTypes.string,
};

export default UserPosts;
