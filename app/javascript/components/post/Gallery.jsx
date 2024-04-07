import React from 'react';
import PropTypes from 'prop-types';

function Gallery({ userPosts }) {
  console.log(userPosts);
  return (
    <div className="mt-12">
      <div className="mb-5 mt-4 text-center text-xl">写真ギャラリー</div>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {userPosts.map((post) => (
          <div key={`post_${post.id}`}>
            <div>
              <img src={post.image.url} alt={`Image ${post.id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Gallery.propTypes = {
  userPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      user_id: PropTypes.number.isRequired,
      shop_id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ),
};

export default Gallery;
