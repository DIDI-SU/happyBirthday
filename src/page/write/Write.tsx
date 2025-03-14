import { useParams } from "react-router-dom";
import { Clover, Puppy } from "../selectIcon/icon/MemoIcon";
import { useMemo } from "react";

const Write = () => {
  const params = useParams();
  const currentMemo = useMemo(() => {
    return params.memo?.split(",")?.map(Number);
  }, [params.memo]);

  const MemoIcon = () => {
    console.log(currentMemo);

    if (
      currentMemo?.length === 2 &&
      currentMemo[0] === 0 &&
      currentMemo[1] === 1
    ) {
      return <Clover />;
    }
    return <Puppy />;
  };

  return (
    <main className="w-full h-[100dvh] flex flex-col items-center justify-center bg-black">
      <section className="relative top-0 left-0 w-[309px] h-[309px] flex flex-col items-center justify-center">
        <MemoIcon />
        {/* 스크롤 금지 길이 고정 사이드 고정 넘어가면 그영역 부터 빨갛게 표시 */}
        <textarea
          className="absolute top-15 left-[19%] w-[196px] h-[196px] min-h-[196px] bg-transparent text-black  border-2 border-black border-dashed rounded-md  py-6 text-2xl resize-none leading-8"
          placeholder="Write your memo"
          maxLength={55}
        />
      </section>
    </main>
  );
};

export default Write;
