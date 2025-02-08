import { useState } from "react";
import MemoList from "../../sectoin/memo/memolist/MemoList";
import MemoText from "../../sectoin/memo/memotext/MemoText";

interface MemoItem {
  id: number;
  src: string;
}

const MEMO_LIST: Map<number, MemoItem> = new Map([
  [0, { id: 0, src: "/src/assets/memo.png" }],
  [1, { id: 1, src: "/src/assets/slimract.png" }],
  [2, { id: 2, src: "/src/assets/ractangle.png" }],
  [3, { id: 3, src: "/src/assets/round.png" }],
]);

const Memo = () => {
  const [currentMemo, setCurrentMemo] = useState<number>(0);

  return (
    <main className="w-full h-[100vh] flex justify-center items-center">
      <section className=" w-full h-[100%] flex flex-col justify-center items-center">
        <MemoText currentMemo={MEMO_LIST.get(currentMemo)?.src || ""} />
        <div className="w-[100%] flex mr-5">
          <MemoList setCurrentMemo={setCurrentMemo} />
        </div>
      </section>
    </main>
  );
};

export default Memo;
