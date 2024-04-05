import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SearchForm({
  season = '',
  name = '',
  prefecture = '',
  municipalities = '',
  choicesSeason = [],
  choicesPrefecture = [],
  handleChange = () => {},
  resultNameArr = [],
  resultMuniArr = [],
}) {
  const [isSessionFocus, setIsSessionFocus] = useState(false);
  const [isPrefectureFocus, setIsPrefectureFocus] = useState(false);
  const [isNameFocus, setIsNameFocus] = useState(false);
  const [isMuniFocus, setIsMuniFocus] = useState(false);

  return (
    <div className="m-4 flex items-center justify-center">
      <div className="relative mr-2 border border-black">
        <input
          id="seasonInput"
          name="seasonInput"
          type="text"
          readOnly
          className="w-[150px] pl-2"
          placeholder="シーズン"
          value={season}
          onClick={() => setIsSessionFocus(true)}
          onChange={handleChange}
          onBlur={() => setTimeout(() => { setIsSessionFocus(false); }, 200)} // onChangeを先に処理させる
        />
        {isSessionFocus && (
          <span id="autocomplete" className="menu absolute z-50 size-40 overflow-auto border bg-white">
            <ul>
              {choicesSeason.map((seasonChoice) => (
                <li // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
                  key={`searchSeason_${seasonChoice}`}
                  className="mb-3 hover:bg-gray-200"
                  onClick={
                    () => {
                      handleChange({ target: { name: 'seasonInput', value: seasonChoice } });
                      setIsSessionFocus(false);
                    }
                  }
                >
                  {seasonChoice}
                </li>
              ))}
            </ul>
          </span>
        )}
      </div>
      <div className="relative mx-2 border border-black">
        <input
          id="nameInput"
          name="nameInput"
          type="text"
          className="pl-2"
          placeholder="店舗名"
          value={name}
          onClick={() => setIsNameFocus(true)}
          onChange={handleChange}
          onBlur={() => setTimeout(() => { setIsNameFocus(false); }, 200)} // onChangeを先に処理させる
        />
        {isNameFocus && (
          <span id="autocomplete" className="menu absolute z-50 size-40 overflow-auto border bg-white">
            <ul>
              {resultNameArr.map((nameObj) => (
                <li
                  key={`searchName_${nameObj.shop_id}`}
                  className="mb-3 hover:bg-gray-200"
                  onClick={
                    () => {
                      handleChange({ target: { name: 'nameInput', value: nameObj.name } });
                      setIsNameFocus(false);
                    }
                  }
                >
                  {nameObj.name}
                </li>
              ))}
            </ul>
          </span>
        )}
      </div>

      <div className="relative mx-2 border border-black">
        <input
          id="prefectureInput"
          name="prefectureInput"
          type="text"
          className="w-[100px] pl-2"
          placeholder="都道府県"
          value={prefecture}
          onClick={() => setIsPrefectureFocus(true)}
          onChange={handleChange}
          onBlur={() => setTimeout(() => { setIsPrefectureFocus(false); }, 200)} // onChangeを先に処理させる
        />
        {isPrefectureFocus && (
          <span id="autocomplete" className="menu absolute z-50 size-40 overflow-auto border bg-white">
            <ul>
              {choicesPrefecture.map((prefectureChoice) => (
                <li
                  key={`searchPrefecture_${prefectureChoice}`}
                  className="mb-3 hover:bg-gray-200"
                  onClick={
                    () => {
                      handleChange({ target: { name: 'prefectureInput', value: prefectureChoice } });
                      setIsPrefectureFocus(false);
                    }
                  }
                >
                  {prefectureChoice}
                </li>
              ))}
            </ul>
          </span>
        )}
      </div>
      <div className="relative mx-2 border border-black">
        <input
          id="muniInput"
          name="muniInput"
          type="text"
          className="w-[150px] pl-2"
          placeholder="市区町村"
          value={municipalities}
          onClick={() => setIsMuniFocus(true)}
          onChange={handleChange}
          onBlur={() => setTimeout(() => { setIsMuniFocus(false); }, 200)} // onChangeを先に処理させる
        />
        {isMuniFocus && (
          <span id="autocomplete" className="menu absolute z-50 size-40 overflow-auto border bg-white">
            <ul>
              {resultMuniArr.map((muni) => (
                <li
                  key={`searchMuni_${muni}`}
                  className="mb-3 hover:bg-gray-200"
                  onClick={
                    () => {
                      handleChange({ target: { name: 'muniInput', value: muni } });
                      setIsNameFocus(false);
                    }
                  }
                >
                  {muni}
                </li>
              ))}
            </ul>
          </span>
        )}
      </div>
    </div>
  );
}

SearchForm.propTypes = {
  season: PropTypes.string,
  name: PropTypes.string,
  prefecture: PropTypes.string,
  municipalities: PropTypes.string,
  choicesSeason: PropTypes.arrayOf(PropTypes.string),
  choicesPrefecture: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func,
  resultNameArr: PropTypes.arrayOf(
    PropTypes.shape(
      {
        shop_id: PropTypes.number,
        name: PropTypes.string,
      },
    ),
  ),
  resultMuniArr: PropTypes.arrayOf(PropTypes.string),
};

export default SearchForm;
