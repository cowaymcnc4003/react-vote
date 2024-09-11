import { instance } from "./index";

function loginVote(userData) {
  return instance.post('login', userData);
}

function registerVote() { }

export { loginVote }