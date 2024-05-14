import axios from 'axios';

const API_KEY = 'AIzaSyDXtxnHdpBSsWTvuqHvHZmug1keFKRIYm0';

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  const userId = response.data.localId;
  console.log(response);
  return {token, userId};
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}
