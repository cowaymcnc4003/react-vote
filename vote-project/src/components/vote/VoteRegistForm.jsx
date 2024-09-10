const VoteRegistForm = () => {
  return (
    <div className="mx-auto mt-10 mr-10 ml-10 flex bg-gray-300 flex-col justify-center rounded-md">
      <div className="bg-gray-300 mr-10 ml-10 flex flex-wrap justify-center">
        <div className="mr-5 ml-5 mb-5 mt-5 bg-gray-200 border border-gray-400">
          <div className="py-5 px-10 bg-gray-300 text-center" ><span className='font-bold'>투표 항목</span></div>
          <div className="bg-gray-200 gap-4 mx-auto py-4 flex flex-1 flex-col items-center">
            <div className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words flex justify-between">
              <span className='ml-5 font-sans'>라이 짬뽕</span>
              <button className='mr-5'>삭제</button>
            </div>
            <div className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words flex justify-between">
              <span className='ml-5 font-sans'>라이 짬뽕</span>
              <button className='mr-5'>삭제</button>
            </div>
            <div className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words flex justify-between">
              <span className='ml-5 font-sans'>라이 짬뽕</span>
              <button className='mr-5'>삭제</button>
            </div>
            <div className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words flex justify-between">
              <span className='ml-5 font-sans'>라이 짬뽕</span>
              <button className='mr-5'>삭제</button>
            </div>
            <div className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words flex justify-between">
              <span className='ml-5 font-sans'>라이 짬뽕</span>
              <button className='mr-5'>삭제</button>
            </div>
          </div>
          <div className="pb-4 break-words flex justify-center">
            <div className='gap-2  flex font-sans'>
              <input placeholder="투표 항목 추가" className="w-[220px]" type="text" /><button className='bg-blue-400 h-8 w-20 rounded-md text-white'>추가</button>
            </div>
          </div>
        </div>
        <div className="w-[400px] mr-5 ml-5 mb-5 mt-5 bg-gray-200 border border-gray-400">
          {/* <div className="py-5 px-10 bg-gray-300 text-center" ><span className='font-bold'>투표 추가</span></div> */}
          <div className="bg-gray-200 gap-4 mx-auto py-5 flex flex-1 flex-col">
            <div className="w-[135px] mr-4 ml-4  py-2 break-words">
              <div className='gap-2 ml-5 flex flex-col font-sans'>
                <span>시작 날짜</span>
                <input type="date" />
                <span>종료 날짜</span>
                <input type="date" />
              </div>
            </div>
            <div className="w-[250px] ml-4 py-2 break-words">
              <div className='gap-2 ml-5 flex flex-col font-sans'>
                <span>제목</span>
                <input type="text" />
              </div>
              <div className='gap-2 ml-5 mt-3 flex flex-col font-sans'>
                <span>작성자</span>
                <input type="text" />
              </div>
            </div>
            <div className="w-[250px] ml-4  py-2 break-words">
              <div className='gap-2 ml-5 flex flex-col font-sans'>
                <span>중복 투표 <input type="checkbox" /></span>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="mx-auto px-6 py-5">
        <button className='bg-blue-400 h-10 w-40 rounded-md text-white'>등록</button>
      </div>
    </div>
  );
};

export default VoteRegistForm;