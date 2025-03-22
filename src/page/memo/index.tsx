import { useEffect, useState } from "react";
import Loading from "../selectIcon/loading";

import MatchingCombo from "./memoCombination/matchingCombo";
import { Archive, Home } from "../common/icon/MemoIcon";
import { Link } from "react-router-dom";
import { useMemoStore } from "../../store/useStore";

interface MemoCombination {
  id: number;
  name: string;
  korName: string;
  translateX: string;
  translateY: string;
  memoSize: { width: number; height: number };
  memoTranslateX: string;
  memoTranslateY: string;
  scale: number;
  pairs: { item1: number; item2: number }[];
}

const MEMO_COMBINATIONS: MemoCombination[] = [
  {
    id: 0,
    name: "clover",
    korName: "클로버",
    translateX: "0",
    translateY: "0",
    memoSize: { width: 196, height: 196 },
    memoTranslateX: "-110",
    memoTranslateY: "-110",
    scale: 1,
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
    translateX: "0",
    translateY: "0",
    memoSize: { width: 196, height: 196 },
    memoTranslateX: "-117",
    memoTranslateY: "-111",
    scale: 1,
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
    translateX: "0",
    translateY: "0",
    memoSize: { width: 180, height: 180 },
    memoTranslateX: "-110",
    memoTranslateY: "-96",
    scale: 1.2,
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
    korName: "흰앵초",
    translateX: "0",
    translateY: "0",
    memoSize: { width: 180, height: 180 },
    memoTranslateX: "-110",
    memoTranslateY: "-94",
    scale: 1,
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
    translateX: "5",
    translateY: "0",
    memoSize: { width: 196, height: 196 },
    memoTranslateX: "-110",
    memoTranslateY: "-115",
    scale: 1,
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
    translateX: "5",
    translateY: "0",
    memoSize: { width: 196, height: 196 },
    memoTranslateX: "-110",
    memoTranslateY: "-90",
    scale: 1,
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
    translateX: "0",
    translateY: "0",
    memoSize: { width: 196, height: 196 },
    memoTranslateX: "-110",
    memoTranslateY: "-99",
    scale: 1,
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
    translateX: "0",
    translateY: "0",
    memoSize: { width: 180, height: 180 },
    memoTranslateX: "-110",
    memoTranslateY: "-105",
    scale: 1,
    pairs: [
      { item1: 2, item2: 7 }, // Spoon + Spoon
      { item1: 3, item2: 8 }, // Lemon + Sun
      { item1: 5, item2: 4 },
    ],
  },
  {
    id: 8,
    name: "apple",
    korName: "사과",
    translateX: "0",
    translateY: "0",
    memoSize: { width: 196, height: 196 },
    memoTranslateX: "-110",
    memoTranslateY: "-110",
    scale: 1,
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
      <div className="top-[1.5%] right-[5%] fixed">
        <div className="flex flex-col items-center justify-center bg-[#fffef0] rounded-lg p-4 relative blur-xs">
          <p className="text-gray-500 text-sm font-bold mb-1">
            해당 메모는 호영에게 전달 될 예정입니다.
          </p>
          <p className="text-gray-500 text-sm font-bold">
            따뜻한 말들로 메모장을 채워주세요🐶
          </p>
          <div className="absolute -right-1  top-1 w-4 h-4 bg-white rotate-45"></div>
        </div>
      </div>
      <MatchingCombo matchingCombo={MEMO_COMBINATIONS} />
      <div className="flex  items-center justify-center w-full mx-auto absolute bottom-5 ">
        <Link
          to="/main"
          className="flex flex-col items-center justify-center mr-4 "
        >
          <Home width={32} height={32} className="mb-1" />
          <div className="flex flex-col items-center justify-center">
            <p className=" text-[12px] text-white">홈으로 </p>
            <p className="  text-[12px] text-white">돌아가기</p>
          </div>
        </Link>

        <Link
          to="/achive"
          className="flex flex-col items-center justify-center ml-8 "
        >
          <Archive width={32} height={32} />
          <div className="flex flex-col items-center justify-center ">
            <p className="  text-[12px] text-white">아카이빙</p>
            <p className="  text-[12px] text-white">보러가기</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Memo;
