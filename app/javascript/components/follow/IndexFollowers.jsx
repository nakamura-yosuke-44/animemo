import React from 'react';

function IndexFollowers({followers = [], followings= []}) {  
  return (
    <div className="m-4">
      <div>
        <p className='text-xl'>フォロワー一覧</p>
      </div>
      <div className='grid gap-6 sm:grid-cols-3 mt-3'>
        {followers && followers.length > 0 ? (
          followers.map((follower) => (
            <div key={follower.id}>
              <div className="flex justify-start bg-white min-w-60 rounded-md">
                <div className="flex justify-center p-1">
                  <img src={follower && follower.profile.avatar?.url} alt="Avatar" className="size-16 rounded-full object-cover min-w-16" />
                </div>
                <div className="flex justify-center items-center">
                  <div className="flex-1">
                    <p className="w-full pl-2"><a href={`/profiles/${follower.name}`}>{follower.name}</a></p>
                  </div>
                </div>
              </div>  
              {(followings.some((follow) => follow.id === follower.id)) &&
                <p className='text-xs'>フォロー中</p>
              }    
            </div>
          ))
        ) : (
          <p className='mt-3'>
            フォロワーはいません
          </p>
        )}
      </div>
    </div>
  )
}

export default IndexFollowers;