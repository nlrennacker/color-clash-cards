function register_execute() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  const register_info = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
    }),
  };

  fetch('/api/users', register_info)
    .then((response) => {
      if (response.status == 201) {
        document.location.href = '/';
      } else {
        document.location.reload();
        alert('This account already exists.');
      }
    })
    .catch((err) => console.log(err));
}

function validate() {
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirm_pass').value;
  if (password != confirmPassword) {
    alert('Passwords do not match.');
    return false;
  }
  console.log('Registraton successful.');
  register_execute();
  return true;
}
