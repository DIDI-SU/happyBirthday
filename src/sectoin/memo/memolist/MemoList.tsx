import { useCallback } from "react";
import {
  Chacolate,
  Curry,
  Dance,
  Lemon,
  Mike,
  Smile,
  Spoon,
  Strewberry,
  Sun,
} from "../../../page/memo/icon/MemoIcon";

interface MemoItem {
  id: number;
  svg: React.ReactNode;
}

const MEMO_LIST: MemoItem[] = [
  { id: 0, svg: <Strewberry /> },
  { id: 1, svg: <Chacolate /> },
  { id: 2, svg: <Curry /> },
  { id: 3, svg: <Mike /> },
  { id: 4, svg: <Lemon /> },
  { id: 5, svg: <Dance /> },
  { id: 6, svg: <Smile /> },
  { id: 7, svg: <Spoon /> },
  { id: 8, svg: <Sun /> },
];

const MemoList = ({
  setCurrentMemo,
}: {
  setCurrentMemo: React.Dispatch<React.SetStateAction<number[] | null>>;
}) => {
  const handleClick = useCallback((id: number) => {
    setCurrentMemo((prev: number[] | null) => {
      if (prev === null) {
        return [id];
      }
      if (prev?.includes(id)) {
        return prev?.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);
  return MEMO_LIST?.map((memo) => {
    return (
      <section
        className="w-[30%] flex justify-center items-center cursor-pointer my-5"
        key={memo.id}
        onClick={() => handleClick(memo.id)}
      >
        {memo.svg}
      </section>
    );
  });
};

export default MemoList;
