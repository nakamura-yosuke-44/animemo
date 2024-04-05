import React, { useState } from 'react';

function SwitchSearchButton() {
  const [selectedButton, setSelectedButton] = useState('condition');
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div>
      <button
        type="button"
        className={`btn btn-sm ${selectedButton === 'condition' ? 'bg-gray-300' : 'bg-white'} mr-4`}
        onClick={() => handleButtonClick('condition')}
      >
        条件で探す
      </button>
      <button
        type="button"
        className={`btn btn-sm ${selectedButton === 'map' ? 'bg-gray-300' : 'bg-white'} ml-4`}
        onClick={() => handleButtonClick('map')}
      >
        地図で探す
      </button>
    </div>
  );
}

export default SwitchSearchButton;
