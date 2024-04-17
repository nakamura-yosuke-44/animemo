import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribu;

function DeleteComment({ comment = {}, reloadComments = () => {} }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm('コメントを削除してもよろしいですか？');
    if (confirmDelete) {
      axios.delete(`/api/comments/${comment.id}`)
        .then((response) => {
          alert(response.data.message);
          reloadComments();
        })
        .catch((error) => {
          console.error('Error deleting comment:', error);
          alert(error.response.data);
        });
    }
  };

  return (
    <AiFillDelete onClick={handleDelete} />
  );
}

DeleteComment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    post_id: PropTypes.number.isRequired,
  }),
  reloadComments: PropTypes.func,
};

export default DeleteComment;
