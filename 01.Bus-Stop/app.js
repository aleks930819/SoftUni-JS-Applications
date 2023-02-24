async function getInfo() {
  const inputField = document.getElementById('stopId');
  const stopNameElement = document.getElementById('stopName');
  const busListElement = document.getElementById('buses');

  const busID = inputField.value;
  const BASE_URL = 'http://localhost:3030/jsonstore/';

  const url = `${BASE_URL}/bus/businfo/${busID}`;

  try {
    const res = await fetch(url);

    if (res.status !== 200) {
      alert('Bus is not found!');
    }
    const data = await res.json();
    stopNameElement.innerText = data?.name;

    Object.entries(data.buses).forEach((b) => {
      const liElement = document.createElement('li');
      liElement.innerText = `Bus ${b[0]} arrives in  ${b[1]} minutes `;
      busListElement.appendChild(liElement);
    });
    
  } catch (error) {
    stopNameElement.innerText = 'Error';
  }
}
