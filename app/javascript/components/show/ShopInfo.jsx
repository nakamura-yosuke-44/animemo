import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import UserPosts from '../post/UserPosts';
import PostModal from '../post/PostModal';
import Gallery from '../post/Gallery';

function ShopInfo({ shopId = '' }) {
  const [shop, setShop] = useState(null);
  const [iflame, setIflame] = useState('');
  const [userPosts, setUserPosts] = useState(null);
  const fetchShop = async () => {
    try {
      const response = await axios.get(`/api/shops/${shopId}`);
      const { data } = response;
      setShop(data);
      const orderPosts = data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      setUserPosts(orderPosts)
      const srcRegex = /src="([^"]*)"/;
      const mapIflame = data.map_iflame.match(srcRegex);
      if (mapIflame) {
        setIflame(mapIflame[1]);
      }
    } catch (error) {
      alert('リクエストエラー');
      console.error('店舗情報の取得エラー:', error);
    }
  };

  useEffect(() => {
    fetchShop();
  }, [shopId]);

  return (
    <div className='m-4'>
      <div className="container mx-auto">
        { shop !== null ? (
          <>
            <div className="text-sm sm:text-base">
              <div className="mt-4 flex w-full">
                <div className="flex w-full max-sm:flex-1 max-sm:flex-col">
                  <div className="mr-2 flex flex-1 flex-col">
                    <div className="flex-1">
                      <table className="flex size-full flex-col bg-slate-200">
                        <thead className="flex">
                          <tr className="flex flex-1">
                            <th className="flex-1 border border-black sm:text-xl ">{shop.name}</th>
                          </tr>
                        </thead>
                        <tbody className="flex flex-1 flex-col bg-white">
                          <tr className="flex flex-1">
                            <th className="flex w-1/5 items-center  justify-center border border-black py-3">住所</th>
                            <td className="flex flex-1 items-center justify-center border border-black">
                              {shop.prefecture}
                              {shop.municipalities}
                              {shop.street_address}
                            </td>
                          </tr>
                          <tr className="flex flex-1">
                            <th className="flex w-1/5 items-center justify-center border border-black py-3">電話番号</th>
                            <td className="flex flex-1 items-center justify-center border border-black">{shop.phone_number}</td>
                          </tr>
                          <tr className="flex flex-1">
                            <th className="flex w-1/5 items-center justify-center border border-black py-3">最寄駅</th>
                            <td className="flex flex-1 items-center justify-center border border-black">{shop.station}</td>
                          </tr>
                          <tr className="flex flex-1">
                            <th className="flex w-1/5 items-center justify-center break-all border border-black py-3">交通手段</th>
                            <td className="flex flex-1 items-center justify-center border border-black">{shop.transportation}</td>
                          </tr>
                          <tr className="flex flex-1">
                            <th className="flex w-1/5 items-center justify-center border border-black py-3">食べログ</th>
                            <td className="flex flex-1 items-center justify-center break-all border border-black text-blue-900 hover:underline ">
                              <a href={shop.tabelog_url} target="_blank" rel="noopener noreferrer">
                                {shop.tabelog_url}
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="max-sm:mt-2 flex-1 ">
                    <iframe title="Google Maps" src={iflame} style={{ width: '100%', height: '100%', border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                  </div>
                </div>
              </div>
              <div className="mt-10 w-full">
                <div className="flex w-full">
                  <table className="flex-1 flex-col bg-white text-center">
                    <thead className="w-full">
                      <tr className="flex flex-1">
                        <th className="flex flex-1 items-center justify-center border border-black bg-slate-200 py-3">エピソード</th>
                        <th className="flex flex-1 items-center justify-center border border-black bg-slate-200 py-3">登場料理</th>
                      </tr>
                    </thead>
                    <tbody className="w-full">
                      <tr className="flex">
                        <td className="flex-1 border border-black py-3">
                          {shop.stories.map((story) => (
                            <div key={story.id} className="flex items-center justify-center">
                              {story.season}
                              {' '}
                              {story.ep}
                              <br />
                              {story.title}
                            </div>
                          ))}
                        </td>
                        <td className="flex flex-1 items-center justify-center border border-black py-3">
                          {shop.food}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <UserPosts userPosts={userPosts} setUserPosts={setUserPosts} shopId={shopId} />
            <Gallery userPosts={userPosts}/>
          </>
        ) : (
          <div className="mt-3 flex">
            <p>確認中</p>
            {' '}
            <span className="loading loading-bars loading-md" />
          </div>
        )}
      </div>
    </div>
  );
}

ShopInfo.propTypes = {
  shopId: PropTypes.string,
};

export default ShopInfo;
