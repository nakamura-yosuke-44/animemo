import React, { useState } from "react";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState(null)
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/posts`);
      const { data } = response;
      const orderPosts = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setPosts(orderPosts);
    } catch (error) {
      alert('リクエストエラー');
      console.error('投稿情報の取得エラー:', error);
    }
  };

  fetchPosts()

  return (
    <div className="m-4">
      <div className="container mx-auto">
        {posts !== null ? (
          <div className="mx-4 mt-12 flex items-center justify-center">
            <div>
              <div className=" border-blackflex flex-col items-center justify-center sm:text-base ">
                {posts.map((post) => (
                  <div className="card my-4 w-96 bg-base-100 shadow-xl" key={post.id}>
                    <figure><img src={post.image.url} /></figure>
                    <div className="card-body">
                      <a href={`/shops/${post.shop.id}`}>{post.shop.name}</a>
                      <div className="card-title">{post.title}</div>
                      <p>{post.body}</p>
                      <p>
                        by
                        {' '}
                        {post.user.name}
                      </p>
                      <p>{new Date(post.created_at).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex">
            <p>確認中</p>
            {' '}
            <span className="loading loading-bars loading-md" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;
