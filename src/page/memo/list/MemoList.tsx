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
} from "../../common/icon/MemoIcon";
import { MemoItem } from "../../selectIcon/type/selectIcon";
import { useMemoStore } from "../../../store/useStore";

interface MemoListProps {
  currentMemoId: number[] | null;
  setCurrentMemoId: (newCurrentMemoId: number | null) => void;
}

interface SelectMemoListProps {
  data: MemoItem[];
  handleClick: (id: number) => void;
  currentMemo: number[] | null;
}

const MEMO_LIST: MemoItem[] = [
  { id: 0, svg: <Strewberry width={115} height={115} /> },
  { id: 1, svg: <Chacolate width={115} height={115} /> },
  { id: 2, svg: <Curry width={115} height={115} /> },
  { id: 3, svg: <Mike width={115} height={115} /> },
  { id: 4, svg: <Lemon width={125} height={125} /> },
  { id: 5, svg: <Dance width={115} height={115} /> },
  { id: 6, svg: <Smile width={105} height={105} /> },
  { id: 7, svg: <Spoon width={105} height={105} /> },
  { id: 8, svg: <Sun width={115} height={115} /> },
];

const SelectMemoList = React.memo(
  ({ data, handleClick, currentMemo }: SelectMemoListProps) => {
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
          className={`cursor-pointer ${
            currentMemo?.includes(item.id) ? "memo-icon" : ""
          }`}
        >
          {React.cloneElement(item.svg as React.ReactElement)}
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

const MemoList = ({ setCurrentMemoId, currentMemoId }: MemoListProps) => {
  const { setMode } = useMemoStore();
  const handleClick = useCallback((id: number) => {
    setCurrentMemoId(id);
    setMode("memo");
  }, []);

  return (
    <svg viewBox="0 0 550 550">
      <g transform="translate(40 45)">
        <SelectMemoList
          data={MEMO_LIST}
          handleClick={handleClick}
          currentMemo={currentMemoId}
        />
      </g>
    </svg>
  );
};

export default MemoList;
