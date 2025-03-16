import { useSearchParams } from "react-router-dom";
import {
  Clover,
  Puppy,
  Heart,
  Primrose,
  Book,
  Gift,
  Bunny,
  Cotton,
  Apple,
} from "../../selectIcon/icon/MemoIcon";
import { MemoItem } from "../../selectIcon/type/selectIcon";
import { useTranslation } from "react-i18next";

const MEMO_LIST: MemoItem[] = [
  { id: 0, svg: <Clover /> },
  { id: 1, svg: <Puppy /> },
  { id: 2, svg: <Heart /> },
  { id: 3, svg: <Primrose /> },
  { id: 4, svg: <Book /> },
  { id: 5, svg: <Gift /> },
  { id: 6, svg: <Bunny /> },
  { id: 7, svg: <Cotton /> },
  { id: 8, svg: <Apple /> },
];

interface MemoCombination {
  id: number;
  name: string;
  korName: string;
  pairs: { item1: number; item2: number }[];
}

interface MatchingComboProps {
  matchingCombo: MemoCombination[];
}

const MatchingCombo = ({ matchingCombo }: MatchingComboProps) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const idArray = searchParams.getAll("id").map(Number); // id 파라미터의 모든 값을 배열로 가져옵니다

  const findMatchingCombination = () => {
    const result = matchingCombo.find((combo) => {
      return combo.pairs.some((pair) => {
        return (
          (idArray.includes(pair.item1) && idArray.includes(pair.item2)) ||
          (idArray.includes(pair.item2) && idArray.includes(pair.item1))
        );
      });
    });
    if (!result) {
      return {
        id: 0,
        name: "clover",
        korName: "클로버",
        pairs: [
          { item1: 0, item2: 1 }, // Strawberry + Chocolate
          { item1: 0, item2: 6 }, // Strawberry + Smile
          { item1: 0, item2: 7 }, // Strawberry + Spoon
          { item1: 2, item2: 7 }, // Curry + Spoon
        ],
      };
    }
    return result;
  };
  //
  const result = findMatchingCombination();

  return (
    <section className="flex flex-col items-center justify-center w-full h-[50dvh] p-[16px]">
      <div className="flex flex-col items-center justify-center">
        <p className=" text-white text-nowrap text-[15px] ">
          {t(`confetti.characters.${result?.name}.subtitle`)}
        </p>
        <p className=" text-white text-nowrap text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px]">
          {t(`confetti.characters.${result?.name}.title`)}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center h-full w-full mx-auto ">
        <svg
          viewBox="0 0 1000 1000"
          className="w-full p-[16px] lg:w-[50%] sm:w-[90%] md:w-[80%]"
        >
          <g transform="translate(0 70)">
            {MEMO_LIST.find((item) => item.id === result?.id)?.svg}
          </g>
        </svg>
        <p className=" text-white  text-wrap text-[18px] sm:text-[18px] md:text-[18px] lg:text-[18px] xl:text-[18px]">
          {t(`confetti.characters.${result?.name}.description`)}
        </p>
      </div>
    </section>
  );
};

export default MatchingCombo;
