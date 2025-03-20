import { useEffect, useMemo, useState } from "react";
import { useMemoStore } from "../../store/useStore";
import { MemoItem } from "./type/selectIcon";
import ReactDOMServer from "react-dom/server";
import React from "react";
import ImageConfetti from "./conffetti/ImageConfetti";
import {
  Strewberry,
  Chacolate,
  Curry,
  Mike,
  Lemon,
  Dance,
  Smile,
  Spoon,
  Sun,
  Clover,
  Puppy,
  Heart,
  Primrose,
  Book,
  Gift,
  Bunny,
  Cotton,
  Apple,
} from "../common/icon/MemoIcon";

const MEMO_LIST: MemoItem[] = [
  { id: 0, svg: <Strewberry width={150} height={150} /> },
  { id: 1, svg: <Chacolate width={150} height={150} /> },
  { id: 2, svg: <Curry width={150} height={150} /> },
  { id: 3, svg: <Mike width={150} height={150} /> },
  { id: 4, svg: <Lemon width={150} height={150} /> },
  { id: 5, svg: <Dance width={150} height={150} /> },
  { id: 6, svg: <Smile width={150} height={150} /> },
  { id: 7, svg: <Spoon width={150} height={150} /> },
  { id: 8, svg: <Sun width={150} height={150} /> },
];

const ACHIVE_MEMO_LIST: MemoItem[] = [
  { id: 0, svg: <Clover width={150} height={150} /> },
  { id: 1, svg: <Puppy width={150} height={150} /> },
  { id: 2, svg: <Heart width={150} height={150} /> },
  { id: 3, svg: <Primrose width={150} height={150} /> },
  { id: 4, svg: <Book width={150} height={150} /> },
  { id: 5, svg: <Gift width={150} height={150} /> },
  { id: 6, svg: <Bunny width={150} height={150} /> },
  { id: 7, svg: <Cotton width={150} height={150} /> },
  { id: 8, svg: <Apple width={150} height={150} /> },
];

const Loading = () => {
  const { currentMemoId, setMode, mode } = useMemoStore();

  useEffect(() => {
    setMode("achive");
  }, []);

  const memos = useMemo(() => {
    if (!currentMemoId) return [];

    const findMemo = currentMemoId.map((id) =>
      mode === "achive" ? ACHIVE_MEMO_LIST[id] : MEMO_LIST[id]
    );

    const increaseMemoItems = findMemo.map((item) => {
      return { ...item, svg: item.svg };
    });
    const increaseMemoItems2 = findMemo.map((item) => {
      return { ...item, svg: item.svg };
    });
    const increaseMemoItems3 = findMemo.map((item) => {
      return { ...item, svg: item.svg };
    });
    return [
      ...findMemo,
      ...increaseMemoItems,
      ...increaseMemoItems2,
      ...increaseMemoItems3,
    ];
  }, [currentMemoId, mode]);

  const svgToUrl = (svgComponent: JSX.Element) => {
    try {
      const svgString = ReactDOMServer.renderToString(svgComponent);
      const encodedString = btoa(unescape(encodeURIComponent(svgString)));
      return `data:image/svg+xml;base64,${encodedString}`;
    } catch (error) {
      console.error("SVG 변환 에러:", error);
      return "";
    }
  };

  const memoImages = useMemo(() => {
    if (!memos || memos.length === 0) return [""];
    return memos
      .map((memo) => {
        if (!memo || !memo.svg) return "";
        return svgToUrl(memo.svg as JSX.Element);
      })
      .filter((url) => url !== "");
  }, [memos]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [size] = useState("100, 150, 120");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [weight] = useState("10, 10, 10");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [duration] = useState("3000");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fadeOut] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fadeOutDuration] = useState("0");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [particleCount] = useState("15");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [speed] = useState("200");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rotate] = useState(true);

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setIsRunning(true);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* React 엘리먼트를 직접 렌더링 */}
      {React.createElement(ImageConfetti, {
        runAnimation: isRunning,
        images: size.split(",").map((size, index) => ({
          src: memoImages[index % memoImages.length] || memoImages[0],
          size: parseInt(size.trim()) || 32,
          weight: parseInt(weight.split(",")[index]?.trim()) || 10,
        })),
        duration: parseInt(duration) || 3000,
        fadeOut: fadeOut ? parseInt(fadeOutDuration) || 500 : false,
        particleCount: parseInt(particleCount) || 8,
        speed: parseInt(speed) || 70,
        rotate,
        rotateSpeed: 0.3,
        onAnimationCompleted: () => console.log("Animation completed"),
      })}
      <div className="relative w-full h-full"></div>
      <div>
        <p className="text-white text-2xl font-bold mb-11">
          {mode === "memo"
            ? "나만의 컨페티 만드는 중..."
            : "컨페티 보내는중..."}
        </p>
      </div>
    </div>
  );
};

export default Loading;
