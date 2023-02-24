function solution() {
  const url = 'http://localhost:3030/jsonstore/advanced/articles/list';

  const main = document.getElementById('main');

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    Object.values(data).forEach((x) => createAccordion(x));
  };

  fetchData();

  const createAccordion = (data) => {
    const div = document.createElement('div');
    div.classList.add('accordion');

    div.innerHTML = `
        <div class="head">
        <span>${data.title}</span>
        <button class="button" id=${data._id}>More</button>
    </div>
    <div class="extra">
        <p></p>
    </div>
    `;
    main.appendChild(div);
    div.querySelector('button').addEventListener('click', showMore);
  };

  const showMore = async (e) => {
    const id = e.target.id;
    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
    const response = await fetch(url);
    const data = await response.json();

    const div = e.target.parentNode.parentNode.querySelector('div .extra');
    const btn = e.target
    ;
    if (btn.textContent === 'More') {
      div.style.display = 'block';
      div.querySelector('p').textContent = data.content;
      btn.textContent = 'Less';
    } else {

      div.style.display = 'none';
      btn.textContent = 'More';
      
    }
  };
}

solution();
