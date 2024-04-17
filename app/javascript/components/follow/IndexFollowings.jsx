import React from 'react';

function IndexFollowings({followings = []}) {
  return (
    <div className="m-4">
      <div>
        <p className='text-xl'>フォローユーザー一覧</p>
      </div>
      <div className='grid gap-6 sm:grid-cols-3 mt-3'>
        {followings && followings.length > 0 ? (
          followings.map((follow) => (
            <div key={follow.id}>
              <div className="flex justify-start bg-white min-w-60 rounded-md">
                <div className="flex justify-center p-1">
                  <img src={follow && follow.profile.avatar?.url} alt="Avatar" className="size-16 rounded-full object-cover min-w-16" />
                </div>
                <div className="flex justify-center items-center">
                  <div className="flex-1">
                    <p className="w-full pl-2"><a href={`/profiles/${follow.name}`}>{follow.name}</a></p>
                  </div>
                </div>
              </div>
                
            </div>
          ))
        ) : (
          <p className='mt-3'>
            フォローユーザーはいません
          </p>
        )}
      </div>
    </div>
  )
}

export default IndexFollowings;