const message_container = document.querySelector('.chat-field');
const messageButton = document.querySelector('.input-button');
const input = document.querySelector('.input-field-chat');
const creatGameButton = document.querySelector('.new-game-button');
const gameList = document.querySelector('.box-game-list');
const startGameButton = document.querySelector('.start-game');
const refreshGameListButton = document.querySelector('.refresh-games-button');
const logoutButton = document.querySelector('.logout-button');
const socket = io({
  path: '/global-chat/',
});


messageButton.addEventListener('click', addMessage);
creatGameButton.addEventListener('click', createGame);
refreshGameListButton.addEventListener('click', refreshGameList);
logoutButton.addEventListener('click', logout);

socket.on('message', (data) => {
  message_container.innerHTML += createContainer(data.username, data.message);
});

window.onload = function populateGameList() {
  fetch('/api/games')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.games = data.games.sort(function (a, b) {
        return b['game_id'] - a['game_id'];
      });
      data.games.forEach((element) => {
        gameList.innerHTML += createGameCard(element.game_id);
      });
    })
    .catch((err) => console.log(err));
};

function createContainer(username, message) {
  return `
<div class="row comments mb-2">
<div class="col-md-2 col-sm-2 col-3 text-center user-img">
<p>&nbsp</p>
</div>
<div class="col-md-9 col-sm-9 col-9 comment rounded mb-2">
<h4 class="m-0"><a href="#">${username}</a></h4>
<time class="text-white ml-3"></time>
<like></like>
<p class="mb-0 text-white">${message}</p>
</div>
</div>

`;
}

function logout() {
  console.log('HERE');
  fetch('/api/logout', {
    method: 'POST',
    credentials: 'include',
  })
    .then((response) => {
      if (response.status == 200) {
        window.location.href = '/';
      } else {
        alert('ERROR_logout');
      }
    })
    .catch((err) => console.log(err));
}

function addMessage() {
  if (input.value === '') {
    return;
  } else {
    var message = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        message: input.value,
      }),
    };
    fetch('/api/global-chat', message).catch((err) => console.log(err));
    input.value = '';
    input.focus();
  }
}

function createGame() {
  fetch('/api/games', { method: 'POST' })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          window.location.href = `/game?game_id=${data.game_id}`;
        });
      } else {
        alert('Failed to Create Game');
      }
    })
    .catch((err) => console.log(err));
}

function createGameCard(game_id) {
    return `<div class="game-card">
            <div class="game-card-id">
                <p>GAME ROOM: ${game_id}</p>
            </div>
                <button class="join-game" onclick = "joinGame(${game_id})">JOIN GAME</button>
        </div>`;
}

function joinGame(game_id) {
  const query = `/api/games/${game_id}/join`;
  fetch(query, {
    method: 'POST',
    credentials: 'include',
  }).then((response) => {
    if (response.status == 200) {
      window.location.href = `/game?game_id=${game_id}`;
    } else {
      alert('ERROR');
    }
  });
}

function refreshGameList() {
  gameList.innerHTML = '';

  fetch('/api/games')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.games = data.games.sort(function (a, b) {
        return b['game_id'] - a['game_id'];
      });
      data.games.forEach((element) => {
        gameList.innerHTML += createGameCard(element.game_id);
      });
    })
    .catch((err) => console.log(err));
}
