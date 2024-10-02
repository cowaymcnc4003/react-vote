import { instance } from "./index";

function loginVote(userData) {
  return instance.post('login', userData);
}

function registVote(registData) {
  return instance.post('regist', registData);
}

function guestLogin(userData) {
  return instance.post('guestLogin', userData);
}


export { loginVote, registVote, guestLogin }