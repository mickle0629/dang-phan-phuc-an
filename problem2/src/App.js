import { useState } from "react";
import "./App.css";
import Select from "react-select";
function App() {
  const [conversionResult, setConversionResult] = useState("");
  const [selectedFromCurrency, setSelectedFromCurrency] = useState(null);
  const [selectedToCurrency, setSelectedToCurrency] = useState(null);
  //conversion rate data copy and pasted from provided json file.
  //file included contained duplicates of same currency name and different rates, so I took the liberty of trimming them manually.
  //ideally, we would want to pull this json from a server, then run a function that removes the dupes, but for prototyping convenience, this is what I did.
  const conversions = [
    {
      currency: "BLUR",
      date: "2023-08-29T07:10:40.000Z",
      price: 0.20811525423728813,
    },
    { currency: "bNEO", date: "2023-08-29T07:10:50.000Z", price: 7.1282679 },
    {
      currency: "BUSD",
      date: "2023-08-29T07:10:40.000Z",
      price: 0.9998782611186441,
    },
    { currency: "USD", date: "2023-08-29T07:10:30.000Z", price: 1 },
    {
      currency: "ETH",
      date: "2023-08-29T07:10:52.000Z",
      price: 1645.9337373737374,
    },
    {
      currency: "GMX",
      date: "2023-08-29T07:10:40.000Z",
      price: 36.345114372881355,
    },
    {
      currency: "STEVMOS",
      date: "2023-08-29T07:10:40.000Z",
      price: 0.07276706779661017,
    },
    {
      currency: "LUNA",
      date: "2023-08-29T07:10:40.000Z",
      price: 0.40955638983050846,
    },
    {
      currency: "RATOM",
      date: "2023-08-29T07:10:40.000Z",
      price: 10.250918915254237,
    },
    {
      currency: "STRD",
      date: "2023-08-29T07:10:40.000Z",
      price: 0.7386553389830508,
    },
    {
      currency: "EVMOS",
      date: "2023-08-29T07:10:40.000Z",
      price: 0.06246181355932203,
    },
    {
      currency: "IBCX",
      date: "2023-08-29T07:10:40.000Z",
      price: 41.26811355932203,
    },
    {
      currency: "IRIS",
      date: "2023-08-29T07:10:40.000Z",
      price: 0.0177095593220339,
    },
    {
      currency: "ampLUNA",
      date: "2023-08-29T07:10:40.000Z",
      price: 0.49548589830508477,
    },
    { currency: "KUJI", date: "2023-08-29T07:10:45.000Z", price: 0.675 },
    { currency: "STOSMO", date: "2023-08-29T07:10:45.000Z", price: 0.431318 },
    { currency: "axlUSDC", date: "2023-08-29T07:10:40.000Z", price: 0.989832 },
    {
      currency: "ATOM",
      date: "2023-08-29T07:10:50.000Z",
      price: 7.186657333333334,
    },
    {
      currency: "STATOM",
      date: "2023-08-29T07:10:45.000Z",
      price: 8.512162050847458,
    },
    {
      currency: "OSMO",
      date: "2023-08-29T07:10:50.000Z",
      price: 0.3772974333333333,
    },
    { currency: "rSWTH", date: "2023-08-29T07:10:40.000Z", price: 0.00408771 },
    {
      currency: "STLUNA",
      date: "2023-08-29T07:10:40.000Z",
      price: 0.44232210169491526,
    },
    {
      currency: "LSI",
      date: "2023-08-29T07:10:50.000Z",
      price: 67.69661525423729,
    },
    {
      currency: "OKB",
      date: "2023-08-29T07:10:40.000Z",
      price: 42.97562059322034,
    },
    {
      currency: "OKT",
      date: "2023-08-29T07:10:40.000Z",
      price: 13.561577966101694,
    },
    {
      currency: "SWTH",
      date: "2023-08-29T07:10:45.000Z",
      price: 0.004039850455012084,
    },
    { currency: "USC", date: "2023-08-29T07:10:40.000Z", price: 0.994 },
    {
      currency: "USDC",
      date: "2023-08-29T07:10:40.000Z",
      price: 0.9998782611186441,
    },
    {
      currency: "WBTC",
      date: "2023-08-29T07:10:52.000Z",
      price: 26002.82202020202,
    },
    {
      currency: "wstETH",
      date: "2023-08-29T07:10:40.000Z",
      price: 1872.2579742372882,
    },
    {
      currency: "YieldUSD",
      date: "2023-08-29T07:10:40.000Z",
      price: 1.0290847966101695,
    },
    {
      currency: "ZIL",
      date: "2023-08-29T07:10:50.000Z",
      price: 0.01651813559322034,
    },
  ];
  //iterates through conversion data and produce a map with currency-rate pairs.
  //this map enables constant-time access when the convertCurrency() function is trying to figure out which currency is in play.
  const currencyMap = new Map(
    conversions.map((conversion) => [conversion.currency, conversion.price])
  );

  //handles submission
  function handleSubmit(e) {
    e.preventDefault();
    //grab form element's results
    const formData = new FormData(
      document.getElementById("currency-converter")
    );
    //calculate and set conversionResult for display.
    setConversionResult(
      convertCurrency(
        formData.get("origin-input"),
        currencyMap.get(selectedFromCurrency),
        currencyMap.get(selectedToCurrency)
      )
    );
  }
  /**
   * Performs the conversion from one currency to another.
   * @param {Number} value the monetary value to be converted
   * @param {Number} currencyFrom the to-USD exchange rate of value.
   * @param {Number} currencyTo the to-USD exchange rate of 1 unit of target currency.
   * @returns the equivalent value of the original value in the target currency.
   */
  function convertCurrency(value, currencyFrom, currencyTo) {
    return (value * currencyFrom) / currencyTo;
  }

  return (
    <main className="main-container">
      <h1 className="app-title">Currency Converter</h1>
      <form
        onSubmit={handleSubmit}
        className="conversion-form"
        id="currency-converter"
      >
        <div className="conversion-form__interaction-block">
          <label className="conversion-form__label" htmlFor="origin-input">
            Convert from:{" "}
          </label>
          <input
            className="conversion-form__input"
            type="number"
            id="origin-input"
            name="origin-input"
            placeholder="Enter amount..."
            required
          />
          {/* Since html <select> is hard to style, this app uses React-select components */}
          <Select
            //react-select components take an options prop that is an object that looks like: { value: "string", label: "string" }
            //i have to convert the currencyMap to that format.
            options={[...currencyMap.keys()].map((currency) => {
              return { value: currency, label: currency };
            })}
            //its onChange prop takes a function whose option parameter is an object the same as described above.
            onChange={(option) => setSelectedFromCurrency(option.value)}
            placeholder='Currency...'
            required
          />
        </div>

        <div className="conversion-form__interaction-block">
          <label className="conversion-form__label" htmlFor="target-input">
            Result:{" "}
          </label>
          <input
            className="conversion-form__input"
            id="target-input"
            name="target-input"
            // I originally wanted to truncate decimals, but it is bad design when the calculation spits out a dozen decimals.
            // Since num. of decimals is unpredictable, i decided to just display every decimal.
            // value={conversionResult.toString().slice(0, conversionResult.toString().indexOf('.') + 3)}
            value={conversionResult}
            readOnly
          />
          <Select
            options={[...currencyMap.keys()].map((currency) => {
              return { value: currency, label: currency };
            })}
            onChange={(option) => setSelectedToCurrency(option.value)}
            placeholder='Currency...'
            required
          />
        </div>
        <button type="submit" className="conversion-form__btn">
          Convert
        </button>
      </form>
    </main>
  );
}

export default App;
