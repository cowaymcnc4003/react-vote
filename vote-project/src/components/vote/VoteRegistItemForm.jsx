const VoteRegistItemForm = ({voteItemTitle }) => {
  return (
    <div className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words flex justify-between">
      <span className='ml-5 font-sans'>{voteItemTitle}</span>
      <button className='mr-5'>삭제</button>
    </div>
  );
};

export default VoteRegistItemForm;