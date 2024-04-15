import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function NearestPlace() {
  const [nearestShop, setNearestShop] = useState(null);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;

        try {
          const response = await axios.post('/api/shops/nearest', {
            latitude,
            longitude,
          });
          setNearestShop(response.data);
          setError(null);
        } catch (error) {
          console.error('位置情報の送信に失敗しました:', error);
          setNearestShop(null);
          setError('位置情報の送信に失敗しました');
        } finally {
          setIsSearching(false);
        }
      }, (error) => {
        console.error('位置情報の取得に失敗しました:', error);
        setNearestShop(null);
        setError('位置情報の取得に失敗しました');
        setIsSearching(false);
      });
    } else {
      console.error('Geolocation APIをサポートしていません');
      setError('はGeolocation APIを利用できません');
      setIsSearching(false);
    }
  };

  return (
    <div className="bt-2">
      <button type="button" className="pt-5 text-blue-900 hover:underline" onClick={handleSearch}>最寄りの店舗を検索</button>
      {isSearching && <div>検索中...</div>}
      {error && (
      <div>
        エラー:
        {error}
      </div>
      )}
      {nearestShop && (
        <>
          <div>最寄りの店舗</div>
          <p className="text-blue-900 hover:underline"><a href={`/shops/${nearestShop.id}`}>{nearestShop.name}</a></p>
        </>
      )}
    </div>
  );
}

export default NearestPlace;
