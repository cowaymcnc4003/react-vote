import { create } from "zustand";
import { getAuthFromCookie } from "../util/cookies";
import { devtools, persist } from 'zustand/middleware';

export const useVoteStore = create(devtools(
  persist(
    (set) => ({
      userInfo: {},
      token: getAuthFromCookie() || '', // token 초기값 설정
      setUserInfo: (context) => set((state) => ({ ...state, userInfo: context })), // userInfo 상태 업데이트
      setToken: (token) => set((state) => ({ ...state, token })), // token 상태 업데이트
      selectedDate: new Date(),
      setSelectedDate: (selectedDate) => set((state) => ({ ...state, selectedDate })),
      selectedVoteState: 'ALL',
      setSelectedVoteState: (selectedVoteState) => set((state) => ({ ...state, selectedVoteState })),
    }),
    {
      name: 'voteUserInfo', // 로컬스토리지에 저장되는 이름
    }
  ),
  { name: "VoteStore" } // devtools 설정
));

export const errStore = create((set) => ({
  error: null,
  setError: (error) => set({ error }),
}));
