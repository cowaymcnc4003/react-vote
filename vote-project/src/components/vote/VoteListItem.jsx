import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoteStore } from "../../store/voteStore";
import { useFetchDeleteVote } from "../../queries/voteQuery";

const VoteListItem = ({ startDate, endDate, votename, voteId, userSeq, onVoteDelete, duplicated }) => {
  const nav = useNavigate();
  const { userInfo } = useVoteStore();
  console.log(duplicated);

  const startDataFormat = `${String(new Date(startDate).getMonth() + 1).padStart(2, '0')}.${String(new Date(startDate).getDate()).padStart(2, '0')}`;
  const endDataFormat = `${String(new Date(endDate).getMonth() + 1).padStart(2, '0')}.${String(new Date(endDate).getDate()).padStart(2, '0')}`;

  const onClickNavigateHandler = (e) => {
    e.stopPropagation();
    let navigatePath = e.currentTarget.getAttribute('path');
    navigatePath = navigatePath + "/" + voteId;
    console.log(navigatePath);
    nav(navigatePath);
  };

  const { mutate: deleteVote, isLoading, isError } = useFetchDeleteVote();

  const onClickDeleteVote = (e) => {
    e.stopPropagation();
    const isConfirmed = window.confirm("정말로 이 투표 항목을 삭제하시겠습니까?");

    if (isConfirmed) {
      const selectedVoteId = { voteId: voteId };
      console.log("selected vote Id >>> " + voteId);

      deleteVote(selectedVoteId, {
        onSuccess: (data) => {
          console.log("투표 항목 삭제 성공: ", data);
          onVoteDelete();
        },
        onError: (error) => {
          console.error("투표 항목 삭제 실패: ", error);
        }
      });
    } else {
      console.log("투표 항목 삭제 취소.");
    }
  };


  return (
    <div className={`mr-5 ml-5 mb-5 mt-5 bg-gray-200 pt-4 text-center rounded-md w-40 flex flex-col justify-between h-full ${duplicated ? 'border-2 border-solid border-green-500 rounded-xl' : ''}`} path="/voteDetail" onClick={onClickNavigateHandler}>
      <div className="mb-2"><span className='font-bold'>{`${startDataFormat} ~ ${endDataFormat}`}</span></div>
      <div className="mb-2 max-w-xs break-words"><span className='font-sans'>{votename}</span></div>
      <div className="mt-auto">
        {userInfo.userSeq === userSeq && (
          <div className="flex justify-between">
            <button className='bg-blue-300 w-20 rounded-bl-lg' path="/voteRegist" onClick={onClickNavigateHandler}>수정</button>
            <button className='bg-gray-400 w-20 rounded-br-lg' path="/voteMain" onClick={onClickDeleteVote}>삭제</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoteListItem;
