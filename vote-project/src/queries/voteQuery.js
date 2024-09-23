import { useMutation, useQuery } from "@tanstack/react-query";
import { getVote, getVotes, setRegistVote, setVoting } from "../apis/post";
import { registVote } from "../apis/auth";

// 투표 기간 리스트
export const useFetchVotes = (voteData) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['/votes', voteData], // 객체 형태로 queryKey 전달
    queryFn: () => getVotes(voteData), // queryFn에 함수 전달
    suspense: true, // Suspense 활성화
  });

  console.log(`query ${data}`);
  const { data: res } = data || {};

  return {
    data,
    res,
    isLoading,
    isError,
    error,
  };
};

// 투표 항목 조회
export const useFetchVote = (voteData) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['/vote', voteData], // 객체 형태로 queryKey 전달
    queryFn: () => getVote(voteData), // queryFn에 함수 전달
    // suspense: true, // Suspense 활성화
  });

  const { data: res } = data || {};
  return {
    data,
    res,
    isLoading,
    isError,
    error,
  };
};

// 투표 하기
export const useFetchVoting = () => {
  const mutation = useMutation({
    mutationFn: (voteData) => setVoting(voteData), // mutation 함수 전달
  });

  return {
    ...mutation, // mutation의 모든 값을 반환 (data, isLoading, isError, error 등)
  };
};



export const useFetchRegistVote = (voteData) => {
  const mutation = useMutation({
    mutationFn: () => setRegistVote(voteData), // mutation 함수 전달
  });

  return {
    ...mutation, // mutation의 모든 값을 반환 (data, isLoading, isError, error 등)
  };
};


// export const userFetchRegist = (registData) => {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['/regist', registData],
//     queryFn: () => registVote(registData),
//   });

//   return {
//     data,
//     isLoading,
//     isError,
//     error,
//   }
// }