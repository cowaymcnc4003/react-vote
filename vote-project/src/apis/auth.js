import { instance } from "./index";

function loginVote(userData) {
  return instance.post('login', userData);
}

function registVote(registData) {
  return instance.post('regist', registData);
}


export { loginVote, registVote }