import { useCallback, useEffect, useState } from "react";
import MemoList from "../../sectoin/memo/memolist/MemoList";
import { useNavigate, useSearchParams } from "react-router-dom";

const Memo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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
