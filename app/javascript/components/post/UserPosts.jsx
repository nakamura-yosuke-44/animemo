import React, { useState } from 'react';
import PostModal from './PostModal';
import PropTypes from 'prop-types';

function UserPosts({ userPosts=nill, setUserPosts= () => {}, shopId=nill }) {
  return (
    <>
      <div className='flex pt-10 pl-10'>
        <div className='text-xl'>みんなの投稿</div>
        <PostModal setUserPosts={setUserPosts} shopId={shopId} />
      </div>
      <div className='mt-12 flex justify-center items-center mx-4'>
        <div>
          <div className=' border-blackflex flex-col items-center justify-center sm:text-base '>
            {userPosts.map(post => (
              <div className="card w-96 bg-base-100 shadow-xl my-4">
              <figure><img src={post.image.url}/></figure>
              <div className="card-body">
                <div className="card-title">{post.title}</div>
                <p>{post.body}</p>
                <p>by {post.user.name}</p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserPosts;
