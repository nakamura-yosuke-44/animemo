import React, { useState } from 'react';
import PropTypes from 'prop-types';

function PostBodyModal({ post = {} }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="text-xs text-blue-500" onClick={() => setShowModal(true)}>
        内容を表示
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex max-h-full max-w-sm flex-col rounded-lg bg-white p-8">
            <button type="button" className="btn btn-circle btn-sm absolute right-0 top-0 mr-2 mt-2" onClick={() => setShowModal(false)}>✕</button>
            <div>{post.body}</div>
          </div>
        </div>
      )}
    </div>
  );
}

PostBodyModal.propTypes = {

};

PostBodyModal.propTypes = {
  post: PropTypes.shape({
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
};

export default PostBodyModal;
