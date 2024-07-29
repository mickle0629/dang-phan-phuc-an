import React from 'react';

export function CurrencySelect({currencies}) {
  return (
    <select className='conversion-form__origin-currency-select'>
      {currencies.map(currency => (
        <option value={currency}>{currency}</option>
      ))}
    </select>
  );
}
