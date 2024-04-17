import React from 'react';
import PropTypes from 'prop-types';

function IndexFollowers({ followers = [], followings = [] }) {
  return (
    <div className="m-4">
      <div>
        <p className="text-xl">フォロワー一覧</p>
      </div>
      <div className="mt-3 grid gap-6 sm:grid-cols-3">
        {followers && followers.length > 0 ? (
          followers.map((follower) => (
            <div key={follower.id}>
              <div className="flex min-w-60 justify-start rounded-md bg-white">
                <div className="flex justify-center p-1">
                  <img src={follower && follower.profile.avatar?.url} alt="Avatar" className="size-16 min-w-16 rounded-full object-cover" />
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex-1">
                    <p className="w-full pl-2"><a href={`/profiles/${follower.name}`}>{follower.name}</a></p>
                  </div>
                </div>
              </div>
              {(followings.some((follow) => follow.id === follower.id))
                && <p className="text-xs">フォロー中</p>}
            </div>
          ))
        ) : (
          <p className="mt-3">
            フォロワーはいません
          </p>
        )}
      </div>
    </div>
  );
}

IndexFollowers.propTypes = {
  followers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  followings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
};

export default IndexFollowers;
