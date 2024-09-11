import { voteInstance } from "./index";

function getVotes(voteData) {
  return voteInstance.post('votes', voteData);
}


export { getVotes }