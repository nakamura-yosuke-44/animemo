import React from 'react';
import PropTypes from 'prop-types';

function IndexFollowings({ followings = [] }) {
  return (
    <div className="m-4">
      <div>
        <p className="text-xl">フォローユーザー一覧</p>
      </div>
      <div className="mt-3 grid gap-6 sm:grid-cols-3">
        {followings && followings.length > 0 ? (
          followings.map((follow) => (
            <div key={follow.id}>
              <div className="flex min-w-60 justify-start rounded-md bg-white">
                <div className="flex justify-center p-1">
                  <img src={follow && follow.profile.avatar?.url} alt="Avatar" className="size-16 min-w-16 rounded-full object-cover" />
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex-1">
                    <p className="w-full pl-2"><a href={`/profiles/${follow.name}`}>{follow.name}</a></p>
                  </div>
                </div>
              </div>

            </div>
          ))
        ) : (
          <p className="mt-3">
            フォローユーザーはいません
          </p>
        )}
      </div>
    </div>
  );
}

IndexFollowings.propTypes = {
  followings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
};

export default IndexFollowings;
