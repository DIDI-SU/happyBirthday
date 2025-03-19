import { useNavigate, useSearchParams } from "react-router-dom";
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

import { useContext, useMemo, useState } from "react";
import { FCMContext } from "../../../context/FCMContext";
import { setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
const MEMO_LIST: MemoItem[] = [
  { id: 0, svg: <Clover width={200} height={200} /> },
  { id: 1, svg: <Puppy width={200} height={200} /> },
  { id: 2, svg: <Heart width={200} height={200} /> },
  { id: 3, svg: <Primrose width={200} height={200} /> },
  { id: 4, svg: <Book width={200} height={200} /> },
  { id: 5, svg: <Gift width={200} height={200} /> },
  { id: 6, svg: <Bunny width={200} height={200} /> },
  { id: 7, svg: <Cotton width={200} height={200} /> },
  { id: 8, svg: <Apple width={200} height={200} /> },
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
  const { database } = useContext(FCMContext);
  const [message, setMessage] = useState({ id: 0, messages: "" });
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const postMemo = async () => {
    const newMemoId = uuidv4();
    try {
      if (!database || message.messages?.length === 0) return;
      await setDoc(doc(database, "message", newMemoId), {
        memoId: message.id,
        memoText: message.messages,
        createdAt: new Date(),
      });
      setMessage({ id: 0, messages: "" });
      setIsSaving(true);
      navigate("/achive");
    } catch (error) {
      console.error("Setup error:", error);
      setIsSaving(false);
    }
  };

  const idArray = searchParams.getAll("id").map(Number); // id 파라미터의 모든 값을 배열로 가져옵니다

  const findMatchingCombination = useMemo(() => {
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
  }, [idArray, matchingCombo]);
  //

  return (
    <section className="flex flex-col items-center justify-center w-full px-[16px] absolute">
      <div className="flex flex-col items-center justify-center ">
        <p className=" text-white text-nowrap text-[15px] ">
          {t(`confetti.characters.${findMatchingCombination?.name}.subtitle`)}
        </p>
        <p className=" text-white text-nowrap text-[25px] ">
          {t(`confetti.characters.${findMatchingCombination?.name}.title`)}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center max-h-[50dvh] w-full mx-auto ">
        <svg viewBox="0 0 200 200">
          {
            MEMO_LIST.find((item) => item.id === findMatchingCombination?.id)
              ?.svg
          }
          <foreignObject
            x="70%"
            y="72%"
            width={170}
            height={160}
            transform="translate(-125,-125)"
            className="p-6 "
          >
            <textarea
              className=" w-full h-full bg-transparent border-dotted border-2 border-gray-600 rounded-lg px-2 pt-2 resize-none  text-gray-600 text-opacity-80 text-[12px]"
              placeholder="호영을 위한 메세지를 작성해주세요"
              onChange={(e) => {
                const memoId = MEMO_LIST.find(
                  (item) => item.id === findMatchingCombination?.id
                )?.id;

                if (memoId !== undefined) {
                  setMessage({ id: memoId, messages: e.target.value });
                }
              }}
            />
            <div className="flex flex-row items-center justify-end w-full absolute bottom-3 right-4 ">
              <button
                onClick={postMemo}
                className={`text-sm w-[30%] -rotate-6 cursor-pointer  ${
                  isSaving ? "bg-gray-500" : "bg-blue-500"
                } rounded-md`}
                disabled={isSaving}
              >
                {isSaving ? "저장중..." : "보내기!"}
              </button>
            </div>
          </foreignObject>
        </svg>
      </div>
      <div className="flex flex-col items-center justify-center w-full  pt-3 ">
        <p className=" text-white  text-nowrap text-[18px] leading-6 ">
          {t(
            `confetti.characters.${findMatchingCombination?.name}.description1`
          )}
        </p>
        {t(
          `confetti.characters.${findMatchingCombination?.name}.description2`
        ) && (
          <p className=" text-nowrap  text-white text-[18px] leading-6">
            {t(
              `confetti.characters.${findMatchingCombination?.name}.description2`
            )}
          </p>
        )}
        {t(
          `confetti.characters.${findMatchingCombination?.name}.description3`
        ) && (
          <p className="text-nowrap  text-white  text-[18px] leading-6">
            {t(
              `confetti.characters.${findMatchingCombination?.name}.description3`
            )}
          </p>
        )}
        {t(
          `confetti.characters.${findMatchingCombination?.name}.description4`
        ) && (
          <p className=" text-nowrap  text-white text-[18px] leading-6">
            {t(
              `confetti.characters.${findMatchingCombination?.name}.description4`
            )}
          </p>
        )}
      </div>
    </section>
  );
};

export default MatchingCombo;
