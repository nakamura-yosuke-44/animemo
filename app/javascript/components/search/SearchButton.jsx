import React from 'react';

function SearchButton({switchSearchButton , setSwitchSearchButton}) {
  return (
    <div>
      <button
        type="button"
        className={`btn btn-sm ${switchSearchButton === 'condition' ? 'bg-gray-300' : 'bg-white'} mr-4`}
        onClick={() => setSwitchSearchButton('condition')}
      >
        条件で探す
      </button>
      <button
        type="button"
        className={`btn btn-sm ${switchSearchButton === 'map' ? 'bg-gray-300' : 'bg-white'} ml-4`}
        onClick={() => setSwitchSearchButton('map')}
      >
        地図で探す
      </button>
    </div>
  );
}

export default SearchButton;
