export type Store = {
  currentMemoId: number[] | null;
  setCurrentMemoId: (newCurrentMemoId: number | null) => void;
};
