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
  { id: 0, svg: <Clover width={250} height={250} /> },
  { id: 1, svg: <Puppy width={250} height={250} /> },
  { id: 2, svg: <Heart width={250} height={250} /> },
  { id: 3, svg: <Primrose width={250} height={250} /> },
  { id: 4, svg: <Book width={250} height={250} /> },
  { id: 5, svg: <Gift width={250} height={250} /> },
  { id: 6, svg: <Bunny width={250} height={250} /> },
  { id: 7, svg: <Cotton width={250} height={250} /> },
  { id: 8, svg: <Apple width={250} height={250} /> },
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
          { item1: 1, item2: 4 },
          { item1: 5, item2: 6 }, // Strawberry + Spoon
          { item1: 6, item2: 7 }, // Curry + Spoon
        ],
      };
    }
    return result;
  };
  //
  const result = findMatchingCombination();

  return (
    <section className="flex flex-col items-center justify-center w-full p-[16px]">
      <div className="flex flex-col items-center justify-center ">
        <p className=" text-white text-nowrap text-[15px] ">
          {t(`confetti.characters.${result?.name}.subtitle`)}
        </p>
        <p className=" text-white text-nowrap text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px]">
          {t(`confetti.characters.${result?.name}.title`)}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center h-[55dvh] w-full mx-auto ">
        <svg viewBox="0 0 250 250">
          {MEMO_LIST.find((item) => item.id === result?.id)?.svg}
          <foreignObject
            x="65%"
            y="65%"
            width={180}
            height={170}
            transform="translate(-125,-115)"
          >
            <textarea
              className=" w-full h-full bg-transparent border-dotted border-2 border-black rounded-lg p-2 resize-none "
              placeholder="호영을 위한 메세지를 작성해주세요"
            />
          </foreignObject>
        </svg>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full mb-4 mt-4 gap-1">
        <p className=" text-white  text-nowrap text-md ">
          {t(`confetti.characters.${result?.name}.description1`)}
        </p>
        {t(`confetti.characters.${result?.name}.description2`) && (
          <p className=" text-nowrap  text-white text-md">
            {t(`confetti.characters.${result?.name}.description2`)}
          </p>
        )}
        {t(`confetti.characters.${result?.name}.description3`) && (
          <p className="text-nowrap  text-white  text-md ">
            {t(`confetti.characters.${result?.name}.description3`)}
          </p>
        )}
        {t(`confetti.characters.${result?.name}.description4`) && (
          <p className=" text-nowrap  text-white text-md ">
            {t(`confetti.characters.${result?.name}.description4`)}
          </p>
        )}
      </div>
    </section>
  );
};

export default MatchingCombo;
