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
  return (
    <svg viewBox="0 0 500 500">
      <g transform="translate(40 45)">
        {MEMO_LIST.map((item, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          return (
            <g
              key={item.id}
              transform={`translate(${col * 160} ${row * 160})`}
              onClick={() => handleClick(item.id)}
              className="cursor-pointer hover:opacity-80"
            >
              {React.cloneElement(item.svg as React.ReactElement, {
                width: 115,
                height: 115,
              })}
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default MemoList;
