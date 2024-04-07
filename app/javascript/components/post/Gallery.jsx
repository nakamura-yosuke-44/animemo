import React from 'react';
import PropTypes from 'prop-types';

function Gallery({ userPosts }) {
  console.log(userPosts)
  return (
    <div className='mt-12'>
      <div className='mt-4 mb-5 text-xl text-center'>写真ギャラリー</div>
      <div className='grid grid-cols-3 sm:grid-cols-4 gap-4'>
        {userPosts.map(post => (
        <div key={`post_${post.id}`}>
          <div>
            <img src={post.image.url} alt={`Image ${post.id}`} />
          </div>
        </div>
        ))}
       </div>
    </div>
  )
}

export default Gallery;
