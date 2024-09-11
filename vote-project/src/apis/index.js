import axios from "axios";
import { setInterceptors } from './common/interceptors';

function createInstance() {
  return axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  })

}

function createVoteInstance() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  })
  return setInterceptors(instance);
}

export const instance = createInstance();
export const voteInstance = createVoteInstance();
