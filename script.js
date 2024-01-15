document.addEventListener("DOMContentLoaded", function () {
  const sourceCurrency = document.getElementById("sourceCurrency");
  const destinationCurrency = document.getElementById("destinationCurrency");
  const amountInput = document.getElementById("amount");
  const convertBtn = document.getElementById("convertBtn");
  const swapBtn = document.getElementById("swapBtn");
  const exchangeRateText = document.getElementById("exchangeRate");
  const calculationDateText = document.getElementById("calculationDate");
  const updateDateText = document.getElementById("updateDate");
  const resultAmountText = document.getElementById("resultAmount");

  // Array of currency codes
  const currencyCodes = [
    "TOP", "AED", "AOA", "ARS", "AWG", "AZN", "AUD", "BGN", "BHD", "BTN",
    "BRL", "BSD", "BWP", "BIF", "CAD", "CHF", "CLP", "COP", "CRC", "CVE",
    "CZK", "DKK", "DZD", "DOP", "EGP", "EUR", "ETB", "FJD", "GBP", "GTQ",
    "GMD", "GEL", "GHS", "GTQ", "HKD", "HRK", "HUF", "HNL", "IDR", "ILS",
    "INR", "ISK", "JPY", "KRW", "KZT", "KGS", "MXN", "MYR", "MGA", "MWK",
    "MYR", "MNT", "MAD", "MZN", "MMK", "NOK", "NZD", "NPR", "NIO", "NGN",
    "OMR", "PAB", "PEN", "PHP", "PKR", "PLN", "PYG", "RON", "QAR", "SAR",
    "SOS", "SEK", "SGD", "THB", "TRY", "TJS", "TMT", "TWD", "UAH", "USD",
    "UYU", "UGX", "UZS", "VND", "VUV", "ZAR", "ZMW"
  ];

  // Populate select elements with currency options
  currencyCodes.forEach(currencyCode => {
    const option1 = document.createElement("option");
    option1.value = currencyCode;
    option1.textContent = currencyCode;
    sourceCurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = currencyCode;
    option2.textContent = currencyCode;
    destinationCurrency.appendChild(option2);
  });

  convertBtn.addEventListener("click", () => {
    const isValidAmount = validateAmount();
    if (!isValidAmount) {
      return;
    }

    performConversion();
  });

  swapBtn.addEventListener("click", () => {
    // Swap the selected currencies
    const temp = sourceCurrency.value;
    sourceCurrency.value = destinationCurrency.value;
    destinationCurrency.value = temp;
  });

  function validateAmount() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid positive amount for conversion.");
      return false;
    }
    return true;
  }

  function performConversion() {
    const sourceCurrencyCode = sourceCurrency.value;
    const destinationCurrencyCode = destinationCurrency.value;
    const amount = parseFloat(amountInput.value);

    // Fetch exchange rate
    fetch("https://open.er-api.com/v6/latest")
      .then(response => response.json())
      .then(data => {
        const exchangeRate = data.rates[destinationCurrencyCode] / data.rates[sourceCurrencyCode];
        const calculationDate = new Date().toLocaleString();
        const updateDate = calculationDate;

        // Display results
        exchangeRateText.textContent = `Exchange Rate: 1 ${sourceCurrencyCode} = ${exchangeRate} ${destinationCurrencyCode}`;
        calculationDateText.textContent = `Calculation Date: ${calculationDate}`;
        // updateDateText.textContent = `Last Update Date: ${updateDate}`;
        resultAmountText.textContent = `Converted Amount: ${(amount * exchangeRate).toFixed(2)} ${destinationCurrencyCode}`;
      })
      .catch(error => console.error("Error fetching exchange rate:", error));
  }
});
