import React from "react";

export function CurrencySelect({ name, currencies }) {
  return (
    <select className="conversion-form__currency-select" id={name} name={name}>
      {currencies.map((currency) => {
        return (
          <option key={currency} value={currency}>
            {currency}
          </option>
        );
      })}
    </select>
  );
}
