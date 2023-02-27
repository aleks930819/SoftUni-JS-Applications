async function bookLibary() {
  const loadBtn = document.getElementById('loadBooks');
  const submitBtn = document.getElementById('submit');
  const titleFiled = document.getElementById('title');
  const authorFiled = document.getElementById('author');

  const url = 'http://localhost:3030/jsonstore/collections/books';
  const table = document.querySelector('table tbody');

  loadBtn.addEventListener('click', loadBooks);
  submitBtn.addEventListener('click', submitBook);

  async function loadBooks() {
    try {
      const response = await fetch(url);
      const data = await response.json();

      Object.entries(data).forEach((b) => {
        const title = b[1].title;
        const author = b[1].author;
        const id = b[0];
        const tr = document.createElement('tr');
        tr.setAttribute('id', id);

        const tittleCell = tr.insertCell(0);
        tittleCell.textContent = title;

        const authorCell = tr.insertCell(1);
        authorCell.textContent = author;

        const editBtn = createElement('button', 'Edit', tr);
        editBtn.addEventListener('click', editBook);

        const delteBtn = createElement('button', 'Delete', tr);
        delteBtn.addEventListener('click', deleteBook);
        table.appendChild(tr);
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async function submitBook(e) {
    e.preventDefault();
    const authorName = authorFiled.value;
    const titleName = titleFiled.value;
    if (authorName && titleName) {
      await request(url, 'POST', { author: authorName, title: titleName });
      titleFiled.value = ' ';
      authorFiled.value = ' ';
    }
  }

  async function editBook(ev) {
    const titleFiled = document.getElementById('title');
    const authorFiled = document.getElementById('author');

    const h3 = document.querySelector('h3');
    const submitBtn = document.getElementById('submit');
    h3.textContent = 'Edit FORM';
    submitBtn.textContent = 'Save';

    titleFiled.value = ev.target.parentNode.children[0].textContent;
    authorFiled.value = ev.target.parentNode.children[1].textContent;

    console.log(titleFiled.value);
    console.log(authorFiled.value);

    const parentId = ev.target.parentNode.id;

    submitBtn.addEventListener('click', async () => {
      await request(`${url}/${parentId}`, 'PUT', {
        author: authorFiled.value,
        title: titleFiled.value,
      });
    });
  }
  async function deleteBook(ev) {
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const parentId = ev.target.parentNode.id;

    await request(`${url}/${parentId}`, 'DELETE');

    ev.target.parentNode.remove();
  }

  function createElement(type, text, parent) {
    const element = document.createElement(type);
    element.textContent = text;
    parent.appendChild(element);

    return element;
  }

  async function request(url, requestType, body) {
    try {
      const options = {
        method: requestType,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(url, options);
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
}

bookLibary();
