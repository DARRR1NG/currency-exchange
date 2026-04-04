const selectCurrencyStart = document.querySelector(".currency-start");
const inputStart = document.querySelector(".currency-input-start");
const selectCurrencyEnd = document.querySelector(".currency-end");
const inputEnd = document.querySelector(".currency-input-end");

let selectedValueStart = "";
let selectedValueEnd = "";
let inputValueStart = 0;

inputStart.addEventListener("input", () => {
  inputValueStart = inputStart.value;
  exchangeCurrency();
});

selectCurrencyStart.addEventListener("change", () => {
  selectedValueStart = selectCurrencyStart.value;
  exchangeCurrency();
});

selectCurrencyEnd.addEventListener("change", () => {
  selectedValueEnd = selectCurrencyEnd.value;
  exchangeCurrency();
});

async function exchangeCurrency() {
  if (!selectedValueStart || !selectedValueEnd || !inputValueStart) {
    console.log("Не все значения выбраны");
    return;
  }

  const currencyApi = `https://v6.exchangerate-api.com/v6/e4ea169feb786df2e6e88565/latest/${selectedValueStart}`;

  try {
    const data = await fetch(currencyApi);
    const objData = await data.json();
    const endCurrency = objData.conversion_rates[selectedValueEnd];
    const result = endCurrency * Number(inputStart.value);
    inputEnd.value = String(result.toFixed(2));
  } catch (error) {
    console.error("Ошибка при получении курса:", error);
  }
}
