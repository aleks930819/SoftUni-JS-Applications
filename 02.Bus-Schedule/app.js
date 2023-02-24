function solve() {
  let info = document.getElementById('info');
  let departBTN = document.getElementById('depart');
  let arrivedBTN = document.getElementById('arrive');

  let stop = {
    next: 'depot',
  };

  async function depart() {
    departBTN.disabled = true;

    const BASE_URL = 'http://localhost:3030/jsonstore/';

    const url = `${BASE_URL}/bus/schedule/${stop.next}`;
    const res = await fetch(url);

    stop = await res.json();

    info.textContent = `Next stop is ${stop.name}`;
    arrivedBTN.disabled = false;
  }

  function arrive() {
    departBTN.disabled = false;

    info.textContent = `Arravied at ${stop.name}`;
    arrivedBTN.disabled = true;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
