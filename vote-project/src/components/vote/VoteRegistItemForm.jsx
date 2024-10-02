import { useEffect, useState } from 'react';

const VoteRegistItemForm = ({ voteItemArr, voteItemTitle, onClickVoteItemTitleDelete, onVoteTitleEdit, voteId }) => {
  // 로컬 상태로 voteItemTitle 관리
  const [editableTitle, setEditableTitle] = useState(voteItemTitle);

  const handleInputChange = (e) => {
    const updatedTitle = e.target.value;
    setEditableTitle(updatedTitle);
    onVoteTitleEdit(voteItemTitle, updatedTitle);  // 변경된 제목 전달
  };

  useEffect(() => {
    setEditableTitle(voteItemTitle);
  }, [voteItemArr]);

  return (
    <div className="w-[300px] mr-4 ml-4 bg-gray-300 py-2 break-words flex justify-between">
      {voteId ? (
        <input
          type="text"
          value={editableTitle}
          onChange={handleInputChange}  // 수정된 제목을 상태에 반영
          className="ml-3 w-[280px]" // 고정된 너비 설정
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
