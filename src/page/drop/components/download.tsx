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
import { AchiveItem } from "../../common/types/type";

import { useTranslation } from "react-i18next";
import { forwardRef } from "react";
import React from "react";

const MEMO_COMBINATIONS = [
  {
    id: 0,
    name: "clover",
    korName: "클로버",
    svg: <Clover width={220} height={220} />,
  },
  {
    id: 1,
    name: "puppy",
    korName: "강아지",
    svg: <Puppy width={220} height={220} />,
    title: "강아지",
  },
  {
    id: 2,
    name: "heart",
    korName: "하트",
    svg: <Heart width={220} height={220} />,
    title: "하트",
  },
  {
    id: 3,
    name: "primrose",
    korName: "흰앵초",
    svg: <Primrose width={220} height={220} />,
    title: "흰앵초",
  },
  {
    id: 4,
    name: "book",
    korName: "너덜너덜 책",
    svg: <Book width={220} height={220} />,
  },
  {
    id: 5,
    name: "gift",
    korName: "선물",
    svg: <Gift width={220} height={220} />,
    title: "선물",
  },
  {
    id: 6,
    name: "bunny",
    korName: "토끼",
    svg: <Bunny width={220} height={220} />,
    title: "토끼",
  },
  {
    id: 7,
    name: "cotton",
    korName: "솜",
    svg: <Cotton width={220} height={220} />,
    title: "솜",
  },
  {
    id: 8,
    name: "apple",
    korName: "사과",
    svg: <Apple width={220} height={220} />,
    title: "사과",
  },
];

const Download = forwardRef<HTMLDivElement, { data: AchiveItem | null }>(
  ({ data }, ref) => {
    const { t } = useTranslation();
    if (!data) return null;

    return (
      <div
        ref={ref}
        key={data?.createdAt}
        className="memo-container fixed top-[-9999px] left-[-9999px]"
      >
        <div className="flex flex-col items-center justify-center bg-[#fcf3d2] w-[300px] h-[400px] p-5">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">나의 컨페티는</p>
            <p className="text-center mb-4 text-lg font-medium">
              {t(
                `confetti.characters.${
                  MEMO_COMBINATIONS[data?.memoId].name
                }.subtitle`
              )}
            </p>
            <p className="text-center mb-4 text-lg font-medium">
              {t(
                `confetti.characters.${
                  MEMO_COMBINATIONS[data?.memoId].name
                }.title`
              )}
            </p>
          </div>

          <div className="relative w-[300px] h-[300px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              {React.cloneElement(MEMO_COMBINATIONS[data?.memoId].svg, {
                width: 220,
                height: 220,
              })}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-600 text-center text-md font-bold break-words whitespace-pre-wrap max-w-[180px]">
                {data?.memoText}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Download;
