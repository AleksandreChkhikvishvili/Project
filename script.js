const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');

async function fetchCurrencies() {
    const response = await fetch('https://v6.exchangerate-api.com/v6/cd957724b85da79e1d140166/latest/USD');
    const data = await response.json();
    const currencies = Object.keys(data.conversion_rates);

    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.text = currency;

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.text = currency;

        fromCurrencySelect.add(option1);
        toCurrencySelect.add(option2);
    });
}

async function convertCurrency() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = amountInput.value;

    const response = await fetch(`https://v6.exchangerate-api.com/v6/cd957724b85da79e1d140166/latest/${fromCurrency}`);
    const data = await response.json();

    if (data.result === 'success') {
        const exchangeRate = data.conversion_rates[toCurrency];
        const result = (amount * exchangeRate).toFixed(2);
        resultDiv.textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
    } else {
        resultDiv.textContent = 'Error fetching exchange rates. Please try again.';
    }
}

window.onload = fetchCurrencies;