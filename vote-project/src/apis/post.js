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
// 결선 투표 업데이트
function setRunoffVoting(voteData) {
  return voteInstance.put('runoffVoting', voteData);
}

// 투표 종료
function setVoteClose(voteId) {
  return voteInstance.put('voteClose', voteId);
}

function deleteVote(voteId) {
  return voteInstance.post('deleteVote', voteId);
}
// 투표 수정
function setUpdateVote(voteData) {
  return voteInstance.post('updateVote', voteData);
}

export { getVotes, setRegistVote, getVote, setVoting, deleteVote, setRunoffVoting, setUpdateVote, setVoteClose }