import { useMemo } from "react";
import { useMemoStore } from "../../store/useStore";
import { MemoItem } from "./type/selectIcon";
import {
  Strewberry,
  Chacolate,
  Curry,
  Mike,
  Lemon,
  Dance,
  Smile,
  Spoon,
  Sun,
} from "./icon/MemoIcon";

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

const Loading = () => {
  const { currentMemoId } = useMemoStore();
  const memos = useMemo(() => {
    if (!currentMemoId) return [];
    const findMemo = currentMemoId.map((id) => MEMO_LIST[id]);

    const increaseMemoItems = findMemo.map((item) => {
      return { ...item, svg: item.svg };
    });
    const increaseMemoItems2 = findMemo.map((item) => {
      return { ...item, svg: item.svg };
    });
    return [...findMemo, ...increaseMemoItems, ...increaseMemoItems2];
  }, [currentMemoId]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-[80%] h-full">
        {memos.map((memo, index) => (
          <div
            key={memo.id + Math.random()}
            className={`absolute fall${index} w-[100px] h-[100px]`}
          >
            {memo.svg}
          </div>
        ))}
      </div>
      <div>
        <p className="text-white text-2xl font-bold mb-11">
          나만의 컨페티 만드는 중...
        </p>
      </div>
    </div>
  );
};

export default Loading;
