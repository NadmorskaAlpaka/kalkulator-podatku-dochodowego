import React from 'react';
import '../styles/zusSelector.css';

const ZUSSelector = ({ selected, setSelected }) => {
  const options = [
    { label: 'ZUS na start', value: 'zus_na_start' },
    { label: 'Mały ZUS', value: 'maly_zus' },
    { label: 'ZUS na start z Małym ZUS-em', value: 'start_i_maly_zus' },
  ];

  const handleSelect = (value) => {
    if (selected === value) {
      setSelected(null);
    } else {
      setSelected(value);
    }
  };

  return (
    <div className="zus-selector-container">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSelect(option.value)}
          className={`zus-option-button ${
            selected === option.value ? 'zus-option-button--active' : ''
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ZUSSelector;