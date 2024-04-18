import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckCurrentUser from '../../CheckCurrentUser';
import PostUpdateItem from '../post/PostUpdateItem';
import PostDeleteItem from '../post/PostDeleteItem';
import LikeButton from '../like/LikeButton';
import PostBodyModal from '../post/PostBodyModal';
import IndexComments from '../comment/IndexComments';

function FollowPosts() {
  const [followPosts, setFollowPosts] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const fetchFollowPosts = async () => {
    try {
      const response = await axios.get('/api/follow_posts');
      const { data } = response;
      const orderPosts = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setFollowPosts(orderPosts);
    } catch (error) {
      alert('投稿情報を取得できませんでした');
      console.error('Error fetching followposts :', error);
    }
  };

  useEffect(() => {
    fetchFollowPosts();
  }, []);

  const reloadFollowPosts = () => {
    fetchFollowPosts();
  };

  return (
    <>
      <CheckCurrentUser setCurrentUser={setCurrentUser} />
      {followPosts && followPosts.length > 0 ? (
      <div className="mx-auto mt-10 mb-3 max-w-screen-lg">
        <div className="mx-2 mt-12 ">
          <div className="flex w-full">
            <div className="grid flex-auto grid-cols-1 place-items-center gap-6 sm:grid-cols-3">
              {followPosts.map((post) => (
                <div className="card max-w-xs bg-base-100 sm:max-w-sm" key={post.id}>
                  <figure><img src={post.image.url} alt="投稿画像" /></figure>
                  <div className="card-body">
                    <div className="py-2 text-center text-blue-900 hover:underline"><a href={`/shops/${post.shop?.id}`}>{post.shop?.name}</a></div>
                    <div className="card-title">{post.title}</div>
                    <PostBodyModal post={post} />
                    <div className="flex">
                      <img src={post.user.profile && post.user.profile.avatar.url} alt="Avatar" className="size-12 rounded-full object-cover" />
                      <p className="ml-2 flex items-center justify-start"><a href={`/profiles/${post.user.name}`}>{post.user.name}</a></p>
                    </div>
                    <p>{(post.created_at).split('T')[0]}</p>
                    <div className="flex items-center justify-end">
                      {currentUser && currentUser.id === post.user_id && (
                        <>
                          <div className="mx-4">
                            <PostUpdateItem post={post} setUserPosts={setFollowPosts} />
                          </div>
                          <div className="mx-4">
                            <PostDeleteItem post={post} reloadPosts={reloadFollowPosts} />
                          </div>
                        </>
                      )}
                      {
                        currentUser && (
                          <div>
                            <LikeButton post={post} currentUser={currentUser} reloadPosts={reloadFollowPosts} />
                          </div>
                        )
                      }
                      <IndexComments post={post} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      ) : (
        <p>投稿はありません</p>
      )}
    </>
  );
}

export default FollowPosts;
