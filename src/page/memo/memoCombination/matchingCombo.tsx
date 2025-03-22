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
} from "../../common/icon/MemoIcon";
import { MemoItem } from "../../selectIcon/type/selectIcon";
import { useTranslation } from "react-i18next";

import { useContext, useEffect, useMemo, useState } from "react";
import { FCMContext } from "../../../context/FCMContext";
import { setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useMemoStore } from "../../../store/useStore";
import useLocalStorage from "../../common/hooks/useLocalStorage";
const size = 300;

const MEMO_LIST: MemoItem[] = [
  { id: 0, svg: <Clover width={309} height={309} /> },
  { id: 1, svg: <Puppy width={size} height={size} /> },
  { id: 2, svg: <Heart width={size} height={size} /> },
  { id: 3, svg: <Primrose width={size} height={size} /> },
  { id: 4, svg: <Book width={size} height={size} /> },
  { id: 5, svg: <Gift width={size} height={size} /> },
  { id: 6, svg: <Bunny width={size} height={size} /> },
  { id: 7, svg: <Cotton width={size} height={size} /> },
  { id: 8, svg: <Apple width={size} height={size} /> },
];

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

interface MatchingComboProps {
  matchingCombo: MemoCombination[];
}

const MatchingCombo = ({ matchingCombo }: MatchingComboProps) => {
  const { setCurrentMemoId, setMode } = useMemoStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_value, setValue] = useLocalStorage("memo", "");
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { database } = useContext(FCMContext);
  const [message, setMessage] = useState({ id: 0, messages: "" });
  const navigate = useNavigate();

  const handleSendClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("전송 버튼 클릭됨", message);
    postMemo();
  };

  const postMemo = async () => {
    const newMemoId = uuidv4();
    try {
      if (!database || !message.messages || message.messages.length === 0) {
        console.log(
          "메시지가 없거나 데이터베이스 연결이 없음",
          database,
          message
        );
        return;
      }
      await setDoc(doc(database, "message", newMemoId), {
        memoId: message.id,
        memoText: message.messages,
        createdAt: new Date(),
      });
      setMessage({ id: 0, messages: "" });
      setMode("achive");
      setCurrentMemoId(message.id);
      setValue(newMemoId.toString());
      navigate("/drop");
    } catch (error) {
      console.error("Setup error:", error);
    }
  };

  const idArray = searchParams.getAll("id").map(Number); // id 파라미터의 모든 값을 배열로 가져옵니다

  const findMatchingCombination = useMemo<MemoCombination | undefined>(() => {
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
        translateX: "0",
        translateY: "-10",
        memoSize: { width: 196, height: 196 },
        memoTranslateX: "-130",
        memoTranslateY: "0",
        scale: 1,
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

  const IconComponent = useMemo(() => {
    if (!findMatchingCombination) return;
    //각 컨페티 별로 높이 설정 필요
    const iconComopnent = (
      <>
        <g
          transform={`translate(${findMatchingCombination?.translateX},${
            findMatchingCombination?.translateY || "-10"
          })`}
          className=" flex-1"
        >
          {
            MEMO_LIST.find((item) => item.id === findMatchingCombination?.id)
              ?.svg
          }
        </g>
        <foreignObject
          x="55%"
          y="53%"
          width={findMatchingCombination?.memoSize.width}
          height={findMatchingCombination?.memoSize.height}
          transform={`translate(${findMatchingCombination?.memoTranslateX},${findMatchingCombination?.memoTranslateY})`}
          className="p-1 "
        >
          <div className=" w-full h-full bg-transparent border-dotted border-2 border-gray-600 rounded-lg px-2 pt-2 resize-none  text-gray-600 text-opacity-80 text-[12px] placeholder:text-[12px] placeholder:text-opacity-80  flex flex-col">
            <textarea
              className={`w-full h-[160px] border-none bg-transparent`}
              placeholder={t("memo.placeholder")}
              minLength={1}
              maxLength={100}
              value={message.messages}
              onChange={(e) => {
                console.log("입력 변경:", e.target.value);
                setMessage((prevMessage) => ({
                  ...prevMessage,
                  messages: e.target.value,
                }));
              }}
            />
            <div
              className="flex flex-row items-center justify-end w-full "
              onClick={handleSendClick}
            >
              <button
                className={`text-sm w-[40%] py-1 cursor-pointer bg-blue-500 rounded-md`}
              >
                send!
              </button>
            </div>
          </div>
        </foreignObject>
      </>
    );

    return iconComopnent;
  }, [findMatchingCombination, message]);

  useEffect(() => {
    if (findMatchingCombination) {
      console.log("id 업데이트:", findMatchingCombination.id);
      setMessage((prev) => ({ ...prev, id: findMatchingCombination.id }));
    }
  }, [findMatchingCombination]);

  return (
    <section className="flex flex-col items-center justify-center w-full px-[16px]  fixed top-[14%]">
      <div className="flex flex-col items-center justify-center mb-[38px] ">
        <p className=" text-white text-nowrap text-sm mb-1 ">
          {t(`confetti.characters.${findMatchingCombination?.name}.subtitle`)}
        </p>
        <p className=" text-white text-nowrap  text-xl ">
          {t(`confetti.characters.${findMatchingCombination?.name}.title`)}
        </p>
      </div>
      <div
        className={`${
          window.innerWidth > 768 ? "min-h-[350px]" : "min-h-[35dvh]"
        } flex flex-col items-center justify-center  w-full mx-auto  `}
      >
        <svg
          viewBox="0 0 309 309"
          width={window.innerWidth > 768 ? "450px" : "40dvh"}
          height={window.innerWidth > 768 ? "450px" : "40dvh"}
          preserveAspectRatio="xMidYMid meet"
        >
          {IconComponent}
        </svg>
      </div>
      <div className="flex flex-col items-center justify-center w-full  mt-[18px] ">
        <p className=" text-white  text-nowrap text-[16px] leading-6 ">
          {t(
            `confetti.characters.${findMatchingCombination?.name}.description1`
          )}
        </p>
        {t(
          `confetti.characters.${findMatchingCombination?.name}.description2`
        ) && (
          <p className=" text-nowrap  text-white text-[16px] leading-6">
            {t(
              `confetti.characters.${findMatchingCombination?.name}.description2`
            )}
          </p>
        )}
        {t(
          `confetti.characters.${findMatchingCombination?.name}.description3`
        ) && (
          <p className="text-nowrap  text-white  text-[16px] leading-6">
            {t(
              `confetti.characters.${findMatchingCombination?.name}.description3`
            )}
          </p>
        )}
        {t(
          `confetti.characters.${findMatchingCombination?.name}.description4`
        ) && (
          <p className=" text-nowrap  text-white text-[16px] leading-6">
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
