import { create } from "zustand";
import { Store } from "./type/stores";

export const useMemoStore = create<Store>((set) => ({
  currentMemoId: null,
  mode: "",
  setCurrentMemoId: (newCurrentMemoId: number | null) =>
    set((state) => {
      // 새로운 ID가 null이면 전체 초기화
      if (state.mode === "memo") {
        if (newCurrentMemoId === null) {
          return { currentMemoId: null };
        }

        // 현재 상태가 null이면 새로운 배열 생성
        if (state.currentMemoId === null) {
          return { currentMemoId: [newCurrentMemoId] };
        }

        // 이미 선택된 ID라면 제거
        if (state.currentMemoId.includes(newCurrentMemoId)) {
          return {
            currentMemoId: state.currentMemoId.filter(
              (item) => item !== newCurrentMemoId
            ),
          };
        }
        return { currentMemoId: [...state.currentMemoId, newCurrentMemoId] };
      } else {
        return { currentMemoId: newCurrentMemoId ? [newCurrentMemoId] : null };
      }
    }),
  setMode: (newMode: "memo" | "achive" | "") => set({ mode: newMode }),
}));
