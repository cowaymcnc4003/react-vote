import { useNavigate } from "react-router-dom";
import { useVoteStore } from "../../store/voteStore";
import { useEffect, useState } from "react";
import { getVotes } from "../../apis/post";
import { useFetchVotes } from "../../queries/voteQuery";
import VoteListItem from "./VoteListItem";

const VoteListForm = () => {
  const nav = useNavigate();
  const [seleteDate, setSeleteDate] = useState(new Date());
  const onClickNavigateHandler = (e) => {
    e.stopPropagation();
    const navigatePath = e.target.getAttribute('path');
    nav(navigatePath);
  };

  const onClickChangeData = (type) => {

    if (type == 'prev') {
      setSeleteDate(new Date(seleteDate.getFullYear(), seleteDate.getMonth() - 1));
    } else {
      setSeleteDate(new Date(seleteDate.getFullYear(), seleteDate.getMonth() + 1));
    }
  };

  const { userInfo } = useVoteStore();
  console.log(userInfo);


  const onClickBack = () => {
    nav(-1);
  };
  const { data, res, isLoading, isError, error } = useFetchVotes({
    "gubun": "mcnc",
    "userSeq": 0,
    "startDate": new Date(seleteDate.getFullYear(), seleteDate.getMonth(), 1).getTime(), // 현재 월의 첫 날
    "endDate": new Date(seleteDate.getFullYear(), seleteDate.getMonth() + 1, 0, 23, 59, 59).getTime()
  });
  console.log(res.voteData);

  return (
    <div className="mx-auto mt-10 mr-10 ml-10 flex bg-gray-300 flex-col justify-center rounded-md">
      <div className="mx-auto px-5 py-3 text-lg">
        <button onClick={() => onClickChangeData('prev')} className='px-3 py-3 bg-neutral-400 font-bold rounded-l-lg' >{'<'}</button>
        <button className='px-5 py-3 bg-gray-200 font-bold'> {`${seleteDate.getFullYear()}.${String(seleteDate.getMonth() + 1).padStart(2, '0')}`}</button>
        <button onClick={() => onClickChangeData('next')} className='px-3 py-3 bg-neutral-400 font-bold rounded-r-lg'>{'>'}</button>
      </div>
      <div className="bg-gray-300 mr-10 ml-10 flex flex-wrap">
        {
          res.voteData.map((item, i) => {
            return <VoteListItem key={i} {...item} />
          })
        }
      </div>
      <div className="mx-auto px-6 py-5">
        <button className='bg-blue-400 h-10 w-40 rounded-md text-white' path="/voteRegist" onClick={onClickNavigateHandler}>추가</button>
      </div>
    </div>
  );
};

export default VoteListForm;