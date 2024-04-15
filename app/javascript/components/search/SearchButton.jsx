import React from 'react';
import PropTypes from 'prop-types';

function SearchButton({ switchSearchButton, setSwitchSearchButton }) {
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

SearchButton.propTypes = {
  setSwitchSearchButton: PropTypes.func,
  switchSearchButton: PropTypes.string,
};

export default SearchButton;
