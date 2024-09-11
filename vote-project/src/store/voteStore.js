import { create } from "zustand";
import { getAuthFromCookie } from "../util/cookies";
import { devtools } from 'zustand/middleware';

export const useVoteStore = create(devtools(
  (set) => ({
    token: getAuthFromCookie() || '',
    setToken: (token) => set((state) => ({ ...state, token })), // 상태 업데이트 방식 수정
    userInfo: {},
    setUserInfo: (context) => set((state) => ({ ...state, userInfo: context })) // 상태 업데이트 방식 수정
  }),
  { name: "VoteStore" } // devtools의 이름 설정 (선택 사항)l
));