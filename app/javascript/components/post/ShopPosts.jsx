import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PostDeleteItem from './PostDeleteItem';
import PostUpdateItem from './PostUpdateItem';
import LikeButton from '../like/LikeButton';
import PostModal from './PostModal';
import PostBodyModal from './PostBodyModal';
import IndexComments from '../comment/IndexComments';

function ShopPosts({
  userPosts = [], setUserPosts = () => {}, currentUser = null, shopId = null,
}) {
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/shops/${shopId}`);
      const orderPosts = response.data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setUserPosts(orderPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const reloadPosts = () => {
    fetchPosts();
  };

  return (
    <>
      <div className="flex pl-10 pt-10">
        <div className="text-xl">みんなの投稿</div>
        {currentUser && <PostModal reloadPosts={reloadPosts} shopId={shopId} />}
      </div>
      {userPosts && userPosts.length > 0 ? (
        <div className="mx-2 mt-12 ">
          <div className="flex w-full">
            <div className="grid flex-auto grid-cols-1 place-items-center gap-6 sm:grid-cols-3">
              {userPosts.map((post) => (
                <div className="card max-w-xs bg-base-100 sm:max-w-sm" key={post.id}>
                  <figure><img src={post.image.url} alt="投稿画像" /></figure>
                  <div className="card-body">
                    <div className="card-title">{post.title}</div>
                    <PostBodyModal post={post} />
                    <div className="flex">
                      <img src={post.user.profile && post.user.profile.avatar.url} alt="Avatar" className="size-12 rounded-full object-cover" />
                      <p className="ml-2 flex items-center justify-start"><a href={`/profiles/${post.user.name}`}>{post.user.name}</a></p>
                    </div>
                    <p>{(post.created_at).split('T')[0]}</p>
                    <div className="flex items-center justify-end">
                      { currentUser && currentUser.id === post.user_id && (
                        <>
                          <div className="mx-4">
                            <PostUpdateItem post={post} setUserPosts={setUserPosts} />
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
                      )
                      }
                      {<IndexComments post={post} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="pl-10 pt-5">投稿はまだありません</p>
      )}
    </>
  );
}

ShopPosts.propTypes = {
  userPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      user_id: PropTypes.number.isRequired,
      image: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string,
      }),
    }).isRequired,
  ).isRequired,
  setUserPosts: PropTypes.func,
  shopId: PropTypes.string,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default ShopPosts;
