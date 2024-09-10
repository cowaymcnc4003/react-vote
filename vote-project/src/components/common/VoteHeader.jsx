const VoteHeader = ({ title, leftChild, rightChild }) => {
  return (
    <header className="flex items-center border-b bg-gray-300 py-5">
      <div className="flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 왼쪽 영역 */}
        <div className="flex w-1/4 items-center justify-start">
          {leftChild}
          {/* <button className="bg-gray-400 px-4 py-2 mx-auto rounded text-3xl" onClick={onClickBack}>
            <span>{"<"}</span>
          </button> */}
        </div>

        {/* 중앙 영역 */}
        <div className="flex w-1/2 items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>

        {/* 오른쪽 영역 */}
        <div className="flex w-1/4 items-center justify-end">
          {rightChild}
        </div>
      </div>
    </header>
  );
};

export default VoteHeader;