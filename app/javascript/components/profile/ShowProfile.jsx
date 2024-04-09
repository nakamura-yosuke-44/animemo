import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileModal from './ProfileModal';
import CheckCurrentUser from '../../CheckCurrentUser';
import PostUpdateItem from '../post/PostUpdateItem';
import PostDeleteItem from '../post/PostDeleteItem';


const ProfileCard = ({ profileId }) => {
  const [profile, setProfile] = useState(null);
  const [profUser, setProfUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [relationshipId, setRelationshipId] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const prof = await axios.get(`/api/profiles/${profileId}`);
        const data = prof.data;
        setProfile(data);
        setProfUser(data.user);

        const response = await axios.get(`/api/profiles/${profileId}/posts`);
        setUserPosts(response.data);
        
  
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [profileId]);

  return (
    <>
      <CheckCurrentUser setCurrentUser={setCurrentUser} />
      <div className="flex flex-col items-center">
        <div className="max-w-md mb-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
            {profile ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <img src={profile.avatar ? profile.avatar.url : "no_image.jpg"} alt="Avatar" className="w-24 h-24 rounded-full mr-4 object-cover" />
              <div>
                <h2 className="text-xl font-semibold">{profUser.name}</h2>
                <p className="text-gray-600">{profile.bio || 'No bio available'}</p>
              </div>
              <ProfileModal setProfile={setProfile} profile={profile} />
              {/* relationshipIdをFollowButtonコンポーネントに渡す */}
              
            </div>
            
            ) : (
              'プロフィールはありません'
            )
            }
          </div>
        </div>
        <div className="max-w-md">
          <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
            <h3 className="text-lg font-semibold">Posts</h3>
            {userPosts && userPosts.length > 0 ? (
              <div className="mx-4 mt-12 flex items-center justify-center">
                <div>
                  <div className=" border-blackflex flex-col items-center justify-center sm:text-base ">
                    {userPosts.map((post) => (
                      <div className="card my-4 w-96 bg-base-100 shadow-xl" key={post.id}>
                        <figure><img src={post.image.url} /></figure>
                        <div className="card-body">
                          <div className="card-title">{post.title}</div>
                          <p>{post.body}</p>
                          <p>
                            by
                            {' '}
                            {post.user.name}
                          </p>
                          <div>
                            {currentUser === post.user.id
                              && (
                                <div className="flex justify-end">
                                  <div className="mx-3">
                                    <PostDeleteItem post={post} setUserPosts={setUserPosts} />
                                  </div>
                                  <div className="mx-3">
                                    <PostUpdateItem post={post} setUserPosts={setUserPosts} />
                                  </div>
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
              <p className="mt-2 text-gray-600">No posts available</p>
            )}
          </div>
        </div>
      </div>
      
    </>
  );
}

export default ProfileCard;
