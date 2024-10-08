import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoteStore } from "../../store/voteStore";
import { useFetchDeleteVote } from "../../queries/voteQuery";

const VoteListItem = ({ startDate, endDate, votename, voteId, userSeq, voteState, onVoteDelete, duplicated }) => {
  const nav = useNavigate();
  const { userInfo } = useVoteStore();

  const startDataFormat = `${String(new Date(startDate).getMonth() + 1).padStart(2, '0')}.${String(new Date(startDate).getDate()).padStart(2, '0')}`;
  const endDataFormat = `${String(new Date(endDate).getMonth() + 1).padStart(2, '0')}.${String(new Date(endDate).getDate()).padStart(2, '0')}`;

  const onClickNavigateHandler = (e) => {
    e.stopPropagation();
    let navigatePath = e.currentTarget.getAttribute('path');
    let voteParam = "";
    if (navigatePath === '/voteRegist') {
      voteParam = JSON.stringify({
        voteId
      });
    } else {
      voteParam = voteId;
    }
    navigatePath = navigatePath + "/" + voteParam;
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
    <div
      // className={`mr-5 ml-5 mb-5 mt-5 pt-4 text-center rounded-md w-40 flex flex-col justify-between h-full ${voteState === 'END' ? 'bg-gray-300 opacity-50 cursor-not-allowed' : 'bg-gray-200'} `}
      className='mr-5 ml-5 mb-5 mt-5 pt-4 text-center rounded-md w-40 flex flex-col justify-between h-full bg-gray-200'
      path="/voteDetail"
      // onClick={voteState !== 'END' ? onClickNavigateHandler : null}
      onClick={onClickNavigateHandler}
    >
      <div className='flex items-center justify-center'>
        <span className='font-bold' >{voteState === 'END' ? '종료' : '진행중'}</span>

      </div>
      <div className="flex items-center justify-center">
        <span className='font-bold mr-1 ml-1'>{`${startDataFormat} ~ ${endDataFormat}`}</span>
        {duplicated && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        )}
      </div>
      <div className="mb-2 max-w-xs break-words"><span className='font-sans'>{votename}</span></div>
      <div className="mt-auto">
        {userInfo.userSeq === userSeq && (
          <div className="flex justify-between">
            <button className='bg-blue-300 w-20 rounded-bl-lg' path="/voteRegist" onClick={onClickNavigateHandler}>수정</button>
            <button className='bg-gray-400 w-20 rounded-br-lg' path="/voteMain" onClick={onClickDeleteVote}>삭제</button>
          </div>
        )}
      </div>
    </div >
  );
};

export default VoteListItem;
