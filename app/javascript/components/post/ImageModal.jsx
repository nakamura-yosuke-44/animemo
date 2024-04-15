import React from 'react';
import PropTypes from 'prop-types';

function ImageModal({ image = {}, onClose = () => {} }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <img src={image.url} alt="投稿画像" />
      <button type="button" className="absolute right-4 top-4 text-white" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

ImageModal.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func,
};

export default ImageModal;
