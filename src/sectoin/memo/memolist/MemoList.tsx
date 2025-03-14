import React, { useCallback } from "react";
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
} from "../../../page/selectIcon/icon/MemoIcon";

interface MemoListsProps {
  setCurrentMemo: React.Dispatch<React.SetStateAction<number[] | null>>;
  currentMemo: number[] | null;
}

interface MemoItem {
  id: number;
  svg: React.ReactNode;
}
interface MemoListProps {
  data: MemoItem[];
  handleClick: (id: number) => void;
  currentMemo: number[] | null;
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

const MemoList2 = React.memo(
  ({ data, handleClick, currentMemo }: MemoListProps) => {
    return data.map((item, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;

      return (
        <g
          key={item.id}
          transform={`translate(${col * 160} ${row * 160})`}
          style={{
            transformOrigin: `${col * 160 + 57.5}px ${row * 160 + 57.5}px`,
          }}
          onClick={() => handleClick(item.id)}
          className={`cursor-pointer opacity-80 ${
            currentMemo?.includes(item.id) ? "memo-icon" : ""
          }`}
        >
          {React.cloneElement(item.svg as React.ReactElement, {
            width: 115,
            height: 115,
          })}
        </g>
      );
    });
  },
  (prevProps, nextProps) => {
    return (
      prevProps.data === nextProps.data &&
      prevProps.currentMemo === nextProps.currentMemo
    );
  }
);

const MemoList = ({ setCurrentMemo, currentMemo }: MemoListsProps) => {
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
  return (
    <svg viewBox="0 0 550 550">
      <g transform="translate(40 45)">
        <MemoList2
          data={MEMO_LIST}
          handleClick={handleClick}
          currentMemo={currentMemo}
        />
      </g>
    </svg>
  );
};

export default MemoList;
