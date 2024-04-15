import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchForm from './SearchForm';
import SearchButton from './SearchButton';
import NearestPlace from '../geocorde/NearestPlace';
import KodoguruMap from '../Map/KodoguruMap';

function ShopSearch({ arryPrefecture = [], arrySeason = [] }) {
  const [season, setSeason] = useState('Season1');
  const [name, setName] = useState('');
  const [prefecture, setPrefecture] = useState('');
  const [municipalities, setMuni] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [resultNameArr, setResultNameArr] = useState([]);
  const [resultMuniArr, setResultMuniArr] = useState([]);
  const [switchSearchButton, setSwitchSearchButton] = useState('condition');


  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/shops/search', {
        params: {
          name,
          prefecture,
          season,
          municipalities,
        },
      });
      const { data } = response;
      setSearchResults(data);

      const nameArr = data.map((result) => ({ shop_id: result.id, name: result.name }));
      setResultNameArr(nameArr);

      const municipalitiesArray = data.map((result) => result.municipalities);
      function uniq(array) {
        return [...new Set(array)];
      }
      const resultUniqueMuni = uniq(municipalitiesArray);
      setResultMuniArr(resultUniqueMuni);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [name, prefecture, season, municipalities]);

  const handleChange = (e) => {
    const { value } = e.target;
    const eName = e.target.name;
    if (eName === 'seasonInput') {
      setSeason(value);
    } else if (eName === 'prefectureInput') {
      setPrefecture(value);
    } else if (eName === 'nameInput') {
      setName(value);
    } else if (eName === 'muniInput') {
      setMuni(value);
    }
  };

  return (
    <div className="m-4">
      <div className="container mx-auto">
        <div className="flex mt-4">
          <SearchButton switchSearchButton={switchSearchButton} setSwitchSearchButton={setSwitchSearchButton} />
        </div>
        {switchSearchButton === 'condition' && (
          <>
            <NearestPlace />
            <div className="flex flex-col">
              <div className="flex justify-end">
                <SearchForm
                  name={name}
                  prefecture={prefecture}
                  season={season}
                  municipalities={municipalities}
                  choicesSeason={arrySeason}
                  choicesPrefecture={arryPrefecture}
                  handleChange={handleChange}
                  resultNameArr={resultNameArr}
                  resultMuniArr={resultMuniArr}
                />
              </div>
              <div>
                検索結果：
                {searchResults.length}
                件
              </div>
              {searchResults && searchResults.length > 0 ? (
                <table className="relative border border-black bg-white">
                  <thead className='text-sm sm:text-base'>
                    <tr className="h-10 border border-black bg-slate-300">
                      <th className="w-[200px]">エピソード</th>
                      <th className="w-[200px]">店舗名</th>
                      <th className="w-[140px]">都道府県</th>
                      <th className="w-[150px]">市区町村</th>
                      <th className="w-[140px]">最寄駅</th>
                    </tr>
                  </thead>
                  <tbody className='text-sm sm:text-base'>
                    {searchResults.map((result) => (
                      <tr key={result.id} className="border-b border-black">
                        <td className="px-2 py-4">
                          {result.stories.map((story) => (
                            <div key={story.id}>
                              {story.season} {story.ep} <br />
                              {story.title}
                            </div>
                          ))}
                        </td>
                        <td className="py-2 text-center text-blue-900 hover:underline"><a href={`/shops/${result.id}`}>{result.name}</a></td>
                        <td className="py-8 text-center">{result.prefecture}</td>
                        <td className="py-2 text-center">{result.municipalities}</td>
                        <td className="py-2 text-center">{result.station}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="mt-6 text-center text-gray-500">条件に合う店舗は見つかりません。</p>
              )}
            </div>
          </>
        )}
        {switchSearchButton !== 'condition' && (
          <div className='flex justify-center items-center mt-4'>
          <KodoguruMap />
        </div>
        )}
      </div>
    </div>
  );
};


ShopSearch.propTypes = {
  arryPrefecture: PropTypes.arrayOf(PropTypes.string),
  arrySeason: PropTypes.arrayOf(PropTypes.string),
}


export default ShopSearch;
