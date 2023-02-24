async function attachEvents() {
  const BASE_URL = 'http://localhost:3030/jsonstore/forecaster';
  const locationsURL = `${BASE_URL}/locations`;

  const inputField = document.getElementById('location');
  const forecastDiv = document.getElementById('forecast');
  const currentDiv = document.getElementById('current');

  const submitBTN = document.getElementById('submit');

  submitBTN.addEventListener('click', async () => {
    try {
      const res = await fetch(locationsURL);
      const data = await res.json();

      const location = data.find((l) => l.name === inputField.value);

      const currentConditionsURL = `${BASE_URL}/today/${location.code}`;
      const upcomingConditionsURL = `${BASE_URL}/upcoming/${location.code}`;

      const currentConditionsRes = await fetch(currentConditionsURL);
      const currentConditionsData = await currentConditionsRes.json();

      console.log(currentConditionsData);

      const upcomingConditionsRes = await fetch(upcomingConditionsURL);
      const upcomingConditionsData = await upcomingConditionsRes.json();

      forecastDiv.style.display = 'block';

      const currentSymbol = getSymbol(currentConditionsData.forecast.condition);

      const forcastDiv = document.createElement('div');
      forcastDiv.classList.add('forecasts');

      forcastDiv.innerHTML = `
      <span class="condition symbol">${currentSymbol}</span>
      <span class="condition">
        <span class="forecast-data">${currentConditionsData.name}</span>
        <span class="forecast-data">${currentConditionsData.forecast.low}&#176;/${currentConditionsData.forecast.high}&#176;</span>
        <span class="forecast-data">${currentConditionsData.forecast.condition}</span>
      </span>
      `;

      currentDiv.appendChild(forcastDiv);

      const upcomingDiv = document.getElementById('upcoming');

      const forcastInfoDiv = document.createElement('div');
      forcastInfoDiv.classList.add('forecast-info');

      upcomingConditionsData.forecast.forEach((f) => {
        const upcomingSymbol = getSymbol(f.condition);
        const spanElement = document.createElement('span');
        spanElement.classList.add('upcoming');

        spanElement.innerHTML = `
        <span class="symbol">${upcomingSymbol}</span>
        <span class="forecast-data">${f.low}&#176;/${f.high}&#176;</span>
        <span class="forecast-data">${f.condition}</span>
        `;

        forcastInfoDiv.appendChild(spanElement);
      });

      upcomingDiv.appendChild(forcastInfoDiv);
    } catch (error) {
      forecastDiv.style.display = 'block';
      forecastDiv.textContent = 'Error';
    }
  });
}

function getSymbol(condition) {
  if (condition === 'Sunny') {
    return '&#x2600;';
  } else if (condition === 'Partly sunny') {
    return '&#x26C5;';
  } else if (condition === 'Overcast') {
    return '&#x2601;';
  } else if (condition === 'Rain') {
    return '&#x2614;';
  } else if (condition === 'Degrees') {
    return '&#176;';
  }
}

attachEvents();
