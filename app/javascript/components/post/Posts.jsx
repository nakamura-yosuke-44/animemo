import React, { useState, useEffect } from "react";
import axios from "axios";
import CheckCurrentUser from "../../CheckCurrentUser";
import PostUpdateItem from "./PostUpdateItem";
import PostDeleteItem from "./PostDeleteItem";
import LikeButton from "../like/LikeButton";
import PostBodyModal from './PostBodyModal';

function Posts() {
  const [posts, setPosts] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/posts`);
      const { data } = response;
      const orderPosts = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setPosts(orderPosts);
      console.log(orderPosts)
    } catch (error) {
      alert('投稿情報を取得できませんでした');
      console.error('投稿情報の取得エラー:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const reloadPosts= () => {
    fetchPosts()
  }

  return (
      <>
        <CheckCurrentUser setCurrentUser={setCurrentUser} />
        {posts && posts.length > 0 ? (         
          <div className="m-4">
            <div className='w-full flex'>
              <div className="flex-auto grid grid-cols-1 sm:grid-cols-3 gap-6 place-items-center">
                {posts.map((post) => (
                  <div className="card max-w-xs sm:max-w-sm bg-base-100" key={post.id}>
                    <figure><img src={post.image.url} /></figure>
                    <div className="card-body">
                      <div className="py-2 text-center text-blue-900 hover:underline"><a href={`/shops/${post.shop?.id}`}>{post.shop?.name}</a></div>
                      <div className="card-title">{post.title}</div>
                      <PostBodyModal post={post} />
                      <div className='flex'>
                        <img src={post.user.profile && post.user.profile.avatar.url } alt="Avatar" className="object-cover w-12 h-12 rounded-full" />
                        <p className='ml-2 flex justify-start items-center'><a href={`/profiles/${post.user.name}`}>{post.user.name}</a></p>
                      </div>
                      <p>{(post.created_at).split('T')[0]}</p>
                      <div className='flex items-center justify-end'>
                        { currentUser && currentUser.id === post.user_id && (
                          <>
                            <div className="mx-4">
                              <PostUpdateItem post={post} setUserPosts={setPosts} />
                            </div>
                            <div className="mx-4">
                              <PostDeleteItem post={post} reloadPosts={reloadPosts} />
                            </div>
                          </>
                        )}
                        {
                        currentUser && (
                          <div>
                            <LikeButton post={post} currentUser={currentUser} reloadPosts={reloadPosts} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          ) : (
           <p>投稿はありません</p>
          )
        }
      </>
    );
}

export default Posts;
