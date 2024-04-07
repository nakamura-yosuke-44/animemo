import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';

function PostDeleteItem({ post = null, setUserPosts = () => {} }) {
  const handleDelete = () => {
    const confirmDelete = window.confirm('この投稿を削除してもよろしいですか？');
    if (confirmDelete) {
      axios.delete(`/api/posts/${post.id}`)
        .then((response) => {
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

  return (
    <AiFillDelete onClick={handleDelete} />
  );
}

export default PostDeleteItem;
