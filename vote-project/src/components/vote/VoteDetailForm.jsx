const VoteDetailForm = () => {
  return (
    <div className="mx-auto mt-10 mr-10 ml-10 flex bg-gray-300 flex-col justify-center rounded-md">
      <div className="bg-gray-300 mr-10 ml-10 flex flex-wrap justify-center">
        <div className="mr-5 ml-5 mb-5 mt-5 bg-gray-200 border border-gray-400">
          <div className="py-5 px-10 bg-gray-300 text-center" ><span className='font-bold'>점심 식사</span></div>
          <div className="pt-3 px-5 flex justify-between">
            <span>작성자 : {'차태중'} </span>
            <span>투표기간 : {'2024.08.12 ~ 2024.08.12'} </span>
          </div>
          <div className="bg-gray-200 gap-4 mx-auto py-4 flex flex-1 flex-col items-center">
            <div className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words">
              <input className="ml-5" type="checkbox"></input>
              <span className='ml-5 font-sans'>라이 짬뽕</span>
            </div>
            <div className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words">
              <input className="ml-5" type="checkbox"></input>
              <span className='ml-5 font-sans'>전주 회관</span>
            </div>
            <div className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words">
              <input className="ml-5" type="checkbox"></input>
              <span className='ml-5 font-sans'>제비 파스타</span>
            </div>
            <div className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words">
              <input className="ml-5" type="checkbox"></input>
              <span className='ml-5 font-sans'>마부 마라탕</span>
            </div>
          </div>
        </div>

        <div className="mr-5 ml-5 mb-5 mt-5 bg-gray-200 border border-gray-400">
          <div className="py-5 px-10 bg-gray-300 text-center" ><span className='font-bold'>점심 식사</span></div>
          <div className="pt-3 px-5 flex justify-between">
            <span>작성자 : {'차태중'} </span>
            <span>투표기간 : {'2024.08.12 ~ 2024.08.12'} </span>
          </div>
          <div className="bg-gray-200 gap-4 mx-auto py-4 flex flex-1 flex-col items-center">
            <div className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words">
              <span className='ml-5 font-sans'>라이 짬뽕</span>
              <span>({'1'}표)</span>
            </div>
            <div className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words">
              <span className='ml-5 font-sans'>전주 회관</span>
              <span>({'1'}표)</span>
            </div>
            <div className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words">
              <span className='ml-5 font-sans'>제비 파스타</span>
              <span>({'2'}표)</span><span>🌠</span>
            </div>
            <div className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words">
              <span className='ml-5 font-sans'>마부 마라탕</span>
              <span>({'1'}표)</span>
            </div>
          </div>
        </div>

      </div>
      <div className="mx-auto px-6 py-5">
        <button className='bg-blue-400 h-10 w-40 rounded-md text-white'>확인</button>
      </div>
    </div>
  );
};

export default VoteDetailForm;