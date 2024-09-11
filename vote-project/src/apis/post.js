import { voteInstance } from "./index";

function getVotes(voteData) {
  return voteInstance.post('vote', voteData);
}


export { getVotes }