import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PostModal from './PostModal';
import CheckCurrentUser from '../../CheckCurrentUser';
import PostDeleteItem from './PostDeleteItem';
import PostUpdateItem from './PostUpdateItem';
import LikeButton from '../like/LikeButton';
import axios from 'axios';


function UserPosts({ userPosts = null, setUserPosts = () => {}, shopId = null }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/current_user');
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setUserPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const reloadPosts = () => {
    // ポスト情報を再読み込み
    fetchPosts();
  };

  // currentUser オブジェクトが存在しない場合、または currentUser.following が存在しない場合は空の配列を代入する
  const followingIds = currentUser?.following || [];

  // 以下のコンポーネントの JSX を currentUser オブジェクトが存在することが保証された後に実行する
  return (
    <>
      <CheckCurrentUser setCurrentUser={setCurrentUser} />
      <div className="flex pl-10 pt-10">
        <div className="text-xl">みんなの投稿</div>
        {currentUser && <PostModal setUserPosts={setUserPosts} shopId={shopId} />}
      </div>
      <div className="mx-4 mt-12 flex items-center justify-center">
        <div>
          <div className=" border-blackflex flex-col items-center justify-center sm:text-base ">
            {userPosts.map((post) => (
              <div className="card my-4 w-96 bg-base-100 shadow-xl" key={post.id}>
                <figure><img src={post.image.url} /></figure>
                <div className="card-body">
                  <div className="card-title">{post.title}</div>
                  <p>{post.body}</p>
                  <div className='flex'>
                  <p>
                    by
                    {' '}
                    {post.user.name}
                  </p>
                  {currentUser &&  <LikeButton postId={post.id} currentUser={currentUser} reloadPosts={reloadPosts} />}
                  </div>
                  <div>
                    { currentUser && currentUser.id === post.user.id
                    && (
                    <div className="flex justify-end">
                      <div className="mx-3">
                        <PostDeleteItem post={post} setUserPosts={setUserPosts} />
                      </div>
                      <div className="mx-3">
                        <PostUpdateItem post={post} setUserPosts={setUserPosts} />
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


UserPosts.propTypes = {
  userPosts: PropTypes.arrayOf(
    PropTypes.shape({
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
  ).isRequired,
  setUserPosts: PropTypes.func,
  shopId: PropTypes.string,
};

export default UserPosts;