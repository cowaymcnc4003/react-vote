import { useMutation, useQuery } from "@tanstack/react-query";
import { getVote, getVotes, setRegistVote, setVoting, deleteVote, setRunoffVoting, setUpdateVote, setVoteClose } from "../apis/post";
import { registVote } from "../apis/auth";

// 투표 기간 리스트
export const useFetchVotes = (voteData, options = {}) => {
  const {
    enabled = true,
    staleTime = 0,  // 기본 staleTime
    gcTime = 0,   // 기본 cacheTime
  } = options;  // 옵션 값을 기본값으로 설정
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['/votes', voteData], // 객체 형태로 queryKey 전달
    queryFn: () => getVotes(voteData), // queryFn에 함수 전달
    suspense: false, // Suspense 활성화
    enabled, // enabled 옵션 추가
    staleTime, // staleTime 추가
    gcTime, // cacheTime 추가
  });
  const { data: res } = data || {};

  return {
    data,
    res,
    isLoading,
    isError,
    error,
    refetch
  };
};

// 투표 항목 조회
export const useFetchVote = (voteData) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['/vote', voteData], // 객체 형태로 queryKey 전달
    queryFn: () => getVote(voteData), // queryFn에 함수 전달
    enabled: !!voteData.voteId,
    // suspense: true, // Suspense 활성화
    cacheTime: 0,  // 캐시 비활성화
    staleTime: 0,  // 항상 신선한 데이터 유지
    initialData: undefined,  // 캐시된 초기 데이터 무시
  });

  const { data: res } = data || {};
  return {
    data,
    res,
    isLoading,
    isError,
    error,
    refetch,
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

// 투표 등록
export const useFetchRegistVote = () => {
  const mutation = useMutation({
    mutationFn: (voteData) => setRegistVote(voteData), // mutation 함수 전달
  });

  return {
    ...mutation, // mutation의 모든 값을 반환 (data, isLoading, isError, error 등)
  };
};

// 투표 항목 삭제
export const useFetchDeleteVote = () => {
  const mutation = useMutation({
    mutationFn: (voteId) => deleteVote(voteId), // mutation 함수 전달
  });

  return {
    ...mutation, // mutation의 모든 값을 반환 (data, isLoading, isError, error 등)
  };
};

export const useFetchRunoffVoting = () => {
  const mutation = useMutation({
    mutationFn: (voteData) => setRunoffVoting(voteData), // mutation 함수 전달
  });

  return {
    ...mutation, // mutation의 모든 값을 반환 (data, isLoading, isError, error 등)
  };
};

// 투표 종료
export const useFetchVoteClose = () => {
  const mutation = useMutation({
    mutationFn: (voteId) => setVoteClose(voteId), // mutation 함수 전달
  });

  return {
    ...mutation, // mutation의 모든 값을 반환 (data, isLoading, isError, error 등)
  };
};

// 투표 수정
export const useFetchUpdateVote = () => {
  const mutation = useMutation({
    mutationFn: (voteData) => setUpdateVote(voteData), // mutation 함수 전달
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