import { useQuery } from "@tanstack/react-query";
import { getVotes } from "../apis/post";

export const useFetchVotes = (voteData) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['/votes', voteData], // 객체 형태로 queryKey 전달
    queryFn: () => getVotes(voteData), // queryFn에 함수 전달
    suspense: true, // Suspense 활성화
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};