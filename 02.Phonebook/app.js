function attachEvents() {
  const url = 'http://localhost:3030/jsonstore/phonebook';

  const loadBtn = document.getElementById('btnLoad');
  const createBtn = document.getElementById('btnCreate');

  const phonebookView = document.getElementById('phonebook');

  const personField = document.getElementById('person');
  const phoneField = document.getElementById('phone');

  loadBtn.addEventListener('click', onClickLoad);
  createBtn.addEventListener('click', onClickCreate);

  async function onClickLoad() {
    const res = await fetch(url);
    const data = await res.json();
    phonebookView.innerHTML = ' ';
    const dataObject = Object.values(data);

    for (const el of dataObject) {
      const li = createElement('li', `${el.person} ${el.phone}`, phonebookView);
      li.setAttribute('id', el._id);

      const deleteBtn = createElement('button', 'DELETE', li);
      deleteBtn.addEventListener('click', deleteContact);
    }
  }

  async function onClickCreate() {
    const [newPerson, newPhone] = [personField.value, phoneField.value];
    if (newPerson && newPhone) {
      await request(url, 'POST', { person: newPerson, phone: newPhone });
      personField.value = ' ';
      phoneField.value = ' ';
      loadBtn.click();
    }
  }

  async function deleteContact(ev) {
    const parentId = ev.target.parentNode.id;
    ev.target.parentNode.remove();

    await request(`${url}/${parentId}`, 'DELETE');
  }

  function createElement(type, text, parent) {
    const element = document.createElement(type);
    element.textContent = text;
    parent.appendChild(element);

    return element;
  }

  async function request(url, requestType, body) {
    const options = {
      method: requestType,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, options);

    return response.json();
  }
}

attachEvents();
