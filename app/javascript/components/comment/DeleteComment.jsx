import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function DeleteComment({comment={}, reloadComments = () => {}}) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("コメントを削除してもよろしいですか？");
    if (confirmDelete) {
      axios.delete(`/api/comments/${comment.id}`)
        .then((response) => {
          alert(response.data.message);
          reloadComments();
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

export default DeleteComment;