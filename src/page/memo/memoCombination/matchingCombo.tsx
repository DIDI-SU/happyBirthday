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
import { useMemoStore } from "../../../store/useStore";
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
  const { setCurrentMemoId, setMode } = useMemoStore();
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
      setMode("achive");
      setCurrentMemoId(message.id);
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
    <section className="flex flex-col items-center justify-center w-full px-[16px] ">
      <div className="flex flex-col items-center justify-center mb-3 ">
        <p className=" text-white text-nowrap text-[15px] ">
          {t(`confetti.characters.${findMatchingCombination?.name}.subtitle`)}
        </p>
        <p className=" text-white text-nowrap text-[25px] ">
          {t(`confetti.characters.${findMatchingCombination?.name}.title`)}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center max-h-[40dvh] w-full mx-auto ">
        <svg viewBox="0 0 200 200">
          {
            MEMO_LIST.find((item) => item.id === findMatchingCombination?.id)
              ?.svg
          }
          <foreignObject
            x="70%"
            y="72%"
            width={170}
            height={170}
            transform="translate(-125,-125)"
            className="p-6 "
          >
            <textarea
              className=" w-full h-full bg-transparent border-dotted border-2 border-gray-600 rounded-lg px-2 pt-2 resize-none  text-gray-600 text-opacity-80 text-[12px] placeholder:text-[12px] placeholder:text-opacity-80"
              placeholder={t("memo.placeholder")}
              minLength={1}
              maxLength={100}
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
                style={{
                  clipPath: `polygon(1% 2%, 3.5% 0.1%, 8.9% 2.7%, 16.2% 1.2%, 19.7% 0.8%, 24.7% 2%, 31.2% 0%, 35.9% 2.3%, 40.6% 0.5%, 47.1% 1.8%, 49.9% 1%, 53.8% 2.5%, 62.2% 0.4%, 67.3% 1.2%, 70.3% 0.3%, 75.8% 1.4%, 78.5% 1.7%, 84% 2.6%, 91.1% 0.5%, 93.6% 2.4%, 97.3% 0.3%, 98.9% 6%, 98.1% 11.4%, 98.6% 15.5%, 97.3% 17.8%, 97.7% 27.4%, 98.3% 28.5%, 99.7% 34.1%, 98.8% 41.9%, 98.3% 45.7%, 98.4% 50.9%, 98.7% 57.4%, 99.6% 60.4%, 99.4% 66.6%, 99.2% 69.5%, 97.4% 77.1%, 98.1% 82.3%, 99.9% 83.5%, 98.2% 91.5%, 99.3% 95.3%, 98% 98.6%, 93.6% 97.4%, 90.3% 98.3%, 86.8% 98.3%, 78.6% 98.5%, 76.4% 99.2%, 69.7% 99.8%, 64.2% 99.3%, 61.8% 99.2%, 57.2% 98.1%, 48.7% 98.3%, 46.8% 99%, 39.6% 98.9%, 33.8% 97.3%, 28.2% 99.4%, 27% 98.3%, 22.1% 98.6%, 13.1% 97.1%, 8.7% 99.3%, 2.7% 97.4%, 2% 98.2%, 2.1% 94.3%, 0.7% 90.5%, 0.9% 86.3%, 2.2% 78.2%, 0.4% 76.7%, 1.2% 72.1%, 2% 64%, 1.4% 59.8%, 0.4% 57.3%, 0.3% 49.1%, 2.9% 44.7%, 1.9% 41.3%, 0.8% 35.7%, 2.9% 31.3%, 0.8% 24.9%, 2.7% 20.5%, 0.8% 17.4%, 2.5% 8.6%, 1.1% 5.5%)`,
                }}
              >
                {isSaving ? "저장중..." : "send!"}
              </button>
            </div>
          </foreignObject>
        </svg>
      </div>
      <div className="flex flex-col items-center justify-center w-full  pt-5 ">
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
