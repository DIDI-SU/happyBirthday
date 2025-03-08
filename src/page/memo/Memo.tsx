import { useCallback, useEffect, useState } from "react";
import MemoList from "../../sectoin/memo/memolist/MemoList";

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
} from "./icon/MemoIcon";
import { useNavigate, useSearchParams } from "react-router-dom";
interface MemoItem {
  id: number;
  src: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const MEMO_LIST: Map<number, MemoItem> = new Map([
  [0, { id: 0, src: Strewberry }],
  [1, { id: 1, src: Chacolate }],
  [2, { id: 2, src: Curry }],
  [3, { id: 3, src: Mike }],
  [4, { id: 4, src: Lemon }],
  [5, { id: 5, src: Dance }],
  [6, { id: 6, src: Smile }],
  [7, { id: 7, src: Spoon }],
  [8, { id: 8, src: Sun }],
]);

const Memo = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentMemo, setCurrentMemo] = useState<number[] | null>(null);

  const goToWrite = useCallback(() => {
    navigate(`/write/${currentMemo?.join(",")}`);
  }, [currentMemo, searchParams]);

  useEffect(() => {
    if (currentMemo?.length === 2) {
      goToWrite();
    }
  }, [goToWrite]);

  return (
    <main className="w-full h-[100vh] flex flex-col justify-center items-center bg-black">
      <section className="w-[100%] flex justify-center items-center mb-10">
        <h4 className="text-white text-2xl font-bold">
          나만의 컨페티를 만들기 위해, 호영하면 생각나는 두가지를 골라주세요.
        </h4>
      </section>
      <section className=" lg:w-[40%] md:w-[50%] sm:w-[100%] flex flex-row justify-center items-center flex-wrap  ">
        {/* <MemoText currentMemo={MEMO_LIST.get(currentMemo)?.src || ""} /> */}
        <MemoList setCurrentMemo={setCurrentMemo} />
      </section>
    </main>
  );
};

export default Memo;
