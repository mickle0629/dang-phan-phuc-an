import React from 'react';

export function CurrencySelect({name, currencies}) {
  return (
    <select className='conversion-form__origin-currency-select' id={name} name={name}>
      {currencies.map(currency => (
        <option key={currency} value={currency}>{currency}</option>
      ))}
    </select>
  );
}
