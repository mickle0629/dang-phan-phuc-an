import React, { useState } from "react";
import Select from "react-select"

export function CurrencySelect({ name, currencies, onOptionsChange }) {
  const [currentOption, setCurrentOption] = useState(null);
  const options = currencies.map((currency) => {
    return { value: currency, label: currency }
  });

  function handleSelectChange(option) {
    setCurrentOption(option)
    
  }
  return (
    <Select options={options} onChange={onOptionsChange}/>
  );
}
