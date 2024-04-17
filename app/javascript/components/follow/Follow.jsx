import React, { useState } from "react";
import IndexFollowings from "./IndexFollowings";
import IndexFollowers from "./IndexFollowers";


function Follow() {
  const [switchFollow, setSwitchFollow] = useState('following')
  return (
    <div className="m-4 flex flex-col">
      <div className="container mx-auto">
      <div>
        <button
          type="button"
          className={`btn btn-sm ${switchFollow === 'following' ? 'bg-gray-300' : 'bg-white'} mr-4`}
          onClick={() => setSwitchFollow('following')}
        >
          フォロー
        </button>
        <button
          type="button"
          className={`btn btn-sm ${switchFollow === 'followers' ? 'bg-gray-300' : 'bg-white'} mr-4`}
          onClick={() => setSwitchFollow('followers')}
        >
          フォロワー
        </button>
      </div>
      <div className=" flex justify-center items-center mt-3">
        {switchFollow === 'following' ? (
          <IndexFollowings />
        ) : (
          <IndexFollowers />
        )}
      </div>
      </div>
    </div>
  );
}

export default Follow;