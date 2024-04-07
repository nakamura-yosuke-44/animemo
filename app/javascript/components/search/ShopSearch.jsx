import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchForm from './SearchForm';
import SwitchSearchButton from './SwitchSearchButton';

function ShopSearch({ arryPrefecture = [], arrySeason = [] }) {
  const [season, setSeason] = useState('Season1');
  const [name, setName] = useState('');
  const [prefecture, setPrefecture] = useState('');
  const [municipalities, setMuni] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [resultNameArr, setResultNameArr] = useState([]);
  const [resultMuniArr, setResultMuniArr] = useState([]);

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
    <div className="container mx-auto">
      <div className="m-6 flex h-10">
        <SwitchSearchButton />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-end">
          <div>検索条件</div>
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
        {searchResults.length > 0 ? (
          <table className="relative border border-black bg-white">
            <thead>
              <tr className="h-10 border border-black bg-slate-300">
                <th className="w-[250px]">エピソード</th>
                <th className="w-[200px]">店舗名</th>
                <th className="w-[140px]">都道府県</th>
                <th className="w-[150px]">市区町村</th>
                <th className="w-[140px]">最寄駅</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                <tr key={result.id} className="border-b border-black">
                  <td className="px-2 py-4">
                    {result.stories.map((story) => (
                      <div key={story.id}>
                        {story.season}
                        {' '}
                        {story.ep}
                        <br />
                        {story.title}
                      </div>
                    ))}
                  </td>
                  <td className="px-2 text-center text-blue-900 hover:underline"><a href={`/shops/${result.id}`} >{result.name}</a></td>
                  <td className="px-8 text-center">{result.prefecture}</td>
                  <td className="px-2 text-center">{result.municipalities}</td>
                  <td className="px-2 text-center">{result.station}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-6 text-center text-gray-500">条件に合う店舗は見つかりません。</p>
        )}
      </div>
    </div>
  );
}

ShopSearch.propTypes = {
  arryPrefecture: PropTypes.arrayOf(PropTypes.string),
  arrySeason: PropTypes.arrayOf(PropTypes.string),
};

export default ShopSearch;
