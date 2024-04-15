import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyList() {
  const [status, setStatus] = useState('want_to');
  const [visitList, setVisitList] = useState([]);

  const fetchVisitList = async () => {
    try {
      const response = await axios.get('/api/my_list', {
        params: {
          status: status
        }
      });
      setVisitList(response.data);
    } catch (error) {
      console.error('リストの取得に失敗', error);
      alert('リストを取得できませんでした')
    }
  };

  useEffect(() => {
    fetchVisitList();
  }, [status]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <>
      <div className='m-4 pl-4'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mx-2 rounded-full" onClick={() => handleStatusChange('want_to')}>行きたい</button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 mx-2 rounded-full" onClick={() => handleStatusChange('went')}>行った</button>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-5 mx-2 rounded-full" onClick={() => handleStatusChange('pending')}>保留</button>
      </div>
      <div className="container m-6 mx-auto flex justify-center">
        <div className="flex flex-col">
          <div>
            検索結果：
            {visitList ? visitList.length : 0}
            件
          </div>
          <div>
            {visitList && visitList.length > 0 ? (
              <table className="relative border border-black bg-white">
                <thead>
                  <tr className="h-10 border border-black bg-slate-300">
                    <th className="w-[200px]">店舗名</th>
                    <th className="w-[140px]">都道府県</th>
                    <th className="w-[150px]">市区町村</th>
                    <th className="w-[140px]">最寄駅</th>
                  </tr>
                </thead>
                <tbody>
                  {visitList.map((visit) => (
                    <tr key={visit.id} className="border-b border-black">
                      <td className="text-center py-2 text-blue-900 hover:underline"><a href={`/shops/${visit.shop.id}`}>{visit.shop.name}</a></td>
                      <td className="text-center py-2">{visit.shop.prefecture}</td>
                      <td className="text-center py-2">{visit.shop.municipalities}</td>
                      <td className="text-center py-2">{visit.shop.station}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-6 text-center text-gray-500">よし、店を探そう</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyList;

