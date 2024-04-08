import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import PropTypes from 'prop-types';

function PostDeleteItem({ post = {}, setUserPosts = () => {} }) {
  const updateUserPosts = () => {
    axios.get(`/api/shops/${post.shop_id}`)
      .then((response) => {
        const orderPosts = response.data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setUserPosts(orderPosts);
      })
      .catch((error) => {
        console.error('ページ更新に失敗しました:', error);
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('この投稿を削除してもよろしいですか？');
    if (confirmDelete) {
      axios.delete(`/api/posts/${post.id}`)
        .then(() => {
          console.log('Post deleted successfully');
          alert('削除しました');
          updateUserPosts();
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
  setUserPosts: PropTypes.func.isRequired,
};

export default PostDeleteItem;
