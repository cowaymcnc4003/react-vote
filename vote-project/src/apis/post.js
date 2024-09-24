import { voteInstance } from "./index";

function getVotes(voteData) {
  return voteInstance.post('votes', voteData);
}

function getVote(voteData) {
  return voteInstance.post('vote', voteData);
}

function setRegistVote(voteData) {
  return voteInstance.put('vote', voteData);
}

function setVoting(voteData) {
  return voteInstance.post('voting', voteData);
}


export { getVotes, setRegistVote, getVote, setVoting }