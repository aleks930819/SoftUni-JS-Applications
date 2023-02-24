function lockedProfile() {
  const main = document.getElementById('main');
  const url = `http://localhost:3030/jsonstore/advanced/profiles`;

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    Object.values(data).forEach((x) => createProfile(x));
  };

  fetchData();

  const createProfile = (data) => {
    const div = document.createElement('div');
    div.classList.add('profile');

    div.innerHTML = `
        <img src="./iconProfile2.png" class="userIcon" />
        <label>Lock</label>
        <input type="radio" name="user1Locked" value="lock" checked>
        <label>Unlock</label>
        <input type="radio" name="user1Locked" value="unlock"><br>
        <hr>
        <label>Username</label>
        <input type="text" name="user1Username" value=${data.username} disabled readonly />
        <div class="user1Username">
            <hr>
            <label>Email:</label>
            <input type="email" name="user1Email" value=${data.email} disabled readonly />
            <label>Age:</label>
            <input type="text" name="user1Age" value=${data.age} disabled readonly />
        </div>
        <button>Show more</button>
        `;

    main.appendChild(div);
    div.querySelector('button').addEventListener('click', showMore);
  };

  const showMore = (e) => {
    const profile = e.target.parentNode;
    const lockBtn = profile.querySelectorAll('input[value="lock"]');

    const div = profile.querySelector('div');
    const btn = profile.querySelector('button');

    if (lockBtn[0].checked) {
      return;
    } else {
      if (btn.textContent === 'Show more') {
        div.style.display = 'block';
        btn.textContent = 'Hide it';
      } else {
        div.style.display = 'none';
        btn.textContent = 'Show more';
      }
    }
  };
}
