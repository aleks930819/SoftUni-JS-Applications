async function solve() {
  const url = 'http://localhost:3030/jsonstore/collections/students';

  const table = document.querySelector('#results tbody');

  const response = await fetch(url);
  const data = await response.json();

  Object.values(data).forEach((s) => {
    const firstName = s.firstName;
    const lastName = s.lastName;
    const facNumber = s.facultyNumber;
    const grade = s.grade;

    const tr = document.createElement('tr');

    const firstNameCell = tr.insertCell(0);
    firstNameCell.textContent = firstName;

    const lastNameCell = tr.insertCell(1);
    lastNameCell.textContent = lastName;

    const facNumberCell = tr.insertCell(2);
    facNumberCell.textContent = facNumber;

    const gradeCell = tr.insertCell(3);
    gradeCell.textContent = grade;

    table.appendChild(tr);
  });

  const submitBtn = document.getElementById('submit');
  submitBtn.addEventListener('click', onClickSubmit);

  async function onClickSubmit(ev) {
    ev.preventDefault();

    const firstNameInput = document.getElementsByName('firstName')[0];
    const lastNameInput = document.getElementsByName('lastName')[0];
    const facNumberInput = document.getElementsByName('facultyNumber')[0];
    const gradeInput = document.getElementsByName('grade')[0];

    if (isNaN(facNumberInput.value) && isNaN(gradeInput.value)) {
      return alert('Wrong input data!');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'aplication/json' },
      body: JSON.stringify({
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        facultyNumber: facNumberInput.value,
        grade: gradeInput.value,
      }),
    });
    const tr = document.createElement('tr');

    const firstNameCell = tr.insertCell(0);
    firstNameCell.textContent = firstNameInput.value;

    const lastNameCell = tr.insertCell(1);
    lastNameCell.textContent = lastNameInput.value;

    const facNumberCell = tr.insertCell(2);
    facNumberCell.textContent = facNumberInput.value;

    const gradeCell = tr.insertCell(3);
    gradeCell.textContent = gradeInput.value;

    table.appendChild(tr);
    return response;
  }
}
solve();
