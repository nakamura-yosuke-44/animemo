import React, { useState, useEffect } from "react";
import axios from 'axios';
import IndexFollowings from "./IndexFollowings";
import IndexFollowers from "./IndexFollowers";

function Follow() {
  const [switchFollow, setSwitchFollow] = useState('following')
  const [followings, setFollowings] = useState(null)
  const [followers, setFollowers] = useState(null)

  const fetchFollowings = async() => {
    try{
      const response = await axios.get(`/api/follow/followings`);
      setFollowings(response.data)
    } catch(error) {
      console.error('エラー:', error);
    }
  }

  const fetchFollowers = async() => {
    try{
      const response = await axios.get(`/api/follow/followers`);
      setFollowers(response.data)
    } catch(error) {
      console.error('エラー:', error);
    }
  }

  useEffect(() => {
    fetchFollowings();
    fetchFollowers();
  }, []);

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
          <IndexFollowings followings={followings} />
        ) : (
          <IndexFollowers followers={followers} followings={followings} />
        )}
      </div>
      </div>
    </div>
  );
}

export default Follow;