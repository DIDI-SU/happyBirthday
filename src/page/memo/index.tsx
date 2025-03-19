import { useEffect, useState } from "react";
import Loading from "../selectIcon/loading";

import MatchingCombo from "./memoCombination/matchingCombo";
import { Archive, Home } from "../selectIcon/icon/MemoIcon";
import { Link } from "react-router-dom";
import { useMemoStore } from "../../store/useStore";

interface MemoCombination {
  id: number;
  name: string;
  korName: string;
  pairs: { item1: number; item2: number }[];
}

const MEMO_COMBINATIONS: MemoCombination[] = [
  {
    id: 0,
    name: "clover",
    korName: "클로버",
    pairs: [
      { item1: 0, item2: 1 }, // Strawberry + Chocolate
      { item1: 1, item2: 4 },
      { item1: 5, item2: 6 }, // Strawberry + Spoon
      { item1: 6, item2: 7 }, // Curry + Spoon
    ],
  },
  {
    id: 1,
    name: "puppy",
    korName: "강아지",
    pairs: [
      { item1: 0, item2: 6 }, // Chocolate + Sun
      { item1: 1, item2: 6 }, // Chocolate + Sun
      { item1: 4, item2: 6 }, // Lemon + Smile
      { item1: 3, item2: 4 }, // Chocolate + Sun
      { item1: 0, item2: 8 }, // Lemon + Spoon
    ],
  },
  {
    id: 2,
    name: "heart",
    korName: "하트",
    pairs: [
      { item1: 1, item2: 8 }, // Strawberry + Curry
      { item1: 0, item2: 2 }, // Strawberry + Curry
      { item1: 0, item2: 3 }, // Strawberry + Spoon
      { item1: 6, item2: 8 }, // Curry + Sun
    ],
  },
  {
    id: 3,
    name: "primrose",
    korName: "진달래",
    pairs: [
      { item1: 1, item2: 5 }, // Curry + Smile
      { item1: 0, item2: 5 }, // Curry + Sun
      { item1: 5, item2: 8 }, // Lemon + Spoon
      { item1: 4, item2: 7 }, // Lemon + Spoon
    ],
  },
  {
    id: 4,
    name: "book",
    korName: "너덜너덜 책",
    pairs: [
      { item1: 1, item2: 7 }, // Chocolate + Spoon
      { item1: 2, item2: 5 }, // Chocolate + Spoon
      { item1: 3, item2: 6 }, // Smile + Spoon
      { item1: 7, item2: 8 }, // Lemon + Smile
    ],
  },
  {
    id: 5,
    name: "gift",
    korName: "선물",
    pairs: [
      { item1: 1, item2: 3 }, // Chocolate + Lemon
      { item1: 2, item2: 4 }, // Curry + Spoon
      { item1: 3, item2: 5 }, // Chocolate + Sun
      { item1: 4, item2: 8 },
    ],
  },
  {
    id: 6,
    name: "bunny",
    korName: "토끼",
    pairs: [
      { item1: 0, item2: 4 }, // Strawberry + Lemon
      { item1: 2, item2: 3 }, // Spoon + Spoon
      { item1: 3, item2: 7 }, // Spoon + Sun
      { item1: 5, item2: 7 },
    ],
  },
  {
    id: 7,
    name: "cotton",
    korName: "솜",
    pairs: [
      { item1: 2, item2: 7 }, // Spoon + Spoon
      { item1: 3, item2: 8 }, // Lemon + Sun
      { item1: 5, item2: 4 },
    ],
  },
  {
    id: 8,
    name: "hea",
    korName: "사과",
    pairs: [
      { item1: 0, item2: 7 }, // Strawberry + Spoon
      { item1: 2, item2: 8 }, // Curry + Sun
      { item1: 1, item2: 4 }, // Chocolate + Lemon
    ],
  },
];
//로딩 2초정도 딜레이 후 메모 페이지 렌더링
const Memo = () => {
  const { setMode } = useMemoStore();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setMode("memo");
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="flex flex-col items-center justify-center w-full h-full ">
      <MatchingCombo matchingCombo={MEMO_COMBINATIONS} />
      <div className="flex  items-center justify-center w-full mx-auto absolute bottom-1 ">
        <Link
          to="/"
          className="flex flex-col items-center justify-center mr-4 "
        >
          <Home width={32} height={32} className="mb-1" />
          <div className="flex flex-col items-center justify-center">
            <p className=" text-sm text-white">홈으로 </p>
            <p className=" text-sm text-white">돌아가기</p>
          </div>
        </Link>
        <Link
          to="/achive"
          className="flex flex-col items-center justify-center ml-8 "
        >
          <Archive width={32} height={32} />
          <div className="flex flex-col items-center justify-center ">
            <p className=" text-sm text-white">아카이빙</p>
            <p className=" text-sm text-white">보러가기</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Memo;
