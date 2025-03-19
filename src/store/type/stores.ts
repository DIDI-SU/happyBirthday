export type Store = {
  currentMemoId: number[] | null;
  setCurrentMemoId: (newCurrentMemoId: number | null) => void;
  mode: "memo" | "achive" | "";
  setMode: (newMode: "memo" | "achive" | "") => void;
};
