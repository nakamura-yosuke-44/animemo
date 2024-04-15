import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PostDeleteItem from './PostDeleteItem';
import PostUpdateItem from './PostUpdateItem';
import LikeButton from '../like/LikeButton';
import axios from 'axios';
import PostModal from './PostModal';
import PostBodyModal from './PostBodyModal';

function ShopPosts({ userPosts = [], setUserPosts = () => {}, currentUser= null, shopId=null }) {
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/shops/${shopId}`);
      const orderPosts = response.data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setUserPosts(orderPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
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
      <div className="flex pl-10 pt-10">
        <div className="text-xl">みんなの投稿</div>
        {currentUser && <PostModal reloadPosts={reloadPosts} shopId={shopId} />}
      </div>
      {userPosts && userPosts.length > 0 ? (         
        <div className="mx-2 mt-12 ">
          <div className='w-full flex'>
            <div className="flex-auto grid grid-cols-1 sm:grid-cols-3 gap-6 place-items-center">
              {userPosts.map((post) => (
                <div className="card max-w-xs sm:max-w-sm bg-base-100" key={post.id}>
                  <figure><img src={post.image.url} /></figure>
                  <div className="card-body">
                    <div className="card-title">{post.title}</div>
                    <PostBodyModal post={post} />
                    <div className='flex'>
                      <img src={post.user.profile && post.user.profile.avatar.url } alt="Avatar" className="object-cover w-12 h-12 rounded-full" />
                      <p className='ml-2 flex justify-start items-center'>{post.user.name}</p>
                    </div>
                    <p>{(post.created_at).split('T')[0]}</p>
                    <div className='flex items-center justify-end'>
                      { currentUser && currentUser.id === post.user_id && (
                        <>
                          <div className="mx-4">
                            <PostUpdateItem post={post} setUserPosts={setUserPosts} />
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
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        ) : (
         <p className='pl-10 pt-5'>投稿はまだありません</p>
        )
      }
    </>
  );
}


ShopPosts.propTypes = {
  userPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      user_id: PropTypes.number.isRequired,
      image: PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  setUserPosts: PropTypes.func,
};

export default ShopPosts;