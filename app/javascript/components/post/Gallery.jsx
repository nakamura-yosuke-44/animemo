import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageModal from './ImageModal';

function Gallery({ userPosts }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  return (
    <div className="mt-12">
      {showModal && selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setShowModal(false)} />
      )}
      <div className="mb-5 mt-4 text-center text-xl">写真ギャラリー</div>
      <div className="grid grid-cols-3 gap-4 place-items-center sm:grid-cols-4">
        {userPosts.map((post) => (
          post.image.url.includes('no_image') || 
          <div key={`post_${post.id}`}>
            <div onClick={() => handleImageClick(post.image)}>
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
      image: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export default Gallery;
