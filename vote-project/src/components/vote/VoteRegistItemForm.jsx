import { useState } from 'react';

const VoteRegistItemForm = ({ voteItemTitle, onClickVoteItemTitleDelete, onVoteTitleEdit, voteId }) => {
  // 로컬 상태로 voteItemTitle 관리
  const [editableTitle, setEditableTitle] = useState(voteItemTitle);

  const handleInputChange = (e) => {
    const updatedTitle = e.target.value;
    setEditableTitle(updatedTitle);
    onVoteTitleEdit(voteItemTitle, updatedTitle);  // 변경된 제목 전달
  };

  return (
    <div className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words flex justify-between">
      {voteId ? (
        <input
          type="text"
          value={editableTitle}
          onChange={handleInputChange}  // 수정된 제목을 상태에 반영
        />
      ) : (
        <span className="ml-5 font-sans">{voteItemTitle}</span>
      )}
      <div>
        <button className="mr-5" onClick={() => onClickVoteItemTitleDelete(voteItemTitle)}>삭제</button>
      </div>
    </div>
  );
};

export default VoteRegistItemForm;
