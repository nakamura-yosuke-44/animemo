import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function PostDeleteItem({ post = {}, reloadPosts = () => {} }) {
  const handleDelete = () => {
    const confirmDelete = window.confirm('この投稿を削除してもよろしいですか？');
    if (confirmDelete) {
      axios.delete(`/api/posts/${post.id}`)
        .then(() => {
          alert('削除しました');
          reloadPosts()
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
          alert('削除できませんでした');
        });
    }
  };

  return (
    <AiFillDelete onClick={handleDelete} />
  );
}

PostDeleteItem.propTypes = {
  post: PropTypes.shape({
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
};

export default PostDeleteItem;
