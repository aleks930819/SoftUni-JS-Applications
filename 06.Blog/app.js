const BASE_URL = 'http://localhost:3030/jsonstore/blog';

function attachEvents() {
  document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
  document.getElementById('btnViewPost').addEventListener('click', displayPost);
}

attachEvents();

async function displayPost() {
  const selectedId = document.getElementById('posts').value;

  const [post, comments] = await Promise.all([
    getPostById(selectedId),
    getCommentsById(selectedId),
  ]);

  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-body').textContent = post.body;

  const ulElement = document.getElementById('post-comments');
  ulElement.replaceChildren();

  comments.forEach((c) => {
    const liElement = document.createElement('li');
    liElement.textContent = c.text;
    ulElement.appendChild(liElement);
  });
}

async function getAllPosts() {
  const url = `${BASE_URL}/posts`;
  const res = await fetch(url);
  const data = await res.json();

  const selectElement = document.getElementById('posts');

  selectElement.replaceChildren();

  Object.values(data).forEach((p) => {
    const optionElement = document.createElement('option');
    optionElement.value = p.id;
    optionElement.textContent = p.title;
    selectElement.appendChild(optionElement);
  });
}

async function getPostById(postId) {
  const url = `${BASE_URL}/posts/${postId}`;

  const res = await fetch(url);
  const data = await res.json();

  return data;
}

async function getCommentsById(postId) {
  const url = `${BASE_URL}/comments`;

  const res = await fetch(url);
  const data = await res.json();

  const comments = Object.values(data).filter((c) => c.postId === postId);

  return comments;
}
