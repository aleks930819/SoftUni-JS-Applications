const url = 'http://localhost:3030/jsonstore/messenger';
let messages = document.getElementById('messages');

function attachEvents() {
  const sendBtn = document.getElementById('submit');
  const refreshBtn = document.getElementById('refresh');

  sendBtn.addEventListener('click', sendMessage);
  refreshBtn.addEventListener('click', refreshMessages);
}

async function sendMessage() {
  const author = document.getElementById('author');
  const content = document.getElementById('content');

  let message = {
    author: author.value,
    content: content.value,
  };

  let response = await fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  });

  if (response.ok) {
    author.value = '';
    content.value = '';
  }
}

async function refreshMessages() {
  let response = await fetch(url);
  let data = await response.json();

  messages.value = Object.values(data)
    .map((m) => `${m.author}: ${m.content}`)
    .join('\n');


}

attachEvents();
