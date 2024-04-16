import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function DeleteReply({ reply = {}, reloadReplies = () => {} }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("コメントを削除してもよろしいですか？");
    if (confirmDelete) {
      axios.delete(`/api/comments/${reply.parent_id}/replies`,{
        params: {
          replyId: reply.id
        }
      })
        .then((response) => {
          alert(response.data.message);
          reloadReplies();
        })
        .catch((error) => {
          console.error('Error deleting comment:', error);
          alert(error.response.data.error);
        });
    }
  }

  return (
    <AiFillDelete onClick={handleDelete} />
  );
}

export default DeleteReply;
