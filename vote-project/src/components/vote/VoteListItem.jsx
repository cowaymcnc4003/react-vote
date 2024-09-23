import React from 'react';
import { useNavigate } from 'react-router-dom';

const VoteListItem = ({ startDate, endDate, votename, voteId }) => {
  const nav = useNavigate();
  const startDataFormat = `${String(new Date(startDate).getMonth() + 1).padStart(2, '0')}.${String(new Date(startDate).getDate()).padStart(2, '0')}`;
  const endDataFormat = `${String(new Date(endDate).getMonth() + 1).padStart(2, '0')}.${String(new Date(endDate).getDate()).padStart(2, '0')}`;
  const onClickNavigateHandler = (e) => {
    e.stopPropagation();
    let navigatePath = e.currentTarget.getAttribute('path');  // e.target 대신 e.currentTarget 사용
    navigatePath = navigatePath + "/" + voteId;
    console.log(navigatePath);
    nav(navigatePath);
  };
  return (
    <div className="mr-5 ml-5 mb-5 mt-5 bg-gray-200 pt-4 text-center rounded-md" path="/voteDetail" onClick={onClickNavigateHandler}>
      {/* <div className="mb-2" ><span className='font-bold'></span></div> */}
      <div className="mb-2" ><span className='font-bold'>{`${startDataFormat} ~ ${endDataFormat}`}</span></div>
      <div className="mb-2 max-w-xs break-words"><span className='font-sans'>{votename}</span></div>
      <div>
        <button className='bg-blue-300 w-20 rounded-bl-lg' path="/voteRegist" onClick={onClickNavigateHandler}>수정</button>
        <button className='bg-gray-400 w-20 rounded-br-lg'>삭제</button>
      </div>
    </div>

  );
};

export default VoteListItem;