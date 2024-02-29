function convertToFahrenheit() {
    const input = document.getElementById('temperature-input').value;
    const result = (input * 9/5) + 32;
    document.getElementById('conversion-result').textContent = `${result.toFixed(2)} °F`;
}

function convertToCelsius() {
    const input = document.getElementById('temperature-input').value;
    const result = (input - 32) * 5/9;
    document.getElementById('conversion-result').textContent = `${result.toFixed(2)} °C`;
}
